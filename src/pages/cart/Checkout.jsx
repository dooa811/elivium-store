import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import api from "../../utils/api.js";

const STEPS = [
  { label: "Information", icon: "◎" },
  { label: "Shipping", icon: "◈" },
  { label: "Payment", icon: "◇" }
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes shimmer{0%{left:-100%}60%{left:150%}100%{left:150%}}

  .ck-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 15px 18px;
    color: #fff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.3s;
    box-sizing: border-box;
  }
  .ck-input:focus {
    border-color: rgba(212,175,55,0.5);
    background: rgba(212,175,55,0.04);
    box-shadow: 0 0 0 4px rgba(212,175,55,0.06);
  }
  .ck-input::placeholder { color: rgba(255,255,255,0.2); }

  .ck-label {
    display: block;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }

  .next-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 32px;
    background: linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%);
    background-size: 200% 200%;
    border: none; border-radius: 12px;
    color: #0a0a0a; font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.3s; white-space: nowrap;
  }
  .next-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(212,175,55,0.3); }
  .next-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .next-btn.full { width: 100%; justify-content: center; }

  .back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 24px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .back-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }

  .pay-option {
    display: flex; align-items: center; gap: 16px;
    padding: 18px 20px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden;
  }
  .pay-option:hover { border-color: rgba(212,175,55,0.2); }
  .pay-option.selected {
    border-color: rgba(212,175,55,0.4);
    background: rgba(212,175,55,0.04);
  }
  .pay-option.selected::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent);
  }

  .pay-radio {
    width: 18px; height: 18px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.2s;
  }
  .pay-radio.checked {
    border-color: #d4af37;
    background: rgba(212,175,55,0.1);
  }
  .pay-radio-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #d4af37;
  }
`;

const Field = ({ label, name, type = "text", value, onChange, placeholder, required }) => (
  <div>
    <label className="ck-label">{label}</label>
    <input className="ck-input" name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />
  </div>
);

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: ""
  });

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.post("/orders", { subtotal, shipping, payment_method: payment, shipping_address: form });
      const order = response.data.order;
      clearCart();
      navigate("/checkout/success", { state: { order } });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) { navigate("/cart"); return null; }

  const paymentOptions = [
    { val: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: (
      <svg width="22" height="22" fill="none" stroke="rgba(212,175,55,0.7)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )},
    { val: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex accepted", icon: (
      <svg width="22" height="22" fill="none" stroke="rgba(212,175,55,0.7)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )},
    { val: "bank", label: "Bank Transfer", desc: "Direct bank transfer", icon: (
      <svg width="22" height="22" fill="none" stroke="rgba(212,175,55,0.7)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 21l18-18M3 7v14h18V7L12 3 3 7z" />
      </svg>
    )}
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Header with steps */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
        padding: "40px 24px"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 8px" }}>Secure Checkout</p>
          <h1 style={{ fontSize: 36, fontWeight: 300, color: "#fff", margin: "0 0 32px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Complete Your Order</h1>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {STEPS.map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: i < step ? "#d4af37" : i === step ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.04)",
                    border: i <= step ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.4s"
                  }}>
                    {i < step ? (
                      <svg width="14" height="14" fill="none" stroke={i < step ? "#0a0a0a" : "#d4af37"} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span style={{ fontSize: 12, color: i === step ? "#d4af37" : "rgba(255,255,255,0.2)", fontWeight: 600 }}>{i + 1}</span>
                    )}
                  </div>
                  <span style={{
                    fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: i === step ? "#fff" : i < step ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.2)",
                    fontWeight: i === step ? 500 : 400, transition: "all 0.3s"
                  }}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: 40, height: 1, margin: "0 16px",
                    background: i < step ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.06)",
                    transition: "background 0.4s"
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40 }} className="ck-grid">
        <style>{`@media(max-width:1024px){.ck-grid{grid-template-columns:1fr!important}}`}</style>

        {/* Form area */}
        <div>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div key="err" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ padding: "14px 18px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#fca5a5", fontSize: 13, marginBottom: 24 }}>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Step 0 — Information */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                <h2 style={{ fontSize: 24, fontWeight: 300, color: "#fff", margin: "0 0 28px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Contact Information</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <Field label="First Name" name="firstName" value={form.firstName} onChange={handle} placeholder="James" required />
                  <Field label="Last Name" name="lastName" value={form.lastName} onChange={handle} placeholder="Smith" required />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <Field label="Email Address" name="email" type="email" value={form.email} onChange={handle} placeholder="james@email.com" required />
                </div>
                <div style={{ marginBottom: 32 }}>
                  <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+1 234 567 8900" />
                </div>
                <button className="next-btn" onClick={() => setStep(1)} disabled={!form.firstName || !form.email}>
                  Continue to Shipping
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            )}

            {/* Step 1 — Shipping */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                <h2 style={{ fontSize: 24, fontWeight: 300, color: "#fff", margin: "0 0 28px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Shipping Address</h2>
                <div style={{ marginBottom: 16 }}>
                  <Field label="Street Address" name="address" value={form.address} onChange={handle} placeholder="123 Main Street" required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <Field label="City" name="city" value={form.city} onChange={handle} placeholder="New York" />
                  <Field label="ZIP / Postal" name="zip" value={form.zip} onChange={handle} placeholder="10001" />
                </div>
                <div style={{ marginBottom: 32 }}>
                  <Field label="Country" name="country" value={form.country} onChange={handle} placeholder="United States" required />
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="back-btn" onClick={() => setStep(0)}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button className="next-btn" onClick={() => setStep(2)} disabled={!form.address || !form.country}>
                    Continue to Payment
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                <h2 style={{ fontSize: 24, fontWeight: 300, color: "#fff", margin: "0 0 28px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.05em" }}>Payment Method</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {paymentOptions.map(p => (
                    <div key={p.val} className={`pay-option ${payment === p.val ? "selected" : ""}`} onClick={() => setPayment(p.val)}>
                      <div className={`pay-radio ${payment === p.val ? "checked" : ""}`}>
                        {payment === p.val && <div className="pay-radio-dot" />}
                      </div>
                      <div style={{ color: "rgba(212,175,55,0.7)" }}>{p.icon}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: "0 0 3px" }}>{p.label}</p>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>{p.desc}</p>
                      </div>
                      {payment === p.val && (
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4af37" }} />
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="back-btn" onClick={() => setStep(1)}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button className="next-btn full" onClick={placeOrder} disabled={loading} style={{ flex: 1 }}>
                    {loading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                        </svg>
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Place Order · {formatPrice(total)}
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary sidebar */}
        <div>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.1)",
            borderRadius: 20, padding: 28,
            position: "sticky", top: 100
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 400, color: "#fff", margin: "0 0 24px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.08em" }}>Your Order</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: 280, overflowY: "auto", marginBottom: 24 }}>
              {items.map(item => (
                <div key={item.key} style={{ display: "flex", gap: 14 }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <img src={item.images?.[0]} alt={item.name} style={{ width: 56, height: 72, objectFit: "cover", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }} />
                    <div style={{
                      position: "absolute", top: -6, right: -6,
                      width: 18, height: 18, borderRadius: "50%",
                      background: "#d4af37", color: "#0a0a0a",
                      fontSize: 10, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>{item.qty}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "0 0 6px" }}>Size: {item.size} · {item.color}</p>
                    <p style={{ color: "#d4af37", fontSize: 13, fontWeight: 600, margin: 0 }}>{formatPrice(item.price * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Subtotal</span>
                <span style={{ fontSize: 13, color: "#fff" }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Shipping</span>
                <span style={{ fontSize: 13, color: shipping === 0 ? "#d4af37" : "#fff" }}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Total</span>
                <span style={{ fontSize: 26, fontWeight: 300, color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Security badges */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {["Secure", "Encrypted", "Protected"].map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(212,175,55,0.3)" }} />
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}