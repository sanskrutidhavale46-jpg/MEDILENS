
import React from "react";
import { useNavigate } from "react-router-dom";

function Timeline() {
  const navigate = useNavigate();

  const intake = JSON.parse(
    localStorage.getItem("clinicalIntake") || "null"
  );

  const history = JSON.parse(
    localStorage.getItem("clinicalHistory") || "null"
  );

  const documents = JSON.parse(
    localStorage.getItem("medicalDocuments") || "[]"
  );

  return (
    <div className="timeline-page">

      {/* HEADER */}
      <header className="timeline-header">

        <div className="timeline-brand">

          <div className="timeline-logo">
            M
          </div>

          <div>
            <h1>MediLens</h1>
            <p>AI-Powered Clinical Care</p>
          </div>

        </div>

        <div className="timeline-step">
          Step 5 of 5
        </div>

      </header>


      {/* MAIN */}
      <main className="timeline-container">

        {/* TITLE */}
        <div className="timeline-title">

          <div className="timeline-title-icon">
            🕒
          </div>

          <div>

            <span>HEALTHCARE JOURNEY</span>

            <h2>Medical Timeline</h2>

            <p>
              Review your complete clinical information
              in one organized timeline.
            </p>

          </div>

        </div>


        {/* COMPLETION */}
        <div className="timeline-complete">

          <div className="timeline-complete-icon">
            ✓
          </div>

          <div>
            <strong>Clinical Profile Ready</strong>

            <p>
              Your information has been organized for
              healthcare professional review.
            </p>
          </div>

        </div>


        {/* TIMELINE */}
        <section className="timeline-card">

          <div className="timeline-line"></div>


          {/* PATIENT CONTEXT */}
          <div className="timeline-item">

            <div className="timeline-dot">
              ✓
            </div>

            <div className="timeline-content">

              <div className="timeline-item-top">

                <span className="timeline-category">
                  STEP 1
                </span>

                <span className="timeline-status">
                  Completed
                </span>

              </div>

              <h3>Patient Context</h3>

              <p>
                Basic patient information and healthcare
                context were completed.
              </p>

            </div>

          </div>


          {/* CLINICAL INTAKE */}
          <div className="timeline-item">

            <div className="timeline-dot">
              ✓
            </div>

            <div className="timeline-content">

              <div className="timeline-item-top">

                <span className="timeline-category">
                  STEP 2
                </span>

                <span className="timeline-status">
                  Completed
                </span>

              </div>

              <h3>Clinical Intake</h3>

              <div className="timeline-data">

                <div>
                  <span>Main Complaint</span>

                  <strong>
                    {intake?.complaint || "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>Duration</span>

                  <strong>
                    {intake?.duration || "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>Severity</span>

                  <strong>
                    {intake?.severity || "Not provided"}
                  </strong>
                </div>

              </div>

            </div>

          </div>


          {/* HISTORY */}
          <div className="timeline-item">

            <div className="timeline-dot">
              ✓
            </div>

            <div className="timeline-content">

              <div className="timeline-item-top">

                <span className="timeline-category">
                  STEP 3
                </span>

                <span className="timeline-status">
                  {history ? "Completed" : "Pending"}
                </span>

              </div>

              <h3>Clinical History</h3>

              {history ? (

                <div className="timeline-history">

                  <div>
                    <span>Chief Complaint</span>
                    <strong>
                      {history.chiefComplaint || "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Medicines</span>
                    <strong>
                      {history.medicines || "None"}
                    </strong>
                  </div>

                  <div>
                    <span>Allergies</span>
                    <strong>
                      {history.allergies || "None"}
                    </strong>
                  </div>

                </div>

              ) : (

                <p>
                  Clinical history has not been completed.
                </p>

              )}

            </div>

          </div>


          {/* DOCUMENTS */}
          <div className="timeline-item">

            <div className="timeline-dot">
              ✓
            </div>

            <div className="timeline-content">

              <div className="timeline-item-top">

                <span className="timeline-category">
                  STEP 4
                </span>

                <span className="timeline-status">
                  Completed
                </span>

              </div>

              <h3>Medical Documents</h3>

              <p>
                {documents.length > 0
                  ? `${documents.length} medical document${
                      documents.length !== 1 ? "s" : ""
                    } uploaded.`
                  : "No documents uploaded."}
              </p>

            </div>

          </div>


          {/* DOCTOR */}
          <div className="timeline-item last">

            <div className="timeline-dot doctor-dot">
              →
            </div>

            <div className="timeline-content">

              <div className="timeline-item-top">

                <span className="timeline-category">
                  NEXT
                </span>

                <span className="timeline-review">
                  Doctor Review
                </span>

              </div>

              <h3>Doctor Dashboard</h3>

              <p>
                Your organized clinical information is ready
                for healthcare professional review.
              </p>

            </div>

          </div>

        </section>


        {/* ACTIONS */}
        <div className="timeline-actions">

          <button
            className="timeline-back"
            onClick={() =>
              navigate("/documents")
            }
          >
            ← Back to Documents
          </button>

          <button
            className="timeline-doctor"
            onClick={() =>
              navigate("/doctor-dashboard")
            }
          >
            Open Doctor Dashboard →
          </button>

        </div>


        {/* SECURITY */}
        <div className="timeline-security">
          🔒 Your clinical information is private and securely organized.
        </div>


        <p className="timeline-disclaimer">
          MediLens assists with clinical information collection.
          It does not replace a doctor or provide autonomous diagnosis.
        </p>

      </main>

    </div>
  );
}

export default Timeline;