import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary database
let clinicalHistories = [];
let medicalDocuments = [];

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MediLens Backend is running 🚀",
  });
});
// Temporary Clinical Intake Database
let clinicalIntakes = [];

// Save Clinical Intake
app.post("/api/clinical-intake", (req, res) => {
  const intake = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  clinicalIntakes.push(intake);

  res.status(201).json({
    success: true,
    message: "Clinical intake saved successfully",
    data: intake,
  });
});

// Get Clinical Intake
app.get("/api/clinical-intake", (req, res) => {
  res.json({
    success: true,
    data: clinicalIntakes,
  });
});

// Save Clinical History
app.post("/api/clinical-history", (req, res) => {
  const history = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  clinicalHistories.push(history);

  res.status(201).json({
    success: true,
    message: "Clinical history saved successfully",
    data: history,
  });
});

// Get Clinical History
app.get("/api/clinical-history", (req, res) => {
  res.json({
    success: true,
    data: clinicalHistories,
  });
});

// Save Documents
app.post("/api/documents", (req, res) => {
  const document = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  medicalDocuments.push(document);

  res.status(201).json({
    success: true,
    message: "Medical document saved successfully",
    data: document,
  });
});

// Get Documents
app.get("/api/documents", (req, res) => {
  res.json({
    success: true,
    data: medicalDocuments,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(
    `🚀 MediLens Backend running on http://localhost:${PORT}`
  );
});