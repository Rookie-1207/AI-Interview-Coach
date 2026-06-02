import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Start your AI interview practice journey.</p>

        <form onSubmit={handleSubmit}>
          <input placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email Address" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <button type="submit" style={{ width: "100%", marginTop: "12px" }}>
            Create Account
          </button>
        </form>

        <p style={{ marginTop: "22px", color: "#cbd5e1" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;