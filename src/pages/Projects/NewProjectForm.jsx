import React, { useState } from "react";
import { FaHandSparkles } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";

export default function NewProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [newID, setNewID] = useState(uuidv4());
  let navigate = useNavigate();
  const { data, loading } = useFetch("users/");
  const [users, setUsers] = useState([]);

  const { postData, loading: postLoading } = useFetch();

  const handleSumbit = async (e) => {
    e.preventDefault();

    const newRelation = {
      id: newID,
      projectId: newID,
      // projectId: "1",
      users: ["100", ...users],
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

  if (loading || postLoading) {
    return <Loader />;
  }

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
        <div>
          {data.users.map((user) => {
            return (
              <li
                style={{ cursor: "pointer" }}
                key={user.id}
                onClick={(e) => {
                  setUsers([...users, user.id]);
                }}
              >
                {user.name}
              </li>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="users"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
        />
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
