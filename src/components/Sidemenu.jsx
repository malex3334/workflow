import React from "react";
import { useGlobalContext } from "../context";
import useFetch from "../hooks/useFetch";
import { NavLink } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";

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
          <div className="projects-list"></div>

          {user.type === "company" && (
            <button className="btn-hover-container">
              <NavLink to="/newproject">
                <IoAddCircle className="add-btn" />
              </NavLink>
              <div className="btn-text" style={{ color: "white" }}>
                Add new project
              </div>
            </button>
          )}
        </>
      )}
    </aside>
  );
}
