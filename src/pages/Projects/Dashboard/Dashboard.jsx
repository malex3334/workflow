import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import TaskForm from "../Tasks/TaskForm";
import SingleTask from "../Tasks/SingleTask";
import useFetch from "../../../hooks/useFetch";
import NotLoggedIn from "../../../components/NotLoggedIn";
import { useGlobalContext } from "../../../context";
import { convertPriority } from "../../../utils/icons";
import { IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Error from "../../../components/Error";
import { sliceDescription } from "../../../utils/helpers";
import TaskWrapper from "./TaskWrapper";
import Breadcrumbs from "../../../components/Breadcrumbs";
import User from "../../../components/User";

const getUsers = (data, id) => {
  const filter = data.filter((relation) => relation.project === id);
  const result = filter.map((single) => {
    return single.users;
  });
  return result;
};

const filter = (tasks, id) => {
  let newTasks = [];
  tasks.tasks &&
    tasks.tasks.length > 0 &&
    tasks.tasks.map((task) => {
      if (task.projectId === id) {
        newTasks.push(task);
      }
    });
  return newTasks;
};

export default function Dashboard() {
  const { id } = useParams();
  const { user } = useGlobalContext();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [taskID, setTaskID] = useState({});
  const [usersList, setUsersList] = useState([]);
  const { postData } = useFetch();
  const { data: fetching, loading, error } = useFetch("relations");
  const {
    data: tasks,
    rerender,
    setRerender,
    loading: taskLoading,
  } = useFetch("tasks/");
  const { data: projects } = useFetch(`projects/${id}`);
  const { data: users, loading: usersLoading } = useFetch("users/");
  const [draggedItem, setDraggedItem] = useState();

  useEffect(() => {
    if (!loading) {
      const newUsersList = getUsers(fetching.relations, id);
      const result = users.users.filter(({ id }) =>
        newUsersList[0].includes(id)
      );
      setUsersList(result);
    }
  }, [loading, usersLoading]);

  const handleAddTask = (newTaskObj) => {
    postData("tasks/", newTaskObj);
    setRerender(!rerender);
    setShowModal(false);
  };

  const handleOpenTask = async (item) => {
    setTaskID(item);
    setShowTask(true);
  };

  const renderTaskElement = (item) => {
    return (
      <div
        onDrag={(e) => setDraggedItem(item)}
        draggable
        className="single-task"
        key={item.id}
        onClick={(e) => {
          handleOpenTask(item);
        }}
      >
        <div className="task-header">
          <h4
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              handleOpenTask(item);
            }}
          >
            {item.task}
          </h4>
          <p className="priority">{convertPriority(item.priority)}</p>
        </div>
        <p>{sliceDescription(item.text)}</p>
      </div>
    );
  };
  useEffect(() => {
    setData(filter(tasks, id));
  }, [tasks, id]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <NotLoggedIn />;
  }

  if (error) {
    <Error />;
  }

  return (
    <div className="main-container">
      <Breadcrumbs data={projects} />
      <div className="main-header">
        <img src={projects.project.img} className="image" alt="" />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <h2>{projects.project.name}</h2>
            {user.type === "company" && (
              <button className="edit-btn">
                <NavLink to={`/editproject/${projects.project.id}`}>
                  <FaEdit className="del-btn" style={{ fontSize: "2.5rem" }} />
                </NavLink>
              </button>
            )}
          </div>
          <p>{projects.project.description} </p>
          <ul className="users-list" key={user}>
            <span>Assigned users:</span>
            {usersList &&
              usersList.map((user) => {
                if (user === "undefined") return;
                return <User user={user} key={user.id} />;
              })}
          </ul>
          <div className="btn">
            <button
              className="btn-hover-container"
              onClick={() => setShowModal(true)}
            >
              <IoAddCircle className="add-btn" />
              <span className="btn-text">Add new task</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        <TaskWrapper
          rerender={rerender}
          setRerender={setRerender}
          data={data}
          renderTaskElement={renderTaskElement}
          draggedItem={draggedItem}
          status="backlog"
          name="Backlog"
        />
        <TaskWrapper
          rerender={rerender}
          setRerender={setRerender}
          data={data}
          renderTaskElement={renderTaskElement}
          draggedItem={draggedItem}
          status="todo"
          name="To Do"
        />
        <TaskWrapper
          rerender={rerender}
          setRerender={setRerender}
          data={data}
          renderTaskElement={renderTaskElement}
          draggedItem={draggedItem}
          status="progress"
          name="Progress"
        />
        <TaskWrapper
          rerender={rerender}
          setRerender={setRerender}
          data={data}
          renderTaskElement={renderTaskElement}
          draggedItem={draggedItem}
          status="testing"
          name="Testing"
        />
        <TaskWrapper
          rerender={rerender}
          setRerender={setRerender}
          data={data}
          renderTaskElement={renderTaskElement}
          draggedItem={draggedItem}
          status="todeploy"
          name="To Deploy"
        />
        <TaskWrapper
          rerender={rerender}
          setRerender={setRerender}
          data={data}
          renderTaskElement={renderTaskElement}
          draggedItem={draggedItem}
          status="done"
          name="Done"
        />
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TaskForm handleAddTask={handleAddTask} id={id} />
      </Modal>
      <Modal showModal={showTask} setShowModal={setShowTask}>
        <SingleTask
          usersList={usersList}
          task={taskID}
          user={user}
          rerender={rerender}
          setRerender={setRerender}
          showModal={showTask}
          setShowModal={setShowTask}
          data={data}
          setData={setData}
          taskLoading={taskLoading}
        />
      </Modal>
    </div>
  );
}
