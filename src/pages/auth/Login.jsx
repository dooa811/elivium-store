import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import Input  from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

import cover from "../../assets/images/cover.jpg";

export { cover};


export default function Login() {
  const { login } = useAuth();
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(form); }
    catch (err) { setError(err.message || "Login failed."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={cover} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-obsidian-900/60 flex flex-col items-center justify-center text-center p-12">
          <span className="font-display text-5xl font-bold text-white mb-3">ELIVIUM</span>
          <p className="text-obsidian-200 font-light text-lg italic">"Where luxury meets purpose."</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link to="/" className="font-display text-3xl font-bold text-white block mb-6 lg:hidden">ELIVIUM</Link>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Welcome Back</span>
            <h1 className="font-display text-4xl font-bold text-white mt-3 mb-2">Sign In</h1>
            <p className="text-obsidian-200 font-light text-sm">Access your Elivium account</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </motion.div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <Input label="Email Address" name="email" type="email" placeholder="your@email.com"
              value={form.email} onChange={handle} required/>
            <Input label="Password" name="password" type="password" placeholder="••••••••"
              value={form.password} onChange={handle} required/>
            <div className="flex justify-end">
              <a href="#" className="text-xs text-gold-500 hover:text-gold-300 transition-colors">Forgot password?</a>
            </div>
            <Button type="submit" variant="gold" size="lg" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-center text-obsidian-300 text-sm mt-8">
            New to Elivium?{" "}
            <Link to="/signup" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">Create an account</Link>
          </p>
          <p className="text-center text-obsidian-500 text-xs mt-4">Demo: use any email + any password</p>
        </motion.div>
      </div>
    </div>
  );
}