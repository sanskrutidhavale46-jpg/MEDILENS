import DocumentUpload from "../components/DocumentUpload";

function Documents() {

  return (
    <div className="page-container">

      <h1>Medical Documents</h1>

      <p>
        Upload your previous prescriptions,
        reports and discharge summaries.
      </p>

      <DocumentUpload />

    </div>
  );
}

export default Documents;