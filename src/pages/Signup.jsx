import React from "react";

export default function Signup() {
  return (
    <div className="form-container">
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
        <button>Sign up</button>
      </form>
    </div>
  );
}
