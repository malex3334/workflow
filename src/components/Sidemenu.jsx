import React from "react";
import { useGlobalContext } from "../context";
import useFetch from "../hooks/useFetch";

export default function Sidemenu() {
  const { user, setUser } = useGlobalContext();
  const { name, id, login, type, img, email } = user;
  const { data } = useFetch("relations/");

  return (
    <aside className="aside-nav">
      {user && (
        <>
          <img src={img} alt="" />
          <h2>{name}</h2>
          <ul className="aside-list">
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
          </ul>
          <div className="projects-list">
            <h3>Your projects:</h3>
          </div>
        </>
      )}
    </aside>
  );
}
