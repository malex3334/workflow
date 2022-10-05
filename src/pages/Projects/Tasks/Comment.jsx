import { RestSerializer } from "miragejs";
import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { timeStamp } from "../../../utils/time";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../../components/Loader";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function Comment({
  commentsList,
  user,
  task,
  setRerender,
  rerender,
  loading,
}) {
  const [commentText, setCommentText] = useState("");
  const { postData, updateData, deleteData, loading: postLoading } = useFetch();
  const [editedComment, setEditedComment] = useState("");
  const [edit, setEdit] = useState({
    id: "",
    edit: false,
  });

  const handleEdit = (id, comment) => {
    setEdit({ id: id, edit: true });
    setEditedComment(comment);
  };

  const handleUpdateComment = (id) => {
    updateData(id, "comments", { text: editedComment });
    setRerender(!rerender);
  };

  const handleSubmit = () => {
    if (commentText.length > 0) {
      postData("comments", {
        id: uuidv4(),
        taskId: task.id,
        text: commentText,
        userId: user.id,
        createdAt: Date.now(),
      });
      setRerender(!rerender);
      setCommentText("");
    }
  };

  const handleDelete = (id) => {
    deleteData(id, "comments");
    setRerender(!rerender);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="comments">
      <>
        <label htmlFor="comments">comments:</label>
        <>
          {commentsList.map((comment) => {
            return (
              <div className="single-comment">
                <div
                  className="user-info"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="user-info">
                    <img
                      className="user-avatar"
                      src={comment.user.img}
                      alt=""
                    />
                    <h4>{comment.user.name}</h4>
                    <p className="timestamp">
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
                      <button onClick={(e) => handleDelete(comment.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-container">
                  <p>
                    {edit.edit && edit.id === comment.id ? (
                      <div style={{ display: "flex" }}>
                        <textarea
                          rows="1"
                          className="comment-editedarea"
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
              </div>
            );
          })}
        </>
      </>
      <div className="comment-input-container">
        <img className="user-avatar" src={user.img} alt="" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          placeholder="enter comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="submit" onClick={handleSubmit}>
          <IoSend className="send-btn" />
        </button>
      </div>
    </div>
  );
}
