import React, { useEffect, useState } from "react";
import { timeStamp } from "../../../utils/time";
import { FaTrash, FaWindowClose } from "react-icons/fa";

const descr = { description: false, title: false };

export default function SingleTask({
  task,
  user,
  setShowModal,
  data,
  setData,
  rerender,
  setRerender,
}) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(descr);
  const [title, setTitle] = useState(task.task);
  const [description, setDescription] = useState(task.text);

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

  const updateTask = async (id, updatedValue) => {
    setLoading(true);
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedValue),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setRerender(!rerender);
  };

  const handleDelete = (id) => {
    deleteTask(id);
    setShowModal(false);
  };

  return (
    <div className="singletask-container">
      <header className="header">
        {edit.title ? (
          <>
            <input
              className="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <button
              onClick={(prev) => {
                updateTask(task.id, { task: title, updatedAt: Date.now() });
                setEdit({ ...prev, title: false });
              }}
            >
              save
            </button>
          </>
        ) : (
          <h2
            className="title"
            onClick={(prev) => {
              setEdit({ ...prev, title: true });
            }}
          >
            {/* {task.task} */}
            {title}
          </h2>
        )}
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
            {edit.description ? (
              <>
                <textarea
                  className="paragraph"
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <button
                  onClick={(prev) => {
                    setEdit({ ...prev, description: false });
                    updateTask(task.id, {
                      text: description,
                      updatedAt: Date.now(),
                    });
                  }}
                >
                  save
                </button>
              </>
            ) : (
              <p
                className="paragraph"
                onClick={(prev) => {
                  setEdit({ ...prev, description: true });
                }}
              >
                {description}
              </p>
            )}
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
