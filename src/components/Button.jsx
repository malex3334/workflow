import React from "react";

export default function Button({
  name,
  type = "none",
  onClick,
  classes = "",
  style,
  children,
}) {
  return (
    <button style={style} className={classes} onClick={onClick} type={type}>
      {name}
      {children}
    </button>
  );
}
