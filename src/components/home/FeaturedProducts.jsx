import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getFeatured } from "../../utils/products.js";
import ProductGrid    from "../product/ProductGrid.jsx";

export default function FeaturedProducts() {
  const ref     = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });
  const items   = getFeatured();

  return (
    <section className="section-pad bg-obsidian-800/40 border-y border-obsidian-700">
      <div className="container-xl">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Handpicked</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">Featured Pieces</h2>
            <p className="text-gray-400 font-light mt-3 max-w-md">Our editors' selection — the season's most coveted styles chosen for their exceptional quality and design.</p>
          </div>
          <Link to="/shop" className="flex-shrink-0 btn-outline-gold text-xs px-7 py-3">
            View All →
          </Link>
        </motion.div>
        <ProductGrid products={items} cols={4} />
      </div>
    </section>
  );
}