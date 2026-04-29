import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

  .wish-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    position: relative;
  }
  .wish-card:hover {
    border-color: rgba(212,175,55,0.2);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }
  .wish-card:hover .wish-img { transform: scale(1.06); }

  .wish-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    display: block;
  }

  .remove-btn {
    position: absolute; top: 14px; right: 14px;
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(131, 0, 0, 0.1);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
    color: #d4af37;
  }
  .remove-btn:hover { background: rgba(239,68,68,0.3); border-color: rgba(239,68,68,0.4); color: #fca5a5; transform: scale(1.1); }

  .add-cart-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none;
    color: rgba(212,175,55,0.6); font-size: 11px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; padding: 0;
    border-bottom: 1px solid rgba(212,175,55,0.2);
    padding-bottom: 2px;
  }
  .add-cart-btn:hover { color: #fff; border-color: rgba(255,255,255,0.4); gap: 10px; }

  .explore-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 12px;
    color: #0a0a0a; font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  .explore-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(212,175,55,0.3); }

  .discount-badge {
    position: absolute; top: 14px; left: 14px;
    padding: 4px 10px; border-radius: 100px;
    background: rgba(212,175,55,0.15);
    border: 1px solid rgba(212,175,55,0.3);
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.1em; color: #d4af37;
    font-family: 'DM Sans', sans-serif;
  }
`;

export default function Wishlist() {
  const { items, toggle } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (items.length === 0) return (
    <div style={{
      minHeight: "85vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#080808", fontFamily: "'DM Sans', sans-serif",
      position: "relative", overflow: "hidden"
    }}>
      <style>{STYLES}</style>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }}
      />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 110, height: 110, borderRadius: "50%",
            background: "rgba(212,175,55,0.05)",
            border: "1px solid rgba(212,175,55,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 36px"
          }}
        >
          <svg width="44" height="44" fill="none" stroke="rgba(212,175,55,0.4)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.div>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px" }}>Wishlist</p>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: "#fff", margin: "0 0 14px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Nothing saved yet</h2>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 36px", fontWeight: 300, lineHeight: 1.7 }}>Save pieces you love and come back to them anytime.</p>
        <Link to="/shop" className="explore-btn">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Explore Collection
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
        padding: "56px 24px 44px", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)",
          fontSize: 160, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          color: "rgba(212,175,55,0.03)", lineHeight: 1, pointerEvents: "none", userSelect: "none"
        }}>♡</div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 10px" }}>Saved Pieces</p>
            <h1 style={{ fontSize: 46, fontWeight: 300, color: "#fff", margin: "0 0 8px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>My Wishlist</h1>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, margin: 0 }}>{items.length} piece{items.length !== 1 ? "s" : ""} saved</p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                className="wish-card"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.images?.[0]} alt={item.name} className="wish-img" />
                  </Link>

                  {/* Discount badge */}
                  {item.discount > 0 && (
                    <div className="discount-badge">−{item.discount}%</div>
                  )}

                  {/* Remove button */}
                  <button className="remove-btn" onClick={() => toggle(item)} title="Remove from wishlist">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* In cart indicator */}
                  {isInCart(item.id) && (
                    <div style={{
                      position: "absolute", bottom: 14, left: 14,
                      padding: "4px 12px", borderRadius: 100,
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      fontSize: 10, color: "#6ee7b7",
                      fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase"
                    }}>In Cart</div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "18px 20px 20px" }}>
                  <Link to={`/product/${item.id}`} style={{
                    color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 500,
                    display: "block", marginBottom: 6, transition: "color 0.2s",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                  }}
                    onMouseEnter={e => e.target.style.color = "#d4af37"}
                    onMouseLeave={e => e.target.style.color = "#fff"}
                  >{item.name}</Link>

                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: "0 0 14px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                    {item.category}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: 16, fontWeight: 600, color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>
                        {formatPrice(item.price)}
                      </span>
                      {item.original_price > item.price && (
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "line-through", marginLeft: 8 }}>
                          {formatPrice(item.original_price)}
                        </span>
                      )}
                    </div>
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(item, item.sizes?.[0], item.color_names?.[0])}
                    >
                      Add
                      <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.08 + 0.3 }}
          style={{ textAlign: "center", marginTop: 56, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 13, margin: "0 0 20px" }}>Discover more pieces</p>
          <Link to="/shop" className="explore-btn">Continue Exploring</Link>
        </motion.div>
      </div>
    </div>
  );
}