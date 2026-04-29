import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../utils/api.js";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email || !code) {
      setError("Email and verification code are required");
      setLoading(false);
      return;
    }
    try {
      await api.post("/auth/verify-email", { email, code });
      setSuccess(true);
      setTimeout(() => navigate("/login", {
        state: { email, message: "Email verified successfully! Please sign in." }
      }), 2500);
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/resend-verification", { email });
      setResendCooldown(60);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#080808",
      position: "relative", overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif", padding: "40px 24px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes countdown{from{stroke-dashoffset:0}to{stroke-dashoffset:163}}
        .code-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
          padding: 20px 24px; color: #fff; font-size: 28px;
          font-weight: 500; letter-spacing: 0.5em;
          font-family: 'Cormorant Garamond', serif;
          outline: none; transition: all 0.3s ease;
          text-align: center; box-sizing: border-box;
        }
        .code-input:focus {
          border-color: rgba(212,175,55,0.5);
          background: rgba(212,175,55,0.04);
          box-shadow: 0 0 0 4px rgba(212,175,55,0.06);
        }
        .code-input::placeholder { color: rgba(255,255,255,0.1); font-size: 20px; letter-spacing: 0.3em; }
        .verify-btn {
          width: 100%; padding: 18px;
          background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
          background-size: 200% 200%;
          border: none; border-radius: 14px;
          color: #0a0a0a; font-size: 13px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .verify-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(212,175,55,0.3); }
        .verify-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute", top: "20%", left: "50%",
            transform: "translateX(-50%)",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}
      >
        {/* Success state */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                style={{
                  width: 100, height: 100, borderRadius: "50%",
                  background: "linear-gradient(135deg, #d4af37, #f0d060)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 32px",
                  boxShadow: "0 0 60px rgba(212,175,55,0.3)"
                }}
              >
                <svg width="44" height="44" fill="none" stroke="#0a0a0a" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 300, margin: "0 0 12px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>
                Email Verified!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 8px" }}>
                Welcome to Elivium
              </p>
              <p style={{ color: "rgba(212,175,55,0.6)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Redirecting to sign in...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!success && (
          <>
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: "center", marginBottom: 40 }}
            >
              <div style={{
                width: 88, height: 88, borderRadius: "50%",
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px"
              }}>
                <svg width="36" height="36" fill="none" stroke="rgba(212,175,55,0.7)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 8px" }}>Almost there</p>
              <h1 style={{ fontSize: 32, fontWeight: 300, color: "#fff", margin: "0 0 12px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>
                Verify Your Email
              </h1>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0, lineHeight: 1.7 }}>
                We sent a verification code to<br />
                <span style={{ color: "rgba(212,175,55,0.6)" }}>{email}</span>
              </p>
            </motion.div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(212,175,55,0.12)",
                borderRadius: 24, padding: "40px 36px"
              }}
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      padding: "14px 18px",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: 12, color: "#fca5a5",
                      fontSize: 13, marginBottom: 24
                    }}
                  >{error}</motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleVerify}>
                <label style={{
                  display: "block", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase", marginBottom: 12
                }}>Verification Code</label>

                <input
                  className="code-input"
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  required
                  style={{ marginBottom: 24 }}
                />

                <button className="verify-btn" type="submit" disabled={loading || code.length < 6}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: "spin 1s linear infinite" }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                      </svg>
                      Verifying...
                    </>
                  ) : "Verify Email"}
                </button>
              </form>

              <div style={{ marginTop: 28, textAlign: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, marginBottom: 12 }}>
                  Didn't receive a code?
                </p>
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || loading}
                  style={{
                    background: "none", border: "none", cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                    color: resendCooldown > 0 ? "rgba(255,255,255,0.2)" : "#d4af37",
                    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500, transition: "opacity 0.2s"
                  }}
                >
                  {resendCooldown > 0 ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: "spin 1s linear infinite" }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                      </svg>
                      Resend in {resendCooldown}s
                    </span>
                  ) : "Resend Code"}
                </button>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                textAlign: "center", color: "rgba(255,255,255,0.2)",
                fontSize: 13, marginTop: 24
              }}
            >
              Wrong email?{" "}
              <Link to="/signup" style={{ color: "rgba(212,175,55,0.6)", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#d4af37"}
                onMouseLeave={e => e.target.style.color = "rgba(212,175,55,0.6)"}
              >Sign up again</Link>
            </motion.p>
          </>
        )}
      </motion.div>
    </div>
  );
}