import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

  .ct-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 16px 20px;
    color: #fff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.3s;
    box-sizing: border-box;
  }
  .ct-input:focus {
    border-color: rgba(212,175,55,0.45);
    background: rgba(212,175,55,0.03);
    box-shadow: 0 0 0 4px rgba(212,175,55,0.05);
  }
  .ct-input::placeholder { color: rgba(255,255,255,0.18); }

  .ct-label {
    display: block;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }

  .ct-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 14px;
    color: #0a0a0a; font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  .ct-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(212,175,55,0.3); }
  .ct-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .ct-info-card {
    display: flex; align-items: flex-start; gap: 18px;
    padding: 24px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 18px;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .ct-info-card:hover { border-color: rgba(212,175,55,0.15); transform: translateX(4px); }
  .ct-info-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .ct-info-card:hover::before { opacity: 1; }

  .social-link {
    color: rgba(255,255,255,0.25); font-size: 12px;
    text-decoration: none; letter-spacing: 0.08em;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 2px;
  }
  .social-link:hover { color: #d4af37; border-color: rgba(212,175,55,0.4); gap: 10px; }
`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [load, setLoad] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoad(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoad(false);
    setSent(true);
  };

  const contactInfo = [
    {
      icon: <svg width="20" height="20" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      label: "Email", val: "hello@elivium.com", sub: "We reply within 24 hours"
    },
    {
      icon: <svg width="20" height="20" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
      label: "Phone", val: "+1 (800) 354-4868", sub: "Mon–Fri, 9am–6pm EST"
    },
    {
      icon: <svg width="20" height="20" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: "Address", val: "12 Luxury Lane, New York", sub: "By appointment only"
    }
  ];

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
        padding: "80px 24px 70px", textAlign: "center",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500, height: 300,
              background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)",
            }}
          />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 14px" }}>Get in Touch</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: "#fff", margin: "0 0 16px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em", lineHeight: 1.1 }}>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, margin: 0, fontWeight: 300, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            We're here to help. Our team typically responds within 24 hours.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px", display: "grid", gridTemplateColumns: "320px 1fr", gap: 64 }} className="ct-grid">
        <style>{`@media(max-width:1024px){.ct-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 24px", fontWeight: 500 }}>Contact Information</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
            {contactInfo.map(c => (
              <div key={c.label} className="ct-info-card">
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "rgba(212,175,55,0.06)",
                  border: "1px solid rgba(212,175,55,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{c.icon}</div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: "0 0 6px", fontWeight: 500 }}>{c.label}</p>
                  <p style={{ color: "#fff", fontSize: 14, fontWeight: 400, margin: "0 0 3px" }}>{c.val}</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, margin: 0 }}>{c.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: "0 0 16px", fontWeight: 500 }}>Follow Us</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Instagram", "Pinterest", "Twitter"].map(s => (
                <a key={s} href="#" className="social-link">
                  {s}
                  <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  borderRadius: 24, padding: "64px 48px",
                  textAlign: "center", position: "relative", overflow: "hidden"
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "linear-gradient(135deg, #d4af37, #f0d060)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 28px",
                    boxShadow: "0 0 40px rgba(212,175,55,0.2)"
                  }}
                >
                  <svg width="34" height="34" fill="none" stroke="#0a0a0a" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px" }}>Message Received</p>
                <h3 style={{ fontSize: 32, fontWeight: 300, color: "#fff", margin: "0 0 12px", fontFamily: "'Cormorant Garamond', serif" }}>Thank You</h3>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: 0, fontWeight: 300, lineHeight: 1.7 }}>
                  We'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} style={{ display: "grid", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ct-form-row">
                  <style>{`@media(max-width:640px){.ct-form-row{grid-template-columns:1fr!important}}`}</style>
                  <div>
                    <label className="ct-label">Your Name</label>
                    <input className="ct-input" name="name" value={form.name} onChange={handle} placeholder="James Smith" required />
                  </div>
                  <div>
                    <label className="ct-label">Your Email</label>
                    <input className="ct-input" name="email" type="email" value={form.email} onChange={handle} placeholder="james@email.com" required />
                  </div>
                </div>

                <div>
                  <label className="ct-label">Subject</label>
                  <input className="ct-input" name="subject" value={form.subject} onChange={handle} placeholder="Order inquiry, styling advice..." required />
                </div>

                <div>
                  <label className="ct-label">Message</label>
                  <textarea className="ct-input" name="message" value={form.message} onChange={handle} required rows={6} placeholder="Tell us how we can help..." style={{ resize: "none", lineHeight: 1.7 }} />
                </div>

                <div>
                  <button className="ct-btn" type="submit" disabled={load}>
                    {load ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}