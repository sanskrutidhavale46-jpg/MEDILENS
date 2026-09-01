import { Upload, Camera } from "lucide-react";

function DocumentUpload() {

  return (
    <div className="document-upload">

      <Camera size={40} />

      <h2>Scan Medical Document</h2>

      <p>
        Take a photo or select a document
        from your phone.
      </p>

      <div className="upload-buttons">

        <button>
          <Camera size={20} />
          Take Photo
        </button>

        <label className="upload-button">
          <Upload size={20} />
          Upload File

          <input
            type="file"
            accept="image/*,.pdf"
            hidden
          />
        </label>

      </div>

    </div>
  );
}

export default DocumentUpload;