import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Button from "../../components/ui/Button.jsx";

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

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <img src={sale} alt="" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-obsidian-900/70"/>
        <div className="relative z-10 container-xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-400 mb-4 block">Our Story</span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold text-white leading-tight">
              Crafted with<br/><span className="gold-text italic">Intention.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500 mb-4 block">Our Mission</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Where Quality Meets Elegance
              </h2>
              <p className="text-gray-400 font-light leading-relaxed mb-5">
                Elivium was founded in 2013 with a singular vision: to create clothing that transcends trends. We believe in investing in pieces that last — not just in quality, but in style. Each garment is a conversation between the wearer and the world.
              </p>
              <p className="text-gray-400 font-light leading-relaxed">
                We work exclusively with ethical manufacturers across Italy, Japan, and Portugal — artisans who share our commitment to exceptional craftsmanship and responsible production.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <img src={newin} alt="About" className="w-full aspect-square object-cover"/>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-obsidian-800/40 border-y border-obsidian-700">
        <div className="container-xl">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">What We Stand For</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3">Our Values</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✦", title: "Quality First",    desc: "Every piece passes through 47 quality checkpoints before reaching you." },
              { icon: "🌿", title: "Sustainable",      desc: "We partner only with suppliers who meet our strict environmental standards." },
              { icon: "🤝", title: "Ethical",          desc: "Fair wages, safe conditions, and transparency throughout our supply chain." },
              { icon: "♾",  title: "Timeless Design",  desc: "We design for longevity — pieces that look as good in 10 years as today." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="text-center">
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-obsidian-200 text-sm font-light leading-relaxed">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: "2013", label: "Founded"         },
              { num: "50K+", label: "Customers"       },
              { num: "120+", label: "Countries"       },
              { num: "100%", label: "Ethical Sourcing"},
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="border border-obsidian-600 p-8 hover:border-gold-500/40 transition-all">
                  <div className="font-display text-4xl font-bold gold-text">{s.num}</div>
                  <div className="text-xs uppercase tracking-widest text-obsidian-300 mt-2">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-obsidian-800/40 border-t border-obsidian-700">
        <div className="container-xl text-center">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">Ready to Explore?</h2>
            <p className="text-obsidian-200 font-light mb-10 text-lg max-w-xl mx-auto">Discover pieces crafted to become a permanent part of your wardrobe.</p>
            <Link to="/shop"><Button variant="gold" size="xl">Shop the Collection</Button></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}