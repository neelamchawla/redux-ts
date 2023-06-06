import {createSlice} from "@reduxjs/toolkit";
import {ContactInterface} from "../components/ContactPage/Contact";

interface ContactsListInterface {
    contacts: ContactInterface[]
}

const initialState: ContactsListInterface = {
    contacts: []
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact: (state, {payload: {fname, lname, status, id, active}})=>{
            state.contacts.push({id, fname, lname, status, active})
        },
        deleteContact: (state, {payload: {contactId}})=>{
            state.contacts = state.contacts.filter(contact=> contact.id !== contactId)
        },
        editContact: (state, {payload: {editedContact}})=>{
            console.log(editedContact)
            state.contacts = state.contacts.map(contact => contact.id === editedContact.id ? editedContact : contact);
        },
        toggleContact: (state, {payload: {contactId}})=>{
            state.contacts = state.contacts.map(contact => contact.id === contactId ? {...contact, active: !contact.active} : contact);
        },
    }
})
export const {addContact, deleteContact, editContact, toggleContact} = contactSlice.actions;
export default contactSlice.reducer;