import React from "react";
import { BeatLoader } from "react-spinners";
import "./loader.scss";

export default function Loader() {
  return (
    <div className="loader">
      <BeatLoader
        // color="#4b6cb7"
        color="#00d060"
        loading="true"
        size={15}
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
