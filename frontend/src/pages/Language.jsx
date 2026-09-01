import React from "react";
import { useNavigate } from "react-router-dom";

function Language() {
  const navigate = useNavigate();

  const selectLanguage = (language) => {
    localStorage.setItem("medilens_language", language);
    navigate("/login");
  };

  return (
    <div className="language-page">

      <div className="language-card">

        <h1>Select Your Language</h1>

        <p>
          Choose your preferred language for MediLens
        </p>

        <div className="language-buttons">

          <button onClick={() => selectLanguage("Marathi")}>
            मराठी
          </button>

          <button onClick={() => selectLanguage("Hindi")}>
            हिंदी
          </button>

          <button onClick={() => selectLanguage("English")}>
            English
          </button>

        </div>

      </div>

    </div>
  );
}

export default Language;