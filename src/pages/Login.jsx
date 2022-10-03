import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import useFetch from "../hooks/useFetch";

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
  const [login, setLogin] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { data } = useFetch("users/");
  const [error, setError] = useState(false);

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = data.users.filter(({ login: log }) => log.includes(login)); // navigate("/");
    console.log(result[0].password);
    if (result[0].password === password) {
      setUser(result[0]);
      navigate("/");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Login </h2>

        <input
          type="text"
          placeholder="login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Log in</button>
        {error && (
          <span className="incorrect-password">
            incorrect login or password
          </span>
        )}
      </form>
      {/* login shortcut for testing */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        <button
          onClick={() => {
            setUser(testCompany);
            navigate("/");
          }}
        >
          login as company
        </button>
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontWeight: "bold" }}>Testing credentials:</h2>
          <h4 style={{ fontWeight: "bold", margin: "1rem 0" }}>user:</h4>
          <p>login: dwight</p>
          <p>password: dwight11</p>
          <h4 style={{ fontWeight: "bold", margin: "1rem 0" }}>company:</h4>
          <p>login: dunder</p>
          <p>password: michael1</p>
        </div>
      </div>
    </div>
  );
}
