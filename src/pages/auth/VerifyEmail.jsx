import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../utils/api.js";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";

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
      // ← التعديل: بيروح للـ login مع رسالة نجاح + إيميل محشي
      setTimeout(() => navigate("/login", {
        state: {
          email: email,
          message: "Email verified successfully! Please sign in."
        }
      }), 2000);
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-obsidian-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Email Verified!
          </h2>
          <p className="text-obsidian-300 mb-6">
            Redirecting to login...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-500/20 border-2 border-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Verify Your Email
          </h1>
          <p className="text-obsidian-300 text-sm">
            We've sent a verification code to {email}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleVerify} className="space-y-5">
          <Input
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="000000"
            maxLength="6"
            required
          />

          <Button
            type="submit"
            variant="gold"
            size="lg"
            loading={loading}
            className="w-full"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-obsidian-300 text-sm mb-3">
            Didn't receive a code?
          </p>
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0 || loading}
            className={`text-sm font-semibold ${
              resendCooldown > 0 || loading
                ? "text-obsidian-400 cursor-not-allowed"
                : "text-gold-400 hover:text-gold-300"
            } transition-colors`}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
          </button>
        </div>

        <p className="text-center text-obsidian-300 text-sm mt-6">
          Want to try a different email?{" "}
          <Link to="/signup" className="text-gold-400 hover:text-gold-300 font-semibold">
            Sign up again
          </Link>
        </p>
      </motion.div>
    </div>
  );
}