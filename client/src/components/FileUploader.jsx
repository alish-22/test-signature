import { useState } from "react";

function FileUploader({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
      onFileSelect(file); // Send file to parent (Dashboard)
    } else {
      setSelectedFile(null);
      setError("Please select a valid PDF file.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <label className="block text-gray-700 mb-2 font-semibold">
        Upload PDF Document
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-3"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {selectedFile && (
        <p className="text-sm text-green-700">✅ {selectedFile.name}</p>
      )}
    </div>
  );
}

export default FileUploader;