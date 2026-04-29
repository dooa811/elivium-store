import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import cover from "../../assets/images/cover.jpg";

export { cover };

export default function HeroSection() {
  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 640, display: "flex", alignItems: "center", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes hero-float{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        .hero-btn-gold {
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
        .hero-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(212,175,55,0.35); }
        .hero-btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 14px;
          color: #fff; font-size: 12px; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; font-family: 'DM Sans', sans-serif;
          transition: all 0.3s; backdrop-filter: blur(8px);
        }
        .hero-btn-outline:hover { border-color: rgba(212,175,55,0.4); color: #d4af37; transform: translateY(-2px); }
      `}</style>

      {/* Background image with subtle zoom */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <motion.img
          src={cover}
          alt="Elivium Collection"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Multi-layer overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.65) 45%, rgba(8,8,8,0.15) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)" }} />

      {/* Decorative vertical lines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[15, 85].map(x => (
          <motion.div key={x} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", left: `${x}%`, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.12), transparent)", transformOrigin: "top" }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 28 }}
          >
            <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, #d4af37)" }} />
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.45em", color: "#d4af37", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
              New Collection 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, lineHeight: 0.95, color: "#fff", margin: "0 0 24px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.01em" }}
          >
            Dress with<br />
            <em style={{ fontStyle: "italic", color: "#d4af37" }}>Purpose.</em>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.8, margin: "0 0 40px", maxWidth: 480, fontFamily: "'DM Sans', sans-serif" }}
          >
            Discover our new 2026 collection — meticulously crafted pieces that blend
            contemporary design with timeless elegance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
          >
            <Link to="/shop" className="hero-btn-gold">
              Shop Now
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/about" className="hero-btn-outline">Our Story</Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ display: "flex", gap: 40, marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { num: "12+", label: "Years of Excellence" },
              { num: "50K+", label: "Happy Customers" },
              { num: "120+", label: "Countries Shipped" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1 }}>
                <p style={{ fontSize: 28, fontWeight: 300, color: "#fff", margin: "0 0 4px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", margin: 0, textTransform: "uppercase" }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="14" height="14" fill="none" stroke="rgba(212,175,55,0.5)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}