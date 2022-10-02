import React from "react";
import Login from "./Login";

export default function UserSettings({ user }) {
  console.log(user);
  const { name, login, img, type, salary, email } = user;

  if (user) {
    return (
      <div className="user-settings-container">
        <h2 className="user-settings-title">{name}</h2>
        <img className="user-img" src={img} alt={name} />
        <ul className="user-data">
          <li>
            <span className="data-title">name:</span> {name}
          </li>
          <li>
            <span className="data-title">login:</span> {login}
          </li>
          <li>
            <span className="data-title">email: </span>
            {email}
          </li>
          <li>
            <span className="data-title">type:</span> {type}
          </li>
          {salary && <li>salary: {salary}</li>}
        </ul>
      </div>
    );
  } else {
    return <div>Please log in to see user info.</div>;
  }
}
