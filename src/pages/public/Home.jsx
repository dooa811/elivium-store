import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import HeroSection from "../../components/home/HeroSection.jsx";
import FeaturedProducts from "../../components/home/FeaturedProducts.jsx";
import Categories from "../../components/home/Categories.jsx";
import Testimonials from "../../components/home/Testimonials.jsx";
import Newsletter from "../../components/home/Newsletter.jsx";
import { productService } from "../../utils/productService.js";
import ProductGrid from "../../components/product/ProductGrid.jsx";

import sale from "../../assets/images/sale.jpg";
import newin from "../../assets/images/newin.jpg";

export { sale, newin };

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  .home-section-link {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; flex-shrink: 0;
  }
  .home-section-link:hover { border-color: rgba(212,175,55,0.3); color: #d4af37; }
  .home-story-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 28px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 12px;
    color: #0a0a0a; font-size: 11px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  .home-story-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(212,175,55,0.3); }
  .home-shop-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 18px 48px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 14px;
    color: #0a0a0a; font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  .home-shop-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(212,175,55,0.35); }
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

export default function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newProds, saleProds] = await Promise.all([
          productService.getNewProducts(),
          productService.getSaleProducts()
        ]);
        setNewProducts(newProds.slice(0, 4));
        setSaleProducts(saleProds.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      <HeroSection />
      <Categories />
      <FeaturedProducts />

      {/* New Arrivals */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 48 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 10px", fontWeight: 500 }}>Just In</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
                New Arrivals
              </h2>
            </div>
            <Link to="/shop?tag=new" className="home-section-link">
              View All New
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, border: "1px solid rgba(212,175,55,0.3)", borderTopColor: "#d4af37", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            </div>
          ) : (
            <ProductGrid products={newProducts} cols={4} />
          )}
        </div>
      </section>

      {/* About banner */}
      <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="home-about-grid">
          <style>{`@media(max-width:1024px){.home-about-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>

          <Reveal>
            <div style={{ position: "relative" }}>
              <img src={sale} alt="About Elivium" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 24, display: "block" }} />
              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: 24, right: -16,
                background: "rgba(8,8,8,0.9)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16,
                padding: "20px 28px"
              }}>
                <p style={{ fontSize: 36, fontWeight: 300, color: "#d4af37", margin: "0 0 4px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>12+</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>Years of Excellence</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 14px", fontWeight: 500 }}>Our Story</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: "#fff", margin: "0 0 20px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15 }}>
              Crafted with<br /><em style={{ fontStyle: "italic", color: "#d4af37" }}>Intention.</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, lineHeight: 1.9, margin: "0 0 16px", fontWeight: 300 }}>
              Elivium was founded on a single conviction: that clothing should be more than what you wear — it should express who you are. Every piece in our collection is sourced from the finest ateliers.
            </p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 15, lineHeight: 1.9, margin: "0 0 32px", fontWeight: 300 }}>
              We partner with sustainable suppliers across Europe and Asia, ensuring every garment you wear carries a story of craftsmanship, integrity, and beauty.
            </p>
            <Link to="/about" className="home-story-btn">
              Discover Our Story
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Sale */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 48 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 10px", fontWeight: 500 }}>Limited Time</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
                On Sale Now
              </h2>
            </div>
            <Link to="/shop?tag=sale" className="home-section-link">
              Shop Sale
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, border: "1px solid rgba(212,175,55,0.3)", borderTopColor: "#d4af37", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            </div>
          ) : (
            <ProductGrid products={saleProducts} cols={4} />
          )}
        </div>
      </section>

      <Testimonials />
      <Newsletter />

      {/* Final CTA */}
      <section style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={newin} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.5), rgba(8,8,8,0.9))" }} />
        </div>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 14px", fontWeight: 500 }}>2026 Collection</p>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, color: "#fff", margin: "0 0 20px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.1 }}>
              Your Next Favourite<br />
              <em style={{ fontStyle: "italic", color: "#d4af37" }}>Piece Awaits.</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, margin: "0 0 44px", fontWeight: 300, lineHeight: 1.8, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Explore our full collection of over 100 exceptional pieces — each one ready to become a staple of your wardrobe.
            </p>
            <Link to="/shop" className="home-shop-btn">
              Shop the Full Collection
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