import { useState } from "react";
import { Mic } from "lucide-react";

function VoiceRecorder() {

  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    setRecording(!recording);
  };

  return (
    <div className="voice-card">

      <div className={recording ? "mic recording" : "mic"}>
        <Mic size={42} />
      </div>

      <h2>
        {recording
          ? "Listening..."
          : "Tell us about your problem"}
      </h2>

      <p>
        Speak naturally in English, Hindi or Marathi.
      </p>

      <button onClick={toggleRecording}>
        {recording ? "Stop Recording" : "Tap to Speak"}
      </button>

    </div>
  );
}

export default VoiceRecorder;