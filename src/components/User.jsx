import React from "react";

export default function User({ user }) {
  const { id, img, login } = user;

  return (
    <div className="user-mini" key={id}>
      <img className="user-img" src={img} alt="" />
      <h5 className="user-nick">{login}</h5>
    </div>
  );
}
