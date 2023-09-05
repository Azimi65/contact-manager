import SearchContact from "./Contacts/SearchContact";
import {PURPLE} from '../helpers/colors.js';
const Navbar = ({query,searchContact}) => {
    return ( 
        <nav className="navbar navbar-dark shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fa fa-address-book" aria-hidden="true"></i>{" "}
                            اپلیکیشن مدیریت 
                            {" "}<span style={{color:PURPLE}}>مخاطبین</span>
                            </div>
                        </div>
                    <div className="col">
                        <SearchContact query={query} searchContact={searchContact}/>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;