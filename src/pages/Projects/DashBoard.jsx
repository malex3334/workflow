import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { timeStamp } from "../../utils/time";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../components/Modal";
import TaskForm from "./Tasks/TaskForm";
import SingleTask from "./Tasks/SingleTask";
import { useGlobalContext } from "../../context";

export default function DashBoard() {
  const { id } = useParams();
  // const { data, loading } = useGlobalContext();
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [taskID, setTaskID] = useState({});
  const { user } = useGlobalContext();

  // ### DELETE TASK
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      setData((prev) => prev.filter((item) => item.id !== id));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = (e) => {
    deleteTask(e);
  };

  // ### fetch POST tasks
  const fetchNewTask = async (newTask) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify(newTask),
      });

      setData([...data, newTask]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddTask = (newTaskObj) => {
    fetchNewTask(newTaskObj);
    setShowModal(false);
  };

  // ### fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tasks/`);
        const tasks = await response.json();

        setTasks(tasks);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [setData]);

  // ### fetch projects
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${id}`);
        const projects = await response.json();
        setProject(projects.project);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

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
    console.log(item);

    // return (
    //   <Modal showModal={showTask} setShowModal={setShowTask}>
    //     <div>123</div>
    //   </Modal>
    // );
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

          <button
            className="del-btn"
            onClick={(e) => {
              handleDelete(item.id);
            }}
          >
            x
          </button>
        </div>
        <p>{item.text}</p>
      </div>
    );
  };
  useEffect(() => {
    setData(test());
  }, [tasks]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
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
        <SingleTask task={taskID} user={user} />
      </Modal>
      <p>Created: {timeStamp(project.createdAt)}</p>
    </div>
  );
}
