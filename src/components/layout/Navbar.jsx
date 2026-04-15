import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart }     from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useAuth }     from "../../context/AuthContext.jsx";

const links = [
  { label: "Home",     href: "/"         },
  { label: "Shop",     href: "/shop"     },
  { label: "Women",    href: "/shop?cat=women" },
  { label: "Men",      href: "/shop?cat=men"   },
  { label: "Sale",     href: "/shop?tag=sale"  },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,     setQuery]     = useState("");
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { navigate(`/shop?search=${query.trim()}`); setQuery(""); setSearchOpen(false); }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-obsidian-800 border-b border-obsidian-600 text-center py-2 px-4">
        <p className="text-xs tracking-widest text-gold-400 uppercase">
          Free shipping on orders over $200 · New Collection 2026 Now Available
        </p>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-obsidian-900/95 backdrop-blur-xl border-b border-obsidian-600 shadow-2xl" : "bg-obsidian-900 border-b border-obsidian-700"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex flex-col items-start leading-none group">
              <span className="font-display text-2xl font-bold tracking-wider text-white group-hover:gold-text transition-all duration-300">
                ELIVIUM
              </span>
              <span className="text-[9px] tracking-[0.35em] text-gold-500 uppercase -mt-0.5">Store</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {links.map(l => (
                <Link key={l.href} to={l.href}
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                    location.pathname === l.href
                      ? "text-gold-400"
                      : "text-gray-400 hover:text-white"
                  }`}>
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {wishCount > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 text-obsidian-900 text-[10px] font-bold flex items-center justify-center rounded-full">{wishCount}</span>}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                {totalItems > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 text-obsidian-900 text-[10px] font-bold flex items-center justify-center rounded-full">{totalItems}</span>}
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <Link to="/profile" className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center text-obsidian-900 font-bold text-xs">
                  {user?.name?.charAt(0).toUpperCase()}
                </Link>
              ) : (
                <Link to="/login" className="hidden sm:block text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gold-400 transition-colors">
                  Login
                </Link>
              )}

              {/* Hamburger */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
              className="overflow-hidden border-t border-obsidian-700 bg-obsidian-800">
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-0 p-4">
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search for products, styles, collections..."
                  autoFocus
                  className="flex-1 bg-obsidian-700 border border-obsidian-500 text-white placeholder-obsidian-300 px-5 py-3 text-sm focus:outline-none focus:border-gold-500"/>
                <button type="submit" className="bg-gold-500 text-obsidian-900 px-6 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors">
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
              className="lg:hidden overflow-hidden border-t border-obsidian-700 bg-obsidian-800">
              <div className="flex flex-col py-4 px-6">
                {links.map(l => (
                  <Link key={l.href} to={l.href}
                    className="py-3.5 border-b border-obsidian-600 text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors last:border-0">
                    {l.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="flex gap-3 mt-4">
                    <Link to="/login"  className="flex-1 btn-outline-gold text-center text-xs py-3">Login</Link>
                    <Link to="/signup" className="flex-1 btn-gold text-center text-xs py-3">Sign Up</Link>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}