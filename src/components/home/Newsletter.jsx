import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail]     = useState("");
  const [done,  setDone]      = useState(false);
  const [error, setError]     = useState("");
  const ref     = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setDone(true);
  };

  return (
    <section className="section-pad bg-obsidian-800 border-y border-obsidian-700 relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"/>

      <div className="container-xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Exclusive Access</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Be the First to Know
          </h2>
          <p className="text-gray-400 font-light mb-10 leading-relaxed">
            Subscribe to receive early access to new collections, exclusive member offers, and style editorials curated by our team.
          </p>

          {done ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="glass-gold p-8 text-center">
              <div className="text-3xl mb-3">✦</div>
              <p className="text-gold-400 font-semibold text-lg">Welcome to the Elivium Circle.</p>
              <p className="text-obsidian-200 text-sm mt-2">Expect something beautiful in your inbox soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto">
              <input
                type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
                placeholder="Enter your email address"
                className="flex-1 bg-obsidian-700 border border-obsidian-500 text-white placeholder-obsidian-300 px-5 py-4 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button type="submit" className="btn-gold px-8 py-4 text-xs whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          {!done && <p className="text-obsidian-300 text-xs mt-4">No spam. Unsubscribe at any time.</p>}
        </motion.div>
      </div>
    </section>
  );
}