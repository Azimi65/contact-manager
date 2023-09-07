import { createContext } from "react";
export const contactContext = createContext({
    loading:false,
    setLoading:()=>{},
    contact:{},
    setContact:()=>{},
    contacts:[],
    filteredContacts:[],
    contactQuery:{text:""},
    onContactChange:()=>{},
    deleteContact:()=>{},
    createContactForm:()=>{},
    updateContact:()=>{},
    searchContact:()=>{}

})