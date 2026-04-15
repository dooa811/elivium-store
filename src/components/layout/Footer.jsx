import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="bg-obsidian-900 border-t border-obsidian-700 mt-20">
      {/* Marquee */}
      <div className="border-b border-obsidian-700 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16">
          {Array(6).fill(["NEW COLLECTION 2026", "FREE SHIPPING OVER $200", "LUXURY FABRICS", "SUSTAINABLE FASHION", "HANDCRAFTED QUALITY"]).flat().map((t, i) => (
            <span key={i} className="text-xs font-semibold tracking-widest uppercase text-obsidian-300 flex items-center gap-6">
              {t} <span className="text-gold-500 text-lg">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-5">
              <span className="font-display text-3xl font-bold tracking-wider text-white">ELIVIUM</span>
              <p className="text-[10px] tracking-[0.35em] text-gold-500 uppercase mt-0.5">Store</p>
            </Link>
            <p className="text-sm text-obsidian-200 leading-relaxed mb-6">
              Curating exceptional clothing for those who appreciate the art of dressing well. Quality, elegance, and purpose in every piece.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "𝕏",  href: "#" },
                { icon: "ig", href: "#" },
                { icon: "fb", href: "#" },
                { icon: "pt", href: "#" },
              ].map(s => (
                <a key={s.icon} href={s.href}
                  className="w-9 h-9 border border-obsidian-500 flex items-center justify-center text-xs text-obsidian-200 hover:border-gold-500 hover:text-gold-400 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: "All Products",  href: "/shop"           },
                { label: "Women",         href: "/shop?cat=women" },
                { label: "Men",           href: "/shop?cat=men"   },
                { label: "New Arrivals",  href: "/shop?tag=new"   },
                { label: "Sale",          href: "/shop?tag=sale"  },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-obsidian-200 hover:text-gold-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        

          {/* Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Information</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us",   href: "/about"   },
                { label: "Contact",    href: "/contact" },
                { label: "My Orders",  href: "/orders"  },
                { label: "Wishlist",   href: "/wishlist"},
                { label: "Profile",    href: "/profile" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-obsidian-200 hover:text-gold-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Newsletter</h4>
            <p className="text-sm text-obsidian-200 mb-4 leading-relaxed">Subscribe for exclusive offers and new collection previews.</p>
            {subscribed ? (
              <p className="text-gold-400 text-sm font-semibold">✓ Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" required
                  className="bg-obsidian-700 border border-obsidian-500 text-white placeholder-obsidian-300 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"/>
                <button type="submit" className="btn-gold w-full py-3 text-xs">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-obsidian-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-obsidian-300">© 2026 Elivium Store. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Returns"].map(l => (
              <a key={l} href="#" className="text-xs text-obsidian-300 hover:text-gold-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}