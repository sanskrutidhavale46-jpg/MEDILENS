import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      <div className="welcome-card">

        <div className="logo">
          🩺
        </div>

        <h1>Welcome to MediLens</h1>

        <h2>
          AI-Powered Clinical Intake & Patient Context Platform
        </h2>

        <p className="tagline">
          Less time collecting the story.
          <br />
          More time understanding the patient.
        </p>

        <button
          className="start-button"
          onClick={() => navigate("/language")}
        >
          Start Clinical Intake
        </button>

      </div>

    </div>
  );
}

export default Welcome;