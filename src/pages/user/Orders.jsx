import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { formatPrice } from "../../utils/formatPrice.js";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes glow { 0%,100%{opacity:0.3} 50%{opacity:0.7} }

  .order-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px;
    overflow: hidden;
    transition: border-color 0.4s, transform 0.4s;
    position: relative;
  }
  .order-card:hover {
    border-color: rgba(212,175,55,0.2);
    transform: translateY(-2px);
  }
  .order-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .order-card:hover::before { opacity: 1; }

  .status-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 100px;
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    font-family: 'DM Sans', sans-serif;
  }
  .status-confirmed { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); color: #6ee7b7; }
  .status-pending { background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); color: #d4af37; }
  .status-shipped { background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2); color: #a5b4fc; }
  .status-cancelled { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); color: #fca5a5; }

  .shop-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 12px;
    color: #0a0a0a; font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    text-decoration: none; transition: all 0.3s;
  }
  .shop-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(212,175,55,0.3); }

  .item-img {
    width: 56px; height: 72px; object-fit: cover;
    border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.4s;
  }
  .item-img:hover { transform: scale(1.08); }

  .reorder-link {
    display: inline-flex; align-items: center; gap: 6px;
    color: rgba(212,175,55,0.5); font-size: 11px;
    letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; font-weight: 500;
  }
  .reorder-link:hover { color: #d4af37; gap: 10px; }

  .number-display {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-style: italic;
    color: rgba(212,175,55,0.5);
    letter-spacing: 0.05em;
  }
`;

const statusClass = (s) => {
  if (!s) return "status-confirmed";
  const m = { confirmed: "status-confirmed", pending: "status-pending", shipped: "status-shipped", cancelled: "status-cancelled" };
  return m[s] || "status-confirmed";
};

const statusDot = (s) => {
  const colors = { confirmed: "#6ee7b7", pending: "#d4af37", shipped: "#a5b4fc", cancelled: "#fca5a5" };
  return colors[s] || "#6ee7b7";
};

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("elivium_orders") || "[]");

  if (orders.length === 0) return (
    <div style={{
      minHeight: "85vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#080808", fontFamily: "'DM Sans', sans-serif",
      gap: 0, position: "relative", overflow: "hidden"
    }}>
      <style>{STYLES}</style>

      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute", top: "30%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        {/* Animated box icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 120, height: 120, borderRadius: "50%",
            background: "rgba(212,175,55,0.05)",
            border: "1px solid rgba(212,175,55,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 40px"
          }}
        >
          <svg width="48" height="48" fill="none" stroke="rgba(212,175,55,0.5)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </motion.div>

        <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px" }}>Order History</p>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: "#fff", margin: "0 0 16px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>
          No orders yet
        </h2>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 40px", fontWeight: 300, lineHeight: 1.7 }}>
          Your order history will appear here<br />after your first purchase.
        </p>
        <Link to="/shop" className="shop-btn">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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
        padding: "60px 24px 48px", position: "relative", overflow: "hidden"
      }}>
        {/* Decorative number */}
        <div style={{
          position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
          fontSize: 180, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          color: "rgba(212,175,55,0.04)", lineHeight: 1, pointerEvents: "none",
          userSelect: "none"
        }}>{orders.length}</div>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 10px" }}>Purchase History</p>
            <h1 style={{ fontSize: 48, fontWeight: 300, color: "#fff", margin: "0 0 8px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
              My Orders
            </h1>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, margin: 0, letterSpacing: "0.05em" }}>
              {orders.length} order{orders.length !== 1 ? "s" : ""} in your history
            </p>
          </motion.div>
        </div>
      </div>

      {/* Orders list */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {orders.map((order, i) => (
            <motion.div
              key={order.id || i}
              className="order-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Card top */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 16,
                padding: "24px 28px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.04)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  {/* Order number */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "rgba(212,175,55,0.06)",
                    border: "1px solid rgba(212,175,55,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: 11, color: "rgba(212,175,55,0.7)", fontWeight: 600, letterSpacing: "0.05em" }}>
                      #{(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <p className="number-display" style={{ margin: "0 0 4px" }}>
                      {order.id ? order.id.slice(0, 8).toUpperCase() : "ORDER"}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: 0, letterSpacing: "0.05em" }}>
                      {order.date
                        ? new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                        : new Date(order.created_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                      }
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span className={`status-badge ${statusClass(order.status)}`}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: statusDot(order.status), flexShrink: 0,
                      animation: order.status === "pending" ? "glow 2s ease-in-out infinite" : "none"
                    }} />
                    {order.status || "Confirmed"}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 2px" }}>Total</p>
                    <p style={{ fontSize: 22, fontWeight: 300, color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div style={{ padding: "20px 28px" }}>
                <div style={{ display: "flex", gap: 10, overflow: "auto", paddingBottom: 4 }}>
                  {(order.items || order.order_items || []).map((item, j) => (
                    <motion.div
                      key={item.key || item.id || j}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      style={{ flexShrink: 0, position: "relative" }}
                    >
                      <img
                        src={item.images?.[0] || item.product_image}
                        alt={item.name || item.product_name}
                        className="item-img"
                        onError={e => { e.target.style.display = "none"; }}
                      />
                      {item.qty > 1 && (
                        <div style={{
                          position: "absolute", top: -6, right: -6,
                          width: 18, height: 18, borderRadius: "50%",
                          background: "#d4af37", color: "#0a0a0a",
                          fontSize: 10, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>{item.qty}</div>
                      )}
                    </motion.div>
                  ))}
                  {(!order.items?.length && !order.order_items?.length) && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Order details loading...
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 28px",
                borderTop: "1px solid rgba(255,255,255,0.04)"
              }}>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, letterSpacing: "0.05em" }}>
                  Payment: {order.payment === "cod" || order.payment_method === "cod" ? "Cash on Delivery" : (order.payment || order.payment_method || "—")}
                </span>
                <Link to="/shop" className="reorder-link">
                  Shop Again
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: orders.length * 0.1 + 0.3 }}
          style={{ textAlign: "center", marginTop: 48, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, margin: "0 0 20px" }}>Discover new arrivals</p>
          <Link to="/shop" className="shop-btn">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}