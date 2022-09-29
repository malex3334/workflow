import React, { useEffect, useState } from "react";
import { timeStamp } from "../../../utils/time";
import { FaTrash, FaWindowClose } from "react-icons/fa";
import NotLoggedIn from "../../../components/NotLoggedIn";
import useFetch from "../../../hooks/useFetch";

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
  const { deleteData, updateData } = useFetch();

  const handleDelete = (id) => {
    deleteData(id, "tasks");
    setRerender(!rerender);
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
                updateData(task.id, "tasks", {
                  task: title,
                  updatedAt: Date.now(),
                });
                setRerender(!rerender);
              }}
            ></input>
            <button
              className="btn-save"
              onClick={(prev) => {
                setEdit({ ...prev, title: false });
                updateData(task.id, "tasks", {
                  task: title,
                  updatedAt: Date.now(),
                });
                setRerender(!rerender);
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
                    updateData(task.id, "tasks", {
                      text: description,
                      updatedAt: Date.now(),
                    });
                    setRerender(!rerender);
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
                    updateData(task.id, "tasks", {
                      text: description,
                      updatedAt: Date.now(),
                    });
                    setRerender(!rerender);
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
                updateData(task.id, "tasks", {
                  status: e.target.value,
                });
                setRerender(!rerender);
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
