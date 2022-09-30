import { RestSerializer } from "miragejs";
import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { timeStamp } from "../../../utils/time";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../../components/Loader";

export default function Comment({
  commentsList,
  user,
  task,
  setRerender,
  rerender,
  loading,
}) {
  const [commentText, setCommentText] = useState("");
  const { postData } = useFetch();

  const handleSubmit = () => {
    postData("comments", {
      id: uuidv4(),
      taskId: task.id,
      text: commentText,
      userId: user.id,
      createdAt: Date.now(),
    });
    setRerender(!rerender);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="comments">
      <div>
        <label htmlFor="comments">comments:</label>
        <ul>
          {commentsList.map((comment) => {
            return (
              <div>
                <div style={{ display: "flex" }}>
                  <img
                    src={comment.user.img}
                    style={{ width: "4rem" }}
                    alt=""
                  />
                  <h4>{comment.user.name}</h4>
                </div>
                <p>{comment.text}</p>
                <p>posted: {timeStamp(comment.createdAt)} </p>
              </div>
            );
          })}
        </ul>
      </div>
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
