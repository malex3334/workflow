import React from "react";

export default function DeleteModal({ handleDelete, setShowDeleteModal, id }) {
  return (
    <div className="new-project-container">
      <h2>Are you sure?</h2>
      <div className="btns">
        <button className="btn" onClick={(e) => handleDelete(id)}>
          yes
        </button>
        <button
          className="btn"
          style={{ background: "red" }}
          onClick={() => setShowDeleteModal(false)}
        >
          no
        </button>
      </div>
    </div>
  );
}
