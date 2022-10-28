import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context";
import useFetch from "../../hooks/useFetch";

export default function NewProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [newID] = useState(uuidv4());
  let navigate = useNavigate();
  const { data, loading } = useFetch("users/");
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const { postData, loading: postLoading } = useFetch();
  const { user } = useGlobalContext();

  const handleSumbit = async (e) => {
    e.preventDefault();

    const newRelation = {
      id: newID,
      projectId: newID,
      users: [user.id, ...users],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newObject = {
      id: newID,
      name: name,
      description: description,
      img: img,
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

  const handleAssignUsers = (e, user) => {
    if (assignedUsers.includes(user)) {
      return;
    }
    setUsers([...users, user.id]);
    setAssignedUsers([...assignedUsers, user]);
  };

  const handleUnassignUser = (e, user) => {
    setAssignedUsers((prev) =>
      prev.filter((filtered) => filtered.id !== user.id)
    );
    setUsers((prev) => prev.filter((filtered) => filtered !== user.id));
  };

  return (
    <div className="new-project-container">
      <h2>New Project:</h2>
      <form onSubmit={(e) => handleSumbit(e)}>
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <ul className="users-list users-list-width">
          <h4>all users:</h4>
          {data.users
            ? data.users.map((user) => {
                return (
                  <li
                    className="user-mini row"
                    style={{ cursor: "pointer" }}
                    key={uuidv4()}
                    onClick={(e) => {
                      handleAssignUsers(e, user);
                    }}
                  >
                    <img src={user.img} className="user-img" alt={user.name} />
                    <p className="user-nick">{user.name}</p>
                  </li>
                );
              })
            : "no users"}
        </ul>
        {/* show all users */}
        <ul className="users-list users-list-width">
          <h4>assigned users:</h4>
          {assignedUsers
            ? assignedUsers?.map((user) => {
                return (
                  <li
                    onClick={(e) => {
                      handleUnassignUser(e, user);
                    }}
                    className="user-mini row"
                    style={{ cursor: "pointer" }}
                    key={uuidv4()}
                  >
                    <img src={user.img} className="user-img" alt={user.name} />
                    <p className="user-nick">{user.name}</p>
                  </li>
                );
              })
            : "no users"}
        </ul>

        <Input
          placeholder="paste image link"
          onChange={(e) => setImg(e.target.value)}
          value={img}
        />
        <div className="btns">
          <Button name="submit" classes="submit" type="submit" />
          <Button name="cancel" classes="cancel" />
        </div>
      </form>
    </div>
  );
}
