import React, { useEffect, useState } from "react";
import { timeStamp } from "../../../utils/time";

export default function SingleTask({ task }) {
  console.log(task);
  // const [task, setTask] = useState();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchTask = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`/api/tasks/${taskID}`);
  //       const task = await response.json();
  //       setTask(task);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchTask();
  // }, []);

  return (
    <div className="singletask-container">
      <h2 className="title">{task.task}</h2>
      <div className="description">
        <h3 className="subtitle">description</h3>
        <p className="paragraph">{task.text}</p>
      </div>
      <p className="status">
        status:
        <span> {task.status}</span>
      </p>
      <p className="timestamp">created at: {timeStamp(task.createdAt)}</p>
      <p className="timestamp">last updated: {timeStamp(task.updatedAt)}</p>
    </div>
  );
}
