import React, { useEffect, useRef, useState } from "react";
import { timeStamp } from "../../../utils/time";
import { FaTrash, FaWindowClose } from "react-icons/fa";
import NotLoggedIn from "../../../components/NotLoggedIn";
import useFetch from "../../../hooks/useFetch";
import Comment from "./Comment";
import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";

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
  const { descriptionRef } = useRef();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(descr);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState(task.task);
  const [description, setDescription] = useState(task.text);
  const [select, setSelect] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [commentsList, setCommentsList] = useState([]);
  const { deleteData, updateData } = useFetch();
  const {
    data: comments,
    loading: commentsLoading,
    rerender: commentsRerender,
    setRerender: setCommentsRerender,
  } = useFetch("comments/");
  const { data: users, loading: usersLoading } = useFetch("users/");

  useEffect(() => {
    if (!commentsLoading) {
      const result = comments.comments.filter(
        (comment) => comment.taskId === task.id
      );
      setCommentsList(result);
    }
  }, [commentsLoading, rerender]);

  const handleDelete = (id) => {
    deleteData(id, "tasks");
    setRerender(!rerender);
    setShowModal(false);
    setShowDeleteModal(false);
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
                setShowModal(false);
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
            {title ? `${title}` : "no title"}
          </h2>
        )}
        <nav className="navigation">
          <button
            className="del-btn"
            onClick={(e) => {
              // handleDelete(task.id);
              setShowDeleteModal(true);
            }}
          >
            <FaTrash />
          </button>
          <button className="del-btn" onClick={() => setShowModal(false)}>
            {/* <button className="nav-btn" onClick={() => setShowModal(false)}> */}
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
                  ref={descriptionRef}
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
                    setShowModal(false);
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
        </div>
        <div className="right">
          <div className="status">
            <label htmlFor="">Status:</label>
            {/* <select onChange={updateTask(task.id, {})}> */}
            <select
              value={select}
              onChange={(e) => {
                updateData(task.id, "tasks", {
                  status: e.target.value,
                  updatedAt: Date.now(),
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
          <div className="priority">
            <label htmlFor="">Priority:</label>

            <select
              value={priority}
              onChange={(e) => {
                updateData(task.id, "tasks", {
                  priority: e.target.value,
                  updatedAt: Date.now(),
                });
                setRerender(!rerender);
                setPriority(e.target.value);
              }}
            >
              <option value="low">low</option>
              <option value="normal">normal</option>
              <option value="high">high</option>
              <option value="very high">very high</option>
            </select>
          </div>
          <div className="timestamps">
            <p className="timestamp">created at: {timeStamp(task.createdAt)}</p>
            <p className="timestamp">modified: {timeStamp(task.updatedAt)}</p>
          </div>
        </div>
      </div>
      <Comment
        commentsList={commentsList}
        loading={commentsLoading}
        user={user}
        task={task}
        rerender={commentsRerender}
        setRerender={setCommentsRerender}
      />
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={task.id}
          handleDelete={handleDelete}
        />
      </Modal>
    </div>
  );
}
