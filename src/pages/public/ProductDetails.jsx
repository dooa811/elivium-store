import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { productService } from "../../utils/productService.js";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import ProductRating from "../../components/product/ProductRating.jsx";
import ProductGrid from "../../components/product/ProductGrid.jsx";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse-gold{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0.3)}50%{box-shadow:0 0 0 8px rgba(212,175,55,0)}}

  .pd-thumb {
    overflow: hidden; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.06);
    cursor: pointer; transition: all 0.3s;
    aspect-ratio: 1;
  }
  .pd-thumb:hover { border-color: rgba(212,175,55,0.3); }
  .pd-thumb.active { border-color: rgba(212,175,55,0.6); box-shadow: 0 0 0 2px rgba(212,175,55,0.15); }
  .pd-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; display: block; }
  .pd-thumb:hover img { transform: scale(1.06); }

  .size-btn {
    width: 48px; height: 48px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 600;
    letter-spacing: 0.05em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; display: flex; align-items: center; justify-content: center;
  }
  .size-btn:hover { border-color: rgba(212,175,55,0.4); color: #d4af37; }
  .size-btn.selected {
    background: #d4af37; border-color: #d4af37;
    color: #0a0a0a; font-weight: 700;
  }

  .qty-btn {
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
    color: #fff; font-size: 18px;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Sans', sans-serif;
  }
  .qty-btn:hover { background: rgba(212,175,55,0.1); border-color: rgba(212,175,55,0.3); color: #d4af37; }

  .add-btn {
    flex: 1; padding: 16px 24px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 14px;
    color: #0a0a0a; font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .add-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(212,175,55,0.3); }
  .add-btn.added { background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: #6ee7b7; }

  .wish-btn {
    width: 56px; height: 56px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.3s;
  }
  .wish-btn:hover { border-color: rgba(212,175,55,0.3); background: rgba(212,175,55,0.05); }
  .wish-btn.active { background: rgba(212,175,55,0.1); border-color: rgba(212,175,55,0.4); animation: pulse-gold 2s ease-in-out infinite; }

  .tab-btn {
    padding: 12px 20px; background: none; border: none;
    color: rgba(255,255,255,0.3); font-size: 11px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; position: relative;
  }
  .tab-btn.active { color: #d4af37; }
  .tab-btn.active::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: #d4af37;
  }
  .tab-btn:hover:not(.active) { color: rgba(255,255,255,0.6); }

  .trust-item {
    display: flex; flex-direction: column; align-items: center;
    gap: 8px; padding: 16px;
    border-radius: 12px; text-align: center;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
  }
`;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        setProduct(productData);
        const allProducts = await productService.getAllProducts();
        const similarProducts = allProducts.filter(p => p.category === productData.category && p.id !== productData.id).slice(0, 4);
        setSimilar(similarProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808" }}>
      <style>{STYLES}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "1px solid rgba(212,175,55,0.3)", borderTopColor: "#d4af37", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Loading</p>
      </div>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, background: "#080808" }}>
      <style>{STYLES}</style>
      <p style={{ color: "#fff", fontSize: 24, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>Product not found</p>
      <button onClick={() => navigate("/shop")} style={{ padding: "12px 24px", background: "#d4af37", border: "none", borderRadius: 10, color: "#0a0a0a", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Back to Shop</button>
    </div>
  );

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!size) { setSizeError(true); return; }
    setSizeError(false);
    const colorName = product.color_names ? product.color_names[colorIdx] : "Default";
    addToCart(product, size, colorName, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Breadcrumb */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
          {[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: product.name }].map((b, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={{ color: "rgba(212,175,55,0.3)", fontSize: 10 }}>›</span>}
              {b.href ? (
                <Link to={b.href} style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#d4af37"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
                >{b.label}</Link>
              ) : (
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.05em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{b.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="pd-grid">
          <style>{`@media(max-width:1024px){.pd-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>

          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {/* Main image */}
            <div style={{
              position: "relative", overflow: "hidden", borderRadius: 20,
              aspectRatio: "3/4", marginBottom: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)"
            }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={product.images?.[imgIdx]}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Badges */}
              <div style={{ position: "absolute", top: 16, left: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {product.discount > 0 && (
                  <div style={{ padding: "5px 12px", borderRadius: 100, background: "rgba(212,175,55,0.9)", color: "#0a0a0a", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>
                    −{product.discount}%
                  </div>
                )}
                {product.is_new && (
                  <div style={{ padding: "5px 12px", borderRadius: 100, background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em" }}>
                    New
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(product.images.length, 4)}, 1fr)`, gap: 10 }}>
                {product.images.map((img, i) => (
                  <button key={i} className={`pd-thumb ${imgIdx === i ? "active" : ""}`} onClick={() => setImgIdx(i)}>
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {/* Category + name */}
            <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px" }}>{product.category}</p>
            <h1 style={{ fontSize: 42, fontWeight: 300, color: "#fff", margin: "0 0 16px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.02em", lineHeight: 1.1 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <ProductRating rating={product.rating} reviews={product.reviews} size="lg" />
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, letterSpacing: "0.05em" }}>{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 36 }}>
              <span style={{ fontSize: 40, fontWeight: 300, color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <>
                  <span style={{ fontSize: 20, color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatPrice(product.original_price)}
                  </span>
                  <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 100, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37", fontWeight: 600, letterSpacing: "0.08em" }}>
                    Save {formatPrice(product.original_price - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 28 }} />

            {/* Color */}
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 14px", fontWeight: 500 }}>
                  Color — <span style={{ color: "#d4af37", textTransform: "none", letterSpacing: "normal", fontWeight: 400 }}>{product.color_names?.[colorIdx]}</span>
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  {product.colors.map((c, i) => (
                    <button key={i} onClick={() => setColorIdx(i)} title={product.color_names?.[i]}
                      style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: c, border: colorIdx === i ? "2px solid #d4af37" : "2px solid rgba(255,255,255,0.1)",
                        outline: colorIdx === i ? "2px solid rgba(212,175,55,0.2)" : "none",
                        outlineOffset: 2, cursor: "pointer", transition: "all 0.2s",
                        transform: colorIdx === i ? "scale(1.15)" : "scale(1)"
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 500 }}>Size</p>
                  <button style={{ fontSize: 11, color: "rgba(212,175,55,0.5)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.05em", fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" }}
                    onMouseEnter={e => e.target.style.color = "#d4af37"}
                    onMouseLeave={e => e.target.style.color = "rgba(212,175,55,0.5)"}
                  >Size Guide</button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {product.sizes.map(s => (
                    <button key={s} className={`size-btn ${size === s ? "selected" : ""}`} onClick={() => { setSize(s); setSizeError(false); }}>
                      {s}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {sizeError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ color: "#fca5a5", fontSize: 12, margin: "10px 0 0", letterSpacing: "0.05em" }}>
                      Please select a size to continue
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 500 }}>Quantity</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 500, minWidth: 24, textAlign: "center", fontFamily: "'Cormorant Garamond', serif" }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <button className={`add-btn ${added ? "added" : ""}`} onClick={handleAddToCart}>
                {added ? (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <button className={`wish-btn ${wishlisted ? "active" : ""}`} onClick={() => toggle(product)}>
                <svg width="20" height="20" fill={wishlisted ? "#d4af37" : "none"} stroke={wishlisted ? "#d4af37" : "rgba(255,255,255,0.5)"} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 32 }}>
              {[
                { icon: <svg width="18" height="18" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>, label: "Free Shipping", sub: "Over $200" },
                { icon: <svg width="18" height="18" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>, label: "Free Returns", sub: "30 days" },
                { icon: <svg width="18" height="18" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, label: "Authentic", sub: "100% genuine" }
              ].map(b => (
                <div key={b.label} className="trust-item">
                  {b.icon}
                  <p style={{ color: "#fff", fontSize: 11, fontWeight: 500, margin: 0, letterSpacing: "0.05em" }}>{b.label}</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, margin: 0 }}>{b.sub}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
              <div style={{ display: "flex" }}>
                {["description", "details"].map(t => (
                  <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t}</button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {tab === "description" && (
                <motion.p key="desc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
                  {product.description}
                </motion.p>
              )}
              {tab === "details" && (
                <motion.div key="details" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {[
                    { label: "Material", val: "Premium blend" },
                    { label: "Fit", val: "Regular fit" },
                    { label: "Care", val: "Dry clean only" },
                    { label: "Origin", val: "Made in Italy" }
                  ].map((d, i) => (
                    <div key={d.label} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>{d.label}</span>
                      <span style={{ fontSize: 13, color: "#fff" }}>{d.val}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Similar products */}
      {similar.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "60px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 10px" }}>You May Also Like</p>
            <h2 style={{ fontSize: 36, fontWeight: 300, color: "#fff", margin: "0 0 40px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>Similar Pieces</h2>
            <ProductGrid products={similar} cols={4} />
          </div>
        </div>
      )}
    </div>
  );
}