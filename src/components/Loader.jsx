import React, { useState, CSSProperties } from "react";
import { DotLoader } from "react-spinners";
import "./loader.scss";

export default function Loader() {
  return (
    <div className="loader">
      <DotLoader
        color="blue"
        loading="true"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

// <div className="loader">
//   <div class="lds-ring">
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//   </div>
// </div>
