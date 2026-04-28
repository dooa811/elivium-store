import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function Login() {
  const location = useLocation();
  const successMessage = location.state?.message;
  const prefillEmail = location.state?.email || "";

  const [form, setForm] = useState({
    email: prefillEmail, // ← إيميل محشي تلقائياً
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email || !form.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const result = await login(form);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-obsidian-300 text-sm">
            Sign in to your Elivium account
          </p>
        </div>

        {/* ← رسالة النجاح بعد التحقق */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-green-500/30 bg-green-500/10 text-green-400 text-sm rounded"
          >
            ✅ {successMessage}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="your@email.com"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handle}
            placeholder="••••••••"
            required
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            loading={loading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-obsidian-300 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gold-400 hover:text-gold-300 font-semibold">
            Create one here
          </Link>
        </p>

        <div className="mt-8 p-4 bg-obsidian-800 border border-obsidian-600 rounded text-xs text-obsidian-300">
          <p className="font-semibold text-white mb-2">Demo Credentials:</p>
          <p>👤 Admin: admin@elivium.com - Admin123!@#</p>
          <p className="text-obsidian-400 mt-2">Password must contain: uppercase, lowercase, number, special char (!@#$%^&*)</p>
        </div>
      </motion.div>
    </div>
  );
}