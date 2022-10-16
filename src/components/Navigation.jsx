import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const { user, setUser } = useGlobalContext();
  let navigate = useNavigate();

  //           className={({ isActive }) => (isActive ? "active" : "inactive")}

  return (
    <nav className="nav">
      <div className="logo">
        <a href="/">My Arij</a>
      </div>
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
