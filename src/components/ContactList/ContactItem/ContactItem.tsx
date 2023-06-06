import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact
  // , toggleContact 
} from "../../../redux/contact";
import { ContactInterface } from "../../ContactPage/Contact";

type ContactItemProps = {
  contact: ContactInterface;
  editContact: ContactInterface | null;
  getEditContact: (editContact: ContactInterface) => void;
  setEditContact: (editContact: ContactInterface) => void;
};

const ContactItem = ({
  contact,
  editContact,
  getEditContact,
  setEditContact,
}: ContactItemProps) => {
  const dispatch = useDispatch();

  // const handleToggleContactChange = () =>
  //   dispatch(toggleContact({ contactId: contact.id }));
  const handleGetEditContactClick = () => getEditContact(contact);
  const handleDeleteContactClick = () => {
    dispatch(deleteContact({ contactId: contact.id }));
    if (contact.id === editContact?.id) {
      setEditContact({ id: "", fname: "", lname: "", status: "", active: false });
    }
  };

  return (
    <li className="contact-list__item">
      <label
        htmlFor={contact.id}
        style={
          contact.status !== "active"
            ? { color: "#f96868" }
            : { color: "#6ad86a" }
        }
        className="contact-list__label"
      >
        {/* <input
          onChange={handleToggleContactChange}
          checked={contact.active ? true : false}
          type="checkbox"
          id={contact.id}
          className="contact-list__checkbox"
        /> */}
        {contact.fname} {contact.lname}
      </label>
      <div className="contact-list__btns-box">
        <button
          onClick={handleGetEditContactClick}
          className="contact-list__btn contact-list__edit-btn"
        >
          <MdModeEditOutline />
        </button>
        <button
          onClick={handleDeleteContactClick}
          className="contact-list__btn contact-list__delete-btn"
        >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default ContactItem;
