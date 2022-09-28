import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { timeStamp } from "../../utils/time";
import Modal from "../../components/Modal";
import TaskForm from "./Tasks/TaskForm";
import SingleTask from "./Tasks/SingleTask";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";
import NotLoggedIn from "../../components/NotLoggedIn";

const getUsers = (data, id) => {
  const filter = data.filter((relation) => relation.projectID === id);
  const users = filter[0]?.users;
  return users;
};

const filter = (tasks, id) => {
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
  const { data: tasks, rerender, setRerender } = useFetch("tasks/");
  const { data: projects } = useFetch(`projects/${id}`);

  useEffect(() => {
    if (loading === false) {
      const newUsersList = getUsers(fetching.relations, id);
      setUsersList(newUsersList);
    }
  }, [loading]);

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
        </div>
        <p>{item.text}</p>
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
          rerender={rerender}
          setRerender={setRerender}
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
