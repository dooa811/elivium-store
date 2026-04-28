import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { productService } from "../../utils/productService.js";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { formatPrice } from "../../utils/formatPrice.js";
import ProductRating from "../../components/product/ProductRating.jsx";
import ProductGrid from "../../components/product/ProductGrid.jsx";
import Button from "../../components/ui/Button.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [tab, setTab] = useState("description");

  // جلب بيانات المنتج
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        setProduct(productData);

        // جلب منتجات مشابهة
        const allProducts = await productService.getAllProducts();
        const similarProducts = allProducts
          .filter(
            (p) =>
              p.category === productData.category && p.id !== productData.id
          )
          .slice(0, 4);
        setSimilar(similarProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-obsidian-300">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-display text-3xl text-white">Product not found</p>
        <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    
    const colorName = product.color_names ? product.color_names[colorIdx] : "Default";
    addToCart(product, size, colorName, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-obsidian-800 border-b border-obsidian-700 py-4 px-4">
        <div className="container-xl flex items-center gap-2 text-xs text-obsidian-300">
          <Link to="/" className="hover:text-gold-400 transition-colors">
            Home
          </Link>
          <span className="text-gold-500">›</span>
          <Link to="/shop" className="hover:text-gold-400 transition-colors">
            Shop
          </Link>
          <span className="text-gold-500">›</span>
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden aspect-[3/4] bg-obsidian-800">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIdx}
                    src={product.images && product.images[imgIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
                {product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-gold-500 text-obsidian-900 text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.images &&
                  product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`overflow-hidden aspect-square border-2 transition-all duration-200 ${
                        imgIdx === i
                          ? "border-gold-500"
                          : "border-obsidian-600 hover:border-obsidian-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                  {product.category}
                </span>
                {product.is_new && (
                  <span className="ml-3 text-xs uppercase tracking-widest text-white bg-obsidian-600 px-2 py-0.5">
                    New
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <ProductRating rating={product.rating} reviews={product.reviews} size="lg" />
                <span className="text-obsidian-300 text-sm">
                  {product.reviews} reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-display text-4xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-obsidian-300 text-xl line-through">
                      {formatPrice(product.original_price)}
                    </span>
                    <span className="bg-gold-500/20 text-gold-400 text-sm font-semibold px-2 py-0.5 border border-gold-500/30">
                      Save {formatPrice(product.original_price - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Color */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-white mb-3">
                    Color:{" "}
                    <span className="text-gold-400 font-normal">
                      {product.color_names[colorIdx]}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setColorIdx(i)}
                        title={product.color_names[i]}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          colorIdx === i
                            ? "border-gold-500 scale-110 shadow-gold-sm"
                            : "border-obsidian-500 hover:border-obsidian-300"
                        }`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-white">
                      Size
                    </p>
                    <button className="text-xs text-gold-500 hover:text-gold-300 underline underline-offset-2">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSize(s);
                          setSizeError(false);
                        }}
                        className={`w-12 h-12 text-xs font-bold uppercase border transition-all duration-200 ${
                          size === s
                            ? "border-gold-500 bg-gold-500 text-obsidian-900"
                            : "border-obsidian-500 text-gray-300 hover:border-gold-500 hover:text-gold-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="text-red-400 text-xs mt-2">
                      Please select a size to continue.
                    </p>
                  )}
                </div>
              )}

              {/* Qty */}
              <div className="flex items-center gap-4 mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-white">
                  Quantity
                </p>
                <div className="flex items-center border border-obsidian-500">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-obsidian-600 transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-white font-semibold">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-obsidian-600 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 mb-8">
                <Button
                  onClick={handleAddToCart}
                  variant={added ? "ghost" : "gold"}
                  size="lg"
                  className="flex-1"
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </Button>
                <button
                  onClick={() => toggle(product)}
                  className={`w-14 h-14 flex items-center justify-center border transition-all duration-200 ${
                    wishlisted
                      ? "border-gold-500 bg-gold-500 text-obsidian-900"
                      : "border-obsidian-500 text-white hover:border-gold-500 hover:text-gold-400"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={wishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 py-6 border-t border-b border-obsidian-600 mb-6">
                {[
                  {
                    icon: "🚚",
                    label: "Free Shipping",
                    sub: "Orders over $200"
                  },
                  { icon: "↩", label: "Free Returns", sub: "Within 30 days" },
                  { icon: "✦", label: "Authentic", sub: "100% genuine" }
                ].map((b) => (
                  <div key={b.label} className="text-center">
                    <span className="text-2xl">{b.icon}</span>
                    <p className="text-xs font-semibold text-white mt-1">
                      {b.label}
                    </p>
                    <p className="text-[10px] text-obsidian-300">{b.sub}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-obsidian-600 mb-6">
                {["description", "details"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all -mb-px ${
                      tab === t
                        ? "border-gold-500 text-gold-400"
                        : "border-transparent text-obsidian-300 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {tab === "description" && (
                  <motion.p
                    key="desc"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-400 font-light leading-relaxed text-sm"
                  >
                    {product.description}
                  </motion.p>
                )}
                {tab === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 text-sm"
                  >
                    {[
                      { label: "Material", val: "Premium blend" },
                      { label: "Fit", val: "Regular fit" },
                      { label: "Care", val: "Dry clean only" },
                      { label: "Origin", val: "Made in Italy" }
                    ].map((d) => (
                      <div
                        key={d.label}
                        className="flex justify-between border-b border-obsidian-700 pb-3"
                      >
                        <span className="text-obsidian-300 uppercase tracking-widest text-xs">
                          {d.label}
                        </span>
                        <span className="text-white">{d.val}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="section-pad bg-obsidian-800/40 border-t border-obsidian-700">
          <div className="container-xl">
            <h2 className="font-display text-3xl font-bold text-white mb-10">
              You May Also Like
            </h2>
            <ProductGrid products={similar} cols={4} />
          </div>
        </section>
      )}
    </div>
  );
}