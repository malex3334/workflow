import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const tasks = [
  {
    taskID: "99",
    projectID: "2",
    task: "finish project",
    text: "some text etc.",
    status: "done",
  },
  {
    taskID: "89",
    projectID: "2",
    task: "start",
    text: "some text etc.",
    status: "done",
  },
  {
    taskID: "94",
    projectID: "2",
    task: "plan project",
    text: "some text etc.",

    status: "testing",
  },
];

export default function DashBoard() {
  const { id } = useParams();
  // const { data, loading } = useGlobalContext();
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  const test = () => {
    let newTasks = [];
    tasks &&
      tasks.map((task) => {
        if (task.projectID === id) {
          console.log("test", task);
          newTasks.push(task);
          console.log(newTasks);
        }
      });
    return newTasks;
  };

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

  console.log(test());
  useEffect(() => {
    setData(test());
  }, [id]);

  console.log(data);

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
              data.map((task) => {
                if (task.status === "done") {
                  return <li key={task.id}>{task.task}</li>;
                }
              })}
          </ul>
        </div>
      </div>
      <p>Created: {timeStamp(project.createdAt)}</p>
    </div>
  );
}
