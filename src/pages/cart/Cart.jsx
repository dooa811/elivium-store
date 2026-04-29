import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes fadeSlideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .cart-glass {
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212,175,55,0.12);
    border-radius: 20px;
  }
  .qty-btn {
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .qty-btn:hover { background: rgba(212,175,55,0.15); border-color: rgba(212,175,55,0.3); color: #d4af37; }
  .remove-btn {
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.2); background: none; border: none;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: color 0.2s; padding: 0;
  }
  .remove-btn:hover { color: rgba(239,68,68,0.7); }
  .checkout-btn {
    width: 100%; padding: 16px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 12px;
    color: #0a0a0a; font-size: 13px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s; text-decoration: none;
    display: block; text-align: center;
  }
  .checkout-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(212,175,55,0.3); }
  .promo-input {
    flex: 1; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08); border-right: none;
    border-radius: 10px 0 0 10px; padding: 12px 16px;
    color: #fff; font-size: 13px; outline: none;
    font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
  }
  .promo-input:focus { border-color: rgba(212,175,55,0.4); }
  .promo-input::placeholder { color: rgba(255,255,255,0.2); }
  .promo-apply {
    padding: 12px 18px; background: rgba(212,175,55,0.1);
    border: 1px solid rgba(212,175,55,0.2); border-radius: 0 10px 10px 0;
    color: #d4af37; font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .promo-apply:hover { background: rgba(212,175,55,0.2); }
  .continue-link {
    display: inline-flex; align-items: center; gap: 8px;
    color: rgba(255,255,255,0.4); font-size: 12px;
    letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
  }
  .continue-link:hover { color: #d4af37; }
`;

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, shipping, total, totalItems } = useCart();

  if (items.length === 0) return (
    <div style={{
      minHeight: "80vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24,
      background: "#080808", fontFamily: "'DM Sans', sans-serif"
    }}>
      <style>{STYLES}</style>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          background: "rgba(212,175,55,0.05)",
          border: "1px solid rgba(212,175,55,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <svg width="48" height="48" fill="none" stroke="rgba(212,175,55,0.4)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 300, margin: "0 0 8px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Your cart is empty</h2>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 32px", fontWeight: 300 }}>Discover our collection and add your favourite pieces.</p>
        <Link to="/shop" className="checkout-btn" style={{ maxWidth: 200, margin: "0 auto" }}>Explore Collection</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(212,175,55,0.1)",
        padding: "48px 24px 40px"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>My Selection</p>
          <h1 style={{ fontSize: 40, fontWeight: 300, color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Shopping Cart</h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "8px 0 0", letterSpacing: "0.05em" }}>{totalItems} item{totalItems !== 1 ? "s" : ""} selected</p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }} className="cart-grid">
        <style>{`@media(max-width:1024px){.cart-grid{grid-template-columns:1fr!important}}`}</style>

        {/* Items */}
        <div>
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 100px 120px 80px",
            gap: 16, padding: "0 0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            marginBottom: 8
          }}>
            {["Product", "Price", "Quantity", "Total"].map(h => (
              <p key={h} style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: 0, fontWeight: 500 }}>{h}</p>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 100px 120px 80px",
                  gap: 16, alignItems: "center",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)"
                }}
              >
                {/* Product */}
                <div style={{ display: "flex", gap: 16 }}>
                  <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                    <div style={{
                      width: 80, height: 100, overflow: "hidden",
                      borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)"
                    }}>
                      <img src={item.images?.[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", display: "block" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"}
                      />
                    </div>
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link to={`/product/${item.id}`} style={{ color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "block", marginBottom: 6, transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#d4af37"}
                      onMouseLeave={e => e.target.style.color = "#fff"}
                    >{item.name}</Link>
                    <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>Size: {item.size}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>Color: {item.color}</span>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.key)}>Remove</button>
                  </div>
                </div>

                {/* Price */}
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: 0 }}>{formatPrice(item.price)}</p>

                {/* Qty */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button className="qty-btn" onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 500, minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                </div>

                {/* Total */}
                <p style={{ color: "#d4af37", fontSize: 14, fontWeight: 600, margin: 0 }}>{formatPrice(item.price * item.qty)}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          <div style={{ marginTop: 32 }}>
            <Link to="/shop" className="continue-link">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="cart-glass" style={{ padding: 32, position: "sticky", top: 112 }}>
            <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff", margin: "0 0 28px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Order Summary</h2>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Subtotal ({totalItems} items)</span>
                <span style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Shipping</span>
                <span style={{ fontSize: 13, color: shipping === 0 ? "#d4af37" : "#fff", fontWeight: 500 }}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: 11, color: "rgba(212,175,55,0.5)", margin: "8px 0 0", letterSpacing: "0.05em" }}>
                  Add {formatPrice(200 - subtotal)} more for free shipping
                </p>
              )}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Total</span>
                <span style={{ fontSize: 28, fontWeight: 300, color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Promo */}
            <div style={{ display: "flex", marginBottom: 20 }}>
              <input className="promo-input" placeholder="Promo code" />
              <button className="promo-apply">Apply</button>
            </div>

            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>

            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
              {["Visa", "Mastercard", "COD"].map(p => (
                <span key={p} style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}