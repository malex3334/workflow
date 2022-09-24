import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

export default function DashBoard() {
  const { id } = useParams();
  // const { data, loading } = useGlobalContext();
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/projects/${id}`);

        const projects = await response.json();
        setProject(projects.projects);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const timeStamp = (timestamp) => {
    var date = new Date(timestamp);
    console.log(date);
    return date.toString();
  };

  // timeStamp(1664055041907);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      {/* <p>Created:{project.createdAt}</p> */}
      <p>Created: {timeStamp(project.createdAt)}</p>
    </div>
  );

  return (
    <div className="dashboard">
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
      </div>
      <div className="single-board">
        <h3 className="board-title">Done</h3>
      </div>
    </div>
  );
}
