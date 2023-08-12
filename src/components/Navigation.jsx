import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "./Dropdown";

export default function Navigation() {
  const { user, setUser } = useGlobalContext();
  const [notifications, setNotifications] = useState(10);
  let navigate = useNavigate();

  return (
    <nav className="nav">
      <div className="logo">
        <NavLink to="/">My Arij</NavLink>
      </div>
      <ul className="nav-list">
        <NavLink to="/">start</NavLink>
        {user && <NavLink to="/dashboard">projects</NavLink>}
        {user && (
          <NavLink className="navlink-user" to="/user/">
            <span>{user.name}</span>
            <img className="nav-avatar" src={user.img} alt={user.name} />

            <div
              className="notifications"
              style={
                notifications > 0
                  ? { background: "red" }
                  : { background: "$bg-green" }
              }
            >
              {notifications && notifications > 0 ? <>{notifications}</> : 0}
              <Dropdown classes={"dropdown"} information={notifications} />
            </div>
          </NavLink>
        )}

        {!user ? (
          <NavLink to="/login">Log in</NavLink>
        ) : (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              setUser(false);
              navigate("/");
            }}
          >
            logout
          </li>
        )}
        {!user && <NavLink to="signup">Sign up</NavLink>}
      </ul>
    </nav>
  );
}
