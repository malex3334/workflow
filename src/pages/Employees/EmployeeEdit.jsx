import React, { useState } from "react";
import Button from "../../components/Button";
import User from "../../components/User";
import useFetch from "../../hooks/useFetch";
import { loginRestrictions } from "../../utils/helpers";

export default function Edit({ user, rerender, setRerender }) {
  const { name, login, salary, img, type, email } = user;
  const { updateData } = useFetch();
  const [userData, setUserData] = useState({
    name,
    login,
    salary,
    img,
    type,
    email,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateData(user.id, "users", userData);
    setRerender(!rerender);
  };

  return (
    <div className="editUser-modal">
      <form className="edit-form" onSubmit={(e) => handleFormSubmit(e)}>
        <h3>{name}</h3>
        <div>
          <label htmlFor="">login: </label>
          <input
            type="text"
            value={userData.login}
            onChange={(e) =>
              setUserData({
                ...userData,
                login: loginRestrictions(e.target.value),
              })
            }
          />
        </div>
        <div>
          <label htmlFor="">email: </label>
          <input
            type="text"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="">salary: </label>
          <input
            type="number"
            value={userData.salary}
            onChange={(e) =>
              setUserData({ ...userData, salary: e.target.value })
            }
          />
        </div>
        <Button name="save" classes="add-btn" type="submit" />
      </form>
    </div>
  );
}
