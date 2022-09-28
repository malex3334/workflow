import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { timeStamp } from "../../utils/time";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../components/Modal";
import TaskForm from "./Tasks/TaskForm";
import SingleTask from "./Tasks/SingleTask";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";

export default function DashBoard() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [taskID, setTaskID] = useState({});
  const { user } = useGlobalContext();
  const [usersList, setUsersList] = useState([]);
  const { postData } = useFetch();
  const { data: fetching, loading, setLoading } = useFetch("relations");
  const {
    data: tasks,
    setData: setTasks,
    loading: loadingTasks,
    rerender,
    setRerender,
  } = useFetch("tasks/");

  const getUsers = (data) => {
    const filter = data.filter((relation) => relation.projectID === id);
    const users = filter[0]?.users;
    return users;
  };

  useEffect(() => {
    if (loading === false) {
      console.log("123", fetching.relations);
      const newUsersList = getUsers(fetching.relations);
      setUsersList(newUsersList);
    }
  }, [loading]);

  const handleAddTask = (newTaskObj) => {
    // fetchNewTask(newTaskObj);
    postData("tasks/", newTaskObj);
    setRerender(!rerender);
    setShowModal(false);
  };

  const {
    data: projects,
    setData: setProjects,
    loading: projectsLoader,
  } = useFetch(`projects/${id}`);

  const test = () => {
    let newTasks = [];
    tasks.tasks &&
      tasks.tasks.length > 0 &&
      tasks.tasks.map((task) => {
        if (task.projectID === id) {
          newTasks.push(task);
        }
      });
    return newTasks;
  };

  const handleOpenTask = async (item) => {
    setTaskID(item);
    setShowTask(true);
  };

  const renderTaskElement = (item) => {
    return (
      <div
        draggable
        className="single-task"
        key={item.id}
        onClick={(e) => {
          // setShowTask(true);
          handleOpenTask(item);
          console.log(item);
        }}
      >
        <div className="task-header">
          <h4
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              // setShowTask(true);
              handleOpenTask(item);
              console.log(item);
            }}
          >
            {item.task}
          </h4>
        </div>
        <p>{item.text}</p>
      </div>
    );
  };
  useEffect(() => {
    setData(test());
  }, [tasks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>{projects.project.name}</h2>
      <p>{projects.project.description}</p>

      <ul className="users-list" key={user}>
        <span>Users IDs:</span>
        {usersList &&
          usersList.map((user) => {
            return <li>{user},</li>;
          })}
      </ul>

      <div className="dashboard-container">
        <div className="single-board">
          <h3 className="board-title">Backlog</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "backlog") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">To do</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task, index) => {
                if (task.status === "todo") {
                  return renderTaskElement(task, index);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">Progress</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "progress") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">Testing</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "testing") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">To deploy</h3>
          <ul className="tasks-list">
            {data &&
              data.map((task) => {
                if (task.status === "deploy") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">Done</h3>
          <ul className="tasks-list">
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
      {/* <button onClick={handleAddTask}>New task test</button> */}
      <button className="add-btn" onClick={() => setShowModal(true)}>
        New task test
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TaskForm handleAddTask={handleAddTask} id={id} />
      </Modal>
      <Modal showModal={showTask} setShowModal={setShowTask}>
        <SingleTask
          task={taskID}
          user={user}
          showModal={showTask}
          setShowModal={setShowTask}
          data={data}
          setData={setData}
        />
      </Modal>
      <p>Created: {timeStamp(projects.project.createdAt)}</p>
    </div>
  );
}
