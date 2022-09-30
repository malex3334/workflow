import { RestSerializer } from "miragejs";
import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { timeStamp } from "../../../utils/time";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../../components/Loader";
import { FaTrash } from "react-icons/fa";

export default function Comment({
  commentsList,
  user,
  task,
  setRerender,
  rerender,
  loading,
}) {
  const [commentText, setCommentText] = useState("");
  const { postData, deleteData } = useFetch();

  const handleSubmit = () => {
    postData("comments", {
      id: uuidv4(),
      taskId: task.id,
      text: commentText,
      userId: user.id,
      createdAt: Date.now(),
    });
    setRerender(!rerender);
    setCommentText("");
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
                <div className="user-info" style={{ display: "flex" }}>
                  <img className="user-avatar" src={comment.user.img} alt="" />
                  <h4>{comment.user.name}</h4>
                </div>
                <div className="text-container">
                  <p>{comment.text}</p>
                  {comment.user.id === user.id && (
                    <button onClick={(e) => handleDelete(comment.id)}>
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p>posted: {timeStamp(comment.createdAt)} </p>
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
      </div>
      <button className="submit" onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
}
