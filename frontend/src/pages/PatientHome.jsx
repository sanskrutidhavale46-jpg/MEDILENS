import { useNavigate } from "react-router-dom";
import {
  Mic,
  FileText,
  History,
  Clock
} from "lucide-react";

function PatientHome() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <header>
        <h1>MediLens</h1>
        <span>Patient</span>
      </header>

      <h2>Hello 👋</h2>

      <p>
        Let's build your clinical context.
      </p>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/clinical-intake")}
        >
          <Mic size={32} />
          <h3>Start Clinical Intake</h3>
          <p>Tell us about your current problem.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/documents")}
        >
          <FileText size={32} />
          <h3>Medical Documents</h3>
          <p>Upload previous medical records.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/clinical-history")}
        >
          <History size={32} />
          <h3>Clinical History</h3>
          <p>View your saved medical history.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/timeline")}
        >
          <Clock size={32} />
          <h3>Medical Timeline</h3>
          <p>View your healthcare journey.</p>
        </div>

      </div>

    </div>
  );
}

export default PatientHome;