import React, { useEffect, useState } from "react";
import { timeStamp } from "../../../utils/time";
import { FaTrash, FaWindowClose } from "react-icons/fa";

export default function SingleTask({
  task,
  user,
  setShowModal,
  data,
  setData,
}) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

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

  const handleDelete = (id) => {
    deleteTask(id);
    setShowModal(false);
    console.log(id);
  };

  return (
    <div className="singletask-container">
      <header className="header">
        <h2 className="title">{task.task}</h2>
        <nav className="navigation">
          <button
            className="nav-btn"
            onClick={(e) => {
              handleDelete(task.id);
            }}
          >
            <FaTrash />
          </button>
          <button className="nav-btn" onClick={() => setShowModal(false)}>
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
