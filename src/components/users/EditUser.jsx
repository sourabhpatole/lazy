import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  // alert(id);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const { name, username, email, phone, website } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/users/${id}`, user);
    navigate("/");
  };
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:5000/users/${id}`);
    setUser(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <div className="text-center mb-4">
          <h1>Edit User</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your Name"
                name="name"
                onChange={(e) => onInputChange(e)}
                value={name}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your Username"
                name="username"
                onChange={(e) => onInputChange(e)}
                value={username}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your E-mail address"
                name="email"
                onChange={(e) => onInputChange(e)}
                value={email}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your Number"
                name="phone"
                onChange={(e) => onInputChange(e)}
                value={phone}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your website"
                name="website"
                onChange={(e) => onInputChange(e)}
                value={website}
              />
            </div>
            <button className="btn btn-info btn-block">Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
