import React from "react";
import { useGlobalContext } from "../context";
import { NavLink } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function Sidemenu() {
  const { user } = useGlobalContext();
  const { name, login, type, img, email } = user;

  return (
    <aside className="aside-nav">
      <div className="arrow">{"\u25B6"}</div>
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
            <div className="buttons-container">
              <button
                className="btn-hover-container"
                style={{ margin: "2rem 0" }}
              >
                <NavLink to="/employees">
                  <FaUser className="add-btn users" />
                </NavLink>
                <div
                  className="btn-text"
                  style={{ color: "white", marginLeft: "1rem" }}
                >
                  Employees
                </div>
              </button>

              <button className="btn-hover-container">
                <NavLink to="/newproject">
                  <IoAddCircle className="add-btn" />
                </NavLink>
                <div
                  className="btn-text"
                  style={{ color: "white", marginLeft: "1rem" }}
                >
                  Add new project
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
