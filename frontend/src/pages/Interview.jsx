import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Interview() {
  const [questions, setQuestions] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");

    if (savedQuestions) {
      setQuestions(savedQuestions);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("questions");
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="full-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div>
            <h1 className="title">Interview Questions</h1>
            <p className="subtitle">
              Personalized questions generated from your resume.
            </p>
          </div>

          <button onClick={logout}>Logout</button>
        </div>

        <div className="question-box">
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "15px",
              lineHeight: "1.8",
              margin: 0,
              color: "#e2e8f0",
            }}
          >
            {questions || "No questions generated yet."}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Interview;