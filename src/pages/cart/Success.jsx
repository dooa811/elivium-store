import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "../../utils/formatPrice.js";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes ripple{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2.5);opacity:0}}
  @keyframes confetti-fall {
    0%{transform:translateY(-20px) rotate(0deg);opacity:1}
    100%{transform:translateY(100px) rotate(360deg);opacity:0}
  }

  .success-btn-gold {
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
  .success-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(212,175,55,0.3); }

  .success-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    text-decoration: none; transition: all 0.3s;
  }
  .success-btn-outline:hover { border-color: rgba(212,175,55,0.3); color: #fff; background: rgba(255,255,255,0.07); }
`;

const confettiItems = Array.from({ length: 12 }, (_, i) => ({
  x: (Math.random() - 0.5) * 300,
  delay: Math.random() * 1.5,
  size: 4 + Math.random() * 6,
  color: i % 3 === 0 ? "#d4af37" : i % 3 === 1 ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.2)"
}));

export default function Success() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#080808", position: "relative", overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif", padding: "60px 24px"
    }}>
      <style>{STYLES}</style>

      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "absolute", top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }}
      />

      {/* Confetti particles */}
      {confettiItems.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, -80, -160], x: [0, c.x / 3, c.x], scale: [0, 1, 0.5] }}
          transition={{ delay: 0.8 + c.delay, duration: 2.5, ease: "easeOut" }}
          style={{
            position: "absolute", top: "45%", left: "50%",
            width: c.size, height: c.size, borderRadius: i % 2 === 0 ? "50%" : 2,
            background: c.color, pointerEvents: "none"
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 560, position: "relative", zIndex: 1, textAlign: "center" }}
      >
        {/* Checkmark with ripples */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 48 }}>
          {/* Ripple rings */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 2.2], opacity: [0.6, 0] }}
              transition={{ delay: 0.3 + i * 0.3, duration: 1.5, repeat: 0 }}
              style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                border: `1px solid rgba(212,175,55,${0.3 - i * 0.08})`,
                pointerEvents: "none"
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37 0%, #f0d060 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 60px rgba(212,175,55,0.25), 0 0 120px rgba(212,175,55,0.1)",
              position: "relative", zIndex: 1
            }}
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              width="44" height="44" fill="none" stroke="#0a0a0a" viewBox="0 0 24 24"
            >
              <motion.path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 12px" }}>
            Order Confirmed
          </p>
          <h1 style={{
            fontSize: 52, fontWeight: 300, color: "#fff", margin: "0 0 16px",
            fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em",
            lineHeight: 1
          }}>
            Thank You
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, margin: "0 0 8px", fontWeight: 300, lineHeight: 1.7 }}>
            Your order has been placed successfully.
          </p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, margin: "0 0 40px" }}>
            We'll send you a confirmation email shortly.
          </p>
        </motion.div>

        {/* Order details card */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(212,175,55,0.12)",
              borderRadius: 20, padding: "28px 32px",
              marginBottom: 36, textAlign: "left", position: "relative", overflow: "hidden"
            }}
          >
            {/* Top shimmer line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)"
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0, fontWeight: 500 }}>Order Details</p>
              <p style={{ fontSize: 11, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(212,175,55,0.5)", margin: 0 }}>
                #{order.id?.slice(0, 8).toUpperCase()}
              </p>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {[
                { label: "Payment Method", value: order.payment_method === "cod" ? "Cash on Delivery" : order.payment_method },
                { label: "Order Total", value: formatPrice(order.total), highlight: true },
                { label: "Status", value: order.status || "Confirmed", highlight: true }
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: row.highlight ? "#d4af37" : "#fff", fontWeight: row.highlight ? 600 : 400, fontFamily: row.label === "Order Total" ? "'Cormorant Garamond', serif" : "inherit", fontSize: row.label === "Order Total" ? 18 : 13 }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link to="/orders" className="success-btn-outline">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Orders
          </Link>
          <Link to="/shop" className="success-btn-gold">
            Continue Shopping
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Bottom signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ color: "rgba(255,255,255,0.08)", fontSize: 11, marginTop: 48, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          Elivium — Dress with Purpose
        </motion.p>
      </motion.div>
    </div>
  );
}