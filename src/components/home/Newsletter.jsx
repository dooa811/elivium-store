import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setDone(true);
  };

  return (
    <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }} ref={ref}>
      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "-10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px", fontWeight: 500 }}>Exclusive Access</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#fff", margin: "0 0 14px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
            Be the First to Know
          </h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 36px", fontWeight: 300, lineHeight: 1.8 }}>
            Subscribe to receive early access to new collections, exclusive member offers, and style editorials curated by our team.
          </p>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.15)",
                  borderRadius: 20, padding: "36px 32px", position: "relative", overflow: "hidden"
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                <p style={{ fontSize: 20, color: "rgba(212,175,55,0.4)", margin: "0 0 12px" }}>✦</p>
                <p style={{ color: "#d4af37", fontSize: 16, fontWeight: 500, margin: "0 0 6px", fontFamily: "'Cormorant Garamond', serif" }}>Welcome to the Elivium Circle.</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0, fontWeight: 300 }}>Expect something beautiful in your inbox soon.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit}>
                <div style={{ display: "flex", maxWidth: 480, margin: "0 auto" }} className="nl-form">
                  <style>{`.nl-form input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-right:none;border-radius:12px 0 0 12px;padding:15px 20px;color:#fff;font-size:14px;outline:none;transition:border-color 0.3s;font-family:'DM Sans',sans-serif}.nl-form input:focus{border-color:rgba(212,175,55,0.4)}.nl-form input::placeholder{color:rgba(255,255,255,0.2)}.nl-form button{padding:15px 28px;background:linear-gradient(135deg,#d4af37 0%,#f0d060 50%,#d4af37 100%);border:none;border-radius:0 12px 12px 0;color:#0a0a0a;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;transition:all 0.3s}.nl-form button:hover{box-shadow:0 6px 20px rgba(212,175,55,0.25)}`}</style>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="Enter your email address" />
                  <button type="submit">Subscribe</button>
                </div>
                {error && <p style={{ color: "#fca5a5", fontSize: 12, marginTop: 8 }}>{error}</p>}
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, marginTop: 14, letterSpacing: "0.05em" }}>No spam. Unsubscribe at any time.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
export default Newsletter;