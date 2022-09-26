import React, { useEffect, useState } from "react";
import { timeStamp } from "../../../utils/time";
import { FaTrash, FaWindowClose } from "react-icons/fa";

export default function SingleTask({ task, user }) {
  console.log(user);
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
      <header className="header">
        <h2 className="title">{task.task}</h2>
        <nav className="navigation">
          <button className="nav-btn">
            <FaTrash />
          </button>
          <button className="nav-btn">
            <FaWindowClose />
          </button>
        </nav>
      </header>
      <div className="body">
        <div className="left">
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
        <div className="right"></div>
      </div>
      <div className="comments">
        <label htmlFor="comments">comments:</label>
        <div className="comment-input-container">
          <img className="user-avatar" src={user.img} alt="" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            placeholder="enter comment"
          />
        </div>
        <button className="submit">submit</button>
      </div>
    </div>
  );
}
