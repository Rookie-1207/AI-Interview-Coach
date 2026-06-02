import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Login and continue your interview prep.</p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email Address"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" style={{ width: "100%", marginTop: "12px" }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: "22px", color: "#cbd5e1" }}>
          New here? <Link to="/">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;