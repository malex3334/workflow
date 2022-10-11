import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";
import { IoSend } from "react-icons/io5";
import DeleteModal from "../../../components/DeleteModal";
import SingleComment from "./SingleComment";
import Loader from "../../../components/Loader";

export default function CommentWrapper({
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
    setShowDeleteModal(false);
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
              <SingleComment
                key={comment.id}
                comment={comment}
                user={user}
                handleDelete={handleDelete}
                edit={edit}
                setEdit={setEdit}
                handleEdit={handleEdit}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                editedComment={editedComment}
                setEditedComment={setEditedComment}
                DeleteModal={DeleteModal}
                handleUpdateComment={handleUpdateComment}
                loading={postLoading}
              />
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
