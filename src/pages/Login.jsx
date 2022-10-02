import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const testUser = {
  id: "2",
  login: "dwight",
  name: "Dwight Schrute",
  email: "dwight@dunder.com",
  password: "dwight11",
  img: "https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg",
  type: "user",
};
const testCompany = {
  id: "100",
  login: "nasa1",
  email: "dunder@dunder.com",
  name: "Dunder Mifflin",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Dunder_Mifflin%2C_Inc.svg/1920px-Dunder_Mifflin%2C_Inc.svg.png",
  type: "company",
};

export default function Login() {
  const { user, setUser } = useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  console.log(name, email);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
    navigate("/");
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => handleSubmit}>
        <h2>Login </h2>

        <input
          type="email"
          placeholder="email"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button>Log in</button>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "2rem",
        }}
        className="test"
      >
        <h2 style={{ textAlign: "center" }}>testing utils</h2> <br />
        <button
          onClick={() => {
            setUser(testUser);
            navigate("/");
          }}
        >
          login as user
        </button>{" "}
        <br />
        <button onClick={() => setUser(testCompany)}>login as company</button>
      </div>
    </div>
  );
}
