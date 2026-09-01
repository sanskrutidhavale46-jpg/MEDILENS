import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");

  const login = () => {
    if (!patientId) {
      alert("Please enter Patient ID");
      return;
    }

    localStorage.setItem("patientId", patientId);
    navigate("/consent");
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
      <h1>🏥 MediLens</h1>
      <h2>Patient Login</h2>

      <input
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        style={{ width: "100%", padding: 14, marginBottom: 15 }}
      />

      <button onClick={login} style={{ padding: 14, width: "100%" }}>
        Login
      </button>

      <p>New patient?</p>

      <button
        onClick={() => navigate("/register")}
        style={{ padding: 12, width: "100%" }}
      >
        Register
      </button>
    </div>
  );
}