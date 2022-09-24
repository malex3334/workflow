import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";

export default function ProjectList() {
  const { data, user } = useGlobalContext();
  const [filteredData, setFilteredData] = useState({});

  const { data: relations, loading } = useFetch("relations");

  const filter = () => {
    let newArray = [];

    relations.relations &&
      relations.relations.length > 0 &&
      relations.relations.map((item) => {
        if (item.users.includes(user.id)) {
          data.projects.map((project) => {
            if (project.id === item.projectID) {
              newArray.push(project);
              console.log("newarray:", newArray);
              return newArray;
            }
          });
        }
      });

    return newArray;
  };

  console.log("filter(): ", filter());
  console.log("state", filteredData);
  useEffect(() => {
    setFilteredData(filter());
  }, [loading]);

  return loading ? (
    <Loader />
  ) : (
    <div className="project-list-container">
      <h2>Your projects:</h2>

      <ul className="project-list">
        {filteredData &&
          filteredData !== "undefined" &&
          filteredData.length > 0 &&
          filteredData.map((project, index) => {
            return (
              <div key={project.id} className="project-list-item">
                <NavLink to={`projects/${project.id}`}>
                  <h3>
                    {index + 1} {project.name}
                  </h3>
                </NavLink>
                <p>{project.description}</p>
              </div>
            );
          })}
      </ul>
    </div>
  );
}
