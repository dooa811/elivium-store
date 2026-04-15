import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth }     from "../../context/AuthContext.jsx";
import { useCart }     from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import Input  from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const orders = JSON.parse(localStorage.getItem("elivium_orders") || "[]");

  const [edit,  setEdit]  = useState(false);
  const [form,  setForm]  = useState({ name: user?.name || "", email: user?.email || "" });
  const [saved, setSaved] = useState(false);
  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const save = () => {
    updateUser(form); setEdit(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = (user?.name || "U").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen">
      <div className="bg-obsidian-800 border-b border-obsidian-700 py-10 px-4">
        <div className="container-xl flex items-center gap-6">
          <div className="w-16 h-16 bg-gold-500 flex items-center justify-center font-display text-2xl font-bold text-obsidian-900">
            {initials}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white">{user?.name}</h1>
            <p className="text-obsidian-300 text-sm mt-1">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="container-xl px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Orders",    val: orders.length, href: "/orders"   },
            { label: "Wishlist",  val: wishCount,     href: "/wishlist" },
            { label: "Cart Items", val: totalItems,   href: "/cart"     },
          ].map(s => (
            <Link key={s.label} to={s.href}
              className="bg-obsidian-800 border border-obsidian-600 p-5 text-center hover:border-gold-500/40 transition-all group">
              <p className="font-display text-3xl font-bold text-gold-400 group-hover:text-gold-300">{s.val}</p>
              <p className="text-xs text-obsidian-300 uppercase tracking-widest mt-1">{s.label}</p>
            </Link>
          ))}
        </div>

        {/* Profile form */}
        <div className="bg-obsidian-800 border border-obsidian-600 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-white">Personal Information</h2>
            {!edit && <Button variant="ghost" size="sm" onClick={() => setEdit(true)}>Edit</Button>}
          </div>
          {saved && (
            <div className="mb-4 p-3 border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm">
              ✓ Profile updated successfully
            </div>
          )}
          <div className="space-y-4">
            {edit ? (
              <>
                <Input label="Full Name" name="name" value={form.name} onChange={handle}/>
                <Input label="Email" name="email" type="email" value={form.email} onChange={handle}/>
                <div className="flex gap-3 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setEdit(false)}>Cancel</Button>
                  <Button variant="gold"  size="sm" onClick={save}>Save Changes</Button>
                </div>
              </>
            ) : (
              <>
                {[{ label: "Name", val: user?.name }, { label: "Email", val: user?.email },
                  { label: "Member Since", val: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—" }
                ].map(f => (
                  <div key={f.label} className="flex justify-between py-3 border-b border-obsidian-700">
                    <span className="text-xs uppercase tracking-widest text-obsidian-300">{f.label}</span>
                    <span className="text-white text-sm">{f.val}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "My Orders",   href: "/orders",   icon: "📦" },
            { label: "My Wishlist", href: "/wishlist", icon: "🤍" },
          ].map(l => (
            <Link key={l.label} to={l.href}
              className="bg-obsidian-800 border border-obsidian-600 p-5 flex items-center gap-4 hover:border-gold-500/40 transition-all group">
              <span className="text-2xl">{l.icon}</span>
              <span className="text-white font-semibold text-sm group-hover:text-gold-400 transition-colors">{l.label}</span>
              <span className="ml-auto text-obsidian-400 group-hover:text-gold-400 transition-colors">→</span>
            </Link>
          ))}
        </div>

        <Button variant="danger" size="md" onClick={logout}>Sign Out</Button>
      </div>
    </div>
  );
}