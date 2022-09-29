import React, { useState } from "react";
import { FaHandSparkles } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useFetch from "../../hooks/useFetch";

export default function NewProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [newID, setNewID] = useState(uuidv4());
  let navigate = useNavigate();
  const { data, loading } = useFetch("users/");

  const { postData } = useFetch();

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

    // new version
    postData("projects/", newObject);
    postData("relations/", newRelation);
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
