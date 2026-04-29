import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";

const REQUIREMENTS = [
  { label: "At least 8 characters", test: p => p.length >= 8 },
  { label: "Lowercase letters", test: p => /[a-z]/.test(p) },
  { label: "Uppercase letters", test: p => /[A-Z]/.test(p) },
  { label: "Numbers", test: p => /[0-9]/.test(p) },
  { label: "Special characters (!@#$%^&*)", test: p => /[!@#$%^&*]/.test(p) },
];

function PasswordInput({ label, name, value, onChange, onBlur, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 500,
        letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase", marginBottom: 10,
        fontFamily: "'DM Sans', sans-serif"
      }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          className="elivium-input"
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{ paddingRight: 50 }}
          required
        />
        {value && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            style={{
              position: "absolute", right: 16, top: "50%",
              transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.3)", padding: 4,
              transition: "color 0.2s"
            }}
            onMouseEnter={e => e.target.style.color = "rgba(212,175,55,0.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
          >
            {show ? (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.17.42-2.26 1.12-3.18M6.1 6.1A8.965 8.965 0 0112 5c5 0 9 4 9 7 0 1.47-.57 2.83-1.5 3.93M3 3l18 18" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const { signup } = useAuth();

  const failedReqs = REQUIREMENTS.filter(r => !r.test(form.password));
  const passwordOk = failedReqs.length === 0;
  const passwordStrength = REQUIREMENTS.filter(r => r.test(form.password)).length;

  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Perfect"];

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!passwordOk) {
      setError("Password does not meet all requirements");
      setLoading(false);
      return;
    }
    const result = await signup({ name: form.name, email: form.email, password: form.password, passwordConfirm: form.passwordConfirm });
    setLoading(false);
    if (!result.success) setError(result.error);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#080808",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      padding: "40px 24px"
    }}>
      {/* Animated background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-15%", right: "-5%",
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            position: "absolute", bottom: "-10%", left: "-10%",
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}>
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#d4af37" strokeWidth="0.5" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#d4af37" strokeWidth="0.5" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#d4af37" strokeWidth="0.5" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#d4af37" strokeWidth="0.5" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #d4af37, transparent)" }} />
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Join</p>
              <h1 style={{ fontSize: 32, fontWeight: 300, color: "#fff", margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>Elivium</h1>
            </div>
            <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #d4af37, transparent)" }} />
          </div>
        </motion.div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: 24,
            padding: "44px 40px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
            @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
            .elivium-input {
              width: 100%;
              background: rgba(255,255,255,0.04);
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 12px;
              padding: 16px 18px;
              color: #fff;
              font-size: 15px;
              font-family: 'DM Sans', sans-serif;
              outline: none;
              transition: all 0.3s ease;
              box-sizing: border-box;
            }
            .elivium-input:focus {
              border-color: rgba(212,175,55,0.5);
              background: rgba(212,175,55,0.04);
              box-shadow: 0 0 0 4px rgba(212,175,55,0.06), inset 0 1px 0 rgba(212,175,55,0.1);
            }
            .elivium-input::placeholder { color: rgba(255,255,255,0.2); }
            .elivium-btn {
              width: 100%;
              padding: 16px;
              background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
              background-size: 200% 200%;
              border: none;
              border-radius: 12px;
              color: #0a0a0a;
              font-size: 13px;
              font-weight: 600;
              letter-spacing: 0.15em;
              text-transform: uppercase;
              cursor: pointer;
              font-family: 'DM Sans', sans-serif;
              transition: all 0.3s ease;
            }
            .elivium-btn:hover:not(:disabled) {
              transform: translateY(-1px);
              box-shadow: 0 8px 25px rgba(212,175,55,0.3);
            }
            .elivium-btn:disabled { opacity: 0.5; cursor: not-allowed; }
          `}</style>

          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 300, margin: "0 0 6px", letterSpacing: "0.05em" }}>Create Account</h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 32px", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Start your luxury fashion journey
          </p>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{
                  padding: "14px 18px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 12, color: "#fca5a5", fontSize: 13,
                  marginBottom: 24, fontFamily: "'DM Sans', sans-serif"
                }}
              >{error}</motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: 18 }}>
              {/* Full Name */}
              <div>
                <label style={{
                  display: "block", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase", marginBottom: 10,
                  fontFamily: "'DM Sans', sans-serif"
                }}>Full Name</label>
                <input className="elivium-input" name="name" value={form.name} onChange={handle} placeholder="Your full name" required />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: "block", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase", marginBottom: 10,
                  fontFamily: "'DM Sans', sans-serif"
                }}>Email Address</label>
                <input className="elivium-input" name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
              </div>

              {/* Password */}
              <div>
                <PasswordInput
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handle}
                  onBlur={() => setPasswordBlurred(true)}
                  placeholder="Create a strong password"
                />

                {/* Strength bar */}
                {form.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    style={{ marginTop: 12 }}
                  >
                    <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                      {[1,2,3,4,5].map(i => (
                        <div key={i} style={{
                          flex: 1, height: 3, borderRadius: 4,
                          background: i <= passwordStrength
                            ? strengthColors[passwordStrength - 1]
                            : "rgba(255,255,255,0.06)",
                          transition: "background 0.3s ease"
                        }} />
                      ))}
                    </div>
                    {passwordStrength > 0 && (
                      <p style={{
                        fontSize: 11, color: strengthColors[passwordStrength - 1],
                        fontFamily: "'DM Sans', sans-serif", margin: 0,
                        transition: "color 0.3s"
                      }}>
                        {strengthLabels[passwordStrength]}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Requirements — show on blur if not met */}
                <AnimatePresence>
                  {passwordBlurred && !passwordOk && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: "hidden", marginTop: 10 }}
                    >
                      <div style={{
                        background: "rgba(239,68,68,0.06)",
                        border: "1px solid rgba(239,68,68,0.12)",
                        borderRadius: 10, padding: "12px 14px"
                      }}>
                        {failedReqs.map(r => (
                          <p key={r.label} style={{
                            fontSize: 12, color: "rgba(252,165,165,0.8)",
                            fontFamily: "'DM Sans', sans-serif",
                            margin: "3px 0", display: "flex", alignItems: "center", gap: 8
                          }}>
                            <span style={{ color: "#ef4444", fontSize: 10 }}>✕</span>
                            {r.label}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Confirm Password */}
              <div>
                <PasswordInput
                  label="Confirm Password"
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handle}
                  placeholder="Repeat your password"
                />
                <AnimatePresence>
                  {form.passwordConfirm && form.password !== form.passwordConfirm && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        fontSize: 12, color: "rgba(252,165,165,0.8)",
                        fontFamily: "'DM Sans', sans-serif",
                        margin: "8px 0 0", display: "flex", alignItems: "center", gap: 8
                      }}
                    >
                      <span style={{ color: "#ef4444", fontSize: 10 }}>✕</span>
                      Passwords do not match
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              className="elivium-btn"
              type="submit"
              disabled={loading || !passwordOk || !form.name || !form.email}
              style={{ marginTop: 28 }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#d4af37", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => e.target.style.opacity = "0.7"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >Sign in</Link>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: "center", color: "rgba(255,255,255,0.1)",
            fontSize: 11, marginTop: 24, letterSpacing: "0.1em",
            fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase"
          }}
        >
          © 2026 Elivium Store
        </motion.p>
      </motion.div>
    </div>
  );
}