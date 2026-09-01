function ClinicalHistory() {

  return (
    <div className="page-container">

      <h1>My Clinical History</h1>

      <section className="history-section">

        <h2>Current Complaint</h2>

        <div className="history-card">
          Chest pain
          <span>2 days</span>
        </div>

      </section>

      <section className="history-section">

        <h2>Medical History</h2>

        <div className="history-card">
          Diabetes
          <span>Patient reported</span>
        </div>

      </section>

      <section className="history-section">

        <h2>Medications</h2>

        <div className="history-card">
          Metformin 500 mg
          <span>Verification pending</span>
        </div>

      </section>

      <section className="history-section">

        <h2>Allergies</h2>

        <div className="history-card">
          No verified allergy recorded
        </div>

      </section>

    </div>
  );
}

export default ClinicalHistory;