import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useGlobalContext } from "../../../context";
import { priorityOptions, statusOptions } from "../../../utils/helpers";

export default function TaskForm({ handleAddTask, id }) {
  const { user } = useGlobalContext();
  const [newObj, setNewObj] = useState({
    taskID: uuidv4(),
    projectID: id,
    task: "",
    text: "",
    status: "backlog",
    priority: "normal",
    users: [user.id],
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
        <Input
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
            {statusOptions.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        </div>
        <div className="select">
          <label htmlFor="">Priority:</label>
          <select
            value="normal"
            name=""
            id=""
            onChange={(e) => setNewObj({ ...newObj, priority: e.target.value })}
          >
            {priorityOptions.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        </div>

        <Button name="submit" type="submit" />
      </form>
    </div>
  );
}
