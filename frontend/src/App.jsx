import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Language from "./pages/Language";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Consent from "./pages/Consent";
import PatientHome from "./pages/PatientHome";
import ClinicalIntake from "./pages/ClinicalIntake";
import ClinicalHistory from "./pages/ClinicalHistory";
import Documents from "./pages/Documents";
import Timeline from "./pages/Timeline";
import PatientContext from "./pages/PatientContext";
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/language" element={<Language />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/consent" element={<Consent />} />

        <Route path="/patient-home" element={<PatientHome />} />

        <Route path="/clinical-intake" element={<ClinicalIntake />} />

        <Route path="/clinical-history" element={<ClinicalHistory />} />

        <Route path="/documents" element={<Documents />} />

        <Route path="/timeline" element={<Timeline />} />

        <Route path="/patient-context" element={<PatientContext />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
