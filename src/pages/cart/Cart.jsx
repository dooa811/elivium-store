import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import Button from "../../components/ui/Button.jsx";

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, shipping, total, totalItems } = useCart();

  if (items.length === 0)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-8xl opacity-20">🛍</div>
        <h2 className="font-display text-3xl font-bold text-white">
          Your cart is empty
        </h2>
        <p className="text-obsidian-200 font-light text-center">
          Discover our collection and add your favourite pieces.
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
            Shopping Cart
          </h1>
          <p className="text-obsidian-200 mt-2 font-light">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="container-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-widest text-obsidian-300 pb-3 border-b border-obsidian-700">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-4 items-center py-6 border-b border-obsidian-700"
                >
                  {/* Image + info */}
                  <div className="col-span-12 sm:col-span-6 flex gap-4">
                    <Link
                      to={`/product/${item.id}`}
                      className="flex-shrink-0 w-24 h-28 overflow-hidden"
                    >
                      <img
                        src={item.images && item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-white font-medium text-sm hover:text-gold-400 transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-obsidian-300 text-xs mt-1">
                        Size: {item.size}
                      </p>
                      <p className="text-obsidian-300 text-xs">
                        Color: {item.color}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-xs text-red-400 hover:text-red-300 mt-3 transition-colors uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-4 sm:col-span-2 text-center">
                    <span className="text-white text-sm font-semibold">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Qty */}
                  <div className="col-span-4 sm:col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-obsidian-500">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-obsidian-600 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-white text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-obsidian-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="text-white font-semibold">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/shop"
                className="btn-outline-gold text-xs px-6 py-3 text-center"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-obsidian-800 border border-obsidian-600 p-8 sticky top-28">
              <h2 className="font-display text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 border-b border-obsidian-600 pb-6 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-obsidian-200">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="text-white font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-obsidian-200">Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-gold-400 font-semibold"
                        : "text-white font-semibold"
                    }
                  >
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-obsidian-300">
                    Add {formatPrice(200 - subtotal)} more for free shipping
                  </p>
                )}
              </div>
              <div className="flex justify-between mb-8">
                <span className="font-bold text-white uppercase tracking-widest text-sm">
                  Total
                </span>
                <span className="font-display text-2xl font-bold text-white">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Promo code */}
              <div className="flex gap-0 mb-6">
                <input
                  placeholder="Promo code"
                  className="flex-1 bg-obsidian-700 border border-obsidian-500 text-white placeholder-obsidian-400 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
                <button className="bg-obsidian-600 border border-l-0 border-obsidian-500 text-white px-4 text-xs font-bold uppercase tracking-wider hover:bg-obsidian-500 transition-colors">
                  Apply
                </button>
              </div>

              <Link to="/checkout">
                <Button variant="gold" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <div className="flex justify-center gap-4 mt-5">
                {["💳 Visa", "💳 MC", "💰 COD"].map((p) => (
                  <span key={p} className="text-[10px] text-obsidian-300">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}