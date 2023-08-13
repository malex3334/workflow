import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useGlobalContext } from "../context";
import useFetch from "../hooks/useFetch";
import { PropTypes } from "prop-types";
import Button from "../components/Button";
import Input from "../components/Input";

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
  const { setUser, trigger, setTrigger } = useGlobalContext();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { data } = useFetch("users/");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    const showError = () => {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    };
    e.preventDefault();
    const result = data.users.filter(({ login: log }) => log.includes(login));

    if (result.length > 0 && result[0].password === password) {
      setLoading(true);
      setTimeout(() => {
        setUser(result[0]);
        navigate("/");
      }, 1500);
    } else showError();

    if (result.length === 0) {
      showError();
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="login-container">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Login </h2>

        <Input
          placeholder="login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button name="Log in" />
        {error && (
          <span className="incorrect-password">
            incorrect login or password
          </span>
        )}
      </form>

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
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontWeight: "bold" }}>Testing credentials:</h2>
          <h4 style={{ fontWeight: "bold", margin: "1rem 0" }}>user:</h4>
          <p>login: dwight</p>
          <p>password: dwight11</p>
          <Button
            name="login as user"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              setUser(testUser);
              setTrigger(!trigger);
              navigate("/");
            }}
          />

          <h4 style={{ fontWeight: "bold", margin: "1rem 0" }}>company:</h4>
          <p>login: dunder</p>
          <p>password: michael1</p>
          <Button
            name="login as company"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              setUser(testCompany);
              setTrigger(!trigger);

              navigate("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  user: PropTypes.object,
  login: PropTypes.string.isRequired,
  password: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};
