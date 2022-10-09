import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import useFetch from "../../../hooks/useFetch";

export default function TimeReport({
  reportedTime,
  task,
  estaminatedTime,
  rerender,
  setRerender,
  setShowModal,
  taskLoading,
}) {
  const [time, setTime] = useState(reportedTime);
  const [estTime, setEstTime] = useState(estaminatedTime);
  const { updateData } = useFetch();

  const handleSetData = (e) => {
    e.preventDefault();
    updateData(task.id, "tasks", {
      reportedTime: time,
      estaminatedTime: estTime,
    });
    setShowModal(false);
    setRerender(!rerender);
  };

  if (taskLoading) {
    return <Loader />;
  }

  return (
    <div className="worktime-modal">
      <h2>Time report:</h2>
      <form className="worktime-form" onSubmit={(e) => handleSetData(e)}>
        <div className="worktime-input-control">
          <label htmlFor="">time spent (hours):</label>
          <input
            type="text"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </div>
        <div className="worktime-input-control">
          <label htmlFor="">time left:</label>
          <input
            type="text"
            value={estTime}
            onChange={(e) => setEstTime(e.target.value)}
          />
        </div>
        <button type="submit">Done</button>
      </form>
    </div>
  );
}
