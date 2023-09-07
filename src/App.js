import {Navbar,Contacts,AddContact,EditContact,Spinner} from './components';
import {ViewContact} from './components';
import {useState,useEffect} from 'react';
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom';
import './App.css';
import {getAllContacts,getAllGroups,createContact, deleteContact} from './services/contactService';
import { confirmAlert } from 'react-confirm-alert';
import { contactContext } from './context/contactContext';
function App() {
  const [contacts,setContacts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [groups,setGroups]=useState([]);
  const [contact,setContact]=useState({});
  const [contactQuery,setContactQuery] = useState({text:" "});
  const [filteredContacts,setFilteredContacts]=useState([]);
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
 
  const createContactForm=async (event)=>{
    event.preventDefault();
    try{
      setLoading((prevLoading)=>true)
      const {status,data} = await createContact(contact);
      console.log(status)
      if (status===201){
       
        const allContacts = [...contacts,data]
        setContacts(allContacts);
        setFilteredContacts(allContacts)
        setContact({});
        setLoading((prevLoading)=>false)
        navigate("/contacts");
      }
    }catch(err){
      console.log(err.message);

    }
  }
  const onContactChange=(event)=>{
    setContact({
      ...contact,[event.target.name]:event.target.value
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
        setFilteredContacts(contactsData)
        setLoading(false);
      }
    }catch(err){
      console.log(err.message);
      setLoading(false)
    }
  };
  const searchContact= event=>{
    setContactQuery({...contactQuery,text:event.target.value});
    const allContacts = contacts.filter((contact)=>{
      return  contact.fullname.includes(event.target.value);
    })
    setFilteredContacts(allContacts);
  }
  return (
    <contactContext.Provider value={{
      loading,
      setLoading,
      contact,
      setContact,
      contacts,
      setContacts,
      filteredContacts,
      contactQuery,
      groups,
      onContactChange,
      deleteContact,
      // updateContact,
      createContactForm,
      searchContact,
    }}>
      <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to='/contacts'/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/contacts/add' element={<AddContact/>}/>
        <Route path='/contacts/:contactId' element={<ViewContact/>}/>
        <Route path='/contacts/edit/:contactId' element={<EditContact />}/>
      </Routes>
    </div>
    </contactContext.Provider>
    
  );
}

export default App;
