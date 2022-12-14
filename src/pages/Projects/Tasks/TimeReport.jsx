import React, { useState } from "react";
import Loader from "../../../components/Loader";
import useFetch from "../../../hooks/useFetch";
import { FaUserClock } from "react-icons/fa";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function TimeReport({
  reportedTime,
  task,
  estaminatedTime,
  setEstaminatedTime,
  setReportedTime,
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
    setEstaminatedTime(estTime);
    setReportedTime(time);
    setRerender(!rerender);
  };

  if (taskLoading) {
    return <Loader />;
  }

  return (
    <div className="worktime-modal">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="section-title">
          <FaUserClock className="title-icon" />
        </div>
        <div className="worktime__time-progressbar" style={{ width: "30rem" }}>
          <div
            className="worktime__time-reported"
            style={{
              width: (time / estTime) * 100 + "%",
            }}
          ></div>
        </div>
        <div className="worktime__time-reported-info">
          {time}h logged / {estTime}h left
        </div>
      </div>

      <h4>Time report:</h4>
      <form className="worktime__form" onSubmit={(e) => handleSetData(e)}>
        <div className="worktime-input-control">
          <label htmlFor="">time spent (hours):</label>
          <Input
            min="0"
            type="number"
            step="0.5"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </div>
        <div className="worktime-input-control">
          <label htmlFor="">time left:</label>
          <Input
            min="0"
            type="number"
            step="0.5"
            value={estTime}
            onChange={(e) => setEstTime(e.target.value)}
          />
        </div>
        <Button name="save" type="submit" classes="btn-save" />
      </form>
    </div>
  );
}
