import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      if (!resume) {
        alert("Please select your resume PDF first");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("resume", resume);

      await API.post("/resume/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await API.post(
        "/interview/generate",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("questions", res.data.interview.questions);
      navigate("/interview");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Check console/backend terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="full-card">
        <h1 className="title">AI Interview Coach</h1>
        <p className="subtitle">
          Upload your resume and generate personalized interview questions.
        </p>

        <div className="question-box">
          <h2>Upload Resume</h2>
          <p style={{ color: "#94a3b8" }}>
            Choose a PDF resume. We’ll parse it and prepare role-specific questions.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />

          {resume && (
            <p style={{ color: "#86efac" }}>
              Selected: {resume.name}
            </p>
          )}

          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating Questions..." : "Generate Interview Questions"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;