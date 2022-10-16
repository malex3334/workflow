import React from "react";

export default function Footer() {
  const date = new Date();

  return (
    <div className="footer">
      <a href="https://github.com/malex3334" target="_blank" rel="noreferrer">
        Copyrights M.A {date.getFullYear()}
      </a>
    </div>
  );
}
