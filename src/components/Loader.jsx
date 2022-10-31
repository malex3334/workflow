import React from "react";
import { BeatLoader } from "react-spinners";
import "../index.scss";

export default function Loader() {
  return (
    <div className="loader">
      <BeatLoader
        color="#00d060"
        loading="true"
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
