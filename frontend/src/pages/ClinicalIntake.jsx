import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveClinicalIntake } from "../api";

function ClinicalIntake() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("English");
  const [complaint, setComplaint] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!complaint.trim() || !duration.trim()) {
      alert("Please enter your main complaint and duration.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        language,
        complaint,
        duration,
        severity,
        createdAt: new Date().toISOString(),
      };

      // Send data to backend
      const response = await saveClinicalIntake(data);

      console.log("Clinical Intake Saved:", response);

      // Temporary local storage for frontend demo
      localStorage.setItem(
        "clinicalIntake",
        JSON.stringify(data)
      );

      alert("Clinical Intake saved successfully!");

      navigate("/clinical-history");

    } catch (error) {
      console.error("Clinical Intake Error:", error);

      alert(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intake-page">

      {/* HEADER */}
      <header className="intake-header">

        <div>
          <h1>MediLens</h1>
          <p>AI-Powered Clinical Care</p>
        </div>

        <div className="intake-step">
          Step 2 of 5
        </div>

      </header>


      {/* MAIN */}
      <main className="intake-container">

        {/* PROGRESS */}
        <div className="intake-progress">

          <div className="progress-top">
            <span>Clinical Intake</span>
            <span>40% Complete</span>
          </div>

          <div className="intake-progress-bar">
            <div className="intake-progress-fill"></div>
          </div>

        </div>


        {/* CARD */}
        <section className="intake-card">

          {/* TITLE */}
          <div className="intake-title">

            <div className="intake-main-icon">
              🩺
            </div>

            <div>
              <h2>Clinical Intake</h2>

              <p>
                Tell us about your current health problem.
              </p>
            </div>

          </div>


          {/* LANGUAGE */}
          <div className="intake-field">

            <label>
              Preferred Language
            </label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >

              <option value="English">
                English
              </option>

              <option value="मराठी">
                मराठी
              </option>

              <option value="हिन्दी">
                हिन्दी
              </option>

            </select>

          </div>


          {/* COMPLAINT */}
          <div className="intake-field">

            <div className="field-heading">

              <label>
                What is your main health problem?
              </label>

              <span>
                Required
              </span>

            </div>

            <textarea
              value={complaint}
              onChange={(e) =>
                setComplaint(e.target.value)
              }
              placeholder="Example: I have chest pain..."
              rows="5"
            />

            <button
              type="button"
              className="voice-button"
              onClick={() =>
                alert(
                  "Voice input will be connected with AI speech recognition."
                )
              }
            >
              🎙️ Speak
            </button>

          </div>


          {/* DURATION */}
          <div className="intake-field">

            <div className="field-heading">

              <label>
                How long have you had this problem?
              </label>

              <span>
                Required
              </span>

            </div>

            <input
              type="text"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              placeholder="Example: 2 days"
            />

          </div>


          {/* SEVERITY */}
          <div className="intake-field">

            <label>
              How severe is the problem?
            </label>

            <div className="severity-grid">

              <button
                type="button"
                className={`severity-button ${
                  severity === "Mild"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSeverity("Mild")
                }
              >
                <strong>🙂</strong>
                <span>Mild</span>
                <small>Manageable</small>
              </button>


              <button
                type="button"
                className={`severity-button ${
                  severity === "Moderate"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSeverity("Moderate")
                }
              >
                <strong>😐</strong>
                <span>Moderate</span>
                <small>Needs attention</small>
              </button>


              <button
                type="button"
                className={`severity-button ${
                  severity === "Severe"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSeverity("Severe")
                }
              >
                <strong>😣</strong>
                <span>Severe</span>
                <small>Very uncomfortable</small>
              </button>

            </div>

          </div>


          {/* AI INFO */}
          <div className="ai-info">

            <div className="ai-info-icon">
              ✨
            </div>

            <div>

              <h3>
                MediLens AI Assistance
              </h3>

              <p>
                Your answers help organize clinical
                information and identify important
                follow-up questions for healthcare
                professionals.
              </p>

            </div>

          </div>


          {/* CONTINUE */}
          <button
            className="intake-continue"
            onClick={handleStart}
            disabled={loading}
          >
            {loading
              ? "Saving Clinical Information..."
              : "Save & Continue →"}
          </button>


          {/* SECURITY */}
          <div className="intake-security">
            🔒 Your clinical information is private and secure.
          </div>

        </section>


        {/* DISCLAIMER */}
        <p className="intake-disclaimer">
          MediLens assists with clinical information
          collection. It does not replace a doctor or
          provide autonomous diagnosis.
        </p>

      </main>

    </div>
  );
}

export default ClinicalIntake;
