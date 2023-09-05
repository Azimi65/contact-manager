import {Navbar,Contacts,AddContact,EditContact,Spinner} from './components';
import {ViewContact} from './components';
import {useState,useEffect} from 'react';
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom';
import './App.css';
import {getAllContacts,getAllGroups,createContact, deleteContact} from './services/contactService';
import { confirmAlert } from 'react-confirm-alert';
function App() {
  const [getContacts,setContacts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [groups,setGroups]=useState([]);
  const [forceRender,setForceRender]=useState(false);
  const [getContact,setContact]=useState({
    fullname:"",
    photo:"",
    mobile:"",
    email:"",
    job:"",
    group:"",
  });
  const [query,setQuery] = useState({text:" "});
  const [getFilteredContacts,setFilteredContacts]=useState([]);
  const navigate =useNavigate();
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        setLoading(true);
        const {data:contactsData} = await getAllContacts();
        console.log(contactsData)
        const {data:groupsData} = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      }catch(err){
        console.log(err.message);
        setLoading(false);
      }
    }
    fetchData();
  },[]);
  useEffect(()=>{

    const fetchData = async()=>{
      try{
        setLoading(true);
        const {data:contactsData} = await getAllContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      }catch(err){
        console.log(err.message);
        setLoading(false);
      }
    }
    fetchData();
  },[forceRender])
  const createContactForm=async (event)=>{
    event.preventDefault();
    try{
      const {status} = await createContact(getContact);
      console.log(status)
      if (status===201){
        setContact({});
        setForceRender(true)
        navigate("/contacts");
      }
    }catch(err){
      console.log(err.message);

    }
  }
  const setContactInfo=(event)=>{
    setContact({
      ...getContact,[event.target.name]:event.target.value
    });
    
  }
const confirm=(contactId,contactfullname)=>{
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h1>مطمعنید که میخواهید {contactfullname} را حذف کنید؟</h1>
          <p></p>
          <button onClick={onClose}>انصراف</button>
          <button
            onClick={() => {
              removeContact(contactId);
              onClose();
            }}
          >
            بله مطمعنم
          </button>
        </div>
      );
    }
  });
}
  
  const removeContact=async (contactId)=>{
    try{
      setLoading(true)
      const response= await deleteContact(contactId);
      if(response){
        const {data:contactsData} = await getAllContacts();
        setContact(contactsData);
        setForceRender(true)
        setLoading(false);
      }
    }catch(err){
      console.log(err.message);
      setLoading(false)
    }
  };
  const searchContact= event=>{
    setQuery({...query,text:event.target.value});
    const allContacts = getContacts.filter((contacts)=>{
      return  contacts.fullname.includes(event.target.value);
    })
    setFilteredContacts(allContacts);
  }
  return (
    <div className="App">
      <Navbar query={query} searchContact={searchContact}/>
      <Routes>
        <Route path='/' element={<Navigate to='/contacts'/>}/>
        <Route path='/contacts' element={<Contacts contacts={getFilteredContacts} groups={groups} loading={loading} confirmDelete={confirm}/>}/>
        <Route path='/contacts/add' element={<AddContact setContactInfo={setContactInfo} contacts={getContact} loading={loading} createContactForm={createContactForm}/>}/>
        <Route path='/contacts/:contactId' element={<ViewContact/>}/>
        <Route path='/contacts/edit/:contactId' element={<EditContact forceRender={forceRender} setForceRender={setForceRender}/>}/>
      </Routes>
    </div>
  );
}

export default App;
