import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NewProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [submitObject, setSubmitObject] = useState({});
  const [newID, setNewID] = useState(uuidv4());
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

  const postNewRelation = async (mewRelationObject) => {
    try {
      const response = await fetch(`/api/relations/`, {
        method: "POST",
        body: JSON.stringify(mewRelationObject),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const newObject = {
      id: newID,
      name: name,
      description: description,
      img: img,
      createdAt: Date.now(),
    };

    const newRelation = {
      id: uuidv4(),
      projectID: newID,
      users: ["1", "2", "3", "100"],
    };

    postNewProject(newObject);
    postNewRelation(newRelation);
    navigate("/dashboard");
  };

  return (
    <div className="new-project-container">
      <h2>New Project:</h2>
      <form onSubmit={(e) => handleSumbit(e)}>
        <input
          required
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          required
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input type="text" placeholder="users" />
        <input
          type="text"
          placeholder="paste image link"
          onChange={(e) => setImg(e.target.value)}
          value={img}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
