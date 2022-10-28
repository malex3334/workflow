import React from "react";
import Button from "./Button";

export default function DeleteModal({ handleDelete, setShowDeleteModal, id }) {
  return (
    <div className="delete-modal">
      <h2>Are you sure?</h2>
      <div className="btns">
        <Button
          name="yes"
          classes="btn-save"
          style={{ background: "red" }}
          onClick={() => handleDelete(id)}
        />
        <Button
          name="no"
          classes="btn-save"
          onClick={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
}
