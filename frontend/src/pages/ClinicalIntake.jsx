import VoiceRecorder from "../components/VoiceRecorder";
import QuestionCard from "../components/QuestionCard";

function ClinicalIntake() {
  return (
    <div className="intake-page">

      <div className="intake-header">

        <h1>Clinical Intake</h1>

        <p>
          Tell MediLens about your problem naturally.
        </p>

      </div>

      <div className="progress">
        <div className="progress-bar"></div>
      </div>

      <VoiceRecorder />

      <QuestionCard />

    </div>
  );
}

export default ClinicalIntake;