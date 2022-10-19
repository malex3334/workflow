import React from "react";
import { timeStamp } from "../../../../utils/time";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Modal from "../../../../components/Modal";

export default function SingleComment({
  comment,
  user,
  edit,
  setEdit,
  handleEdit,
  handleDelete,
  setShowDeleteModal,
  setEditedComment,
  editedComment,
  DeleteModal,
  showDeleteModal,
  handleUpdateComment,
}) {
  return (
    <div className="single-comment" key={comment.id}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="single-comment__user--user-info">
          <img
            className="single-comment__user--user-avatar"
            src={comment.user.img}
            alt=""
          />
          <h4>{comment.user.name}</h4>
          <p className="single-comment__user--timestamp">
            posted: {timeStamp(comment.createdAt)}{" "}
          </p>
        </div>
        {comment.user.id === user.id && (
          <div>
            <button
              onClick={(e) => {
                handleEdit(comment.id, comment.text);
              }}
            >
              <FaEdit />
            </button>
            <button onClick={(e) => setShowDeleteModal(true)}>
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <div className="single-comment__text-container">
        <p>
          {edit.edit && edit.id === comment.id ? (
            <div style={{ display: "flex" }}>
              <textarea
                rows="1"
                className="single-comment__comment-editedarea"
                onChange={(e) => setEditedComment(e.target.value)}
                onBlur={() => {
                  handleUpdateComment(comment.id);
                  setEdit({ edit: false });
                }}
                value={editedComment}
              ></textarea>
              <button
                className="submit"
                onClick={() => {
                  handleUpdateComment(comment.id);
                  setEdit({ edit: false });
                }}
              >
                <IoSend className="send-btn" />
              </button>
            </div>
          ) : (
            `${comment.text}`
          )}
        </p>
      </div>
      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          id={comment.id}
          handleDelete={handleDelete}
        />
      </Modal>
    </div>
  );
}
