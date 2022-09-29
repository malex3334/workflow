import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm({ handleAddTask, id }) {
  const [newObj, setNewObj] = useState({
    taskID: uuidv4(),
    projectID: id,
    task: "",
    text: "",
    status: "backlog",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const handleAdd = (e) => {
    e.preventDefault();
    handleAddTask(newObj);
  };

  return (
    <div className="new-project-container">
      <h2>New task:</h2>
      <form onSubmit={(e) => handleAdd(e)}>
        <input
          required
          type="text"
          placeholder="task name"
          value={newObj.task}
          onChange={(e) => setNewObj({ ...newObj, task: e.target.value })}
        />
        <textarea
          type="text"
          placeholder="task description"
          value={newObj.text}
          onChange={(e) => setNewObj({ ...newObj, text: e.target.value })}
        />
        <div className="select">
          <label htmlFor="">Status:</label>
          <select
            name=""
            id=""
            onChange={(e) => setNewObj({ ...newObj, status: e.target.value })}
          >
            <option value="backlog">Backlog</option>
            <option value="todo">To do</option>
            <option value="progress">Progress</option>
            <option value="testing">Testing</option>
            <option value="deploy">To deploy</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="select">
          <label htmlFor="">Priority:</label>
          <select
            name=""
            id=""
            onChange={(e) => setNewObj({ ...newObj, priority: e.target.value })}
          >
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
            <option value="very high">very high</option>
          </select>
        </div>

        <button>submit</button>
      </form>
    </div>
  );
}
