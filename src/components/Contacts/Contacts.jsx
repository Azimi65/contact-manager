import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
import { BACKGROUND, CURRENTLINE, CYAN, ORANGE, PINK, PURPLE, RED } from "../../helpers/colors";
import {Spinner,Contact} from '../index';
import {Link} from 'react-router-dom';
import { deleteContact } from "../../services/contactService";
const Contacts = () => {
    const {contacts,loading,groups,deleteContact}=useContext(contactContext);
    console.log(contacts)
    return ( 
        <>
        <section className="container">
            <div className="">
                <div className="row justify-content-center mt-5">
                    <div className="col">
                        <Link to={'/contacts/add'} className="btn" style={{backgroundColor:PINK}}>
                            <span>افزودن مخاطب جدید</span>{" "}
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        {loading ? <Spinner/> : (
            <section className="container">
                <div className="row  mt-5 row-cols-2">
                {contacts.length>0 ? contacts.map(c=>
                 
                (
                   
                    
                        <div className="col-6">
                            <Contact key={c.id} id={c.id} contact={c} confirmDelete={()=>{deleteContact(c.id,c.fullname)}}/> 
                        </div>      
                   
                )):(
                    <div className="" style={{backgroundColor:CURRENTLINE}}>
                        <div className="col">
                            <p style={{color:ORANGE}}>not-found</p>
                        </div>
                    </div>
                )}
                 </div>
            </section>
           
        )}
        </> 
     );
}
 
export default Contacts;