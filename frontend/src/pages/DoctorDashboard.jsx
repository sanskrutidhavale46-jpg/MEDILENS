
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [showSummary, setShowSummary] = useState(false);

  const intake = JSON.parse(
    localStorage.getItem("clinicalIntake") || "null"
  );

  const history = JSON.parse(
    localStorage.getItem("clinicalHistory") || "null"
  );

  const documents = JSON.parse(
    localStorage.getItem("medicalDocuments") || "[]"
  );

  const generateSummary = () => {
    setShowSummary(true);
  };

  return (
    <div className="doctor-page">

      {/* HEADER */}
      <header className="doctor-header">

        <div className="doctor-brand">

          <div className="doctor-logo">
            M
          </div>

          <div>
            <h1>MediLens</h1>
            <p>AI-Powered Clinical Care</p>
          </div>

        </div>

        <div className="doctor-profile">

          <div className="doctor-avatar">
            Dr
          </div>

          <div>
            <strong>Doctor Dashboard</strong>
            <span>CLINICAL REVIEW</span>
          </div>

        </div>

      </header>


      {/* MAIN */}
      <main className="doctor-container">

        {/* WELCOME */}
        <div className="doctor-welcome">

          <div>
            <span>CLINICAL OVERVIEW</span>

            <h2>Patient Clinical Summary</h2>

            <p>
              Review the patient's information collected
              through MediLens.
            </p>
          </div>

          <div className="doctor-ready">
            ✓ Ready for Review
          </div>

        </div>


        {/* STATS */}
        <div className="doctor-stats">

          <div className="doctor-stat">

            <div className="stat-icon blue">
              🩺
            </div>

            <div>
              <span>MAIN COMPLAINT</span>

              <strong>
                {intake?.complaint || "Not provided"}
              </strong>
            </div>

          </div>


          <div className="doctor-stat">

            <div className="stat-icon orange">
              🕒
            </div>

            <div>
              <span>DURATION</span>

              <strong>
                {intake?.duration || "Not provided"}
              </strong>
            </div>

          </div>


          <div className="doctor-stat">

            <div className="stat-icon purple">
              📄
            </div>

            <div>
              <span>DOCUMENTS</span>

              <strong>
                {documents.length}
              </strong>
            </div>

          </div>

        </div>


        {/* MAIN GRID */}
        <div className="doctor-grid">

          {/* LEFT CONTENT */}
          <div>

            {/* CLINICAL INTAKE */}
            <section className="doctor-card">

              <div className="doctor-card-header">

                <div>
                  <span>01</span>
                  <h3>Clinical Intake</h3>
                </div>

                <button
                  onClick={() =>
                    navigate("/clinical-intake")
                  }
                >
                  View
                </button>

              </div>

              <div className="doctor-detail">

                <label>Chief Complaint</label>

                <p>
                  {intake?.complaint || "Not provided"}
                </p>

              </div>

              <div className="doctor-detail-row">

                <div>

                  <label>Duration</label>

                  <p>
                    {intake?.duration || "Not provided"}
                  </p>

                </div>

                <div>

                  <label>Severity</label>

                  <p>
                    {intake?.severity || "Not provided"}
                  </p>

                </div>

              </div>

            </section>


            {/* CLINICAL HISTORY */}
            <section className="doctor-card">

              <div className="doctor-card-header">

                <div>
                  <span>02</span>
                  <h3>Clinical History</h3>
                </div>

                <button
                  onClick={() =>
                    navigate("/clinical-history")
                  }
                >
                  View
                </button>

              </div>


              <div className="doctor-history-grid">

                <div>

                  <label>Chief Complaint</label>

                  <p>
                    {history?.chiefComplaint ||
                      "Not provided"}
                  </p>

                </div>


                <div>

                  <label>Medicines</label>

                  <p>
                    {history?.medicines || "None"}
                  </p>

                </div>


                <div>

                  <label>Allergies</label>

                  <p>
                    {history?.allergies || "None"}
                  </p>

                </div>


                <div>

                  <label>Past History</label>

                  <p>
                    {history?.pastHistory || "None"}
                  </p>

                </div>

              </div>

            </section>


            {/* HPI */}
            <section className="doctor-card">

              <div className="doctor-card-header">

                <div>
                  <span>03</span>
                  <h3>History of Present Illness</h3>
                </div>

              </div>

              <div className="doctor-text-box">

                {history?.hpi ||
                  "No HPI information provided."}

              </div>

            </section>


            {/* FAMILY / PERSONAL */}
            <section className="doctor-card">

              <div className="doctor-card-header">

                <div>
                  <span>04</span>
                  <h3>Family & Personal History</h3>
                </div>

              </div>

              <div className="doctor-history-grid">

                <div>

                  <label>Family History</label>

                  <p>
                    {history?.familyHistory || "None"}
                  </p>

                </div>


                <div>

                  <label>Personal / Social History</label>

                  <p>
                    {history?.personalHistory || "None"}
                  </p>

                </div>

              </div>

            </section>


            {/* ROS */}
            <section className="doctor-card">

              <div className="doctor-card-header">

                <div>
                  <span>05</span>
                  <h3>Review of Systems</h3>
                </div>

              </div>

              <div className="doctor-text-box">

                {history?.ros ||
                  "No ROS information provided."}

              </div>

            </section>


            {/* DOCUMENTS */}
            <section className="doctor-card">

              <div className="doctor-card-header">

                <div>
                  <span>06</span>
                  <h3>Medical Documents</h3>
                </div>

                <button
                  onClick={() =>
                    navigate("/documents")
                  }
                >
                  View
                </button>

              </div>


              {documents.length > 0 ? (

                <div className="doctor-documents">

                  {documents.map((document) => (

                    <div
                      className="doctor-document"
                      key={document.id}
                    >

                      <div className="doctor-document-icon">
                        📄
                      </div>

                      <div>

                        <strong>
                          {document.name}
                        </strong>

                        <span>
                          {document.size} MB
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="doctor-empty">
                  No medical documents uploaded.
                </p>

              )}

            </section>

          </div>


          {/* RIGHT SIDEBAR */}
          <aside className="doctor-sidebar">


            {/* AI CARD */}
            <section className="doctor-ai-card">

              <div className="doctor-ai-icon">
                ✨
              </div>

              <span>MEDILENS AI</span>

              <h3>
                Clinical Information Summary
              </h3>

              <p>
                Generate an organized summary of the
                patient's collected clinical information.
              </p>

              <button
                onClick={generateSummary}
              >
                ✨ Generate AI Summary
              </button>

            </section>


            {/* AI SUMMARY RESULT */}
            {showSummary && (

              <section className="doctor-ai-result">

                <div className="ai-result-header">

                  <div>
                    <span>AI GENERATED</span>

                    <h3>
                      Clinical Summary
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setShowSummary(false)
                    }
                  >
                    ×
                  </button>

                </div>


                <div className="ai-summary-section">

                  <label>
                    🩺 Presenting Problem
                  </label>

                  <p>
                    {intake?.complaint ||
                      history?.chiefComplaint ||
                      "No complaint recorded."}
                  </p>

                </div>


                <div className="ai-summary-section">

                  <label>
                    🕒 Duration & Severity
                  </label>

                  <p>
                    Duration:{" "}
                    {intake?.duration || "Not provided"}
                  </p>

                  <p>
                    Severity:{" "}
                    {intake?.severity || "Not provided"}
                  </p>

                </div>


                <div className="ai-summary-section">

                  <label>
                    📋 Relevant History
                  </label>

                  <p>
                    {history?.pastHistory ||
                      "No significant past history provided."}
                  </p>

                </div>


                <div className="ai-summary-section">

                  <label>
                    💊 Current Medicines
                  </label>

                  <p>
                    {history?.medicines ||
                      "No medicines reported."}
                  </p>

                </div>


                <div className="ai-summary-section">

                  <label>
                    ⚠️ Allergies
                  </label>

                  <p>
                    {history?.allergies ||
                      "No allergies reported."}
                  </p>

                </div>


                <div className="ai-summary-section">

                  <label>
                    👨‍👩‍👧 Family / Personal History
                  </label>

                  <p>
                    {history?.familyHistory ||
                      "No family history provided."}
                  </p>

                </div>


                <div className="ai-summary-section">

                  <label>
                    🔎 Review of Systems
                  </label>

                  <p>
                    {history?.ros ||
                      "No ROS information provided."}
                  </p>

                </div>


                <div className="ai-note">

                  🤖 AI organizes patient-provided information
                  for clinician review. It does not provide
                  autonomous diagnosis.

                </div>

              </section>

            )}


            {/* COMPLETION */}
            <section className="doctor-side-card">

              <h3>
                Profile Completion
              </h3>

              <div className="doctor-side-progress">

                <div></div>

              </div>

              <strong>
                100%
              </strong>

              <p>
                Patient information collection completed.
              </p>

            </section>


            {/* SAFETY */}
            <section className="doctor-safety">

              <div>
                🔒
              </div>

              <div>

                <strong>
                  Patient Privacy
                </strong>

                <p>
                  Clinical information is organized
                  for authorized healthcare review.
                </p>

              </div>

            </section>

          </aside>

        </div>


        {/* ACTIONS */}
        <div className="doctor-actions">

          <button
            className="doctor-back"
            onClick={() =>
              navigate("/timeline")
            }
          >
            ← Medical Timeline
          </button>


          <button
            className="doctor-complete"
            onClick={() =>
              alert(
                "Clinical review completed for this demo."
              )
            }
          >
            ✓ Complete Clinical Review
          </button>

        </div>


        <p className="doctor-disclaimer">

          MediLens assists with clinical information collection
          and organization. It does not replace clinical judgment
          or provide autonomous diagnosis.

        </p>

      </main>

    </div>
  );
}

export default DoctorDashboard;

