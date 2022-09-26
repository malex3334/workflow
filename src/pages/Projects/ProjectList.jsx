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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [relations, setRelations] = useState([]);

  // const { data: relations, loading } = useFetch("relations");

  // fetch all projects
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/projects`);
        const data = await response.json();
        console.log("data", data);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  // fetch relations
  useEffect(() => {
    const fetchRelations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/relations`);
        const data = await response.json();
        setRelations(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error);
      }
    };
    fetchRelations();
  }, []);

  // check users projects
  const filter = () => {
    let newArray = [];
    relations.relations &&
      relations.relations.length > 0 &&
      relations.relations.map((item) => {
        if (item.users.includes(user.id)) {
          data.projects.map((project) => {
            if (project.id === item.projectID) {
              newArray.push(project);
              return newArray;
            }
          });
        }
      });

    return newArray;
  };

  // moved to new project form
  // const postNewProject = async () => {
  //   const newProject = {
  //     id: "10",
  //     name: "Jira clone project",
  //     description: "React practice project",
  //     createdAt: Date.now(),
  //   };
  //   try {
  //     const response = await fetch(`/api/projects/`, {
  //       method: "POST",
  //       body: JSON.stringify(newProject),
  //     });
  //     const test = await response.json();
  //     console.log(test);
  //     console.log([...filteredData, { ...newProject }]);
  //     setFilteredData([...filteredData, { ...newProject }]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleEdit = () => {};

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
                  <h3>{project.name}</h3>
                  {project.img ? (
                    <img
                      className="image"
                      src={project.img ? project.img : ""}
                      alt=""
                    />
                  ) : (
                    <div className="noimage"></div>
                  )}
                </NavLink>
                <p>{project.description}</p>

                <ul className="project-users">
                  Users IDs:
                  {/* {relations.relations !== "undefined" &&
                    relations.relations.length > 0 &&
                    relations.relations[project.id].users.map((user) => {
                      return <li>{user}, </li>;
                    })} */}
                </ul>
                {user.type === "company" && (
                  <button
                    className="del-btn"
                    onClick={(e) => handleDelete(project.id)}
                  >
                    delete
                  </button>
                )}
                {/* #### edit project */}
                {user.type === "company" && (
                  <button
                    className="edit-btn"
                    onClick={(e) => handleEdit(project.id)}
                  >
                    edit
                  </button>
                )}
              </div>
            );
          })}
      </ul>

      {filteredData.length === 0 && <div>No projects to show</div>}
      {user.type === "company" && (
        // <button onClick={() => postNewProject()}>Add new Project</button>
        <button className="add-btn">
          <NavLink className="navlink" to="/newproject">
            Add new Project
          </NavLink>
        </button>
      )}
    </div>
  );
}
