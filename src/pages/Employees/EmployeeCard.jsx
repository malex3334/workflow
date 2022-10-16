import React, { useState } from "react";
import Modal from "../../components/Modal";
import { useGlobalContext } from "../../context";
import EmployeeEdit from "./EmployeeEdit";

export default function EmployeeCard({ user, rerender, setRerender }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const { user: loggedUser } = useGlobalContext();
  const { name, login, email, salary, img, type } = user;

  if (user.id !== loggedUser.id) {
    return (
      <div
        className="employees-background"
        style={{ background: `url(${img})` }}
        key={user.id}
      >
        <div className="details" onClick={() => setShowUserModal(true)}>
          <h4>{name}</h4>
          <p>{login}</p>
          <p>{email}</p>
          <p>{type}</p>
          {salary && <p>{salary}$</p>}
        </div>

        <Modal showModal={showUserModal} setShowModal={setShowUserModal}>
          <EmployeeEdit
            user={user}
            rerender={rerender}
            setRerender={setRerender}
          />
        </Modal>
      </div>
    );
  }
}
