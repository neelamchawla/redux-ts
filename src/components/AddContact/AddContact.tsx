import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addContact } from "../../redux/contact";

const AddContact = () => {
  const dispatch = useDispatch();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (fname.trim().length < 5) {
    //   setError("Minimum allowed first name length is 5");
    // } else if (fname.trim().length > 50) {
    //   setError("Maximum allowed first name length is 50");
    // } else {
    //   console.log(fname);
    //   dispatch(addContact({ fname, id: uuidv4(), active: false }));
    //   setFname("");
    // }

    if (fname.trim().length > 0 || lname.trim().length > 0) {
      console.log(fname, lname);
      dispatch(addContact({ fname, lname, id: uuidv4(), status, active: false }));
      setFname("");
      setLname("");
      setStatus("");
    }

    console.log(status);
  };

  const handleUpdateFnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFname(e.target.value);
    if (fname.trim().length > 0) {
      setError("");
    }
  };

  const handleUpdateLnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLname(e.target.value);
    if (lname.trim().length > 0) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleAddSubmit} className="form">
      <div className="form__control">
        <input
          onChange={handleUpdateFnameChange}
          value={fname}
          type="text"
          className="form__input"
          placeholder="First Name"
        />
        {error && <p className="form__error-text">{error}</p>}
      </div>
      <div className="form__control">
        <input
          onChange={handleUpdateLnameChange}
          value={lname}
          type="text"
          className="form__input"
          placeholder="Last Name"
        />
        {error && <p className="form__error-text">{error}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="" className="col-md-2 control-label">Status</label>
        <div className="col-md-8">
          <input type="radio" name="status" value="active" onChange={(e) => {
            setStatus(e.target.value);
            console.log(e.target.value);
            }} />
          Active
          <input style={{ marginLeft: "1em"}} type="radio" name="status" value="in-active" onChange={(e) => {
            setStatus(e.target.value);
            console.log(e.target.value);
            }} />
          In Active
        </div>
      </div>

      <button className="btn form__btn">Submit</button>
    </form>
  );
};

export default AddContact;
