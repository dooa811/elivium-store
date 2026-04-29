import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";


function Stars({ n = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" fill={i < n ? "#d4af37" : "rgba(255,255,255,0.1)"} viewBox="0 0 24 24">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}
const testimonials = [
  { id: 1, name: "Alexandra M.", role: "Fashion Stylist", avatar: "A", rating: 5, text: "Elivium has completely changed how I shop. The quality of every piece is exceptional — you can feel the difference the moment you touch the fabric.", location: "Paris, France" },
  { id: 2, name: "James K.", role: "Creative Director", avatar: "J", rating: 5, text: "I've been a customer for two years now. The Tailored Slim Suit is the most complimented piece in my wardrobe. The cut is perfect, the fabric breathes beautifully.", location: "London, UK" },
  { id: 3, name: "Sofia R.", role: "Architect", avatar: "S", rating: 5, text: "What I love most is the consistency. Every order arrives immaculately packaged, every item matches its description exactly, and the customer service is genuinely attentive.", location: "Milan, Italy" },
  { id: 4, name: "Nour A.", role: "Entrepreneur", avatar: "N", rating: 4, text: "The Cashmere Wrap Dress is an absolute dream. I wore it to three events this season and received compliments at every single one. Worth every penny.", location: "Dubai, UAE" },
  { id: 5, name: "Marcus T.", role: "Photographer", avatar: "M", rating: 5, text: "Discovered Elivium through a friend and immediately ordered the Merino Turtleneck. It arrived in 3 days, fits like it was made for me.", location: "New York, USA" },
];



export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "80px 24px", fontFamily: "'DM Sans', sans-serif" }} ref={ref}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px", fontWeight: 500 }}>Testimonials</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#fff", margin: "0 0 12px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>What Our Clients Say</h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: 0, fontWeight: 300 }}>Real experiences from those who choose Elivium.</p>
        </motion.div>

        {/* Featured */}
        <div style={{ maxWidth: 720, margin: "0 auto 48px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(212,175,55,0.12)",
                borderRadius: 24, padding: "48px 44px",
                textAlign: "center", position: "relative", overflow: "hidden"
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />

              <div style={{ marginBottom: 20 }}><Stars n={testimonials[current].rating} /></div>

              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, fontStyle: "italic", lineHeight: 1.8, margin: "0 0 32px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                "{testimonials[current].text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, #d4af37, #f0d060)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 600, color: "#0a0a0a", fontFamily: "'Cormorant Garamond', serif"
                }}>{testimonials[current].avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: "0 0 2px" }}>{testimonials[current].name}</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: 0 }}>{testimonials[current].role} · {testimonials[current].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                height: 4, width: i === current ? 24 : 6, borderRadius: 100,
                background: i === current ? "#d4af37" : "rgba(255,255,255,0.12)",
                border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0
              }} />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }} className="test-grid">
          <style>{`@media(max-width:1024px){.test-grid{grid-template-columns:repeat(3,1fr)!important}}@media(max-width:640px){.test-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setCurrent(i)}
              style={{
                padding: 18, borderRadius: 16, cursor: "pointer",
                background: i === current ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${i === current ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.05)"}`,
                transition: "all 0.3s"
              }}
            >
              <Stars n={t.rating} />
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, lineHeight: 1.6, margin: "10px 0 14px", fontStyle: "italic", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: i === current ? "linear-gradient(135deg, #d4af37, #f0d060)" : "rgba(212,175,55,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, color: i === current ? "#0a0a0a" : "#d4af37",
                  fontFamily: "'Cormorant Garamond', serif", flexShrink: 0
                }}>{t.avatar}</div>
                <div>
                  <p style={{ color: "#fff", fontSize: 11, fontWeight: 500, margin: 0 }}>{t.name}</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;