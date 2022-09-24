import React from "react";
import Login from "./Login";

export default function UserSettings({ user }) {
  console.log(user);
  const { name, login, img, type, salary } = user;

  if (user) {
    return (
      <div>
        <h2>{name}</h2>
        <img src={img} alt={name} />
        <ul>
          <li>login:{login}</li>
          <li>type:{type}</li>
          {salary && <li>salary: {salary}</li>}
        </ul>
      </div>
    );
  } else {
    return <div>Please log in to see user info.</div>;
  }
}
