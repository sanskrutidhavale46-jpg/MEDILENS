import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function ClinicalIntake() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("English");
  const [complaint, setComplaint] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    if (!complaint.trim() || !duration.trim()) {
      alert("Please enter your main complaint and duration.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const data = {
        language,
        complaint,
        duration,
        severity,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "clinicalIntake",
        JSON.stringify(data)
      );

      setLoading(false);
      navigate("/clinical-history");
    }, 700);
  };

  return (
    <div className="intake-page">

      {/* Header */}
      <header className="intake-header">

        <div>
          <h1>MediLens</h1>
          <p>AI-Powered Clinical Care</p>
        </div>

        <div className="intake-step">
          Step 2 of 5
        </div>

      </header>

      {/* Main */}
      <main className="intake-container">

        {/* Progress */}
        <div className="intake-progress">

          <div className="progress-top">
            <span>Clinical Intake</span>
            <span>40% Complete</span>
          </div>

          <div className="intake-progress-bar">
            <div className="intake-progress-fill"></div>
          </div>

        </div>

        {/* Card */}
        <div className="intake-card">

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

          {/* Language */}
          <div className="intake-field">

            <label>
              Preferred Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="मराठी">मराठी</option>
              <option value="हिन्दी">हिन्दी</option>
            </select>

          </div>

          {/* Complaint */}
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
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Example: I have chest pain since yesterday..."
              rows={5}
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
              🎙️ Speak your problem
            </button>

          </div>

          {/* Duration */}
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
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Example: 2 days, 1 week, 3 months..."
            />

          </div>

          {/* Severity */}
          <div className="intake-field">

            <label>
              How severe is your problem?
            </label>

            <div className="severity-grid">

              <button
                type="button"
                className={
                  severity === "Mild"
                    ? "severity-button selected"
                    : "severity-button"
                }
                onClick={() => setSeverity("Mild")}
              >
                <strong>😊</strong>
                <span>Mild</span>
                <small>Low discomfort</small>
              </button>

              <button
                type="button"
                className={
                  severity === "Moderate"
                    ? "severity-button selected"
                    : "severity-button"
                }
                onClick={() => setSeverity("Moderate")}
              >
                <strong>😐</strong>
                <span>Moderate</span>
                <small>Noticeable discomfort</small>
              </button>

              <button
                type="button"
                className={
                  severity === "Severe"
                    ? "severity-button selected"
                    : "severity-button"
                }
                onClick={() => setSeverity("Severe")}
              >
                <strong>😣</strong>
                <span>Severe</span>
                <small>High discomfort</small>
              </button>

            </div>

          </div>

          {/* AI Information */}
          <div className="ai-info">

            <div className="ai-info-icon">
              ✨
            </div>

            <div>
              <h3>AI-Assisted Intake</h3>

              <p>
                MediLens can identify missing information and help
                organize your answers for the doctor.
              </p>
            </div>

          </div>

          {/* Continue */}
          <button
            type="button"
            className="intake-continue"
            onClick={handleStart}
            disabled={loading}
          >
            {loading
              ? "Preparing Clinical History..."
              : "Continue to Clinical History →"}
          </button>

        </div>

        {/* Security */}
        <div className="intake-security">
          🔒 Your medical information is handled securely.
        </div>

        {/* Disclaimer */}
        <p className="intake-disclaimer">
          MediLens assists with clinical information collection.
          It does not replace a doctor or provide autonomous diagnosis.
        </p>

      </main>
    </div>
  );
}

export default ClinicalIntake;
