import React from "react";
import { useGlobalContext } from "../context";

export default function Sidemenu() {
  const { user, setUser } = useGlobalContext();
  const { name, id, login, type } = user;

  return (
    <aside className="aside-nav">
      <h2>{name}</h2>
      <ul>
        <li>{login}</li>
        <li>type: {type}</li>
        <li>user id: {id}</li>
      </ul>
      <div className="projects-list">
        <h3>Your projects:</h3>
      </div>
    </aside>
  );
}
