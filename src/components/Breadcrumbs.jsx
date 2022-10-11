import React from "react";
import { NavLink } from "react-router-dom";

export default function Breadcrumbs({ data }) {
  return (
    <span className="dashboard-navi">
      <NavLink to="/dashboard">projects / </NavLink>
      <span>{data.project.name}</span>
    </span>
  );
}
