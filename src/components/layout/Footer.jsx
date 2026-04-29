import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .footer-link {
    color: rgba(255,255,255,0.25); font-size: 12px;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    font-weight: 400; transition: color 0.2s; display: block;
    padding: 5px 0;
  }
  .footer-link:hover { color: #d4af37; }
  .social-btn {
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.3); font-size: 11px;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; cursor: pointer;
  }
  .social-btn:hover { border-color: rgba(212,175,55,0.3); color: #d4af37; }
  .nl-input {
    width: 100%; background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07); border-radius: 10px;
    padding: 12px 16px; color: #fff; font-size: 12px;
    outline: none; font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s; margin-bottom: 10px; box-sizing: border-box;
  }
  .nl-input:focus { border-color: rgba(212,175,55,0.35); }
  .nl-input::placeholder { color: rgba(255,255,255,0.18); }
  .nl-btn {
    width: 100%; padding: 12px;
    background: linear-gradient(135deg, #d4af37, #f0d060);
    border: none; border-radius: 10px;
    color: #0a0a0a; font-size: 10px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .nl-btn:hover { box-shadow: 0 4px 15px rgba(212,175,55,0.25); }
`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  const marqueeItems = ["New Collection 2026", "Free Shipping Over $200", "Luxury Fabrics", "Sustainable Fashion", "Handcrafted Quality"];

  return (
    <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Marquee */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "12px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingRight: 48, fontSize: 9, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
              {t}
              <span style={{ color: "rgba(212,175,55,0.3)", fontSize: 8 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr", gap: 48, marginBottom: 56 }} className="footer-grid">
          <style>{`@media(max-width:1024px){.footer-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:640px){.footer-grid{grid-template-columns:1fr!important}}`}</style>

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: "none", display: "block", marginBottom: 20 }}>
              <span style={{ fontSize: 24, fontWeight: 300, letterSpacing: "0.15em", color: "#fff", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif" }}>ELIVIUM</span>
              <p style={{ fontSize: 8, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "2px 0 0", fontFamily: "'DM Sans', sans-serif" }}>Store</p>
            </Link>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, lineHeight: 1.8, margin: "0 0 24px", fontWeight: 300, maxWidth: 240 }}>
              Curating exceptional clothing for those who appreciate the art of dressing well.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "𝕏", href: "#" },
                { label: "ig", href: "#" },
                { label: "fb", href: "#" },
                { label: "pt", href: "#" },
              ].map(s => (
                <a key={s.label} href={s.href} className="social-btn">{s.label}</a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>Shop</p>
            {[
              { label: "All Products", href: "/shop" },
              { label: "Women",        href: "/shop?cat=women" },
              { label: "Men",          href: "/shop?cat=men" },
              { label: "New Arrivals", href: "/shop?tag=new" },
              { label: "Sale",         href: "/shop?tag=sale" },
            ].map(l => <Link key={l.label} to={l.href} className="footer-link">{l.label}</Link>)}
          </div>

          {/* Info links */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 18px" }}>Information</p>
            {[
              { label: "About Us",  href: "/about" },
              { label: "Contact",   href: "/contact" },
              { label: "My Orders", href: "/orders" },
              { label: "Wishlist",  href: "/wishlist" },
              { label: "Profile",   href: "/profile" },
            ].map(l => <Link key={l.label} to={l.href} className="footer-link">{l.label}</Link>)}
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>Newsletter</p>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, margin: "0 0 16px", lineHeight: 1.7, fontWeight: 300 }}>Subscribe for exclusive offers and new collection previews.</p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.p key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#d4af37", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Thank you for subscribing!
                </motion.p>
              ) : (
                <motion.form key="form" onSubmit={handleSubscribe}>
                  <input className="nl-input" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" required />
                  <button className="nl-btn" type="submit">Subscribe</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 28, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, margin: 0, letterSpacing: "0.05em" }}>© 2026 Elivium Store. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Returns"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={e => e.target.style.color = "rgba(212,175,55,0.5)"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.15)"}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}