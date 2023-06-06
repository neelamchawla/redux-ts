import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
import { editContact as updateContact } from "../../redux/contact";
import { ContactInterface } from "../ContactPage/Contact";

type EditContactProps = {
  editContact: ContactInterface;
  setEditContact: (editContact: ContactInterface) => void;
};

const EditContact = ({ editContact, setEditContact }: EditContactProps) => {
  const dispatch = useDispatch();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setFname(editContact.fname);
    setLname(editContact.lname);
    setStatus(editContact.status);
  }, [editContact]);

  const handleEditContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(fname, lname);
    if (fname.trim().length < 0) {
      setError("Please Enter Correct Name");
    } else if (lname.trim().length < 0) {
      setError("Please Enter Correct Name");
    } else {
      dispatch(updateContact({ editedContact: { ...editContact, fname, lname, status } }));
      setEditContact({ id: "", fname: "", lname:"", status:"",  active: false });
      setFname("");
      setLname("");
    }
  };

  const handleUpdateFnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFname(e.target.value);
    if (fname.trim().length > 1) {
      setError("");
    }
  };
  const handleUpdateLnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLname(e.target.value);
    if (lname.trim().length > 1) {
      setError("");
    }
  };

  // console.log(editContact);
  return (
    <form onSubmit={handleEditContactSubmit} className="form">
      <div className="form__control">
        <input
          onChange={handleUpdateFnameChange}
          value={fname}
          type="text"
          className="form__input"
          placeholder="Edit Contact..."
        />
        {error && <p className="form__error-text">{error}</p>}
      </div>
      <div className="form__control">
        <input
          onChange={handleUpdateLnameChange}
          value={lname}
          type="text"
          className="form__input"
          placeholder="Edit Contact..."
        />
        {error && <p className="form__error-text">{error}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="" className="col-md-2 control-label">Status</label>
        <div className="col-md-8">
          <input type="radio" name="status" value="active" 
          checked={status === "active"}
          onChange={(e) => {
            setStatus(e.target.value);
            console.log(e.target.value);
            }} />
          Active
          <input type="radio" name="status" value="in-active" 
          checked={status === "in-active"}
          onChange={(e) => {
            setStatus(e.target.value);
            console.log(e.target.value);
            }} />
          In Active
        </div>
      </div>

      <button className="btn form__btn">Edit Contact</button>
    </form>
  );
};

export default EditContact;
