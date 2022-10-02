import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";
import { IoAddCircle } from "react-icons/io5";
import { FaEdit, FaReddit, FaTrash } from "react-icons/fa";
import { timeStamp } from "../../utils/time";

export default function ProjectList() {
  const { user } = useGlobalContext();
  const [filteredData, setFilteredData] = useState({});

  //  fetch all projects
  const { data, setData, loading, setLoading } = useFetch("projects");

  // fetch all relations
  const { data: relations, setData: setRelations } = useFetch("relations");

  // check users projects
  const filter = () => {
    let newArray = [];
    relations.relations &&
      relations.relations.length > 0 &&
      relations.relations.map((item) => {
        if (item.users.includes(user.id)) {
          data.projects.map((project) => {
            if (project.id === item.project) {
              newArray.push(project);
              return newArray;
            }
          });
        }
      });

    return newArray;
  };

  // delete project
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      setFilteredData(filteredData.filter((project) => project.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFilteredData(filter());
  }, [setData, data, relations]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="project-list-container">
      <h2 className="project-list-title">Your projects:</h2>

      <ul className="project-list">
        {filteredData &&
          filteredData !== "undefined" &&
          filteredData.length > 0 &&
          filteredData.map((project, index) => {
            return (
              <div key={project.id} className="project-list-item">
                <div className="project-item-header">
                  <NavLink to={`projects/${project.id}`}>
                    <h3>{project.name}</h3>
                  </NavLink>
                  <div className="btns">
                    {/* #### edit project */}
                    {user.type === "company" && (
                      <button className="edit-btn">
                        <NavLink to={`/editproject/${project.id}`}>
                          <FaEdit className="del-btn" />
                        </NavLink>
                      </button>
                    )}
                    {user.type === "company" && (
                      <button
                        // className="del-btn"
                        onClick={(e) => handleDelete(project.id)}
                      >
                        <FaTrash className="del-btn" />
                      </button>
                    )}
                  </div>
                </div>
                <NavLink to={`projects/${project.id}`}>
                  {project.img ? (
                    <img
                      className="image"
                      src={project.img ? project.img : ""}
                      alt=""
                    />
                  ) : (
                    <div className="noimage"></div>
                  )}

                  <p className="description">{project.description}</p>
                </NavLink>
                <p className="project-timestamp">
                  {timeStamp(project.createdAt)}
                </p>
              </div>
            );
          })}
      </ul>

      {filteredData.length === 0 && <div>No projects to show</div>}
      {user.type === "company" && (
        // <button onClick={() => postNewProject()}>Add new Project</button>
        <button>
          <NavLink to="/newproject">
            <IoAddCircle className="add-btn" />
          </NavLink>
        </button>
      )}
    </div>
  );
}
