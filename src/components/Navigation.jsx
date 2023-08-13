import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "./Dropdown";
import useFetch from "../hooks/useFetch";

export default function Navigation() {
  const { user, setUser, loading } = useGlobalContext();
  const [newContent, setNewContent] = useState({});
  const [myProjects, setMyprojects] = useState();
  const [notifications, setNotifications] = useState(10);
  const [logoutData, setLogoutData] = useState({
    projects: [],
    tasks: [],
    comments: [],
  });
  let navigate = useNavigate();
  // system powiadomień?
  const { data: tasks, rerender, setRerender } = useFetch("tasks/");
  const { data: projects } = useFetch("projects/");
  const { data: relations } = useFetch("relations/");
  const { data: comments } = useFetch("comments/");

  useEffect(() => {
    let myProject = filter();
    setMyprojects(myProject);
    setRerender(!rerender);
    let myTask = dataFilter();
    console.log(myProject, myTask);
    setNotifications(filter().length + dataFilter().length);
    setNewContent({ myTask, myProject });
    console.log("new content", newContent);
  }, [user, setUser, notifications]);

  const dataFilter = () => {
    let newArray = [];
    tasks.tasks &&
      tasks.tasks.length > 0 &&
      tasks.tasks.map((item) => {
        myProjects?.map((project) => {
          if (item.projectId === project.id) {
            newArray.push(item);
          } else return null;
          return newArray;
        });
        return newArray;
      });
    return newArray;
  };
  // console.log("datafilter output", dataFilter());

  const filter = () => {
    let newArray = [];
    relations.relations &&
      relations.relations.length > 0 &&
      relations.relations.map((item) => {
        if (item.users.includes(user.id)) {
          projects.projects.map((project) => {
            if (project.id === item.project) {
              newArray.push(project);
              return newArray;
            } else return null;
          });
        } else return null;

        return newArray;
      });
    return newArray;
  };

  // ende
  return (
    <nav className="nav">
      <div className="logo">
        <NavLink to="/">My Arij</NavLink>
      </div>
      <ul className="nav-list">
        <NavLink to="/">start</NavLink>
        {user && <NavLink to="/dashboard">projects</NavLink>}
        {user && (
          <NavLink className="navlink-user" to="/user/">
            <span>{user.name}</span>
            <img className="nav-avatar" src={user.img} alt={user.name} />

            <div
              className="notifications"
              style={
                notifications > 0
                  ? { background: "red" }
                  : { background: "$bg-green" }
              }
            >
              {notifications && notifications > 0 ? <>{notifications}</> : 0}
              <Dropdown
                classes={"dropdown"}
                information={notifications}
                elements={newContent}
              />
            </div>
          </NavLink>
        )}

        {!user ? (
          <NavLink to="/login">Log in</NavLink>
        ) : (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              setUser(false);
              setLogoutData({
                projects: projects,
                tasks: tasks,
                comments: comments,
              });
              console.log("############################", logoutData);
              navigate("/");
            }}
          >
            logout
          </li>
        )}
        {!user && <NavLink to="signup">Sign up</NavLink>}
      </ul>
    </nav>
  );
}
