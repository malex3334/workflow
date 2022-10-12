import React from "react";

export default function EmployeeCard({ user }) {
  const { name, login, email, salary, img, type } = user;

  console.log(img);
  return (
    <div className="employees-background" style={{ background: `url(${img})` }}>
      <div className="details">
        <h4>{name}</h4>
        <p>{login}</p>
        <p>{email}</p>
        <p>{type}</p>
        <p>{salary}$</p>
      </div>
    </div>
  );
}
