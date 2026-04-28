import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import api from "../../utils/api.js";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

const STEPS = ["Information", "Shipping", "Payment"];

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

  const handle = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/orders", {
        subtotal,
        shipping,
        payment_method: payment,
        shipping_address: form
      });

      const order = response.data.order;
      clearCart();
      
      navigate("/checkout/success", { state: { order } });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-obsidian-800 border-b border-obsidian-700 py-10 px-4">
        <div className="container-xl">
          <h1 className="font-display text-4xl font-bold text-white mb-6">
            Checkout
          </h1>
          {/* Steps */}
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold border transition-all ${
                    i < step
                      ? "bg-gold-500 border-gold-500 text-obsidian-900"
                      : i === step
                      ? "border-gold-500 text-gold-400"
                      : "border-obsidian-500 text-obsidian-400"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs uppercase tracking-widest ${
                    i === step ? "text-white font-semibold" : "text-obsidian-400"
                  }`}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="text-obsidian-600 text-sm">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-bold text-white">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handle}
                    placeholder="James"
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handle}
                    placeholder="Smith"
                    required
                  />
                </div>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="james@email.com"
                  required
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handle}
                  placeholder="+1 234 567 8900"
                />
                <Button
                  onClick={() => setStep(1)}
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={!form.firstName || !form.email}
                >
                  Continue to Shipping →
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-bold text-white">
                  Shipping Address
                </h2>
                <Input
                  label="Street Address"
                  name="address"
                  value={form.address}
                  onChange={handle}
                  placeholder="123 Main Street"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handle}
                    placeholder="New York"
                  />
                  <Input
                    label="ZIP / Postal"
                    name="zip"
                    value={form.zip}
                    onChange={handle}
                    placeholder="10001"
                  />
                </div>
                <Input
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handle}
                  placeholder="United States"
                  required
                />
                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(0)}
                    variant="ghost"
                    size="md"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={() => setStep(2)}
                    variant="gold"
                    size="lg"
                    disabled={!form.address || !form.city || !form.country}
                  >
                    Continue to Payment →
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-bold text-white">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      val: "cod",
                      label: "Cash on Delivery",
                      icon: "💵",
                      desc: "Pay when your order arrives"
                    },
                    {
                      val: "card",
                      label: "Credit / Debit Card",
                      icon: "💳",
                      desc: "Visa, Mastercard, Amex accepted"
                    },
                    {
                      val: "bank",
                      label: "Bank Transfer",
                      icon: "🏦",
                      desc: "Direct bank transfer"
                    }
                  ].map((p) => (
                    <label
                      key={p.val}
                      className={`flex items-center gap-4 p-5 border cursor-pointer transition-all duration-200 ${
                        payment === p.val
                          ? "border-gold-500 bg-gold-500/8"
                          : "border-obsidian-600 hover:border-obsidian-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={p.val}
                        checked={payment === p.val}
                        onChange={() => setPayment(p.val)}
                        className="accent-gold-500"
                      />
                      <span className="text-2xl">{p.icon}</span>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {p.label}
                        </p>
                        <p className="text-obsidian-300 text-xs">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="ghost"
                    size="md"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={placeOrder}
                    variant="gold"
                    size="lg"
                    loading={loading}
                    className="flex-1"
                  >
                    {loading
                      ? "Placing Order..."
                      : `Place Order · ${formatPrice(total)}`}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-obsidian-800 border border-obsidian-600 p-6 sticky top-28">
              <h3 className="font-display text-xl font-bold text-white mb-5">
                Your Order
              </h3>
              <div className="space-y-4 max-h-60 overflow-y-auto mb-5">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.images && item.images[0]}
                        alt={item.name}
                        className="w-16 h-20 object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold-500 text-obsidian-900 text-xs font-bold flex items-center justify-center rounded-full">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-obsidian-300 text-xs">
                        Size: {item.size} · {item.color}
                      </p>
                      <p className="text-white text-sm font-semibold mt-1">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-obsidian-600 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-obsidian-200">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-obsidian-200">Shipping</span>
                  <span className={shipping === 0 ? "text-gold-400" : "text-white"}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-obsidian-600">
                  <span className="font-bold text-white text-sm uppercase tracking-widest">
                    Total
                  </span>
                  <span className="font-display text-xl font-bold text-white">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}