const API_URL = "http://localhost:5000";

export async function testBackend() {
  const response = await fetch(`${API_URL}/`);
  return response.json();
}

export async function saveClinicalIntake(intakeData) {
  const response = await fetch(`${API_URL}/api/clinical-intake`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(intakeData),
  });

  if (!response.ok) {
    throw new Error("Failed to save clinical intake");
  }

  return response.json();
}

export async function saveClinicalHistory(historyData) {
  const response = await fetch(`${API_URL}/api/clinical-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(historyData),
  });

  if (!response.ok) {
    throw new Error("Failed to save clinical history");
  }

  return response.json();
}