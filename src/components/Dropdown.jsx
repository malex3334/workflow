import React from "react";
import { NavLink } from "react-router-dom";
import { timeStamp } from "../utils/time";

export default function Dropdown({ information, classes, elements }) {
  console.log(information);

  return (
    <div className={classes}>
      <span style={{ display: "block", marginBottom: "1rem" }}>
        You have <span style={{ fontWeight: "bold" }}>{information}</span>{" "}
        unread elements
      </span>
      <ul>
        {elements?.myProject.map((project) => {
          return (
            <NavLink to={`/dashboard/projects/${project.id}`}>
              <li onClick={() => console.log(project.id)}>
                {" "}
                ✨ {project.name}
                <span> {timeStamp(project.createdAt)}</span>
              </li>
            </NavLink>
          );
        })}
        {elements?.myTask.map((task) => {
          return <li>✔ {task.task}</li>;
        })}
      </ul>
    </div>
  );
}
