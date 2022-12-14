import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";
import { IoAddCircle } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { timeStamp } from "../../utils/time";
import NotLoggedIn from "../../components/NotLoggedIn";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import Button from "../../components/Button";

export default function ProjectList() {
  const { user } = useGlobalContext();
  const [filteredData, setFilteredData] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //  fetch all projects
  const { data, setData, loading } = useFetch("projects");

  // fetch all relations
  const { data: relations } = useFetch("relations");

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
            } else return null;
          });
        } else return null;
      });

    return newArray;
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      setFilteredData(filteredData.filter((project) => project.id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFilteredData(filter());
  }, [setData, data, relations]);

  if (!user) {
    return <NotLoggedIn />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="project-list-container">
      <h2 className="project-list__title">Your projects:</h2>

      <ul className="project-list">
        {filteredData &&
          filteredData.length > 0 &&
          filteredData.map((project) => {
            return (
              <div key={project.id} className="project-list__item">
                <div className="project-item__header">
                  <NavLink to={`projects/${project.id}`}>
                    <h3>{project.name}</h3>
                  </NavLink>
                  <div className="project-list__btns">
                    {user.type === "company" && (
                      <Button classes="edit-btn">
                        <NavLink to={`/editproject/${project.id}`}>
                          <FaEdit className="del-btn" />
                        </NavLink>
                      </Button>
                    )}
                    {user.type === "company" && (
                      <Button
                        onClick={(e) => {
                          setShowDeleteModal(true);
                        }}
                      >
                        <FaTrash className="del-btn" />
                      </Button>
                    )}
                  </div>
                </div>
                <NavLink to={`projects/${project.id}`}>
                  {project.img ? (
                    <img
                      className="project-list__image"
                      src={project.img ? project.img : ""}
                      alt=""
                    />
                  ) : (
                    <div className="project-list__noimage">
                      <span>no image</span>
                    </div>
                  )}

                  <p className="project-list__description">
                    {project.description}
                  </p>
                </NavLink>
                <p className="project__timestamp">
                  {timeStamp(project.createdAt)}
                </p>

                <Modal
                  showModal={showDeleteModal}
                  setShowModal={setShowDeleteModal}
                >
                  <DeleteModal
                    setShowDeleteModal={setShowDeleteModal}
                    id={project.id}
                    handleDelete={handleDelete}
                  />
                </Modal>
              </div>
            );
          })}
      </ul>

      {filteredData.length === 0 && <div>No projects to show</div>}
      {user.type === "company" && (
        <Button classes="btn-hover-container">
          <NavLink to="/newproject">
            <IoAddCircle className="add-btn" />
          </NavLink>
          <div className="btn-text">Add new project</div>
        </Button>
      )}
    </div>
  );
}
