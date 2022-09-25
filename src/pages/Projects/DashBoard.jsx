import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

// const tasks = [
//   {
//     taskID: "99",
//     projectID: "2",
//     task: "finish project",
//     text: "some text etc.",
//     status: "done",
//   },
//   {
//     taskID: "89",
//     projectID: "2",
//     task: "start",
//     text: "some text etc.",
//     status: "done",
//   },
//   {
//     taskID: "94",
//     projectID: "2",
//     task: "plan project",
//     text: "some text etc.",

//     status: "testing",
//   },
// ];

export default function DashBoard() {
  const { id } = useParams();
  // const { data, loading } = useGlobalContext();
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tasks/`);
        const tasks = await response.json();

        setTasks(tasks);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

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
    console.log("33333", tasks.tasks);
    let newTasks = [];
    tasks.tasks &&
      tasks.tasks.length > 0 &&
      tasks.tasks.map((task) => {
        console.log("single", task);
        if (task.projectID === id) {
          newTasks.push(task);
        }
      });
    return newTasks;
  };

  useEffect(() => {
    setData(test());
  }, [tasks]);

  const timeStamp = (timestamp) => {
    var date = new Date(timestamp);
    return date.toString();
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <div className="dashboard-container">
        <div className="single-board">
          <h3 className="board-title">Backlog</h3>
        </div>
        <div className="single-board">
          <h3 className="board-title">To do</h3>
        </div>
        <div className="single-board">
          <h3 className="board-title">In progress</h3>
        </div>
        <div className="single-board">
          <h3 className="board-title">Testing</h3>
        </div>
        <div className="single-board">
          <h3 className="board-title">To deploy</h3>
          {data &&
            data.map((task) => {
              if (task.status === "testing") {
                return <li key={task.id}>{task.task}</li>;
              }
            })}
        </div>
        <div className="single-board">
          <h3 className="board-title">Done</h3>
          <ul>
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "done") {
                  return (
                    <li onClick={(e) => console.log(task)} key={task.id}>
                      {task.task}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
      <p>Created: {timeStamp(project.createdAt)}</p>
    </div>
  );
}
