import React from "react";

export default function DeleteModal({ handleDelete, setShowDeleteModal, id }) {
  return (
    <div className="delete-modal">
      <h2>Are you sure?</h2>
      <div className="btns">
        <button style={{ background: "red" }} onClick={(e) => handleDelete(id)}>
          yes
        </button>
        <button className="btn-save" onClick={() => setShowDeleteModal(false)}>
          no
        </button>
      </div>
    </div>
  );
}
