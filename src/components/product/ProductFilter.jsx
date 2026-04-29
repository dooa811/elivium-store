import { useState as useStateF } from "react";
import { motion as motionF, AnimatePresence as APF } from "framer-motion";

const CATEGORIES = ["All", "Women", "Men"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const TAGS = ["All", "New", "Sale", "Featured"];
const PRICE_RANGES = [
  { label: "All prices",  min: 0,   max: Infinity },
  { label: "Under $100",  min: 0,   max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200 – $300", min: 200, max: 300 },
  { label: "Over $300",   min: 300, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "Newest",      value: "newest" },
  { label: "Price: Low",  value: "price-asc" },
  { label: "Price: High", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
];

const FILTER_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
  .pf-section { border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 20px; margin-bottom: 20px; }
  .pf-toggle { width:100%; display:flex; align-items:center; justify-content:space-between; background:none; border:none; cursor:pointer; padding:0 0 12px; }
  .pf-opt { display:block; width:100%; text-align:left; background:none; border:none; cursor:pointer; padding:5px 0; font-size:12px; font-family:'DM Sans',sans-serif; font-weight:400; letter-spacing:0.03em; transition:color 0.15s; }
  .pf-opt.active { color:#d4af37; font-weight:500; }
  .pf-opt:not(.active) { color:rgba(255,255,255,0.3); }
  .pf-opt:not(.active):hover { color:rgba(255,255,255,0.6); }
  .pf-size { width:38px; height:38px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:8px; font-size:10px; font-weight:600; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.35); cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
  .pf-size.active { background:rgba(212,175,55,0.1); border-color:rgba(212,175,55,0.4); color:#d4af37; }
  .pf-size:not(.active):hover { border-color:rgba(212,175,55,0.25); color:rgba(212,175,55,0.6); }
`;

function FilterSection({ title, children }) {
  const [open, setOpen] = useStateF(true);
  return (
    <div className="pf-section">
      <style>{FILTER_STYLES}</style>
      <button className="pf-toggle" onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{title}</span>
        <span style={{ color: "rgba(212,175,55,0.4)", fontSize: 12, transition: "transform 0.2s", display: "block", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      <APF initial={false}>
        {open && (
          <motionF.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            {children}
          </motionF.div>
        )}
      </APF>
    </div>
  );
}

export function ProductFilter({ filters, setFilters, total }) {
  const set = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));

  return (
    <aside style={{ width: "100%", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{FILTER_STYLES}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Filters</span>
        <button onClick={() => setFilters({ category: "All", size: "", tag: "All", price: PRICE_RANGES[0], sort: "newest" })}
          style={{ fontSize: 10, color: "rgba(212,175,55,0.5)", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textDecoration: "underline", transition: "color 0.2s" }}
          onMouseEnter={e => e.target.style.color = "#d4af37"}
          onMouseLeave={e => e.target.style.color = "rgba(212,175,55,0.5)"}
        >Clear all</button>
      </div>

      <FilterSection title="Category">
        {CATEGORIES.map(c => (
          <button key={c} className={`pf-opt ${filters.category === c ? "active" : ""}`} onClick={() => set("category", c)}>{c}</button>
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        {PRICE_RANGES.map((r, i) => (
          <button key={i} className={`pf-opt ${filters.price.label === r.label ? "active" : ""}`} onClick={() => set("price", r)}>{r.label}</button>
        ))}
      </FilterSection>

      <FilterSection title="Size">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SIZES.map(s => (
            <button key={s} className={`pf-size ${filters.size === s ? "active" : ""}`} onClick={() => set("size", filters.size === s ? "" : s)}>{s}</button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Collection">
        {TAGS.map(t => (
          <button key={t} className={`pf-opt ${filters.tag === t ? "active" : ""}`} onClick={() => set("tag", t)}>{t}</button>
        ))}
      </FilterSection>

      <FilterSection title="Sort By">
        {SORT_OPTIONS.map(o => (
          <button key={o.value} className={`pf-opt ${filters.sort === o.value ? "active" : ""}`} onClick={() => set("sort", o.value)}>{o.label}</button>
        ))}
      </FilterSection>

      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 4 }}>{total} products found</p>
    </aside>
  );
}
export default ProductFilter;