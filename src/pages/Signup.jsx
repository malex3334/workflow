import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

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
        <Input type="text" placeholder="name" />
        <Input type="text" placeholder="last name" />
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="repeat password" />
        <Button name="Sign up" type="submit" />
      </form>
    </div>
  );
}
