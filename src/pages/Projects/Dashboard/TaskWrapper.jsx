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
      className="single-board"
      onDragLeave={(e) => {
        if (e.target.id !== "") {
          updateData(draggedItem.id, "tasks", {
            status: e.target.id,
          });
          setRerender(!rerender);
        }
      }}
    >
      <h3 id={status} className="board-title">
        {name}
      </h3>
      <ul id={status} className="tasks-list">
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
