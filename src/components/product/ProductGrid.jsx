import ProductCard from "./ProductCard.jsx";

import { motion } from "framer-motion";

export function ProductGrid({ products, cols = 4 }) {
  const colMap = {
    2: "repeat(2, 1fr)",
    3: "repeat(3, 1fr)",
    4: "repeat(4, 1fr)",
  };

  if (!products || products.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "80px 24px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 20
      }}>
        <p style={{ fontSize: 40, color: "rgba(212,175,55,0.1)", margin: "0 0 16px", fontFamily: "'Cormorant Garamond', serif" }}>◎</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15, margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif" }}>No products found</p>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: colMap[cols] || colMap[4], gap: 16 }} className={`pg-grid-${cols}`}>
      <style>{`
        @media(max-width:1280px){ .pg-grid-4{ grid-template-columns: repeat(3,1fr)!important; } }
        @media(max-width:1024px){ .pg-grid-4,.pg-grid-3{ grid-template-columns: repeat(2,1fr)!important; } }
        @media(max-width:640px){ .pg-grid-4,.pg-grid-3,.pg-grid-2{ grid-template-columns: repeat(2,1fr)!important; gap: 10px!important; } }
        @media(max-width:400px){ .pg-grid-4,.pg-grid-3,.pg-grid-2{ grid-template-columns: 1fr!important; } }
      `}</style>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
export default ProductGrid;