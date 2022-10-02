import { FaArrowUp, FaArrowDown, FaExclamation } from "react-icons/fa";

export const convertPriority = (source) => {
  switch (source) {
    case "normal":
      return <FaArrowUp />;
    case "high":
      return <FaArrowUp style={{ fill: "red" }} />;
    case "very high":
      return <FaExclamation style={{ fill: "red" }} />;
    case "low":
      return <FaArrowDown style={{ fill: "lightgreen" }} />;
    case "very low":
      return <FaArrowDown style={{ fill: "red" }} />;
  }
};
