import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "../../utils/formatPrice.js";
import Button from "../../components/ui/Button.jsx";

export default function Success() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
          className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-gold-md">
          <svg className="w-10 h-10 text-obsidian-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
          </svg>
        </motion.div>

        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Order Confirmed</span>
        <h1 className="font-display text-4xl font-bold text-white mt-3 mb-4">Thank You!</h1>
        <p className="text-obsidian-200 font-light leading-relaxed mb-2">
          Your order has been placed successfully. We'll send you a confirmation email shortly.
        </p>
        {order && (
          <p className="text-gold-400 font-semibold text-sm mb-8">Order ID: {order.id}</p>
        )}

        {order && (
          <div className="glass-gold p-6 text-left mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-obsidian-300">Payment</span>
                <span className="text-white capitalize">{order.payment === "cod" ? "Cash on Delivery" : order.payment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-obsidian-300">Total</span>
                <span className="text-white font-bold">{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-obsidian-300">Items</span>
                <span className="text-white">{order.items?.length} piece{order.items?.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders"><Button variant="outline" size="md">View My Orders</Button></Link>
          <Link to="/shop"><Button variant="gold" size="md">Continue Shopping</Button></Link>
        </div>
      </motion.div>
    </div>
  );
}