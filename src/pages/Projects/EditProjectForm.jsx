import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../components/Loader";
import useFetch from "../../hooks/useFetch";

// const getUsers = (data, id) => {
//   const filter = data.filter((relation) => relation.project === id);
//   const result = filter.map((single) => {
//     let users = single.users;
//     return (users = single.users);
//   });
//   return result;
// };

export default function EditProjectForm() {
  const [newID, setNewID] = useState(uuidv4());
  let navigate = useNavigate();
  const { updateData } = useFetch();
  const { id } = useParams();
  const [relationId, setRelationId] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const { data, setData, loading, setLoading } = useFetch(`projects/${id}`);
  // users to be patched
  const [users, setUsers] = useState([]);
  // users to be displayed as assigned
  const [assignedUsers, setAssignedUsers] = useState([]);
  // all users full data
  const {
    data: usersData,
    setData: setUsersData,
    loading: usersLoading,
  } = useFetch("users/");
  // users to be fetched as assigned
  const [fetchedUsers, setFetchedUsers] = useState([]);
  // relations
  const {
    data: relations,
    setData: setRelations,
    loading: relationsLoading,
  } = useFetch("relations/");

  useEffect(() => {
    if (!loading) {
      setName(data.project.name);
      setDescription(data.project.description);
      setImg(data.project.img);
    }
  }, [data, setData, loading]);

  useEffect(() => {
    if (!relationsLoading) {
      const result = relations.relations.filter(
        (relation) => relation.project === id
      );
      setRelationId(result[0]);
      const test = relations.users.filter(({ id }) =>
        result[0].users.includes(id)
      );
      setAssignedUsers(test);
      setUsers(test.map((user) => user.id));
    }
  }, [, relations, loading, usersLoading]);

  // useEffect(() => {
  //   if (!usersLoading) {
  //     const result = relations.relations.filter(
  //       (relation) => relation.project === id
  //     );
  //     const newUsersList = getUsers(
  //       usersData && usersData?.users,
  //       result[0].id
  //     );
  //     console.log("newusers", newUsersList);
  //     setAssignedUsers(newUsersList);
  //   }
  // }, [usersLoading]);

  const handleSumbit = (e) => {
    e.preventDefault();
    updateData(id, "projects", {
      name,
      description,
      img,
      updatedAt: Date.now(),
    });

    updateData(relationId.id, "relations", {
      users: users,
    });
    navigate(`/dashboard/projects/${id}`);
  };

  const handleAssignUsers = (e, user) => {
    if (assignedUsers.includes(user) || users.includes(user.id)) {
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
        <ul className="users-list">
          <h4>all users:</h4>
          {/* {usersData.users
            ? usersData.users.map((user) => { */}
          {usersData.users
            ? usersData.users.map((user) => {
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
        <ul className="users-list">
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
