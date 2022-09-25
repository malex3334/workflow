import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NewProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitObject, setSubmitObject] = useState({});
  let navigate = useNavigate();

  const postNewProject = async (newProjectObject) => {
    try {
      const response = await fetch(`/api/projects/`, {
        method: "POST",
        body: JSON.stringify(newProjectObject),
      });
      const test = await response.json();
      // console.log([...filteredData, { ...newProject }]);
      // setFilteredData([...filteredData, { ...newProject }]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const newObject = {
      id: "10",
      name: name,
      description: description,
      createdAt: Date.now(),
    };

    postNewProject(newObject);
    navigate("/dashboard");
  };

  return (
    <div className="new-project-container">
      <h2>New Project:</h2>
      <form onSubmit={(e) => handleSumbit(e)}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input type="text" placeholder="users" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
