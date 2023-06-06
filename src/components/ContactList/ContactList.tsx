import React from "react";
import ContactItem from "./ContactItem/ContactItem";
import { ContactInterface } from "./../ContactPage/Contact";

type ContactListProps = {
  contacts: ContactInterface[];
  statusFilterValue: string;
  getEditContact: (editContact: ContactInterface) => void;
  setEditContact: (editContact: ContactInterface) => void;
  editContact: ContactInterface | null;
};

const ContactList = ({
  contacts,
  // statusFilterValue,
  editContact,
  getEditContact,
  setEditContact,
}: ContactListProps) => {
  return (
    <ul className="contact-list">
      {contacts
        // .filter((status) => (statusFilterValue === "active" ? true : status.active))
        .map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            editContact={editContact}
            getEditContact={getEditContact}
            setEditContact={setEditContact}
          />
        ))}
    </ul>
  );
};

export default ContactList;
