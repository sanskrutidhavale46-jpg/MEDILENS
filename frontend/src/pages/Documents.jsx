
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Documents() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newDocuments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2),
    }));

    setDocuments((prev) => [...prev, ...newDocuments]);
  };

  const removeDocument = (id) => {
    setDocuments((prev) =>
      prev.filter((document) => document.id !== id)
    );
  };

  const handleSave = () => {
    localStorage.setItem(
      "medicalDocuments",
      JSON.stringify(documents)
    );

    alert("Medical documents saved successfully.");

    navigate("/timeline");
  };

  return (
    <div className="documents-page">

      {/* HEADER */}
      <header className="documents-header">

        <div className="documents-brand">

          <div className="documents-logo">
            M
          </div>

          <div>
            <h1>MediLens</h1>
            <p>AI-Powered Clinical Care</p>
          </div>

        </div>

        <div className="documents-step">
          Step 4 of 5
        </div>

      </header>


      {/* MAIN */}
      <main className="documents-container">

        {/* PROGRESS */}
        <div className="documents-progress">

          <div className="documents-progress-top">
            <span>Medical Documents</span>
            <span>80% Complete</span>
          </div>

          <div className="documents-progress-bar">
            <div className="documents-progress-fill"></div>
          </div>

        </div>


        {/* TITLE */}
        <div className="documents-title">

          <div className="documents-title-icon">
            📄
          </div>

          <div>
            <h2>Medical Documents</h2>

            <p>
              Upload previous prescriptions, laboratory reports
              and medical records.
            </p>
          </div>

        </div>


        {/* UPLOAD CARD */}
        <section className="documents-card">

          <div className="documents-card-heading">

            <h3>Upload Medical Records</h3>

            <p>
              You can upload PDF, JPG, JPEG or PNG files.
            </p>

          </div>


          <label className="upload-box">

            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />

            <div className="upload-icon">
              ☁️
            </div>

            <h4>
              Click to upload documents
            </h4>

            <p>
              or select files from your computer
            </p>

            <span>
              PDF • JPG • JPEG • PNG
            </span>

          </label>

        </section>


        {/* DOCUMENT LIST */}
        {documents.length > 0 && (

          <section className="documents-card">

            <div className="documents-list-heading">

              <h3>
                Uploaded Documents
              </h3>

              <span>
                {documents.length} file
                {documents.length !== 1 ? "s" : ""}
              </span>

            </div>


            <div className="document-list">

              {documents.map((document) => (

                <div
                  className="document-item"
                  key={document.id}
                >

                  <div className="document-file-icon">
                    📄
                  </div>

                  <div className="document-info">

                    <h4>
                      {document.name}
                    </h4>

                    <p>
                      {document.size} MB
                    </p>

                  </div>

                  <button
                    className="document-remove"
                    onClick={() =>
                      removeDocument(document.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          </section>

        )}


        {/* AI INFO */}
        <div className="documents-ai">

          <div className="documents-ai-icon">
            ✨
          </div>

          <div>

            <h3>
              AI Document Assistance
            </h3>

            <p>
              MediLens can organize uploaded medical records
              so doctors can review important information more easily.
            </p>

          </div>

        </div>


        {/* ACTIONS */}
        <div className="documents-actions">

          <button
            className="documents-back"
            onClick={() =>
              navigate("/clinical-history")
            }
          >
            ← Back
          </button>

          <button
            className="documents-save"
            onClick={handleSave}
          >
            Save & Continue →
          </button>

        </div>


        {/* SECURITY */}
        <div className="documents-security">
          🔒 Your medical documents are private and secure.
        </div>

        <p className="documents-disclaimer">
          MediLens assists with clinical information collection.
          It does not replace a doctor or provide autonomous diagnosis.
        </p>

      </main>

    </div>
  );
}

export default Documents;
