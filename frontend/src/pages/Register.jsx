import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const register = () => {
    if (!name || !age) {
      alert("Please enter name and age");
      return;
    }

    localStorage.setItem("patientName", name);
    localStorage.setItem("patientAge", age);

    navigate("/consent");
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: "auto" }}>
      <h1>🏥 MediLens</h1>
      <h2>Patient Registration</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 14, marginBottom: 15 }}
      />

      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ width: "100%", padding: 14, marginBottom: 15 }}
      />

      <button onClick={register} style={{ padding: 14, width: "100%" }}>
        Create Patient Profile
      </button>
    </div>
  );
}