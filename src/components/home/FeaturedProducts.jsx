import { Link } from "react-router-dom";
import { productService } from "../../utils/productService.js";
import ProductGrid from "../product/ProductGrid.jsx";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const SHARED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
`;
export function FeaturedProducts() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const products = await productService.getFeaturedProducts();
        setItems(products);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{SHARED_STYLES}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 48 }}
        >
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 10px", fontWeight: 500 }}>Handpicked</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, color: "#fff", margin: "0 0 12px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
              Featured Pieces
            </h2>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: 0, fontWeight: 300, maxWidth: 420, lineHeight: 1.7 }}>
              Our editors' selection — the season's most coveted styles chosen for their exceptional quality.
            </p>
          </div>
          <Link to="/shop" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 24px", background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
            color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", flexShrink: 0
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)"; e.currentTarget.style.color = "#d4af37"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            View All
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "48px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, border: "1px solid rgba(212,175,55,0.3)", borderTopColor: "#d4af37", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Loading</p>
          </div>
        ) : (
          <ProductGrid products={items} cols={4} />
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;