import {useState,useEffect,useContext} from 'react';
import {contactContext} from '../../context/contactContext';
import {useParams,Link } from 'react-router-dom';
import {Spinner} from '../../components';
import {getContact,getGroup} from '../../services/contactService';
import {CURRENTLINE, CYAN,GREEN,PURPLE} from '../../helpers/colors';
const ViewContact = () => {
    const {loading,setLoading} = useContext(contactContext);
    const {contactId}=useParams();
    const [state,setState]=useState({
        
        contact:{},
       
    });
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setState({...state,loading:true});
                const {data:contactData} = await getContact(contactId);
                // const {data:groupData} = await getGroup(contactData.group);
                setState({...state,contact:contactData})
                setLoading(false)

            }catch(err){
                console.log(err.message);
                setLoading(false)
            }
           
        }
        fetchData();
    },[])
    const {contact,group}= state;
    return ( 
        
        <>
        {loading?(<Spinner/>):(
            <>
                <section>
            <p className="h3" style={{color:CYAN}}></p>
        </section>
        <div className='d-flex flex-column justify-content-center  mx-5 rounded py-4' style={{backgroundColor:CURRENTLINE}}>
            <div className='d-flex'>
            <img src={contact.photo} alt="" className='rounded' />
            <ul className="list-group w-75">
                <li className="list-group-item">
                    نام و نام خانوادگی:
                    <span className="fw-bold px-2" style={{color:GREEN}}>{contact.fullname}</span>
                </li>
                <li className="list-group-item">
                    شماره همراه : 
                    <span className="fw-bold px-2" style={{color:GREEN}}>{contact.mobile}</span>
                </li>
                <li className="list-group-item">
                    ایمیل : 
                    <span className="fw-bold px-2" style={{color:GREEN}}>{contact.email}</span>
                </li>
                <li className="list-group-item">
                    گروه : 
                    <span className="fw-bold px-2" style={{color:GREEN}}>{contact.group}</span>
                </li>
                <li className="list-group-item">
                    شغل  : 
                    <span className="fw-bold px-2" style={{color:GREEN}}>{contact.job}</span>
                </li>
            </ul>
            </div>
            <div>
            <Link to={`/contacts`} className='mt-3 '>
                <button className='btn rounded mt-3' style={{backgroundColor:PURPLE}}>بازگشت به صفحه اصلی</button>
            </Link>
            </div>
            
        
        </div>
        
            </>
        )}
        
        
        </>
     );
}
 
export default ViewContact;