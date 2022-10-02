import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Navigation() {
  const { user, setUser } = useGlobalContext();

  return (
    <nav className="nav">
      <div className="logo">My Arij</div>
      <ul className="nav-list">
        <NavLink to="/">start</NavLink>
        {user && <NavLink to="/dashboard">projects</NavLink>}
        {user && (
          <NavLink className="navlink-user" to="/user/">
            <span>{user.name}</span>
            <img className="nav-avatar" src={user.img} alt={user.name} />
          </NavLink>
        )}

        {!user ? (
          <NavLink to="/login">Log in</NavLink>
        ) : (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              setUser(false);
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
