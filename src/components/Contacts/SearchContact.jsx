import { PURPLE,COMMENT } from '../../helpers/colors';
import { createContext } from 'react';
import { contactContext } from '../../context/contactContext';
import { useContext } from 'react';
const SearchContact = () => {
    const {contactQuery,searchContact}=useContext(contactContext);
    return ( 
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" style={{backgroundColor:PURPLE}}>
                <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <input type="text" onChange={searchContact}  className="form-control" placeholder="جستجوی مخاطب" value={contactQuery.text}/>
        </div>
     );
}
 
export default SearchContact;