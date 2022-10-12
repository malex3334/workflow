import React from "react";

export default function Button({ handleOnClick, type }) {
  return <input onClick={() => handleOnClick} type={type ? "text" : type} />;
}
