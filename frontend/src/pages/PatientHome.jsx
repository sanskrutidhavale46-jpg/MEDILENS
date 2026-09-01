
import React from "react";
import { useNavigate } from "react-router-dom";

function PatientHome() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* HEADER */}
      <header className="home-header">

        <div className="home-brand">
          <div className="home-logo">M</div>

          <div>
            <h1>MediLens</h1>
            <p>AI-Powered Clinical Care</p>
          </div>
        </div>

        <div className="home-user">
          <div className="home-avatar">P</div>

          <div>
            <strong>Patient</strong>
            <span>PATIENT PORTAL</span>
          </div>
        </div>

      </header>


      {/* MAIN */}
      <main className="home-container">

        {/* HERO */}
        <section className="home-hero">

          <div>
            <span className="home-label">
              PATIENT PORTAL
            </span>

            <h2>Hello 👋</h2>

            <p>
              Let's build your clinical context so your doctor
              can understand your healthcare journey better.
            </p>
          </div>

          <div className="home-hero-icon">
            🩺
          </div>

        </section>


        {/* SECTION TITLE */}
        <div className="home-section-title">

          <div>
            <span>YOUR HEALTHCARE JOURNEY</span>

            <h3>Complete your clinical profile</h3>
          </div>

          <div className="home-progress-text">
            50%
          </div>

        </div>


        {/* PROGRESS */}
        <div className="home-progress">

          <div className="home-progress-fill"></div>

        </div>


        {/* CARDS */}
        <div className="home-cards">

          {/* INTAKE */}
          <div className="home-card">

            <div className="home-card-top">

              <div className="home-card-icon blue">
                🩺
              </div>

              <span className="home-card-number">
                01
              </span>

            </div>

            <h3>Clinical Intake</h3>

            <p>
              Tell us about your current health problem,
              symptoms, duration and severity.
            </p>

            <button
              onClick={() =>
                navigate("/clinical-intake")
              }
            >
              Start Intake →
            </button>

          </div>


          {/* HISTORY */}
          <div className="home-card">

            <div className="home-card-top">

              <div className="home-card-icon purple">
                📋
              </div>

              <span className="home-card-number">
                02
              </span>

            </div>

            <h3>Clinical History</h3>

            <p>
              Add your past medical history, medicines,
              allergies and family history.
            </p>

            <button
              onClick={() =>
                navigate("/clinical-history")
              }
            >
              View History →
            </button>

          </div>


          {/* DOCUMENTS */}
          <div className="home-card">

            <div className="home-card-top">

              <div className="home-card-icon green">
                📄
              </div>

              <span className="home-card-number">
                03
              </span>

            </div>

            <h3>Medical Documents</h3>

            <p>
              Upload prescriptions, laboratory reports
              and previous medical records.
            </p>

            <button
              onClick={() =>
                navigate("/documents")
              }
            >
              Upload Documents →
            </button>

          </div>


          {/* TIMELINE */}
          <div className="home-card">

            <div className="home-card-top">

              <div className="home-card-icon orange">
                🕒
              </div>

              <span className="home-card-number">
                04
              </span>

            </div>

            <h3>Medical Timeline</h3>

            <p>
              View your complete healthcare journey
              in one organized place.
            </p>

            <button
              onClick={() =>
                navigate("/timeline")
              }
            >
              View Timeline →
            </button>

          </div>

        </div>


        {/* SECURITY */}
        <section className="home-security">

          <div className="home-security-icon">
            🔒
          </div>

          <div>

            <strong>
              Your information is private
            </strong>

            <p>
              MediLens is designed to organize your clinical
              information securely and help doctors review it easily.
            </p>

          </div>

        </section>


        {/* DISCLAIMER */}
        <p className="home-disclaimer">
          MediLens assists with clinical information collection.
          It does not replace a doctor or provide autonomous diagnosis.
        </p>

      </main>

    </div>
  );
}

export default PatientHome;
