import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "../../utils/formatPrice.js";
import Button from "../../components/ui/Button.jsx";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("elivium_orders") || "[]");

  if (orders.length === 0)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-8xl opacity-20">📦</div>
        <h2 className="font-display text-3xl font-bold text-white">
          No orders yet
        </h2>
        <p className="text-obsidian-200 font-light">
          Your order history will appear here after your first purchase.
        </p>
        <Link to="/shop">
          <Button variant="gold" size="lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="bg-obsidian-800 border-b border-obsidian-700 py-10 px-4">
        <div className="container-xl">
          <h1 className="font-display text-4xl font-bold text-white">
            My Orders
          </h1>
          <p className="text-obsidian-200 mt-2 font-light">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
      </div>
      <div className="container-xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-obsidian-800 border border-obsidian-600 p-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-obsidian-700">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-1">
                  Order #{order.id}
                </p>
                <p className="text-obsidian-300 text-xs">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold px-3 py-1.5 uppercase tracking-widest">
                  {order.status}
                </span>
                <span className="font-display text-xl font-bold text-white">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {order.items?.map((item) => (
                <div key={item.key} className="flex-shrink-0">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-16 h-20 object-cover border border-obsidian-600"
                  />
                  <p className="text-xs text-obsidian-300 mt-1 w-16 truncate">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-obsidian-700 text-xs text-obsidian-300">
              <span>
                Payment:{" "}
                {order.payment === "cod"
                  ? "Cash on Delivery"
                  : order.payment}
              </span>
              <Link
                to="/shop"
                className="text-gold-400 hover:text-gold-300 font-semibold transition-colors"
              >
                Reorder →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}