import React from "react";

export default function Login() {
  return (
    <div className="form-container">
      <form className="form">
        <h2>Register new user / company </h2>

        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />

        <button>Log in</button>
      </form>
    </div>
  );
}
