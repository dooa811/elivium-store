import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useCart }     from "../../context/CartContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import Button          from "../../components/ui/Button.jsx";
import ProductRating   from "../../components/product/ProductRating.jsx";

export default function Wishlist() {
  const { items, toggle } = useWishlist();
  const { addToCart }     = useCart();

  if (items.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
      <div className="text-8xl opacity-20">🤍</div>
      <h2 className="font-display text-3xl font-bold text-white">Your wishlist is empty</h2>
      <p className="text-obsidian-200 font-light">Save pieces you love and come back to them anytime.</p>
      <Link to="/shop"><Button variant="gold" size="lg">Explore Collection</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="bg-obsidian-800 border-b border-obsidian-700 py-10 px-4">
        <div className="container-xl">
          <h1 className="font-display text-4xl font-bold text-white">My Wishlist</h1>
          <p className="text-obsidian-200 mt-2 font-light">{items.length} saved piece{items.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="container-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }} className="card-product group">
              <div className="relative overflow-hidden aspect-[3/4]">
                <Link to={`/product/${item.id}`}>
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </Link>
                <button onClick={() => toggle(item)}
                  className="absolute top-3 right-3 w-9 h-9 bg-gold-500 text-obsidian-900 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <Link to={`/product/${item.id}`} className="text-white text-sm font-medium hover:text-gold-400 transition-colors line-clamp-1 block mb-1">{item.name}</Link>
                <ProductRating rating={item.rating} reviews={item.reviews} />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-white font-semibold">{formatPrice(item.price)}</span>
                  <button onClick={() => addToCart(item, item.sizes[0], item.colorNames[0])}
                    className="text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-white transition-colors border-b border-gold-500/40 hover:border-white/40">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}