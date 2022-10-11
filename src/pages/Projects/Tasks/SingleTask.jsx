import React, { useEffect, useRef, useState } from "react";
import { timeStamp } from "../../../utils/time";
import {
  FaTrash,
  FaUserClock,
  FaUserEdit,
  FaWindowClose,
} from "react-icons/fa";
import NotLoggedIn from "../../../components/NotLoggedIn";
import useFetch from "../../../hooks/useFetch";
import Comment from "./CommentWrapper";
import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import { IoAddCircle } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import TimeReport from "./TimeReport";
import Loader from "../../../components/Loader";

const descr = { description: false, title: false };

export default function SingleTask({
  task,
  user,
  setShowModal,
  usersList,
  rerender,
  setRerender,
  taskLoading,
}) {
  const { descriptionRef } = useRef();
  const [edit, setEdit] = useState(descr);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState(task.task);
  const [description, setDescription] = useState(task.text);
  const [select, setSelect] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [commentsList, setCommentsList] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showTimeReport, setShowTimeReport] = useState(false);
  const [reportedTime, setReportedTime] = useState(task.reportedTime);
  const [estaminatedTime, setEstaminatedTime] = useState(task.estaminatedTime);

  const { deleteData, updateData } = useFetch();
  const {
    data: comments,
    loading: commentsLoading,
    rerender: commentsRerender,
    setRerender: setCommentsRerender,
  } = useFetch("comments/");
  const { data: users, loading: usersLoading } = useFetch("users/");

  const handeSaveUsers = (taskId, user) => {
    const result = user.map((single) => {
      return single.id;
    });
    // setAssignedUsers()
    updateData(taskId, "tasks", { users: result });
    setRerender(!rerender);
  };
  useEffect(() => {
    if (!usersLoading) {
      const result = users.users.filter(({ id }) => task.users.includes(id));
      setAssignedUsers(result);
    }
  }, [users, usersLoading]);

  const handleAssignUsers = (e, user) => {
    const result = assignedUsers.map((single) => {
      return single.id;
    });

    if (result.includes(user.id)) {
      return;
    } else setAssignedUsers([...assignedUsers, user]);
  };

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
  };

  if (!user) {
    return <NotLoggedIn />;
  }

  if (usersLoading) {
    return <Loader />;
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
              setShowDeleteModal(true);
              // handleDelete(task.id)
            }}
          >
            <FaTrash />
          </button>
          <button className="del-btn" onClick={() => setShowModal(false)}>
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
          <ul
            className="users-list users-list-width"
            style={{ padding: "0", height: "auto" }}
          >
            {/* TODO - ADD USERS => SHOW ALL USERS IN PROJECT */}
            {showAllUsers && usersList
              ? usersList.map((user) => {
                  return (
                    <li
                      className="user-mini row"
                      style={{ cursor: "pointer" }}
                      key={uuidv4()}
                      onClick={(e) => {
                        handleAssignUsers(e, user);
                      }}
                    >
                      <img
                        src={user.img}
                        className="user-img"
                        alt={user.name}
                      />
                      <p className="user-nick">{user.name}</p>
                    </li>
                  );
                })
              : ""}
          </ul>
          {/* show all users */}
          <div className="section-title">
            <FaUserEdit className="title-icon" />
            <h4>assigned users:</h4>
          </div>
          <ul className="users-list users-list-width">
            {assignedUsers && assignedUsers.length > 0
              ? assignedUsers?.map((user) => {
                  return (
                    <li className="user-mini row">
                      <img
                        src={user.img}
                        className="user-img"
                        alt={user.name}
                        onClick={() => {
                          showAllUsers &&
                            setAssignedUsers((prev) =>
                              prev.filter((single) => single.id !== user.id)
                            );
                        }}
                      />
                      <p className="user-nick">{user.name}</p>
                    </li>
                  );
                })
              : "no users"}
            {!showAllUsers ? (
              <button>
                <IoAddCircle
                  className="add-btn small"
                  onClick={() => setShowAllUsers(true)}
                />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  handeSaveUsers(task.id, assignedUsers);
                  setShowAllUsers(false);
                }}
                className="add-btn"
                style={{ fontSize: "1.5rem" }}
              >
                save
              </button>
            )}
          </ul>
          <div className="worktime">
            <div className="section-title">
              <FaUserClock className="title-icon" />
              <h4>time tracking</h4>
            </div>
            <div
              className="time-progressbar"
              onClick={() => {
                setShowTimeReport(true);
              }}
            >
              <div
                className="time-reported"
                style={{
                  width: (reportedTime / estaminatedTime) * 100 + "%",
                }}
              ></div>
            </div>
            <div className="time-reported-info">
              {reportedTime}h logged / {estaminatedTime}h left
            </div>
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

      <Modal showModal={showTimeReport} setShowModal={setShowTimeReport}>
        <TimeReport
          // reportedTime={task.reportedTime}
          reportedTime={reportedTime}
          setReportedTime={setReportedTime}
          task={task}
          // estaminatedTime={task.estaminatedTime}
          estaminatedTime={estaminatedTime}
          setEstaminatedTime={setEstaminatedTime}
          rerender={rerender}
          setRerender={setRerender}
          setShowModal={setShowTimeReport}
        />
      </Modal>
    </div>
  );
}
