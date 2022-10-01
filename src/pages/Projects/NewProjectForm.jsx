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

  console.log(data);

  const { postData } = useFetch();

  const handleSumbit = async (e) => {
    e.preventDefault();

    const newRelation = {
      id: newID,
      projectId: newID,
      // projectId: "1",
      users: ["1", "2", "3", "5", "100"],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newObject = {
      id: newID,
      name: name,
      description: description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // new version
    await postData("projects/", newObject);
    await postData("relations/", newRelation);
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
