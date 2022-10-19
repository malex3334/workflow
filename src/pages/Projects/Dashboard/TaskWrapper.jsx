import React from "react";
import useFetch from "../../../hooks/useFetch";

export default function TaskWrapper({
  rerender,
  setRerender,
  data,
  renderTaskElement,
  draggedItem,
  name,
  status,
}) {
  const { updateData } = useFetch();

  return (
    <div
      id={status}
      className="dashboard-container__single-board"
      onDragLeave={(e) => {
        if (e.target.id !== "") {
          updateData(draggedItem.id, "tasks", {
            status: e.target.id,
          });
          setRerender(!rerender);
        }
      }}
    >
      <h3 id={status} className="dashboard-container__board-title">
        {name}
      </h3>
      <div className="dashboard-underline"></div>
      <ul id={status} className="dashboard-container__tasks-list">
        {data &&
          data.length > 0 &&
          data.map((task) => {
            if (task.status === status) {
              return renderTaskElement(task);
            } else return null;
          })}
      </ul>
    </div>
  );
}
