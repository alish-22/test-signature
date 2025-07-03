import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FileUploader from "../components/FileUploader";

// React-PDF imports
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    console.log("📄 PDF file selected:", file);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Welcome, {user?.name || user?.email || "Guest"}!
        </h1>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* File Upload */}
        <FileUploader onFileSelect={handleFileSelect} />

        {/* PDF Preview */}
        {uploadedFile && (
          <div className="mt-6 border rounded shadow p-3 bg-white">
            <Document
              file={uploadedFile}
              onLoadError={(e) => console.error("PDF Load Error", e)}
            >
              <Page pageNumber={1} />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;