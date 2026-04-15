import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

import women from "../../assets/images/women.jpg";
import men from "../../assets/images/men.jpg";
import newin from "../../assets/images/newin.jpg";
import sale from "../../assets/images/sale.jpg";



export { women, men, newin, sale};


const cats = [
  { label: "Women",    href: "/shop?cat=women",  img: women, count: "6 pieces" },
  { label: "Men",      href: "/shop?cat=men",    img: men, count: "6 pieces" },
  { label: "New In",   href: "/shop?tag=new",    img: newin , count: "5 pieces" },
  { label: "Sale",     href: "/shop?tag=sale",   img: sale  , count: "7 pieces" },
];

function CatCard({ cat, i }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}>
      <Link to={cat.href} className="block group relative overflow-hidden aspect-[2/3]">
        <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/80 via-obsidian-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"/>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center">
          <span className="text-xs tracking-widest text-gold-400 uppercase mb-1">{cat.count}</span>
          <h3 className="font-display text-3xl font-bold text-white mb-3">{cat.label}</h3>
          <span className="text-xs uppercase tracking-widest text-white/70 border-b border-white/40 pb-0.5 group-hover:border-gold-400 group-hover:text-gold-400 transition-all duration-300">
            Explore →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section className="section-pad">
      <div className="container-xl">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">Collections</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Shop by Category</h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto">Explore our curated collections, each crafted with intention and elevated by exceptional material selection.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((cat, i) => <CatCard key={cat.label} cat={cat} i={i} />)}
        </div>
      </div>
    </section>
  );
}