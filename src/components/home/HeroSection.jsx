import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import cover from "../../assets/images/cover.jpg";



export { cover};

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/cover.jpg"
      >
        {/* Fallback to image if no video */}
      </video>

      {/* Fallback image (shown while video loads) */}
      <div className="absolute inset-0">
        <img
          src={cover}
          alt="Elivium Collection"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-900/90 via-obsidian-900/60 to-obsidian-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-px w-10 bg-gold-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">
              New Collection 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] text-white mb-6"
          >
            Dress with
            <br />
            <span className="gold-text italic">Purpose.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-10 max-w-lg"
          >
            Discover our new 2026 collection — meticulously crafted pieces that blend
            contemporary design with timeless elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/shop" className="btn-gold text-sm px-9 py-4 inline-flex items-center gap-2">
              Shop Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <Link to="/about" className="btn-outline-gold text-sm px-9 py-4 inline-flex items-center">
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex gap-10 mt-16 pt-10 border-t border-white/10"
          >
            {[
              { num: "12+", label: "Years of Excellence" },
              { num: "50K+", label: "Happy Customers"    },
              { num: "120+", label: "Countries Shipped"  },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-obsidian-200 tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-obsidian-200">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}