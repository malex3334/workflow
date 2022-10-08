import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TaskForm from "./Tasks/TaskForm";
import SingleTask from "./Tasks/SingleTask";
import useFetch from "../../hooks/useFetch";
import NotLoggedIn from "../../components/NotLoggedIn";
import { useGlobalContext } from "../../context";
import { convertPriority } from "../../utils/icons";
import { IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Error from "../../components/Error";

const getUsers = (data, id) => {
  const filter = data.filter((relation) => relation.project === id);
  const result = filter.map((single) => {
    let users = single.users;
    return (users = single.users);
  });
  return result;
};

const filter = (tasks, id) => {
  let newTasks = [];
  tasks.tasks &&
    tasks.tasks.length > 0 &&
    tasks.tasks.map((task) => {
      if (task.projectId === id) {
        newTasks.push(task);
      }
    });
  return newTasks;
};

export default function Dashboard() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [taskID, setTaskID] = useState({});
  const { user } = useGlobalContext();
  const [usersList, setUsersList] = useState([]);
  const { postData, updateData } = useFetch();
  const { data: fetching, loading, setLoading, error } = useFetch("relations");
  const { data: tasks, rerender, setRerender } = useFetch("tasks/");
  const { data: projects } = useFetch(`projects/${id}`);
  const { data: users, loading: usersLoading } = useFetch("users/");
  const [draggedItem, setDraggedItem] = useState();

  useEffect(() => {
    if (!loading) {
      const newUsersList = getUsers(fetching.relations, id);
      const result = users.users.filter(({ id }) =>
        newUsersList[0].includes(id)
      );
      setUsersList(result);
    }
  }, [loading, usersLoading]);

  const handleAddTask = (newTaskObj) => {
    postData("tasks/", newTaskObj);
    setRerender(!rerender);
    setShowModal(false);
  };

  const handleOpenTask = async (item) => {
    setTaskID(item);
    setShowTask(true);
  };

  const renderTaskElement = (item) => {
    return (
      <div
        onDrag={(e) => setDraggedItem(item)}
        draggable
        className="single-task"
        key={item.id}
        onClick={(e) => {
          handleOpenTask(item);
        }}
      >
        <div className="task-header">
          <h4
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              handleOpenTask(item);
            }}
          >
            {item.task}
          </h4>
          <p className="priority">{convertPriority(item.priority)}</p>
        </div>
        <p>
          {item.text.length > 200 ? item.text.slice(0, 300) + "..." : item.text}
        </p>
      </div>
    );
  };
  useEffect(() => {
    setData(filter(tasks, id));
  }, [tasks]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <NotLoggedIn />;
  }

  if (error) {
    <Error />;
  }

  return (
    <div className="main-container">
      <span className="dashboard-navi">
        <NavLink to="/dashboard">projects / </NavLink>
        <span>{projects.project.name}</span>
      </span>
      <div className="main-header">
        <img src={projects.project.img} className="image" alt="" />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <h2>{projects.project.name}</h2>
            {user.type === "company" && (
              <button className="edit-btn">
                <NavLink to={`/editproject/${projects.project.id}`}>
                  <FaEdit className="del-btn" style={{ fontSize: "2.5rem" }} />
                </NavLink>
              </button>
            )}
          </div>
          <p>{projects.project.description} </p>
          <ul className="users-list" key={user}>
            <span>Assigned users:</span>
            {usersList &&
              usersList.map((user) => {
                if (user === "undefined") return;
                const { login, img, id } = user;
                return (
                  <div className="user-mini" key={id}>
                    <img className="user-img" src={img} alt="" />
                    <h5 className="user-nick">{login}</h5>
                  </div>
                );
              })}
          </ul>
          <div className="btn">
            <button
              className="btn-hover-container"
              onClick={() => setShowModal(true)}
            >
              <IoAddCircle className="add-btn" />
              <span className="btn-text">Add new task</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        <div
          id="backlog"
          className="single-board"
          onDragLeave={(e) => {
            if (e.target.id !== "") {
              updateData(draggedItem.id, "tasks", {
                status: e.target.id,
              });
              setRerender(!rerender);
            }
          }}
        >
          <h3 id="backlog" className="board-title">
            Backlog
          </h3>
          <ul id="backlog" className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "backlog") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div
          id="todo"
          className="single-board"
          onDragLeave={(e) => {
            if (e.target.id !== "") {
              updateData(draggedItem.id, "tasks", {
                status: e.target.id,
              });
              setRerender(!rerender);
            }
          }}
        >
          <h3 id="todo" className="board-title">
            To do
          </h3>
          <ul id="todo" className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task, index) => {
                if (task.status === "todo") {
                  return renderTaskElement(task, index);
                }
              })}
          </ul>
        </div>
        <div
          id="progress"
          className="single-board"
          onDragLeave={(e) => {
            if (e.target.id !== "") {
              updateData(draggedItem.id, "tasks", {
                status: e.target.id,
              });
              setRerender(!rerender);
            }
          }}
        >
          <h3 id="progress" className="board-title">
            Progress
          </h3>
          <ul id="progress" className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "progress") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div
          id="testing"
          className="single-board"
          onDragLeave={(e) => {
            if (e.target.id !== "") {
              updateData(draggedItem.id, "tasks", {
                status: e.target.id,
              });
              setRerender(!rerender);
            }
          }}
        >
          <h3 id="testing" className="board-title">
            Testing
          </h3>
          <ul id="testing" className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "testing") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div
          id="deploy"
          className="single-board"
          onDragLeave={(e) => {
            if (e.target.id !== "") {
              updateData(draggedItem.id, "tasks", {
                status: e.target.id,
              });
              setRerender(!rerender);
            }
          }}
        >
          <h3 id="deploy" className="board-title">
            To deploy
          </h3>
          <ul id="deploy" className="tasks-list">
            {data &&
              data.map((task) => {
                if (task.status === "deploy") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div
          id="done"
          className="single-board"
          onDragLeave={(e) => {
            if (e.target.id !== "") {
              updateData(draggedItem.id, "tasks", {
                status: e.target.id,
              });
              setRerender(!rerender);
            }
          }}
        >
          <h3 id="done" className="board-title">
            Done
          </h3>
          <ul id="done" className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "done") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TaskForm handleAddTask={handleAddTask} id={id} />
      </Modal>
      <Modal showModal={showTask} setShowModal={setShowTask}>
        <SingleTask
          usersList={usersList}
          task={taskID}
          user={user}
          rerender={rerender}
          setRerender={setRerender}
          showModal={showTask}
          setShowModal={setShowTask}
          data={data}
          setData={setData}
        />
      </Modal>
    </div>
  );
}
