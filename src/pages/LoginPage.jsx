import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export function LoginPage({ onSuccess }) {
  const { login, authLoading } = useAuth();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#378ADD", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="3"  y="3"  width="8" height="8" rx="1.5" fill="white" />
              <rect x="13" y="3"  width="8" height="8" rx="1.5" fill="white" opacity=".6" />
              <rect x="3"  y="13" width="8" height="8" rx="1.5" fill="white" opacity=".6" />
              <rect x="13" y="13" width="8" height="8" rx="1.5" fill="white" />
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 6px", letterSpacing: "-0.02em" }}>AdminKit</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14, margin: 0 }}>Sign in to your account</p>
        </div>

        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "28px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--color-text-secondary)" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@demo.com" required style={{ width: "100%", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--color-text-secondary)" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: "100%", boxSizing: "border-box" }} />
            </div>

            {error && (
              <div style={{ background: "var(--color-background-danger)", color: "var(--color-text-danger)", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-md)", padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={authLoading} style={{ width: "100%", padding: 10, background: "#378ADD", color: "white", border: "none", borderRadius: "var(--border-radius-md)", fontSize: 14, fontWeight: 500, cursor: authLoading ? "not-allowed" : "pointer", opacity: authLoading ? 0.7 : 1 }}>
              {authLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 20, marginBottom: 0 }}>
            Demo: admin@demo.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
