import React from "react";
import useFetch from "../../hooks/useFetch";

export default function TaskWrapper({
  rerender,
  setRerender,
  data,
  renderTaskElement,
  draggedItem,
  name,
}) {
  const { updateData } = useFetch();

  return (
    <div
      id="backlog"
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
      <h3 id="backlog" className="board-title">
        {name}
      </h3>
      <ul id="backlog" className="tasks-list">
        {data &&
          data.length > 0 &&
          data.map((task) => {
            if (task.status === "backlog") {
              return renderTaskElement(task);
            }
          })}
      </ul>
    </div>
  );
}
