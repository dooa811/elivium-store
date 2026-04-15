import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Women", "Men"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const TAGS = ["All", "New", "Sale", "Featured"];
const PRICE_RANGES = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200 – $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "Newest",       value: "newest" },
  { label: "Price: Low",   value: "price-asc" },
  { label: "Price: High",  value: "price-desc" },
  { label: "Best Rating",  value: "rating" },
];

function Section({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-obsidian-600 pb-6 mb-6">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-white">{title}</span>
        <span className={`text-gold-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductFilter({ filters, setFilters, total }) {
  const set = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white">Filter</h2>
        <button onClick={() => setFilters({ category: "All", size: "", tag: "All", price: PRICE_RANGES[0], sort: "newest" })}
          className="text-xs text-gold-500 hover:text-gold-300 transition-colors underline underline-offset-2">
          Clear all
        </button>
      </div>

      <Section title="Category">
        <div className="space-y-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => set("category", c)}
              className={`block w-full text-left text-sm py-1 transition-colors ${
                filters.category === c ? "text-gold-400 font-semibold" : "text-obsidian-200 hover:text-white"
              }`}>
              {c}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <div className="space-y-2">
          {PRICE_RANGES.map((r, i) => (
            <button key={i} onClick={() => set("price", r)}
              className={`block w-full text-left text-sm py-1 transition-colors ${
                filters.price.label === r.label ? "text-gold-400 font-semibold" : "text-obsidian-200 hover:text-white"
              }`}>
              {r.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map(s => (
            <button key={s} onClick={() => set("size", filters.size === s ? "" : s)}
              className={`w-10 h-10 text-xs font-semibold border transition-all duration-200 ${
                filters.size === s
                  ? "border-gold-500 bg-gold-500 text-obsidian-900"
                  : "border-obsidian-500 text-gray-300 hover:border-gold-500 hover:text-gold-400"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Collection">
        <div className="space-y-2">
          {TAGS.map(t => (
            <button key={t} onClick={() => set("tag", t)}
              className={`block w-full text-left text-sm py-1 transition-colors ${
                filters.tag === t ? "text-gold-400 font-semibold" : "text-obsidian-200 hover:text-white"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Sort By">
        <div className="space-y-2">
          {SORT_OPTIONS.map(o => (
            <button key={o.value} onClick={() => set("sort", o.value)}
              className={`block w-full text-left text-sm py-1 transition-colors ${
                filters.sort === o.value ? "text-gold-400 font-semibold" : "text-obsidian-200 hover:text-white"
              }`}>
              {o.label}
            </button>
          ))}
        </div>
      </Section>

      <div className="text-xs text-obsidian-300 pt-2">{total} products found</div>
    </aside>
  );
}