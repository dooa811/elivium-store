import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { productService } from "../../utils/productService.js";
import ProductGrid from "../product/ProductGrid.jsx";

export default function FeaturedProducts() {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const products = await productService.getFeaturedProducts();
        setItems(products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="section-pad bg-obsidian-800/40 border-y border-obsidian-700">
      <div className="container-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">
              Handpicked
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">
              Featured Pieces
            </h2>
            <p className="text-gray-400 font-light mt-3 max-w-md">
              Our editors' selection — the season's most coveted styles chosen
              for their exceptional quality and design.
            </p>
          </div>
          <Link
            to="/shop"
            className="flex-shrink-0 btn-outline-gold text-xs px-7 py-3"
          >
            View All →
          </Link>
        </motion.div>
        
        {loading ? (
          <div className="text-center py-12 text-obsidian-300">
            Loading products...
          </div>
        ) : (
          <ProductGrid products={items} cols={4} />
        )}
      </div>
    </section>
  );
}