import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/ui/Button.jsx";

const REQUIREMENTS = [
  { label: "At least 8 characters",        test: (p) => p.length >= 8 },
  { label: "Lowercase letters",             test: (p) => /[a-z]/.test(p) },
  { label: "Uppercase letters",             test: (p) => /[A-Z]/.test(p) },
  { label: "Numbers",                       test: (p) => /[0-9]/.test(p) },
  { label: "Special characters (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
];

function PasswordInput({ label, name, value, onChange, onBlur, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-obsidian-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required
          className="w-full bg-obsidian-800 border border-obsidian-600 text-white placeholder-obsidian-400 px-4 py-3 pr-11 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded"
        />
        {value && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian-400 hover:text-white transition-colors"
          >
            {show ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.17.42-2.26 1.12-3.18M6.1 6.1A8.965 8.965 0 0112 5c5 0 9 4 9 7 0 1.47-.57 2.83-1.5 3.93M3 3l18 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

    const result = await signup({
      name: form.name,
      email: form.email,
      password: form.password,
      passwordConfirm: form.passwordConfirm
    });

    setLoading(false);
    if (!result.success) setError(result.error);
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
          <h1 className="font-display text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-obsidian-300 text-sm">Join Elivium and start shopping</p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-obsidian-300 mb-1.5">Full Name</label>
            <input
              name="name" value={form.name} onChange={handle} placeholder="James Smith" required
              className="w-full bg-obsidian-800 border border-obsidian-600 text-white placeholder-obsidian-400 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-obsidian-300 mb-1.5">Email Address</label>
            <input
              name="email" type="email" value={form.email} onChange={handle} placeholder="james@example.com" required
              className="w-full bg-obsidian-800 border border-obsidian-600 text-white placeholder-obsidian-400 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded"
            />
          </div>

          {/* Password */}
          <div>
            <PasswordInput
              label="Password"
              name="password"
              value={form.password}
              onChange={handle}
              onBlur={() => setPasswordBlurred(true)}
              placeholder="••••••••"
            />

            {/* المتطلبات تظهر بس بعد ما تتركي الخانة وفيه شي ناقص */}
            <AnimatePresence>
              {passwordBlurred && !passwordOk && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1">
                    {failedReqs.map(r => (
                      <p key={r.label} className="text-xs text-red-400 flex items-center gap-1.5">
                        <span>✕</span> {r.label}
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
              placeholder="••••••••"
            />
            <AnimatePresence>
              {form.passwordConfirm && form.password !== form.passwordConfirm && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
                >
                  <span>✕</span> Passwords do not match
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            loading={loading}
            disabled={!passwordOk || !form.name || !form.email}
            className="w-full"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-obsidian-300 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-gold-400 hover:text-gold-300 font-semibold">
            Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}