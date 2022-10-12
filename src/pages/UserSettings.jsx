import React, { useCallback, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";

export default function UserSettings({ user, setUser }) {
  const { name, login, img, type, salary, email } = user;
  const [edit, setEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const { updateData } = useFetch();
  const { data, loading, rerender, setRerender } = useFetch("users");

  const handleSave = useCallback(() => {
    setEdit(false);
    updateData(user.id, "users", {
      ...updatedUser,
    });
    setRerender(!rerender);
  }, [updatedUser]);

  useEffect(() => {
    setUpdatedUser(user);
  }, [setUser, user]);

  useEffect(() => {
    if (!loading) {
      const result = data.users.filter(({ id }) => id === user.id);
      setUser(result[0]);
    }
  }, [loading, handleSave, setUser, data, user.id]);

  if (loading) {
    return <Loader />;
  }

  if (user && edit) {
    return (
      <div className="user-settings-container">
        <h2 className="user-settings-title">
          {name}
          <FaEdit className="del-btn" onClick={() => setEdit(!edit)} />
        </h2>

        <img className="user-img" src={img} alt={name} />
        <ul className="user-data">
          <form onSubmit={handleSave}>
            <li>
              <input
                type="text"
                value={updatedUser.name}
                onChange={(e) => setUpdatedUser({ name: e.target.value })}
              />
            </li>
            <li>
              <input
                type="text"
                value={updatedUser.login}
                onChange={(e) => setUpdatedUser({ login: e.target.value })}
              />
            </li>
            <li>
              <input
                type="email"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ email: e.target.value })}
              />
            </li>

            {salary && <li>salary: {salary}</li>}
            <button type="submit">save</button>
          </form>
        </ul>
      </div>
    );
  }

  if (user && !edit) {
    return (
      <div className="user-settings-container">
        <h2 className="user-settings-title">
          {name}
          <FaEdit className="del-btn" onClick={() => setEdit(true)} />
        </h2>

        <img className="user-img" src={img} alt={name} />
        <ul className="user-data">
          <li>
            <>
              <span className="data-title">name:</span>
              {name}
            </>
          </li>
          <li>
            <>
              <span className="data-title">login:</span> {login}
            </>
          </li>
          <li>
            <>
              <span className="data-title">email: </span>
              {email}
            </>
          </li>
          <li>
            <span className="data-title">type:</span> {type}
          </li>
          {salary && <li>salary: {salary}</li>}
        </ul>
        {user.type === "company" && (
          <button>
            <NavLink to="/employees">Employees</NavLink>
          </button>
        )}
      </div>
    );
  }

  if (!user) {
    return <div>Please log in to see user info.</div>;
  }
}
