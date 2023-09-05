import { Link } from 'react-router-dom';
import  {PURPLE,CYAN,ORANGE,CURRENTLINE,RED} from '../../helpers/colors';
const Contact = ({contact,id,confirmDelete}) => {
  console.log(contact.fullname)
    return ( 
        <div className="">
                        <div className="card" style={{backgroundColor:CURRENTLINE}}>
                            <div className="row card-body d-flex justify-content-around">
                               <div className="col-3">
                                    <img src="https://placehold.co/200x200" alt="" style={{border:`1px solid ${PURPLE}`}} className="img-fluid rounded"/>
                               </div>
                                <div className="col-7">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark">
                                            نام و نام خانوادگی: {""}
                                            <span className="fw-bold">{contact.fullname}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            شماره موبایل: {""}
                                            <span className="fw-bold">{contact.mobile}</span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            آدرس ایمیل: {""}
                                            <span className="fw-bold">{contact.email}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-2 d-flex flex-column gap-2 align-items-center justify-content-center">
                                    <Link to={`/contacts/${contact.id}`} className="btn" style={{backgroundColor:ORANGE}}>
                                        <i className="fa fa-eye"></i>
                                    </Link>
                                    <Link to={`/contacts/edit/${contact.id}`} className="btn" style={{backgroundColor:CYAN}}>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </Link>
                                    <button onClick={confirmDelete} className="btn" style={{backgroundColor:RED}}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>       
     );
}
 
export default Contact;