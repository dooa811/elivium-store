import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < n ? "text-gold-400" : "text-obsidian-500"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

// البيانات الثابتة للتقييمات
const testimonials = [
  {
    id: 1,
    name: "Alexandra M.",
    role: "Fashion Stylist",
    avatar: "A",
    rating: 5,
    text: "Elivium has completely changed how I shop. The quality of every piece is exceptional — you can feel the difference the moment you touch the fabric. My clients constantly ask where I source such refined pieces.",
    location: "Paris, France"
  },
  {
    id: 2,
    name: "James K.",
    role: "Creative Director",
    avatar: "J",
    rating: 5,
    text: "I've been a customer for two years now. The Tailored Slim Suit is the most complimented piece in my wardrobe. The cut is perfect, the fabric breathes beautifully, and it holds its shape after countless wears.",
    location: "London, UK"
  },
  {
    id: 3,
    name: "Sofia R.",
    role: "Architect",
    avatar: "S",
    rating: 5,
    text: "What I love most is the consistency. Every order arrives immaculately packaged, every item matches its description exactly, and the customer service is genuinely attentive. Rare to find this level of care.",
    location: "Milan, Italy"
  },
  {
    id: 4,
    name: "Nour A.",
    role: "Entrepreneur",
    avatar: "N",
    rating: 4,
    text: "The Cashmere Wrap Dress is an absolute dream. I wore it to three events this season and received compliments at every single one. Worth every penny — this is what luxury clothing should feel like.",
    location: "Dubai, UAE"
  },
  {
    id: 5,
    name: "Marcus T.",
    role: "Photographer",
    avatar: "M",
    rating: 5,
    text: "Discovered Elivium through a friend and immediately ordered the Merino Turtleneck. It arrived in 3 days, fits like it was made for me, and has become my most-worn piece this winter.",
    location: "New York, USA"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-pad" ref={ref}>
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500">
            Testimonials
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto">
            Real experiences from those who choose Elivium.
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-gold p-10 text-center relative"
            >
              <svg
                className="w-10 h-10 text-gold-500/30 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <Stars n={testimonials[current].rating} />
              <p className="text-white text-lg font-light leading-relaxed italic my-6">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-bold text-obsidian-900">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">
                    {testimonials[current].name}
                  </p>
                  <p className="text-obsidian-300 text-xs">
                    {testimonials[current].role} ·{" "}
                    {testimonials[current].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${
                  i === current
                    ? "w-6 h-1.5 bg-gold-500"
                    : "w-1.5 h-1.5 bg-obsidian-500 hover:bg-obsidian-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setCurrent(i)}
              className={`p-5 border cursor-pointer transition-all duration-300 ${
                i === current
                  ? "border-gold-500 bg-gold-500/8"
                  : "border-obsidian-600 bg-obsidian-800 hover:border-obsidian-400"
              }`}
            >
              <Stars n={t.rating} />
              <p className="text-gray-300 text-xs leading-relaxed mt-3 line-clamp-3 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center text-xs font-bold text-obsidian-900">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{t.name}</p>
                  <p className="text-obsidian-300 text-[10px]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}