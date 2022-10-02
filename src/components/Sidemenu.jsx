import React from "react";
import { useGlobalContext } from "../context";
import useFetch from "../hooks/useFetch";

export default function Sidemenu() {
  const { user, setUser } = useGlobalContext();
  const { name, id, login, type, img } = user;
  const { data } = useFetch("relations/");

  return (
    <aside className="aside-nav">
      {user && (
        <>
          <img style={{ width: "5rem" }} src={img} alt="" />
          <h2>{name}</h2>
          <ul>
            <li>{login}</li>
            <li>type: {type}</li>
            <li>user id: {id}</li>
          </ul>
          <div className="projects-list">
            <h3>Your projects:</h3>
          </div>
        </>
      )}
    </aside>
  );
}
