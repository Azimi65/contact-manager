import { PURPLE,COMMENT } from '../../helpers/colors';
const SearchContact = ({query,searchContact}) => {
    return ( 
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" style={{backgroundColor:PURPLE}}>
                <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <input type="text" onChange={searchContact}  className="form-control" placeholder="جستجوی مخاطب" vlaue={query.text}/>
        </div>
     );
}
 
export default SearchContact;