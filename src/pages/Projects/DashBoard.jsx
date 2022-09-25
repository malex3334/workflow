import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { timeStamp } from "../../utils/time";

export default function DashBoard() {
  const { id } = useParams();
  // const { data, loading } = useGlobalContext();
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);

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
  console.log("test", tasks);
  const handleAddTask = () => {
    const newTaskObj = {
      taskID: "94",
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
                  return (
                    <li
                      className="single-task"
                      onClick={(e) => console.log(task)}
                      key={task.id}
                    >
                      {task.task}
                    </li>
                  );
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
                  return (
                    <li
                      className="single-task"
                      onClick={(e) => console.log(task)}
                      key={task.id}
                    >
                      {task.task}
                    </li>
                  );
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
                  return (
                    <li
                      className="single-task"
                      onClick={(e) => console.log(task)}
                      key={task.id}
                    >
                      {task.task}
                    </li>
                  );
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
                  return (
                    <li
                      className="single-task"
                      onClick={(e) => console.log(task)}
                      key={task.id}
                    >
                      {task.task}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">To deploy</h3>
          <ul className="tasks-list">
            {data &&
              data.map((task) => {
                if (task.status === "testing") {
                  return (
                    <li className="single-task" key={task.id}>
                      {task.task}
                    </li>
                  );
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
                  return (
                    <li
                      className="single-task"
                      onClick={(e) => console.log(task)}
                      key={task.id}
                    >
                      {task.task}
                    </li>
                  );
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
