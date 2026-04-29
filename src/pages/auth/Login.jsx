import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const location = useLocation();
  const successMessage = location.state?.message;
  const prefillEmail = location.state?.email || "";

  const [form, setForm] = useState({ email: prefillEmail, password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const { login } = useAuth();

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    const result = await login(form);
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
      fontFamily: "'Cormorant Garamond', Georgia, serif"
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none"
      }}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-10%", left: "-5%",
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute", bottom: "-10%", right: "-5%",
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            position: "absolute", top: "40%", right: "20%",
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
        {/* Decorative lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#d4af37" strokeWidth="0.5" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#d4af37" strokeWidth="0.5" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#d4af37" strokeWidth="0.5" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#d4af37" strokeWidth="0.5" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 440, padding: "0 24px", position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 8
          }}>
            <div style={{
              width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #d4af37, transparent)"
            }} />
            <div>
              <p style={{
                fontSize: 11, letterSpacing: "0.4em", color: "#d4af37",
                textTransform: "uppercase", margin: 0, fontFamily: "'DM Sans', sans-serif"
              }}>Welcome to</p>
              <h1 style={{
                fontSize: 36, fontWeight: 300, color: "#fff", margin: 0,
                letterSpacing: "0.15em", textTransform: "uppercase"
              }}>Elivium</h1>
            </div>
            <div style={{
              width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #d4af37, transparent)"
            }} />
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
            padding: "48px 40px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Card shimmer */}
          <div style={{
            position: "absolute", top: 0, left: "-100%",
            width: "60%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.03), transparent)",
            transform: "skewX(-15deg)",
            animation: "shimmer 4s ease-in-out infinite"
          }} />

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
            @keyframes shimmer { 0%{left:-100%} 50%{left:150%} 100%{left:150%} }
            @keyframes pulse-border { 0%,100%{border-color:rgba(212,175,55,0.3)} 50%{border-color:rgba(212,175,55,0.6)} }
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
              position: relative;
              overflow: hidden;
            }
            .elivium-btn:hover {
              background-position: right center;
              transform: translateY(-1px);
              box-shadow: 0 8px 25px rgba(212,175,55,0.3);
            }
            .elivium-btn:active { transform: translateY(0); }
            .elivium-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
          `}</style>

          <h2 style={{
            color: "#fff", fontSize: 24, fontWeight: 300,
            margin: "0 0 8px", letterSpacing: "0.05em"
          }}>Sign In</h2>
          <p style={{
            color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 36px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 300
          }}>Enter your credentials to continue</p>

          {/* Success message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                style={{
                  padding: "14px 18px",
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 12,
                  color: "#6ee7b7",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                ✓ {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

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
                  borderRadius: 12,
                  color: "#fca5a5",
                  fontSize: 13,
                  marginBottom: 24,
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase", marginBottom: 10,
                fontFamily: "'DM Sans', sans-serif"
              }}>Email Address</label>
              <input
                className="elivium-input"
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                placeholder="your@email.com"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
              />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: 12 }}>
              <label style={{
                display: "block", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase", marginBottom: 10,
                fontFamily: "'DM Sans', sans-serif"
              }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="elivium-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handle}
                  placeholder="••••••••"
                  style={{ paddingRight: 50 }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  required
                />
                {form.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
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
                    {showPassword ? (
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

            <div style={{ textAlign: "right", marginBottom: 32 }}>
              <Link to="/forgot-password" style={{
                color: "rgba(212,175,55,0.6)", fontSize: 12,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em", transition: "color 0.2s"
              }}
                onMouseEnter={e => e.target.style.color = "#d4af37"}
                onMouseLeave={e => e.target.style.color = "rgba(212,175,55,0.6)"}
              >
                Forgot password?
              </Link>
            </div>

            <button className="elivium-btn" type="submit" disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
          </form>

          {/* Divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16, margin: "28px 0"
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{
              color: "rgba(255,255,255,0.2)", fontSize: 11,
              fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em"
            }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <p style={{
            textAlign: "center", color: "rgba(255,255,255,0.3)",
            fontSize: 13, margin: 0, fontFamily: "'DM Sans', sans-serif"
          }}>
            New to Elivium?{" "}
            <Link to="/signup" style={{
              color: "#d4af37", textDecoration: "none", fontWeight: 500,
              transition: "opacity 0.2s"
            }}
              onMouseEnter={e => e.target.style.opacity = "0.7"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              Create an account
            </Link>
          </p>
        </motion.div>

        {/* Bottom text */}
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