import React from "react";

export default function DashBoard() {
  return (
    <div className="dashboard">
      <div className="single-board">
        <h3 className="board-title">Backlog</h3>
      </div>
      <div className="single-board">
        <h3 className="board-title">To do</h3>
      </div>
      <div className="single-board">
        <h3 className="board-title">In progress</h3>
      </div>
      <div className="single-board">
        <h3 className="board-title">Testing</h3>
      </div>
      <div className="single-board">
        <h3 className="board-title">To deploy</h3>
      </div>
      <div className="single-board">
        <h3 className="board-title">Done</h3>
      </div>
    </div>
  );
}
