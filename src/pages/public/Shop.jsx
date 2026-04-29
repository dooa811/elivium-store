import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { productService } from "../../utils/productService.js";
import ProductGrid from "../../components/product/ProductGrid.jsx";
import ProductFilter from "../../components/product/ProductFilter.jsx";

const DEFAULT_FILTERS = {
  category: "All", size: "", tag: "All",
  price: { label: "All prices", min: 0, max: Infinity },
  sort: "newest"
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

  .filter-tag {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px;
    background: rgba(212,175,55,0.08);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 100px;
    color: #d4af37; font-size: 11px; font-weight: 500;
    letter-spacing: 0.08em; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .filter-tag-x {
    background: none; border: none; cursor: pointer;
    color: rgba(212,175,55,0.5); font-size: 14px; padding: 0;
    line-height: 1; transition: color 0.2s; display: flex; align-items: center;
  }
  .filter-tag-x:hover { color: #fff; }

  .mobile-filter-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: rgba(255,255,255,0.6); font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .mobile-filter-btn:hover { border-color: rgba(212,175,55,0.3); color: #d4af37; }
`;

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productService.getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get("cat");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    setFilters(prev => ({
      ...prev,
      category: cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All",
      tag: tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : "All",
      search: search || ""
    }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.category !== "All") list = list.filter(p => p.category === filters.category.toLowerCase());
    if (filters.tag !== "All") {
      const t = filters.tag.toLowerCase();
      if (t === "new") list = list.filter(p => p.is_new);
      if (t === "sale") list = list.filter(p => p.discount > 0);
      if (t === "featured") list = list.filter(p => p.is_featured);
    }
    if (filters.size) list = list.filter(p => p.sizes?.includes(filters.size));
    if (filters.price) list = list.filter(p => p.price >= filters.price.min && p.price <= filters.price.max);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q) || p.description?.toLowerCase().includes(q));
    }
    if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, products]);

  const activeFilters = [
    filters.category !== "All" && { key: "category", label: filters.category },
    filters.tag !== "All" && { key: "tag", label: filters.tag },
    filters.size && { key: "size", label: `Size: ${filters.size}` },
    filters.search && { key: "search", label: `"${filters.search}"` }
  ].filter(Boolean);

  const clearFilter = (key) => setFilters(p => ({ ...p, [key]: key === "category" || key === "tag" ? "All" : "" }));

  const title = filters.category !== "All" ? `${filters.category}'s Collection` : filters.tag !== "All" ? filters.tag : "All Products";

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
        padding: "56px 24px 44px", position: "relative", overflow: "hidden"
      }}>
        {/* Decorative number */}
        <div style={{
          position: "absolute", right: "4%", bottom: 0,
          fontSize: 180, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          color: "rgba(212,175,55,0.03)", lineHeight: 0.8, pointerEvents: "none", userSelect: "none"
        }}>{loading ? "—" : filtered.length}</div>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, letterSpacing: "0.05em" }}>Home</span>
            <span style={{ color: "rgba(212,175,55,0.3)", fontSize: 10 }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.05em" }}>Shop</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", margin: "0 0 10px" }}>Collection</p>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "#fff", margin: "0 0 8px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em" }}>
              {title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, margin: 0 }}>
              {loading ? "Loading..." : `${filtered.length} piece${filtered.length !== 1 ? "s" : ""} available`}
            </p>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        {/* Mobile filter btn */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }} className="mobile-bar">
          <style>{`@media(min-width:1024px){.mobile-bar{display:none!important}}`}</style>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0 }}>{filtered.length} results</p>
          <button className="mobile-filter-btn" onClick={() => setSidebar(!sidebarOpen)}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter & Sort
          </button>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          {/* Desktop sidebar */}
          <div style={{ width: 220, flexShrink: 0 }} className="desktop-sidebar">
            <style>{`@media(max-width:1023px){.desktop-sidebar{display:none!important}}`}</style>
            <div style={{ position: "sticky", top: 112 }}>
              <ProductFilter filters={filters} setFilters={setFilters} total={filtered.length} />
            </div>
          </div>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 40, backdropFilter: "blur(4px)" }}
                  onClick={() => setSidebar(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  style={{
                    position: "fixed", inset: "0 auto 0 0", width: 300,
                    background: "#0d0d0d", border: "none",
                    borderRight: "1px solid rgba(212,175,55,0.1)",
                    zIndex: 50, overflowY: "auto", padding: 28
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 500 }}>Filters</p>
                    <button onClick={() => setSidebar(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4, transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <ProductFilter filters={filters} setFilters={setFilters} total={filtered.length} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Active filters */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24, overflow: "hidden" }}
                >
                  {activeFilters.map(f => (
                    <div key={f.key} className="filter-tag">
                      {f.label}
                      <button className="filter-tag-x" onClick={() => clearFilter(f.key)}>×</button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0", gap: 16 }}>
                <div style={{ width: 36, height: 36, border: "1px solid rgba(212,175,55,0.3)", borderTopColor: "#d4af37", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>Loading Collection</p>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: 48, color: "rgba(212,175,55,0.1)", marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>◎</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, margin: "0 0 8px" }}>No pieces found</p>
                <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>Try adjusting your filters</p>
              </div>
            ) : (
              <ProductGrid products={filtered} cols={3} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}