import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import ProductRating from "./ProductRating.jsx";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

  .pc-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 18px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    position: relative;
  }
  .pc-card:hover {
    border-color: rgba(212,175,55,0.18);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }

  .pc-wish {
    position: absolute; top: 14px; right: 14px;
    width: 34px; height: 34px; border-radius: 50%;
    background: rgba(8,8,8,0.6); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.25s;
    opacity: 0;
  }
  .pc-card:hover .pc-wish { opacity: 1; }
  .pc-wish.wishlisted { opacity: 1; background: rgba(212,175,55,0.15); border-color: rgba(212,175,55,0.4); }
  .pc-wish:hover { background: rgba(212,175,55,0.2); border-color: rgba(212,175,55,0.5); }

  .pc-atc {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 14px 18px;
    background: rgba(8,8,8,0.92); backdrop-filter: blur(8px);
    border: none; cursor: pointer;
    font-size: 10px; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: rgba(255,255,255,0.7);
    font-family: 'DM Sans', sans-serif;
    transition: all 0.25s; transform: translateY(100%);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .pc-card:hover .pc-atc { transform: translateY(0); }
  .pc-atc:hover { background: rgba(212,175,55,0.9); color: #0a0a0a; }
  .pc-atc.added { background: rgba(16,185,129,0.2); color: #6ee7b7; transform: translateY(0); border-top: 1px solid rgba(16,185,129,0.2); }

  .pc-new-badge {
    padding: 4px 10px; border-radius: 100px;
    background: rgba(255,255,255,0.9); color: #0a0a0a;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; font-family: 'DM Sans', sans-serif;
  }
  .pc-discount-badge {
    padding: 4px 10px; border-radius: 100px;
    background: rgba(212,175,55,0.9); color: #0a0a0a;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
    font-family: 'DM Sans', sans-serif;
  }
`;

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const images = Array.isArray(product.images) ? product.images : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const colorNames = Array.isArray(product.color_names) ? product.color_names : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!sizes.length) return;
    addToCart(product, sizes[0], colorNames[0] || "Default", 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  return (
    <>
      <style>{STYLES}</style>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
          <div
            className="pc-card"
            onMouseEnter={() => { setHovered(true); setImgIdx(images.length > 1 ? 1 : 0); }}
            onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
          >
            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
              <motion.img
                key={imgIdx}
                src={images[imgIdx] || "https://via.placeholder.com/300x400"}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                animate={{ scale: hovered ? 1.07 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Badges */}
              <div style={{ position: "absolute", top: 14, left: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                {product.is_new && <span className="pc-new-badge">New</span>}
                {product.discount > 0 && <span className="pc-discount-badge">−{product.discount}%</span>}
              </div>

              {/* Wishlist */}
              <button
                className={`pc-wish ${wishlisted ? "wishlisted" : ""}`}
                onClick={handleWishlist}
              >
                <svg width="15" height="15" fill={wishlisted ? "#d4af37" : "none"} stroke={wishlisted ? "#d4af37" : "rgba(255,255,255,0.6)"} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Add to Cart */}
              <button className={`pc-atc ${added ? "added" : ""}`} onClick={handleAddToCart}>
                {added ? (
                  <>
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : "Add to Cart"}
              </button>
            </div>

            {/* Info */}
            <div style={{ padding: "16px 18px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                <h3 style={{
                  fontSize: 13, fontWeight: 500, color: "#fff",
                  margin: 0, fontFamily: "'DM Sans', sans-serif",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  transition: "color 0.2s", flex: 1
                }}>
                  {product.name}
                </h3>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "capitalize", letterSpacing: "0.05em", flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  {product.category}
                </span>
              </div>

              <ProductRating rating={product.rating} reviews={product.reviews} />

              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>
                  {formatPrice(product.price)}
                </span>
                {product.discount > 0 && (
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              {/* Color dots */}
              {colors.length > 0 && (
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                  {colors.map((c, i) => (
                    <div key={i} title={colorNames[i]} style={{
                      width: 12, height: 12, borderRadius: "50%",
                      background: c, border: "1px solid rgba(255,255,255,0.15)",
                      flexShrink: 0
                    }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
