import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../utils/api.js";

const formatPrice = (p) => `$${Number(p).toFixed(2)}`;
const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const STATUS_COLORS = {
  confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending:   "bg-amber-500/20  text-amber-400  border-amber-500/30",
  shipped:   "bg-blue-500/20   text-blue-400   border-blue-500/30",
  cancelled: "bg-red-500/20    text-red-400    border-red-500/30",
};

// ── Sidebar nav items ──────────────────────────────────────────────────────
const NAV = [
  { id: "overview",  icon: "▦",  label: "Overview"  },
  { id: "products",  icon: "◈",  label: "Products"  },
  { id: "featured",  icon: "✦",  label: "Featured"  },
  { id: "new",       icon: "⊕",  label: "New Arrivals" },
  { id: "orders",    icon: "◎",  label: "Orders"    },
];

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-[#111] border border-white/5 p-6"
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${accent}`} />
      <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">{label}</p>
      <p className="text-4xl font-black text-white leading-none">{value}</p>
      {sub && <p className="text-xs text-white/30 mt-2">{sub}</p>}
    </motion.div>
  );
}

// ── Product form modal ─────────────────────────────────────────────────────
function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product ? {
    name: product.name,
    description: product.description || "",
    category: product.category,
    subcategory: product.subcategory || "",
    price: product.price,
    original_price: product.original_price || product.price,
    discount: product.discount || 0,
    is_new: product.is_new || false,
    is_featured: product.is_featured || false,
    colors: JSON.stringify(product.colors || ["#000000"]),
    color_names: JSON.stringify(product.color_names || ["Black"]),
    sizes: JSON.stringify(product.sizes || ["S","M","L"]),
    images: JSON.stringify(product.images || ["https://via.placeholder.com/300"]),
  } : {
    name: "", description: "", category: "women", subcategory: "",
    price: "", original_price: "", discount: 0,
    is_new: false, is_featured: false,
    colors: '["#000000"]', color_names: '["Black"]',
    sizes: '["S","M","L"]', images: '["https://via.placeholder.com/300"]',
  });

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) { setErr("Name and price are required"); return; }
    setSaving(true); setErr("");
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        original_price: parseFloat(form.original_price) || parseFloat(form.price),
        discount: parseInt(form.discount) || 0,
        colors: JSON.parse(form.colors),
        color_names: JSON.parse(form.color_names),
        sizes: JSON.parse(form.sizes),
        images: JSON.parse(form.images),
      };
      if (product) await api.put(`/products/${product.id}`, payload);
      else await api.post("/products", payload);
      onSave();
    } catch (e) {
      setErr(e.response?.data?.error || "Failed to save");
    } finally { setSaving(false); }
  };

  const Field = ({ label, name, type = "text", placeholder, rows }) => (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1.5">{label}</label>
      {rows ? (
        <textarea name={name} value={form[name]} onChange={handle} placeholder={placeholder} rows={rows}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-[#d4af37]/60 resize-none transition-colors" />
      ) : (
        <input name={name} type={type} value={form[name]} onChange={handle} placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-[#d4af37]/60 transition-colors" />
      )}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-white/10 rounded-3xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white">{product ? "Edit Product" : "New Product"}</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all flex items-center justify-center text-lg">×</button>
        </div>

        {err && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">{err}</div>}

        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Product Name" name="name" placeholder="Obsidian Wool Coat" />
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1.5">Category</label>
              <select name="category" value={form.category} onChange={handle}
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-[#d4af37]/60 transition-colors">
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>
          </div>

          <Field label="Description" name="description" placeholder="Product description..." rows={3} />

          <div className="grid grid-cols-3 gap-4">
            <Field label="Price ($)" name="price" type="number" placeholder="289" />
            <Field label="Original Price ($)" name="original_price" type="number" placeholder="380" />
            <Field label="Discount (%)" name="discount" type="number" placeholder="0" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label='Colors (JSON)' name="colors" placeholder='["#000000","#fff"]' />
            <Field label='Color Names (JSON)' name="color_names" placeholder='["Black","White"]' />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label='Sizes (JSON)' name="sizes" placeholder='["S","M","L","XL"]' />
            <Field label='Images URLs (JSON)' name="images" placeholder='["https://..."]' />
          </div>

          <div className="flex gap-6">
            {["is_new","is_featured"].map(k => (
              <label key={k} className="flex items-center gap-2.5 cursor-pointer">
                <div onClick={() => setForm(p => ({ ...p, [k]: !p[k] }))}
                  className={`w-10 h-5 rounded-full transition-all relative ${form[k] ? "bg-[#d4af37]" : "bg-white/10"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form[k] ? "left-5" : "left-0.5"}`} />
                </div>
                <span className="text-sm text-white/60">{k === "is_new" ? "New Arrival" : "Featured"}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 py-3.5 bg-[#d4af37] hover:bg-[#e5c448] text-black font-bold text-sm rounded-xl transition-colors disabled:opacity-50">
              {saving ? "Saving..." : product ? "Update Product" : "Add Product"}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState(undefined); // undefined=closed, null=new, obj=edit
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, oRes] = await Promise.allSettled([
        api.get("/products"),
        api.get("/orders"),
      ]);
      if (pRes.status === "fulfilled") setProducts(pRes.value.data.products || []);
      if (oRes.status === "fulfilled") setOrders(oRes.value.data.orders || []);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    setDeleteConfirm(null);
    fetchAll();
  };

  const handleLogout = () => { logout(); navigate("/"); };

  // ── Derived stats ──
  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const featuredProducts = products.filter(p => p.is_featured);
  const newProducts = products.filter(p => p.is_new);

  const filteredProducts = (tab) => {
    const base = tab === "featured" ? featuredProducts : tab === "new" ? newProducts : products;
    return base.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  };

  const showProductTable = ["products","featured","new"].includes(activeTab);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 border-r border-white/5 flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] mb-1">Elivium</p>
          <h1 className="text-xl font-black text-white">Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setActiveTab(n.id); setSearch(""); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === n.id
                  ? "bg-[#d4af37]/15 text-[#d4af37]"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}>
              <span className="text-base">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-black font-black text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-[10px] text-white/30">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all font-semibold">
            <span>⎋</span> Sign Out → Home
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-white">
                {NAV.find(n => n.id === activeTab)?.label}
              </h2>
              <p className="text-white/30 text-sm mt-1">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>
            {showProductTable && (
              <button onClick={() => setModalProduct(null)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#d4af37] hover:bg-[#e5c448] text-black font-bold text-sm rounded-xl transition-colors">
                <span className="text-lg">+</span> Add Product
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">

              {/* ── Overview ── */}
              {activeTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <StatCard label="Total Products" value={products.length} accent="bg-[#d4af37]" sub="In catalogue" />
                    <StatCard label="Featured" value={featuredProducts.length} accent="bg-purple-500" sub="Highlighted items" />
                    <StatCard label="New Arrivals" value={newProducts.length} accent="bg-emerald-500" sub="Latest additions" />
                    <StatCard label="Total Orders" value={orders.length} accent="bg-blue-500" sub={`Revenue: ${formatPrice(totalRevenue)}`} />
                  </div>

                  {/* Recent orders preview */}
                  <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                      <h3 className="font-bold text-white">Recent Orders</h3>
                      <button onClick={() => setActiveTab("orders")} className="text-xs text-[#d4af37] hover:underline">View all →</button>
                    </div>
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="px-6 py-4 border-b border-white/5 last:border-0 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{o.users?.name || "Customer"}</p>
                          <p className="text-xs text-white/30">{o.users?.email} · {formatDate(o.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_COLORS[o.status] || STATUS_COLORS.confirmed}`}>
                            {o.status}
                          </span>
                          <span className="text-sm font-bold text-white">{formatPrice(o.total)}</span>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <div className="px-6 py-12 text-center text-white/20 text-sm">No orders yet</div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── Products / Featured / New ── */}
              {showProductTable && (
                <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Search */}
                  <div className="mb-6">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[#d4af37]/50 transition-colors" />
                  </div>

                  <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          {["Product","Category","Price","Discount","Tags","Actions"].map(h => (
                            <th key={h} className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-white/20">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts(activeTab).map(p => (
                          <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                {p.images?.[0] && (
                                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-white/5" onError={e => e.target.style.display='none'} />
                                )}
                                <span className="font-semibold text-white">{p.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-white/40 capitalize">{p.category}</td>
                            <td className="px-5 py-4 font-bold text-[#d4af37]">{formatPrice(p.price)}</td>
                            <td className="px-5 py-4 text-white/40">{p.discount || 0}%</td>
                            <td className="px-5 py-4">
                              <div className="flex gap-1.5">
                                {p.is_new && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">NEW</span>}
                                {p.is_featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">FEATURED</span>}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex gap-2">
                                <button onClick={() => setModalProduct(p)}
                                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs rounded-lg transition-all font-semibold">
                                  Edit
                                </button>
                                <button onClick={() => setDeleteConfirm(p)}
                                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg transition-all font-semibold">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredProducts(activeTab).length === 0 && (
                          <tr><td colSpan={6} className="px-5 py-12 text-center text-white/20">No products found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* ── Orders ── */}
              {activeTab === "orders" && (
                <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          {["Customer","Email","Date","Items","Total","Status"].map(h => (
                            <th key={h} className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-white/20">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                            <td className="px-5 py-4 font-semibold text-white">{o.users?.name || "—"}</td>
                            <td className="px-5 py-4 text-white/40 text-xs">{o.users?.email || "—"}</td>
                            <td className="px-5 py-4 text-white/40 text-xs">{formatDate(o.created_at)}</td>
                            <td className="px-5 py-4 text-white/40">{o.order_items?.length || 0}</td>
                            <td className="px-5 py-4 font-bold text-[#d4af37]">{formatPrice(o.total)}</td>
                            <td className="px-5 py-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_COLORS[o.status] || STATUS_COLORS.confirmed}`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {orders.length === 0 && (
                          <tr><td colSpan={6} className="px-5 py-12 text-center text-white/20">No orders yet</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          )}
        </div>
      </main>

      {/* ── Product Modal ── */}
      <AnimatePresence>
        {modalProduct !== undefined && (
          <ProductModal
            product={modalProduct}
            onClose={() => setModalProduct(undefined)}
            onSave={() => { setModalProduct(undefined); fetchAll(); }}
          />
        )}
      </AnimatePresence>

      {/* ── Delete Confirm ── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5 text-2xl">🗑️</div>
              <h3 className="text-lg font-black text-white mb-2">Delete Product?</h3>
              <p className="text-white/40 text-sm mb-6">"{deleteConfirm.name}" will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(deleteConfirm.id)}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-xl transition-colors">
                  Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}