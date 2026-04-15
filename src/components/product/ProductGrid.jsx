import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, cols = 4 }) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[cols] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24 border border-obsidian-600">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-gray-400 text-lg font-light">No products found</p>
        <p className="text-obsidian-300 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-6`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}