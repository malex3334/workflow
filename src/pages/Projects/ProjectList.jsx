import { Server } from "miragejs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";

export default function ProjectList() {
  const { setData, data, user } = useGlobalContext();
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

  useEffect(() => {
    setFilteredData(filter());
  }, [loading]);

  const postNewProject = async () => {
    const newProject = {
      id: "321",
      name: "123",
      description: "321",
      users: ["1", "3"],
    };
    try {
      const response = await fetch(`api/projects/`, {
        method: "POST",
        body: JSON.stringify(newProject),
      });
      // const response = await fetch(`${url}projects`);
      const test = await response.json();
      console.log(test);
      setData([...data.projects, { ...newProject }]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`api/projects/${id}`, {
        method: "DELETE",
      });
      setData(data.projcets.filter((f) => f.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
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
                {user.type === "company" && (
                  <button onClick={(e) => handleDelete(project.id)}>
                    delete
                  </button>
                )}
              </div>
            );
          })}
      </ul>

      {filteredData.length === 0 && <div>No projects to show</div>}
      {user.type === "company" && (
        <button onClick={() => postNewProject()}>Add new Project</button>
      )}
    </div>
  );
}
