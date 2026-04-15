import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../utils/products.js";
import ProductGrid   from "../../components/product/ProductGrid.jsx";
import ProductFilter from "../../components/product/ProductFilter.jsx";

const DEFAULT_FILTERS = {
  category: "All",
  size:     "",
  tag:      "All",
  price:    { label: "All prices", min: 0, max: Infinity },
  sort:     "newest",
};

export default function Shop() {
  const [searchParams]           = useSearchParams();
  const [filters, setFilters]    = useState(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebar] = useState(false);

  // Apply URL params on mount
  useEffect(() => {
    const cat    = searchParams.get("cat");
    const tag    = searchParams.get("tag");
    const search = searchParams.get("search");
    setFilters(prev => ({
      ...prev,
      category: cat   ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All",
      tag:      tag   ? tag.charAt(0).toUpperCase() + tag.slice(1) : "All",
      search:   search || "",
    }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.category !== "All") list = list.filter(p => p.category === filters.category.toLowerCase());
    if (filters.tag !== "All") {
      const t = filters.tag.toLowerCase();
      if (t === "new")      list = list.filter(p => p.isNew);
      if (t === "sale")     list = list.filter(p => p.discount > 0);
      if (t === "featured") list = list.filter(p => p.isFeatured);
    }
    if (filters.size)  list = list.filter(p => p.sizes.includes(filters.size));
    if (filters.price) list = list.filter(p => p.price >= filters.price.min && p.price <= filters.price.max);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filters.sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters]);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-obsidian-800 border-b border-obsidian-700 py-12 px-4">
        <div className="container-xl">
          <div className="flex items-center gap-2 text-xs text-obsidian-300 mb-4">
            <span>Home</span><span className="text-gold-500">›</span><span className="text-white">Shop</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
            {filters.category !== "All" ? filters.category + "'s Collection" : "All Products"}
          </h1>
          <p className="text-obsidian-200 font-light">{filtered.length} pieces available</p>
        </div>
      </div>

      <div className="container-xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <p className="text-sm text-obsidian-200">{filtered.length} results</p>
          <button onClick={() => setSidebar(!sidebarOpen)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border border-obsidian-500 px-4 py-2.5 text-white hover:border-gold-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            Filter & Sort
          </button>
        </div>

        <div className="flex gap-12">
          {/* Sidebar desktop */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <ProductFilter filters={filters} setFilters={setFilters} total={filtered.length} />
            </div>
          </div>

          {/* Mobile sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebar(false)}/>
                <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed inset-y-0 left-0 w-72 bg-obsidian-800 z-50 lg:hidden overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">Filters</h3>
                    <button onClick={() => setSidebar(false)} className="text-obsidian-200 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <ProductFilter filters={filters} setFilters={setFilters} total={filtered.length} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Active filters */}
            {(filters.category !== "All" || filters.tag !== "All" || filters.size || filters.search) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.category !== "All" && (
                  <span className="flex items-center gap-2 text-xs border border-gold-500/40 text-gold-400 px-3 py-1.5">
                    {filters.category}
                    <button onClick={() => setFilters(p => ({ ...p, category: "All" }))} className="hover:text-white">✕</button>
                  </span>
                )}
                {filters.tag !== "All" && (
                  <span className="flex items-center gap-2 text-xs border border-gold-500/40 text-gold-400 px-3 py-1.5">
                    {filters.tag}
                    <button onClick={() => setFilters(p => ({ ...p, tag: "All" }))} className="hover:text-white">✕</button>
                  </span>
                )}
                {filters.size && (
                  <span className="flex items-center gap-2 text-xs border border-gold-500/40 text-gold-400 px-3 py-1.5">
                    Size: {filters.size}
                    <button onClick={() => setFilters(p => ({ ...p, size: "" }))} className="hover:text-white">✕</button>
                  </span>
                )}
                {filters.search && (
                  <span className="flex items-center gap-2 text-xs border border-gold-500/40 text-gold-400 px-3 py-1.5">
                    "{filters.search}"
                    <button onClick={() => setFilters(p => ({ ...p, search: "" }))} className="hover:text-white">✕</button>
                  </span>
                )}
              </div>
            )}

            <ProductGrid products={filtered} cols={3} />
          </div>
        </div>
      </div>
    </div>
  );
}