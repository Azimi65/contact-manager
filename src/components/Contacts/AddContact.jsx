import { useContext } from "react";
import Spinner from "../Spinner";
import {GREEN,PURPLE,CYAN} from '../../helpers/colors';
import { contactContext } from "../../context/contactContext";
import { Link } from "react-router-dom";
const AddContact = () => {
    const {loading,onContactChange,contacts,createContactForm} =useContext(contactContext);
    console.log(contacts.fullname)
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
                        <form onSubmit={createContactForm}>
                            <div className="mt-3">
                                <input type="text" name="fullname" className="form-control" placeholder="نام و نام خانوادگی" required={true} onChange={onContactChange} value={contacts.fullname}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="photo" className="form-control" placeholder="آدرس تصویر" required={true} onChange={onContactChange} value={contacts.photo}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="mobile" className="form-control" placeholder="شماره موبایل" required={true} onChange={onContactChange} value={contacts.mobile}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="email" className="form-control" placeholder="آدرس ایمیل" required={true} onChange={onContactChange} value={contacts.email}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="job" className="form-control" placeholder="شغل" required={true} onChange={onContactChange} value={contacts.job}/>
                            </div>
                            <div className="mt-3">
                                <input type="text" name="group" className="form-control" placeholder="انتخاب گروه" onChange={onContactChange} required={true} value={contacts.group}/>
                            </div>
                            <div className="mt-3 d-flex gap-3">
                                <input type="submit" value="ساخت مخاطب"/>
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
 
export default AddContact;