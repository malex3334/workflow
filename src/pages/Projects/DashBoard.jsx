import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { timeStamp } from "../../utils/time";
import { v4 as uuidv4 } from "uuid";

export default function DashBoard() {
  const { id } = useParams();
  // const { data, loading } = useGlobalContext();
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);

  const renderTaskElement = (item) => {
    return (
      <div draggable className="single-task" key={item.taskID}>
        <li>{item.task}</li>
        <button
          className="del-btn"
          onClick={(e) => {
            handleDelete(item.taskID);
          }}
        >
          x
        </button>
      </div>
    );
  };

  // ### DELETE TASK

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setData((prev) => prev.filter((item) => item.taskID !== id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = (e) => {
    deleteTask(e);
    console.log(e);
  };

  // ### fetch POST tasks

  const fetchNewTask = async (newTask) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify(newTask),
      });
      console.log(response);
      console.log("spread", [...data]);
      setData([...data, newTask]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    const newTaskObj = {
      taskID: uuidv4(),
      projectID: id,
      task: "plan project",
      text: "some text etc.",
      status: "testing",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    console.log(id);
    fetchNewTask(newTaskObj);
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
  }, []);

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
                  renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">To do</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "todo") {
                  return renderTaskElement(task);
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
      <button onClick={handleAddTask}>New task test</button>
      <p>Created: {timeStamp(project.createdAt)}</p>
    </div>
  );
}
