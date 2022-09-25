import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm({ handleAddTask, id }) {
  const [newObj, setNewObj] = useState({
    taskID: uuidv4(),
    projectID: id,
    task: "plan project",
    text: "some text etc.",
    status: "testing",
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
        {/* todo - select */}
        {/* <select name="test" id=""></select> */}
        <button>submit</button>
      </form>
    </div>
  );
}
