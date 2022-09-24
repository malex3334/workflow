import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";

export default function ProjectList() {
  const { data, loading, user } = useGlobalContext();
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const myArrayFiltered = data.projects.filter((el) => {
      return user.projects.some((f) => {
        return f.projectID === el.id && f.projectID === el.id;
      });
    });
    setFilteredData(myArrayFiltered);
  }, []);

  console.log(filteredData);

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      <h2>your projects:</h2>

      <ul>
        {filteredData &&
          filteredData !== "undefined" &&
          filteredData.map((project, index) => {
            return (
              <NavLink to={`projects/${project.id}`} key={project.id}>
                {index + 1}
                {project.name}
              </NavLink>
            );
          })}
      </ul>
    </div>
  );
}
