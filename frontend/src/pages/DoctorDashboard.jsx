import {
  AlertTriangle,
  FileText,
  Clock,
  ShieldCheck
} from "lucide-react";

function DoctorDashboard() {

  return (
    <div className="doctor-dashboard">

      <header className="doctor-header">

        <div>
          <h1>MediLens</h1>
          <p>Doctor Dashboard</p>
        </div>

        <button>
          Search Patient
        </button>

      </header>

      <div className="patient-header">

        <h2>Rahul Patil</h2>

        <p>
          Patient ID: P001 · 52 years · Male
        </p>

      </div>

      <div className="doctor-grid">

        <section className="context-card">

          <h3>Current Complaint</h3>

          <h2>Chest pain × 2 days</h2>

          <p>
            Trigger: Walking / exertion
          </p>

        </section>

        <section className="context-card">

          <h3>Relevant History</h3>

          <p>Diabetes</p>
          <p>Previous hospitalization</p>

        </section>

        <section className="context-card">

          <h3>Medications</h3>

          <p>Metformin 500 mg</p>

          <div className="warning">
            ⚠ Medication discrepancy
          </div>

        </section>

        <section className="context-card">

          <h3>Investigations</h3>

          <p>HbA1c: 8.4%</p>

          <small>
            Source: LabReport_June2026
          </small>

        </section>

        <section className="context-card safety">

          <AlertTriangle />

          <h3>Safety-Relevant Pattern</h3>

          <p>
            Chest pain + breathlessness
          </p>

          <strong>
            Human assessment recommended
          </strong>

        </section>

        <section className="context-card">

          <Clock />

          <h3>Timeline</h3>

          <p>
            View longitudinal patient history
          </p>

        </section>

      </div>

      <div className="verification-section">

        <h2>Doctor Verification</h2>

        <button>
          ✓ Verify
        </button>

        <button>
          ✏ Edit
        </button>

        <button>
          ✕ Reject
        </button>

        <button>
          + Add Note
        </button>

      </div>

    </div>
  );
}

export default DoctorDashboard;