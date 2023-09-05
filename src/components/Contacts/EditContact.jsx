import Spinner from "../Spinner";
import {GREEN,PURPLE,CYAN} from '../../helpers/colors';

import { Link, useParams ,Navigate, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getContact, updateContact } from "../../services/contactService";

const EditContact = ({forceRender,setForceRender}) => {
   
    const navigate= useNavigate();
    const {contactId}=useParams();
    const [state,setState] = useState({
        loading:true,
        contact:{
            fullname:"",
            email:"",
            mobile:"",
            photo:"",
            job:"",
            group:""
        },

    })
    const {loading,contact}=state;
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setState({...state,loading:true})
                const {data:Contact} = await getContact(contactId);
                setState({...state,
                    loading:false,
                    contact:Contact,
                })
            //    console.log(state) 
            }
            catch(err){
                console.log(err.message)
                setState({...state,loading:false})
            }
            
        }
        fetchData();
    },[])
    const setContactInfo=(event)=>{
        setState({
            ...state,
            contact:{
                ...state.contact,
                [event.target.name]:event.target.value,
            }
        });
       
    };
    const updateContactForm=async (event)=>{
        event.preventDefault();
        try{
          const {data} = await updateContact(state.contact,contactId);
          console.log(data)
         
            setState({
                ...state,
                loading:false,
                
            });
            if(data){
                navigate("/contacts");
                setForceRender(!forceRender)
            }
            
          
        }catch(err){
          console.log(err.message);
    
        }
      }
    
    return ( 
       <>
        {loading?(
            <Spinner/>
        ):(
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 fw-bold text-center" style={{color:GREEN}}>ساخت مخاطب جدید</p>
                        </div>
                    </div>
                </div>
                <hr style={{backgroundColor:GREEN}}/>
                <div className="d-flex flex-row justify-content-center gap-5">
                    <div className="">
                        <form onSubmit={updateContactForm}>
                            <div className="mt-3">
                                <input type="text" name="fullname" className="form-control" placeholder="نام و نام خانوادگی" required={true} onChange={setContactInfo} value={contact.fullname}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="photo" className="form-control" placeholder="آدرس تصویر" required={true} onChange={setContactInfo} value={contact.photo}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="mobile" className="form-control" placeholder="شماره موبایل" required={true} onChange={setContactInfo} value={contact.mobile}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="email" className="form-control" placeholder="آدرس ایمیل" required={true} onChange={setContactInfo} value={contact.email}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="job" className="form-control" placeholder="شغل" required={true} onChange={setContactInfo} value={contact.job}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="group" className="form-control" placeholder="انتخاب گروه" onChange={setContactInfo} required={true} value={contact.group}/>
                            </div>
                            <div className="mt-3 d-flex gap-3">
                                <input type="submit" value="ویرایش مخاطب"/>
                                <Link to={"/contacts"} style={{color:CYAN}}>انصراف</Link>
                            </div>
                        </form> 
                    </div>
                    <div>
                        <img src="https://web-eau.net/images/blog/internet/img3.webp" alt="" style={{zIndex:"-1"}} height="400px"  className="rounded"/>
                    </div>
                </div>
            
            </section>
        )}
       </> 
    );
}
 
export default EditContact;