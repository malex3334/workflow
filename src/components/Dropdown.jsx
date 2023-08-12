import React from "react";

export default function Dropdown({ information, classes }) {
  return (
    <p className={classes}>
      <span>You have {information} unread posts</span>
    </p>
  );
}
