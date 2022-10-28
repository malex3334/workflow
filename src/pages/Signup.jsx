import React from "react";
import Button from "../components/Button";

export default function Signup() {
  return (
    <div
      className="form-container"
      style={{ flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ color: "red" }}>
        work in progress, please use Login in page
      </h2>
      <form className="form">
        <h2>Register new user / company </h2>
        <select name="" id="">
          <option value="company">company</option>
          <option value="user">user</option>
        </select>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="last name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="repeat password" />
        <Button name="Sign up" type="submit" />
      </form>
    </div>
  );
}
