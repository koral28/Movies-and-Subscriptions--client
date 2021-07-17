import { useForm } from "react-hook-form";
import "../../stylesheets/style.css";
import "../../stylesheets/style.css";
import { useState, useEffect, useRef } from "react";
import Users from "../../models/Utils/users";
import Permissions from "../../models/Utils/permissions";
import { Link } from "react-router-dom";

const AllUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const { handleSubmit, errors } = useForm();
  const onSubmit = (data) => {};
  let componentMounted = useRef(true); // (3) component is mounted

  useEffect(() => {
    if (componentMounted) {
      Users.getUsersData().then((resp) => setUsers(resp.data.users));
      Permissions.getPermissionsData().then((resp) =>
        setPermissions(resp.data.permissions)
      );
    }
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false if we leave the page
    };
  }, []);

  let allUsers = users.map((user, index) => {
    return (
      <li key={index} className="allUsers">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" name="memberId" hidden />
          First Name:{" "}
          <input
            type="text"
            name="firstname"
            defaultValue={user.FirstName}
            style={{ border: "none" }}
          />
          <br />
          Last Name:{" "}
          <input
            type="text"
            name="lastname"
            defaultValue={user.LastName}
            style={{ border: "none" }}
          />
          <br />
          User Name:{" "}
          <input
            type="text"
            name="UserName"
            defaultValue={user.FirstName + user.LastName}
            style={{ border: "none" }}
          />
          <br />
          Session Time Out:{" "}
          <input
            type="text"
            name="SessionTimeOut"
            defaultValue={user.SessionTimeOut}
            style={{ border: "none", width: 50 }}
          />
          <br />
          Created Date:
          <input
            type="text"
            name="CreatedDate"
            defaultValue={user.CreatedDate}
            style={{ border: "none" }}
          />
          <br />
          {errors.name && <p>{errors.name.message}</p>}
          Permissions:
          {permissions.map((permission, i) => {
            /*eslint-disable eqeqeq*/
            if (permission.Id == user.Id) {
              return (
                <ul key={i}>
                  {permission.Permissions.map((per, i) => {
                    return <li key={i}>{per}</li>;
                  })}
                </ul>
              );
            } else {
              return "";
            }
          })}
          <br />
        </form>
        <div className="editDelBtns">
          {
            <Link to={`/main/usersMenu/editUsers/${user.FirstName}`}>
              <button className="btn">Edit</button>
            </Link>
          }
          <div className="deleteUserBtn">
            <Link to={`/main/usersMenu/deleteUsers/${user.FirstName}`}>
              <button className="btn">Delete</button>
            </Link>
          </div>
        </div>
      </li>
    );
  });

  return <div>{allUsers}</div>;
};

export default AllUsers;
