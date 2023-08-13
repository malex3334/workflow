import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { timeStamp } from "../utils/time";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import { BiMessageAltError } from "react-icons/bi";

export default function Dropdown({ information, classes, elements }) {
  let sortedTasks = elements.myTask.sort((a, b) =>
    b.updatedAt > a.updatedAt ? 1 : -1
  );
  let sortedProjects = elements.myTask.sort((a, b) =>
    b.updatedAt > a.updatedAt ? 1 : -1
  );

  const findProjectName = (id) => {
    let newArray = [];
    elements?.myProject?.map((item) => {
      if (item.id == id) {
        newArray.push(item);
        return newArray;
      } else return null;
    });
    return newArray[0]?.name;
  };

  findProjectName(1);

  return (
    <div className={classes}>
      <span style={{ display: "block", marginBottom: "1rem" }}>
        You have{" "}
        <span style={{ fontWeight: "bold", color: "red" }}>{information}</span>{" "}
        new elements
      </span>
      <ul>
        <label>Projects</label>
        {elements?.myProject?.map((project) => {
          return (
            <NavLink to={`/dashboard/projects/${project.id}`}>
              <li onClick={() => console.log(project.id)}>
                {" "}
                <p>
                  <MdOutlineMarkChatUnread style={{ color: "blue" }} />{" "}
                  {project.name}
                </p>
                <span> {timeStamp(project.updatedAt).slice(0, -3)}</span>
              </li>
            </NavLink>
          );
        })}
        <label>tasks</label>
        {elements?.myTask?.map((task) => {
          return (
            <NavLink to={`/dashboard/projects/${task.projectId}`}>
              <li onClick={() => console.log(task.projectId)}>
                {" "}
                <p>
                  <BiMessageAltError style={{ color: "red" }} /> {task.task}
                  <span
                    style={{
                      fontSize: ".8rem",
                      letterSpacing: ".5px",
                      fontWeight: "lighter",
                    }}
                  >
                    {" "}
                    {findProjectName(task.projectId)}
                  </span>
                </p>
                <span> {timeStamp(task.updatedAt).slice(0, -3)}</span>
              </li>
            </NavLink>
          );
        })}
      </ul>
      <button
        className="clear-btn"
        onClick={() => {
          console.log("test");
        }}
      >
        clear all
      </button>
    </div>
  );
}
