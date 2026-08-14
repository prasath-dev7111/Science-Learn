import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useApp } from "../context/AppContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/login", { email, password });
      login(res.data.email || email);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-up">
        <div style={styles.brandIcon}>🔬</div>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to continue your learning journey</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>📧</span>
              <input
                type="email"
                className="input-field"
                style={{ paddingLeft: "2.5rem" }}
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPass ? "text" : "password"}
                className="input-field"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={styles.showPassBtn}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitBtn} disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : "Sign In →"}
          </button>
        </form>

        <p style={styles.switchLink}>
          Don't have an account? <Link to="/register" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>Register Free</Link>
        </p>
      </div>
    </div>
  );
}

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    try {
      await API.post("/register", { email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={styles.page}>
      <div style={{ ...styles.card, textAlign: "center" }} className="fade-up">
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: "0.5rem" }}>Account Created!</h2>
        <p style={{ color: "var(--text-muted)" }}>Redirecting you to login...</p>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-up">
        <div style={styles.brandIcon}>🧪</div>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join and start exploring science today</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>📧</span>
              <input
                type="email"
                className="input-field"
                style={{ paddingLeft: "2.5rem" }}
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type="password"
                className="input-field"
                style={{ paddingLeft: "2.5rem" }}
                placeholder="Min 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>🔑</span>
              <input
                type="password"
                className="input-field"
                style={{ paddingLeft: "2.5rem" }}
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitBtn} disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : "Create Account →"}
          </button>
        </form>

        <p style={styles.switchLink}>
          Already have an account? <Link to="/login" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 60px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99,179,237,0.06), transparent 70%)",
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "2.5rem",
    width: "100%",
    maxWidth: 440,
    boxShadow: "var(--shadow)",
  },
  brandIcon: { fontSize: "2rem", textAlign: "center", marginBottom: "1rem", display: "block" },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.75rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "0.35rem",
  },
  subtitle: { color: "var(--text-muted)", fontSize: "0.875rem", textAlign: "center", marginBottom: "1.75rem" },
  errorBox: {
    background: "rgba(252,129,129,0.1)",
    border: "1px solid rgba(252,129,129,0.3)",
    borderRadius: 8,
    padding: "0.65rem 1rem",
    fontSize: "0.85rem",
    color: "var(--accent-pink)",
    marginBottom: "1rem",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)" },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: {
    position: "absolute",
    left: "0.75rem",
    fontSize: "0.9rem",
    pointerEvents: "none",
    zIndex: 1,
  },
  showPassBtn: {
    position: "absolute",
    right: "0.75rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: 0,
  },
  submitBtn: {
    justifyContent: "center",
    padding: "0.8rem",
    fontSize: "1rem",
    marginTop: "0.5rem",
    width: "100%",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "1.5rem 0",
    color: "var(--text-muted)",
    fontSize: "0.8rem",
  },
  dividerText: { color: "var(--text-muted)" },
  demoBox: { textAlign: "center", marginBottom: "1rem" },
  demoBtn: {
    background: "var(--bg-card2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "0.5rem 1.25rem",
    color: "var(--text-muted)",
    fontSize: "0.85rem",
    cursor: "pointer",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  switchLink: { textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "1rem" },
};
