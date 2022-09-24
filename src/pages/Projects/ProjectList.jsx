import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";

export default function ProjectList() {
  const { data, loading } = useGlobalContext();

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      <h2>your projects:</h2>
      <ul>
        {data &&
          data.projects.map((project) => {
            return (
              <NavLink to={`projects/${project.id}`} key={project.id}>
                {project.name}
              </NavLink>
            );
          })}
      </ul>
    </div>
  );
}
