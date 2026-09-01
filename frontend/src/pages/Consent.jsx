import { useNavigate } from "react-router-dom";

function Consent() {
  const navigate = useNavigate();

  const acceptConsent = () => {
    localStorage.setItem("consent", "true");
    navigate("/patient");
  };

  return (
    <div className="page-container">

      <div className="consent-card">

        <h1>Your Privacy Matters</h1>

        <p>
          MediLens collects information from your conversation
          and medical documents to build your clinical history.
        </p>

        <p>
          Your information will be used only according to
          the healthcare workflow and permissions provided.
        </p>

        <label>
          <input type="checkbox" id="consent" />
          I understand and agree to provide consent.
        </label>

        <button onClick={acceptConsent}>
          Give Consent & Continue
        </button>

      </div>

    </div>
  );
}

export default Consent;