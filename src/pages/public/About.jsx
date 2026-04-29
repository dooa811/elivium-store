import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import sale from "../../assets/images/sale.jpg";
import newin from "../../assets/images/newin.jpg";

export { sale, newin };

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes shimmer-line{0%{left:-100%}100%{left:100%}}

  .about-stat {
    padding: 32px 24px; text-align: center;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px; position: relative; overflow: hidden;
    transition: all 0.4s;
  }
  .about-stat:hover {
    border-color: rgba(212,175,55,0.2);
    transform: translateY(-4px);
  }
  .about-stat::before {
    content: '';
    position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.03), transparent);
    transition: left 0.6s;
  }
  .about-stat:hover::before { left: 100%; }

  .value-card {
    padding: 32px 28px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px;
    transition: all 0.4s; position: relative; overflow: hidden;
  }
  .value-card:hover { border-color: rgba(212,175,55,0.15); transform: translateY(-3px); }
  .value-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .value-card:hover::after { opacity: 1; }

  .shop-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 14px;
    color: #0a0a0a; font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  .shop-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(212,175,55,0.3); }
`;

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} style={style}>
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Hero */}
      <section style={{ position: "relative", height: "65vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img src={sale} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.1) 100%)" }} />

        {/* Decorative lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "10%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.08), transparent)" }} />
          <div style={{ position: "absolute", right: "10%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.08), transparent)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px", width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 16px" }}>Our Story</p>
            <h1 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 300, color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.02em", lineHeight: 1.05 }}>
              Crafted with<br />
              <em style={{ fontStyle: "italic", color: "#d4af37" }}>Intention.</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="ab-grid">
          <style>{`@media(max-width:1024px){.ab-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>

          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 16px" }}>Our Mission</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#fff", margin: "0 0 28px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15 }}>
              Where Quality<br />Meets Elegance
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.9, margin: "0 0 20px", fontWeight: 300 }}>
              Elivium was founded in 2013 with a singular vision: to create clothing that transcends trends. We believe in investing in pieces that last — not just in quality, but in style. Each garment is a conversation between the wearer and the world.
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, lineHeight: 1.9, margin: 0, fontWeight: 300 }}>
              We work exclusively with ethical manufacturers across Italy, Japan, and Portugal — artisans who share our commitment to exceptional craftsmanship and responsible production.
            </p>

            {/* Signature line */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
              <div style={{ width: 48, height: 1, background: "rgba(212,175,55,0.4)" }} />
              <p style={{ fontSize: 13, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(212,175,55,0.6)", margin: 0 }}>
                Founded 2013 · Milan
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ position: "relative" }}>
              <img src={newin} alt="About Elivium" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 24, display: "block" }} />
              {/* Decorative frame */}
              <div style={{
                position: "absolute", top: -16, right: -16,
                width: "60%", height: "60%",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 24, zIndex: -1
              }} />
              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: 24, left: -20,
                background: "rgba(8,8,8,0.9)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 16, padding: "16px 24px"
              }}>
                <p style={{ fontSize: 28, fontWeight: 300, color: "#d4af37", margin: "0 0 2px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>50K+</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Happy Customers</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px" }}>What We Stand For</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>Our Values</h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { symbol: "✦", title: "Quality First", desc: "Every piece passes through 47 quality checkpoints before reaching you.", color: "#d4af37" },
              { symbol: "◎", title: "Sustainable", desc: "We partner only with suppliers who meet our strict environmental standards.", color: "#6ee7b7" },
              { symbol: "◇", title: "Ethical", desc: "Fair wages, safe conditions, and transparency throughout our supply chain.", color: "#a5b4fc" },
              { symbol: "♾", title: "Timeless Design", desc: "We design for longevity — pieces that look as good in 10 years as today.", color: "#d4af37" },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="value-card">
                  <p style={{ fontSize: 24, color: v.color, margin: "0 0 16px", opacity: 0.7 }}>{v.symbol}</p>
                  <h3 style={{ fontSize: 18, fontWeight: 400, color: "#fff", margin: "0 0 12px", fontFamily: "'Cormorant Garamond', serif" }}>{v.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { num: "2013", label: "Founded", sub: "Milan, Italy" },
              { num: "50K+", label: "Customers", sub: "Worldwide" },
              { num: "120+", label: "Countries", sub: "Global reach" },
              { num: "100%", label: "Ethical", sub: "Sourcing" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="about-stat">
                  <p style={{ fontSize: 42, fontWeight: 300, color: "#d4af37", margin: "0 0 6px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>{s.num}</p>
                  <p style={{ fontSize: 13, color: "#fff", margin: "0 0 4px", fontWeight: 500 }}>{s.label}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0, letterSpacing: "0.05em" }}>{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px 100px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 16px" }}>Begin Your Journey</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, color: "#fff", margin: "0 0 20px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15 }}>
              Ready to Explore?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, margin: "0 0 40px", fontWeight: 300, lineHeight: 1.8 }}>
              Discover pieces crafted to become a permanent part of your wardrobe.
            </p>
            <Link to="/shop" className="shop-btn">
              Shop the Collection
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}