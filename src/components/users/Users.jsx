import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const Users = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    avatar: "",
  });
  useEffect(() => {
    loadUser();
  }, []);
  const { id } = useParams();
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container">
      <Link className="btn btn-primary m-4" to="/">
        Back to Home
      </Link>
      <h4 className="display-4">User Id: {id}</h4>
      <hr />
      <img className="avatar" src={user.avatar} alt={user.name} />
      <ul className="list-group w-50">
        <li className="list-group-item ml-1">Name: {user.name}</li>
        <li className="list-group-item ml-1">User: {user.name}</li>
        <li className="list-group-item ml-1">Email: {user.email}</li>
        <li className="list-group-item ml-1">Phone: {user.phone}</li>
        <li className="list-group-item ml-1">Website: {user.website}</li>
        <li className="list-group-item ml-1">Country: {user.country}</li>
      </ul>
    </div>
  );
};

export default Users;
