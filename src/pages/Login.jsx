import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../context";

const testUser = {
  name: "Dwight Schrute",
  login: "dwight",
  email: "dwight@dunder.com",
  password: "dwight11",
  img: "https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg",
  type: "user",
  salary: "15000",
  projects: [1, 2],
};
const testCompany = {
  name: "Dunder Mifflin",
  img: "",
  login: "nasa_1",
  type: "company",
};

export default function Login() {
  const { user, setUser } = useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  console.log(name, email);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
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
        <button onClick={() => setUser(testUser)}>login as user</button> <br />
        <button onClick={() => setUser(testCompany)}>login as company</button>
      </div>
    </div>
  );
}
