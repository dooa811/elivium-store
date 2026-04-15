import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import Input  from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";


import newin from "../../assets/images/newin.jpg";

export { newin};

export default function Signup() {
  const { signup } = useAuth();
  const [form,    setForm]    = useState({ name: "", email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await signup(form); }
    catch (err) { setError(err.message || "Signup failed."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={newin} alt="" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-obsidian-900/60 flex flex-col items-center justify-center text-center p-12">
          <span className="font-display text-5xl font-bold text-white mb-3">ELIVIUM</span>
          <p className="text-obsidian-200 font-light text-lg italic">"Dress with intention."</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Join Elivium</span>
            <h1 className="font-display text-4xl font-bold text-white mt-3 mb-2">Create Account</h1>
            <p className="text-obsidian-200 font-light text-sm">Start your journey with us</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">{error}
            </motion.div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <Input label="Full Name"      name="name"     type="text"     placeholder="James Smith"      value={form.name}     onChange={handle} required/>
            <Input label="Email Address"  name="email"    type="email"    placeholder="your@email.com"   value={form.email}    onChange={handle} required/>
            <Input label="Password"       name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handle} required/>
            <label className="flex items-start gap-3 text-sm text-obsidian-300 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 accent-gold-500"/>
              <span>I agree to the <a href="#" className="text-gold-400 hover:underline">Terms of Service</a> and <a href="#" className="text-gold-400 hover:underline">Privacy Policy</a></span>
            </label>
            <Button type="submit" variant="gold" size="lg" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-center text-obsidian-300 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}