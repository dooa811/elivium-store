import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import HeroSection      from "../../components/home/HeroSection.jsx";
import FeaturedProducts from "../../components/home/FeaturedProducts.jsx";
import Categories       from "../../components/home/Categories.jsx";
import Testimonials     from "../../components/home/Testimonials.jsx";
import Newsletter       from "../../components/home/Newsletter.jsx";
import { getNew, getSale } from "../../utils/products.js";
import ProductGrid      from "../../components/product/ProductGrid.jsx";


import sale from "../../assets/images/sale.jpg";
import newin from "../../assets/images/newin.jpg";

export { sale, newin};


function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const v   = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const newProducts  = getNew().slice(0, 4);
  const saleProducts = getSale().slice(0, 4);

  return (
    <div>
      <HeroSection />
      <Categories />
      <FeaturedProducts />

      {/* New Arrivals strip */}
      <section className="section-pad">
        <div className="container-xl">
          <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Just In</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">New Arrivals</h2>
            </div>
            <Link to="/shop?tag=new" className="btn-outline-gold text-xs px-7 py-3 flex-shrink-0">View All New →</Link>
          </Reveal>
          <ProductGrid products={newProducts} cols={4} />
        </div>
      </section>

      {/* About banner */}
      <section className="section-pad bg-obsidian-800/50 border-y border-obsidian-700">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <img src={sale}
                  alt="About Elivium" className="w-full aspect-[4/5] object-cover"/>
                <div className="absolute -bottom-6 -right-6 bg-gold-500 p-6 hidden sm:block">
                  <p className="font-display text-3xl font-bold text-obsidian-900">12+</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-obsidian-700 mt-1">Years of Excellence</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Our Story</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">
                Crafted with<br/>
                <span className="gold-text italic">Intention.</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed mb-5">
                Elivium was founded on a single conviction: that clothing should be more than what you wear — it should express who you are. Every piece in our collection is sourced from the finest ateliers and crafted with the highest standards of quality.
              </p>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                We partner with sustainable suppliers across Europe and Asia, ensuring every garment you wear carries a story of craftsmanship, integrity, and beauty.
              </p>
              <Link to="/about" className="btn-gold text-xs px-8 py-3.5 inline-block">Discover Our Story</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sale section */}
      <section className="section-pad">
        <div className="container-xl">
          <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Limited Time</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">On Sale Now</h2>
            </div>
            <Link to="/shop?tag=sale" className="btn-outline-gold text-xs px-7 py-3 flex-shrink-0">Shop Sale →</Link>
          </Reveal>
          <ProductGrid products={saleProducts} cols={4} />
        </div>
      </section>

      <Testimonials />
      <Newsletter />

      {/* Final CTA */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={newin} alt="CTA"
            className="w-full h-full object-cover opacity-20"/>
          <div className="absolute inset-0 bg-obsidian-900/80"/>
        </div>
        <div className="container-xl relative z-10 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">2026 Collection</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold text-white mt-4 mb-6">
              Your Next Favourite<br/>
              <span className="gold-text italic">Piece Awaits.</span>
            </h2>
            <p className="text-gray-400 font-light text-lg mb-10 max-w-xl mx-auto">
              Explore our full collection of over 100 exceptional pieces — each one ready to become a staple of your wardrobe.
            </p>
            <Link to="/shop" className="btn-gold text-sm px-12 py-5 inline-block">
              Shop the Full Collection
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}