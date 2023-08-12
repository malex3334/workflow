import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  let navigate = useNavigate();

  return (
    <div className="landing-container">
      <h2 className="landing-container__title">Jira Clone Project</h2>
      <div className="landing-container__body">
        <div className="">
          <img
            className="img"
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
        <div className="landing-container__paragraph">
          <h3>Hello!</h3>
          <p>
            Welcome on my Jira Clone training project. It was designed and made
            for React practice purposes. Hope you like it! <br />
            <span className="warning">
              To test the app please click log in button and use one of testing
              accounts.
            </span>
          </p>
          <Button
            classes="btn-save"
            name="log in"
            onClick={() => {
              navigate("/login");
            }}
            style={{
              fontSize: "2rem",
              display: "block",
              margin: "1rem auto 5rem auto",
              padding: "1rem 2rem 1rem 2rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
