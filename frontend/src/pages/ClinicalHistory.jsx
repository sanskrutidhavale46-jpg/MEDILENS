import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveClinicalHistory } from "../api";

function ClinicalHistory() {
  const navigate = useNavigate();

  const [chiefComplaint, setChiefComplaint] = useState("");
  const [hpi, setHpi] = useState("");
  const [pastHistory, setPastHistory] = useState("");
  const [medicines, setMedicines] = useState("");
  const [allergies, setAllergies] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [personalHistory, setPersonalHistory] = useState("");
  const [ros, setRos] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!chiefComplaint.trim()) {
      alert("Please enter the Chief Complaint.");
      return;
    }

    const clinicalHistory = {
      chiefComplaint,
      hpi,
      pastHistory,
      medicines,
      allergies,
      familyHistory,
      personalHistory,
      ros,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      // Send data to backend
      const response = await saveClinicalHistory(
        clinicalHistory
      );

      console.log("Clinical History Saved:", response);

      // Temporary local storage for Timeline / Doctor Dashboard
      localStorage.setItem(
        "clinicalHistory",
        JSON.stringify(clinicalHistory)
      );

      alert("Clinical history saved successfully.");

      navigate("/documents");

    } catch (error) {
      console.error("Clinical History Error:", error);

      alert(
        "Unable to save clinical history. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page">

      {/* HEADER */}
      <header className="history-header">

        <div className="history-brand">

          <div className="history-logo">
            M
          </div>

          <div>
            <h1>MediLens</h1>
            <p>AI-Powered Clinical Care</p>
          </div>

        </div>

        <div className="history-step">
          Step 3 of 5
        </div>

      </header>


      {/* MAIN */}
      <main className="history-container">

        {/* PROGRESS */}
        <div className="history-progress">

          <div className="history-progress-top">
            <span>Clinical History</span>
            <span>60% Complete</span>
          </div>

          <div className="history-progress-bar">
            <div className="history-progress-fill"></div>
          </div>

        </div>


        {/* TITLE */}
        <div className="history-title">

          <div className="history-title-icon">
            📋
          </div>

          <div>
            <span>STEP 3</span>

            <h2>Clinical History</h2>

            <p>
              Add your medical history so your doctor can
              understand your condition better.
            </p>
          </div>

        </div>


        {/* FORM CARD */}
        <section className="history-card">

          {/* CHIEF COMPLAINT */}
          <div className="history-field">

            <label>
              Chief Complaint
              <span>* Required</span>
            </label>

            <textarea
              value={chiefComplaint}
              onChange={(e) =>
                setChiefComplaint(e.target.value)
              }
              placeholder="What is the main reason for your visit?"
              rows="3"
            />

          </div>


          {/* HPI */}
          <div className="history-field">

            <label>
              History of Present Illness (HPI)
            </label>

            <textarea
              value={hpi}
              onChange={(e) =>
                setHpi(e.target.value)
              }
              placeholder="Describe when the problem started, how it progressed, associated symptoms, and anything that makes it better or worse."
              rows="5"
            />

          </div>


          {/* PAST HISTORY */}
          <div className="history-field">

            <label>
              Past Medical History
            </label>

            <textarea
              value={pastHistory}
              onChange={(e) =>
                setPastHistory(e.target.value)
              }
              placeholder="Previous illnesses, surgeries, hospitalizations, diabetes, hypertension, etc."
              rows="4"
            />

          </div>


          {/* MEDICINES */}
          <div className="history-field">

            <label>
              Current Medicines
            </label>

            <textarea
              value={medicines}
              onChange={(e) =>
                setMedicines(e.target.value)
              }
              placeholder="Enter medicine name, dose, and frequency if known."
              rows="3"
            />

          </div>


          {/* ALLERGIES */}
          <div className="history-field">

            <label>
              Allergies
            </label>

            <textarea
              value={allergies}
              onChange={(e) =>
                setAllergies(e.target.value)
              }
              placeholder="Medicine, food, environmental or other allergies."
              rows="3"
            />

          </div>


          {/* FAMILY + PERSONAL */}
          <div className="history-two-column">

            <div className="history-field">

              <label>
                Family History
              </label>

              <textarea
                value={familyHistory}
                onChange={(e) =>
                  setFamilyHistory(e.target.value)
                }
                placeholder="Important diseases in your family."
                rows="4"
              />

            </div>


            <div className="history-field">

              <label>
                Personal / Social History
              </label>

              <textarea
                value={personalHistory}
                onChange={(e) =>
                  setPersonalHistory(e.target.value)
                }
                placeholder="Smoking, alcohol, occupation, lifestyle, diet, etc."
                rows="4"
              />

            </div>

          </div>


          {/* ROS */}
          <div className="history-field">

            <label>
              Review of Systems (ROS)
            </label>

            <textarea
              value={ros}
              onChange={(e) =>
                setRos(e.target.value)
              }
              placeholder="Other symptoms such as fever, cough, headache, vomiting, weakness, breathing difficulty, etc."
              rows="4"
            />

          </div>


          {/* AI INFO */}
          <div className="history-ai">

            <div className="history-ai-icon">
              ✨
            </div>

            <div>

              <h3>
                AI-Assisted History
              </h3>

              <p>
                MediLens can identify missing clinical information
                and help organize the history for doctor review.
              </p>

            </div>

          </div>


          {/* ACTIONS */}
          <div className="history-actions">

            <button
              className="history-back"
              onClick={() =>
                navigate("/clinical-intake")
              }
              disabled={loading}
            >
              ← Back
            </button>

            <button
              className="history-save"
              onClick={handleSave}
              disabled={loading}
            >
              {loading
                ? "Saving Clinical History..."
                : "Save History & Continue →"}
            </button>

          </div>

        </section>


        {/* SECURITY */}
        <div className="history-security">
          🔒 Your clinical information is private and securely organized.
        </div>


        <p className="history-disclaimer">
          MediLens assists with clinical information collection.
          It does not replace a doctor or provide autonomous diagnosis.
        </p>

      </main>

    </div>
  );
}

export default ClinicalHistory;