import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Consent() {
  const navigate = useNavigate();

  const [consent, setConsent] = useState(false);

  const handleContinue = () => {
    if (!consent) {
      alert("Please provide consent to continue.");
      return;
    }

    localStorage.setItem("medilens_consent", "true");

    navigate("/patient-home");
  };

  return (
    <div className="consent-page">

      <div className="consent-card">

        <div className="consent-icon">
          🔐
        </div>

        <h1>Your Privacy Matters</h1>

        <p>
          MediLens collects your clinical information to help
          organize your medical history for your healthcare team.
        </p>

        <div className="consent-box">

          <h3>Information we may collect</h3>

          <ul>
            <li>Clinical history</li>
            <li>Voice responses</li>
            <li>Medical documents</li>
            <li>Medication and allergy information</li>
            <li>Investigation reports</li>
          </ul>

        </div>

        <label className="consent-check">

          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />

          <span>
            I understand and consent to the collection and
            processing of my information for this clinical workflow.
          </span>

        </label>

        <button onClick={handleContinue}>
          Give Consent & Continue
        </button>

      </div>

    </div>
  );
}

export default Consent;