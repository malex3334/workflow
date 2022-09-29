import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHandSparkles } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";

export default function EditProjectForm() {
  const [newID, setNewID] = useState(uuidv4());
  let navigate = useNavigate();
  const { updateData } = useFetch();

  const { id } = useParams();
  const { data, setData, loading, setLoading } = useFetch(`projects/${id}`);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    if (!loading) {
      setName(data.project.name);
      setDescription(data.project.description);
      setImg(data.project.img);
    }
  }, [data, setData, loading]);

  const handleSumbit = (e) => {
    e.preventDefault();
    updateData(id, "projects", {
      name,
      description,
      img,
      updatedAt: Date.now(),
    });
    navigate(`/dashboard/projects/${id}`);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="new-project-container">
      <h2>Edit Project:</h2>
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
        <button type="cancel">cancel</button>
      </form>
    </div>
  );
}
