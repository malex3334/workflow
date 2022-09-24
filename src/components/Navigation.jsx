import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Navigation() {
  const { user, setUser } = useGlobalContext();
  console.log(user);

  return (
    <nav className="nav">
      <div className="">My Arij</div>
      <ul className="nav-list">
        <NavLink to="/">start</NavLink>
        {user && <NavLink to="/dashboard">dashboard</NavLink>}
        {user && (
          <NavLink to="/user/">
            <span>{user.name}</span>
            <span>{user.img}</span>
          </NavLink>
        )}

        {!user ? (
          <NavLink to="/login">Log in</NavLink>
        ) : (
          <li
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
