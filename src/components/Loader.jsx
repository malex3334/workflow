import React from "react";
import "./loader.scss";

export default function Loader() {
  return (
    <div className="loader">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
