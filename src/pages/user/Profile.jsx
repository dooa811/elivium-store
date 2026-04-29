import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

  .pf-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 14px 18px;
    color: #fff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.3s;
    box-sizing: border-box;
  }
  .pf-input:focus {
    border-color: rgba(212,175,55,0.5);
    background: rgba(212,175,55,0.04);
    box-shadow: 0 0 0 4px rgba(212,175,55,0.06);
  }
  .pf-input::placeholder { color: rgba(255,255,255,0.2); }

  .pf-label {
    display: block;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }

  .stat-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 24px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    display: block;
    position: relative;
    overflow: hidden;
  }
  .stat-card:hover {
    border-color: rgba(212,175,55,0.25);
    transform: translateY(-3px);
  }
  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .stat-card:hover::before { opacity: 1; }

  .quick-link {
    display: flex; align-items: center; gap: 16px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 20px 24px;
    text-decoration: none;
    transition: all 0.3s;
    position: relative; overflow: hidden;
  }
  .quick-link:hover { border-color: rgba(212,175,55,0.2); transform: translateX(4px); }
  .quick-link:hover .ql-arrow { transform: translateX(4px); color: #d4af37; }

  .ql-arrow { transition: all 0.2s; color: rgba(255,255,255,0.2); }

  .save-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 10px;
    color: #0a0a0a; font-size: 11px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s;
  }
  .save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,175,55,0.3); }

  .cancel-btn {
    padding: 12px 20px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .cancel-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }

  .edit-btn {
    padding: 8px 18px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: rgba(255,255,255,0.5); font-size: 10px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .edit-btn:hover { border-color: rgba(212,175,55,0.3); color: #d4af37; }

  .signout-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px;
    background: rgba(239,68,68,0.06);
    border: 1px solid rgba(239,68,68,0.15);
    border-radius: 10px;
    color: rgba(239,68,68,0.6); font-size: 11px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .signout-btn:hover { background: rgba(239,68,68,0.12); color: #fca5a5; border-color: rgba(239,68,68,0.3); }
`;

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const orders = JSON.parse(localStorage.getItem("elivium_orders") || "[]");

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [saved, setSaved] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const save = () => {
    updateUser(form);
    setEdit(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = (user?.name || "U").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const stats = [
    { label: "Orders", val: orders.length, href: "/orders", icon: "◎" },
    { label: "Wishlist", val: wishCount, href: "/wishlist", icon: "◇" },
    { label: "Cart", val: totalItems, href: "/cart", icon: "◈" }
  ];

  const quickLinks = [
    { label: "My Orders", sub: "Track and manage your purchases", href: "/orders", icon: (
      <svg width="20" height="20" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )},
    { label: "My Wishlist", sub: "Pieces you've saved for later", href: "/wishlist", icon: (
      <svg width="20" height="20" fill="none" stroke="rgba(212,175,55,0.6)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )}
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
        padding: "56px 24px 48px", position: "relative", overflow: "hidden"
      }}>
        {/* Decorative initials */}
        <div style={{
          position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)",
          fontSize: 200, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          color: "rgba(212,175,55,0.025)", lineHeight: 1, pointerEvents: "none", userSelect: "none"
        }}>{initials}</div>

        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", gap: 28, position: "relative", zIndex: 1 }}>
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 600, color: "#0a0a0a",
              fontFamily: "'Cormorant Garamond', serif", flexShrink: 0,
              boxShadow: "0 0 40px rgba(212,175,55,0.2)"
            }}
          >
            {initials}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 6px" }}>My Account</p>
            <h1 style={{ fontSize: 36, fontWeight: 300, color: "#fff", margin: "0 0 4px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
              {user?.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, margin: 0 }}>{user?.email}</p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p style={{ fontSize: 11, color: "rgba(212,175,55,0.4)", margin: "0 0 8px", letterSpacing: "0.1em" }}>{s.icon}</p>
              <p style={{ fontSize: 36, fontWeight: 300, color: "#d4af37", margin: "0 0 6px", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>
                {s.val}
              </p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, fontWeight: 500 }}>
                {s.label}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20, padding: "32px",
            marginBottom: 20, position: "relative", overflow: "hidden"
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 6px", fontWeight: 500 }}>Account Details</p>
              <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff", margin: 0, fontFamily: "'Cormorant Garamond', serif" }}>Personal Information</h2>
            </div>
            {!edit && <button className="edit-btn" onClick={() => setEdit(true)}>Edit</button>}
          </div>

          {/* Success message */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  padding: "12px 16px", marginBottom: 20,
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 10, color: "#6ee7b7", fontSize: 13,
                  display: "flex", alignItems: "center", gap: 8
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Profile updated successfully
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {edit ? (
              <motion.div key="edit" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label className="pf-label">Full Name</label>
                    <input className="pf-input" name="name" value={form.name} onChange={handle} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="pf-label">Email Address</label>
                    <input className="pf-input" name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="cancel-btn" onClick={() => setEdit(false)}>Cancel</button>
                  <button className="save-btn" onClick={save}>Save Changes</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {[
                  { label: "Full Name", val: user?.name },
                  { label: "Email Address", val: user?.email },
                  { label: "Account Role", val: user?.role || "Customer" },
                  { label: "Member Since", val: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—" }
                ].map((f, i) => (
                  <div key={f.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none"
                  }}>
                    <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>{f.label}</span>
                    <span style={{ fontSize: 14, color: "#fff", fontWeight: 400 }}>{f.val}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick links */}
        <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
          {quickLinks.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              className="quick-link"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0
              }}>
                {l.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: "0 0 3px" }}>{l.label}</p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: 0 }}>{l.sub}</p>
              </div>
              <svg className="ql-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Sign out */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <button className="signout-btn" onClick={logout}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}