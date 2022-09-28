import React, { useEffect, useState } from "react";
import { timeStamp } from "../../../utils/time";
import { FaTrash, FaWindowClose } from "react-icons/fa";
import NotLoggedIn from "../../../components/NotLoggedIn";

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
  const [select, setSelect] = useState(task.status);

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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setRerender(!rerender);
  };

  const handleDelete = (id) => {
    deleteTask(id);
    setShowModal(false);
  };

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="singletask-container">
      <header className="header">
        {edit.title ? (
          <form>
            <input
              className="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onBlur={(prev) => {
                setEdit({ ...prev, title: false });
                updateTask(task.id, {
                  task: title,
                  updatedAt: Date.now(),
                });
              }}
            ></input>
            <button
              className="btn-save"
              onClick={(prev) => {
                updateTask(task.id, { task: title, updatedAt: Date.now() });
                setEdit({ ...prev, title: false });
              }}
            >
              save
            </button>
            <button
              className="btn-cancel"
              onClick={(prev) => {
                setEdit({ ...prev, title: false });
              }}
            >
              cancel
            </button>
          </form>
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
              <form>
                <textarea
                  onBlur={(prev) => {
                    setEdit({ ...prev, description: false });
                    updateTask(task.id, {
                      text: description,
                      updatedAt: Date.now(),
                    });
                  }}
                  className="description-input"
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <button
                  className="btn-save"
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
                <button
                  className="btn-cancel"
                  onClick={(prev) => {
                    setEdit({ ...prev, description: false });
                  }}
                >
                  cancel
                </button>
              </form>
            ) : (
              <p
                className="paragraph"
                onClick={(prev) => {
                  setEdit({ ...prev, description: true });
                }}
              >
                {description ? `${description}` : "no description yet"}
              </p>
            )}
          </div>
          <div className="status">
            <label htmlFor="">Status:</label>
            {/* <select onChange={updateTask(task.id, {})}> */}
            <select
              value={select}
              onChange={(e) => {
                updateTask(task.id, { status: e.target.value });
                setSelect(e.target.value);
              }}
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To do</option>
              <option value="progress">Progress</option>
              <option value="testing">Testing</option>
              <option value="deploy">To deploy</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="timestamps">
            <p className="timestamp">created at: {timeStamp(task.createdAt)}</p>
            <p className="timestamp">modified: {timeStamp(task.updatedAt)}</p>
          </div>
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
