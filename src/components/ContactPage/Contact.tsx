import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import AddContact from "../../components/AddContact/AddContact";
import EditContact from "../../components/EditContact/EditContact";
// import FilterStatus from "../../components/FilterStatus/FilterStatus";
import ContactList from "../../components/ContactList/ContactList";

export interface ContactInterface {
  id: string;
  fname: string;
  lname: string;
  status: string;
  active: boolean;
}

const Contact = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [editContact, setEditContact] = useState<ContactInterface | null>(null);
  // const [statusFilterValue, setStatusFilterValue] = useState("active");

  // const getStatusFilterValue = (filterValue: string) =>
    // setStatusFilterValue(filterValue);
  const getEditContact = (editContact: ContactInterface) => setEditContact(editContact);

  return (
    <main className="app">
      <div className="app__wrapper">
        <div className="app__header">
          <h1 className="app__title">Contact Page</h1>
        </div>
        <div className="app__inputs-box">
          {editContact?.id ? (
            <EditContact editContact={editContact} setEditContact={setEditContact} />
          ) : (
            <AddContact />
          )}
          {/* <FilterStatus getStatusFilterValue={getStatusFilterValue} /> */}
        </div>
        <ContactList
          contacts={contacts}
          statusFilterValue={""}
          getEditContact={getEditContact}
          setEditContact={setEditContact}
          editContact={editContact}
        />
      </div>
    </main>
  );
};

export default Contact;