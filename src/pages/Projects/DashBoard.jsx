import React, { useState, useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { timeStamp } from "../../utils/time";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../components/Modal";
import TaskForm from "./Tasks/TaskForm";
import SingleTask from "./Tasks/SingleTask";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";

export default function DashBoard() {
  const { id } = useParams();
  // const { data, loading } = useGlobalContext();
  const [project, setProject] = useState("");
  // const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [taskID, setTaskID] = useState({});
  const { user } = useGlobalContext();
  const [relations, setRelations] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { postData } = useFetch();
  const { data: fetching, loading, setLoading } = useFetch("relations");
  console.log("test", fetching);

  // fetch relations
  // useEffect(() => {
  //   const fetchRelations = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`/api/relations`);
  //       const data = await response.json();
  //       setRelations(data.relations);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   };
  //   fetchRelations();
  // }, []);

  const getUsers = (data) => {
    const filter = data.filter((relation) => relation.projectID === id);
    const users = filter[0]?.users;
    return users;
  };
  console.log("outside", getUsers(fetching.relations));

  useEffect(() => {
    // setUsersList(getUsers(fetching?.relations));
  }, []);

  // useEffect(() => {
  //   setUsersList(getUsers(fetching.relations));
  // }, [setUsersList, fetching]);

  // // ### fetch POST tasks
  // const fetchNewTask = async (newTask) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`/api/tasks`, {
  //       method: "POST",
  //       body: JSON.stringify(newTask),
  //     });

  //     setData([...data, newTask]);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const handleAddTask = (newTaskObj) => {
    // fetchNewTask(newTaskObj);
    postData("tasks/", newTaskObj);
    setShowModal(false);
  };

  // ### fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tasks/`);
        const tasks = await response.json();

        setTasks(tasks);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [setData]);

  // ### fetch projects
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${id}`);
        const projects = await response.json();
        setProject(projects.project);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const test = () => {
    let newTasks = [];
    tasks.tasks &&
      tasks.tasks.length > 0 &&
      tasks.tasks.map((task) => {
        if (task.projectID === id) {
          newTasks.push(task);
        }
      });
    return newTasks;
  };

  const handleOpenTask = async (item) => {
    setTaskID(item);
    setShowTask(true);
    console.log(item);

    // return (
    //   <Modal showModal={showTask} setShowModal={setShowTask}>
    //     <div>123</div>
    //   </Modal>
    // );
  };

  const renderTaskElement = (item) => {
    return (
      <div
        draggable
        className="single-task"
        key={item.id}
        onClick={(e) => {
          // setShowTask(true);
          handleOpenTask(item);
          console.log(item);
        }}
      >
        <div className="task-header">
          <h4
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              // setShowTask(true);
              handleOpenTask(item);
              console.log(item);
            }}
          >
            {item.task}
          </h4>
        </div>
        <p>{item.text}</p>
      </div>
    );
  };
  useEffect(() => {
    setData(test());
  }, [tasks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <ul className="users-list" key={user}>
        <span>Users IDs:</span>
        {usersList &&
          usersList.map((user) => {
            return <li>{user},</li>;
          })}
      </ul>

      <div className="dashboard-container">
        <div className="single-board">
          <h3 className="board-title">Backlog</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "backlog") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">To do</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task, index) => {
                if (task.status === "todo") {
                  return renderTaskElement(task, index);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">Progress</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "progress") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">Testing</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "testing") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">To deploy</h3>
          <ul className="tasks-list">
            {data &&
              data.map((task) => {
                if (task.status === "deploy") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
        <div className="single-board">
          <h3 className="board-title">Done</h3>
          <ul className="tasks-list">
            {data &&
              data.length > 0 &&
              data.map((task) => {
                if (task.status === "done") {
                  return renderTaskElement(task);
                }
              })}
          </ul>
        </div>
      </div>
      {/* <button onClick={handleAddTask}>New task test</button> */}
      <button className="add-btn" onClick={() => setShowModal(true)}>
        New task test
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TaskForm handleAddTask={handleAddTask} id={id} />
      </Modal>
      <Modal showModal={showTask} setShowModal={setShowTask}>
        <SingleTask
          task={taskID}
          user={user}
          showModal={showTask}
          setShowModal={setShowTask}
          data={data}
          setData={setData}
        />
      </Modal>
      <p>Created: {timeStamp(project.createdAt)}</p>
    </div>
  );
}
