import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart }     from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import ProductRating   from "./ProductRating.jsx";

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered]   = useState(false);
  const [imgIdx,  setImgIdx]    = useState(0);
  const [added,   setAdded]     = useState(false);
  const { addToCart }   = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colorNames[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div
          className="card-product relative"
          onMouseEnter={() => { setHovered(true); setImgIdx(1); }}
          onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[3/4]">
            <motion.img
              key={imgIdx}
              src={product.images[imgIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="bg-white text-obsidian-900 text-xs font-bold px-2.5 py-1 tracking-widest uppercase">New</span>
              )}
              {product.discount > 0 && (
                <span className="bg-gold-500 text-obsidian-900 text-xs font-bold px-2.5 py-1 tracking-widest">-{product.discount}%</span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-all duration-300 ${
                wishlisted ? "bg-gold-500 text-obsidian-900" : "bg-obsidian-900/70 text-white hover:bg-white hover:text-obsidian-900"
              } ${hovered ? "opacity-100" : "opacity-0"}`}
            >
              <svg className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>

            {/* Add to Cart overlay */}
            <motion.div
              initial={false}
              animate={{ y: hovered ? 0 : "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-0 inset-x-0"
            >
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                  added
                    ? "bg-gold-500 text-obsidian-900"
                    : "bg-obsidian-900/90 text-white hover:bg-gold-500 hover:text-obsidian-900"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm font-medium text-white group-hover:text-gold-400 transition-colors duration-200 line-clamp-1">
                {product.name}
              </h3>
              <span className="text-xs text-obsidian-300 uppercase tracking-wider whitespace-nowrap">
                {product.category}
              </span>
            </div>
            <ProductRating rating={product.rating} reviews={product.reviews} />
            <div className="flex items-center gap-3 mt-2.5">
              <span className="text-white font-semibold">{formatPrice(product.price)}</span>
              {product.discount > 0 && (
                <span className="text-obsidian-300 text-sm line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Color dots */}
            <div className="flex gap-1.5 mt-3">
              {product.colors.map((c, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full border border-obsidian-400" style={{ background: c }} title={product.colorNames[i]} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}