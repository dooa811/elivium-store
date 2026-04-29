import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import women from "../../assets/images/women.jpg";
import men from "../../assets/images/men.jpg";
import newin from "../../assets/images/newin.jpg";
import sale from "../../assets/images/sale.jpg";

export { women, men, newin, sale };

const cats = [
  { label: "Women",  href: "/shop?cat=women", img: women, count: "6 pieces",  sub: "New Season" },
  { label: "Men",    href: "/shop?cat=men",   img: men,   count: "6 pieces",  sub: "Essentials" },
  { label: "New In", href: "/shop?tag=new",   img: newin, count: "5 pieces",  sub: "Just Arrived" },
  { label: "Sale",   href: "/shop?tag=sale",  img: sale,  count: "7 pieces",  sub: "Up to 40% off" },
];

function CatCard({ cat, i }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={cat.href} style={{ display: "block", position: "relative", overflow: "hidden", aspectRatio: "2/3", borderRadius: 20, textDecoration: "none" }}
        className="cat-card"
      >
        <style>{`
          .cat-card img { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
          .cat-card:hover img { transform: scale(1.08); }
          .cat-card:hover .cat-overlay { opacity: 1; }
          .cat-card:hover .cat-explore { gap: 12px; color: #d4af37; border-color: rgba(212,175,55,0.5); }
          .cat-card:hover .cat-border { opacity: 1; }
        `}</style>

        {/* Image */}
        <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

        {/* Base overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 50%, rgba(8,8,8,0.1) 100%)" }} />

        {/* Hover overlay */}
        <div className="cat-overlay" style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.15)", opacity: 0, transition: "opacity 0.4s" }} />

        {/* Corner border decoration */}
        <div className="cat-border" style={{
          position: "absolute", inset: 12,
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: 12, opacity: 0, transition: "opacity 0.4s"
        }} />

        {/* Top badge */}
        <div style={{ position: "absolute", top: 20, left: 20 }}>
          <span style={{
            fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(212,175,55,0.8)", background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.2)", borderRadius: 100,
            padding: "4px 12px", fontFamily: "'DM Sans', sans-serif"
          }}>{cat.sub}</span>
        </div>

        {/* Bottom content */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 32, textAlign: "center" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{cat.count}</span>
          <h3 style={{ fontSize: 32, fontWeight: 300, color: "#fff", margin: "0 0 14px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.04em" }}>{cat.label}</h3>
          <div className="cat-explore" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 10, fontWeight: 500, letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
            borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 2,
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s"
          }}>
            Explore
            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "80px 24px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px", fontWeight: 500 }}>Collections</p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#fff", margin: "0 0 14px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
            Shop by Category
          </h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: 0, fontWeight: 300, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            Explore our curated collections, each crafted with intention and elevated by exceptional material selection.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="cats-grid">
          <style>{`@media(max-width:768px){.cats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
          {cats.map((cat, i) => <CatCard key={cat.label} cat={cat} i={i} />)}
        </div>
      </div>
    </section>
  );
}