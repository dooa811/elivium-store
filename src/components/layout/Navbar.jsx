import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const links = [
  { label: "Home",    href: "/" },
  { label: "Shop",    href: "/shop" },
  { label: "Women",   href: "/shop?cat=women" },
  { label: "Men",     href: "/shop?cat=men" },
  { label: "Sale",    href: "/shop?tag=sale" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" }
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
  .nav-link {
    font-size: 10px; font-weight: 500; letter-spacing: 0.15em;
    text-transform: uppercase; text-decoration: none;
    color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif;
    transition: color 0.2s; position: relative; padding-bottom: 2px;
  }
  .nav-link:hover { color: #fff; }
  .nav-link.active { color: #d4af37; }
  .nav-link.active::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0;
    height: 1px; background: #d4af37;
  }
  .search-input {
    flex: 1; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08); border-right: none;
    padding: 12px 20px; color: #fff; font-size: 13px;
    outline: none; font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
  }
  .search-input:focus { border-color: rgba(212,175,55,0.4); }
  .search-input::placeholder { color: rgba(255,255,255,0.2); }
  .search-btn {
    padding: 12px 20px;
    background: rgba(212,175,55,0.9); border: none;
    color: #0a0a0a; font-size: 10px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
  }
  .search-btn:hover { background: #d4af37; }
  .icon-btn {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.4); padding: 6px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.2s; position: relative;
  }
  .icon-btn:hover { color: #fff; }
  .badge {
    position: absolute; top: -2px; right: -2px;
    width: 16px; height: 16px; border-radius: 50%;
    background: #d4af37; color: #0a0a0a;
    font-size: 9px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Sans', sans-serif;
  }
  .dropdown {
    position: absolute; right: 0; top: calc(100% + 8px);
    width: 200px;
    background: rgba(12,12,12,0.98);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 8px;
    opacity: 0; visibility: hidden;
    transition: all 0.2s; z-index: 100;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .avatar-wrap:hover .dropdown { opacity: 1; visibility: visible; }
  .dropdown-link {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 10px;
    color: rgba(255,255,255,0.5); font-size: 12px;
    text-decoration: none; font-family: 'DM Sans', sans-serif;
    transition: all 0.15s; font-weight: 400;
  }
  .dropdown-link:hover { background: rgba(255,255,255,0.05); color: #fff; }
  .dropdown-link.gold { color: rgba(212,175,55,0.7); }
  .dropdown-link.gold:hover { color: #d4af37; }
  .dropdown-link.danger { color: rgba(239,68,68,0.6); }
  .dropdown-link.danger:hover { color: #fca5a5; background: rgba(239,68,68,0.05); }
  .dropdown-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 6px 0; }
  .mob-link {
    display: block; padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 10px; font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; text-decoration: none;
    color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
  }
  .mob-link:hover { color: #d4af37; }
  .mob-link:last-child { border-bottom: none; }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalItems } = useCart();
  const { count: wishCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
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

  const isActive = (href) => location.pathname === href.split("?")[0] && (href === "/" ? location.pathname === "/" : true);

  return (
    <>
      <style>{STYLES}</style>

      {/* Top bar */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)", textAlign: "center", padding: "8px 24px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
          Free shipping on orders over $200 · New Collection 2026 Now Available
        </p>
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(8,8,8,0.97)" : "rgba(8,8,8,0.95)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.1)" : "1px solid rgba(255,255,255,0.04)",
        transition: "all 0.4s"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
              <span style={{ fontSize: 22, fontWeight: 300, letterSpacing: "0.15em", color: "#fff", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif" }}>ELIVIUM</span>
              <span style={{ fontSize: 8, letterSpacing: "0.4em", color: "#d4af37", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>Store</span>
            </Link>

            {/* Desktop nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
              <style>{`@media(max-width:1023px){.desktop-nav{display:none!important}}`}</style>
              {links.map(l => (
                <Link key={l.href} to={l.href} className={`nav-link ${location.pathname === l.href ? "active" : ""}`}>{l.label}</Link>
              ))}
            </nav>

            {/* Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {/* Search */}
              <button className="icon-btn" onClick={() => setSearchOpen(s => !s)}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="icon-btn" style={{ textDecoration: "none" }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishCount > 0 && <span className="badge">{wishCount}</span>}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="icon-btn" style={{ textDecoration: "none" }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && <span className="badge">{totalItems}</span>}
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <div className="avatar-wrap" style={{ position: "relative", marginLeft: 4 }}>
                  <button style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: "linear-gradient(135deg, #d4af37, #f0d060)",
                    border: "none", cursor: "pointer",
                    color: "#0a0a0a", fontSize: 13, fontWeight: 700,
                    fontFamily: "'Cormorant Garamond', serif",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </button>
                  <div className="dropdown">
                    <Link to="/profile" className="dropdown-link">
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      My Profile
                    </Link>
                    <Link to="/orders" className="dropdown-link">
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      My Orders
                    </Link>
                    {user?.role === "admin" && (
                      <>
                        <div className="dropdown-divider" />
                        <Link to="/admin" className="dropdown-link gold">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          Admin Dashboard
                        </Link>
                      </>
                    )}
                    <div className="dropdown-divider" />
                    <button onClick={logout} className="dropdown-link danger" style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" style={{
                  fontSize: 10, fontWeight: 500, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
                  textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                  marginLeft: 8, transition: "color 0.2s"
                }}
                  onMouseEnter={e => e.target.style.color = "#d4af37"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                  className="desktop-login"
                >
                  Login
                </Link>
              )}
              <style>{`@media(max-width:640px){.desktop-login{display:none!important}}`}</style>

              {/* Hamburger */}
              <button className="icon-btn" onClick={() => setMenuOpen(s => !s)} style={{ marginLeft: 4 }} className="hamburger">
                <style>{`@media(min-width:1024px){.hamburger{display:none!important}}`}</style>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
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
              style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(8,8,8,0.98)" }}>
              <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: "0 auto", display: "flex", padding: 16 }}>
                <input className="search-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products, styles, collections..." autoFocus />
                <button className="search-btn" type="submit">Search</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
              style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(8,8,8,0.98)" }}>
              <div style={{ padding: "8px 24px 20px" }}>
                {links.map(l => <Link key={l.href} to={l.href} className="mob-link">{l.label}</Link>)}
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="mob-link">My Profile</Link>
                    <Link to="/orders" className="mob-link">My Orders</Link>
                    {user?.role === "admin" && <Link to="/admin" className="mob-link" style={{ color: "rgba(212,175,55,0.6)" }}>Admin Dashboard</Link>}
                    <button onClick={logout} className="mob-link" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239,68,68,0.6)", width: "100%", textAlign: "left", fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit", textTransform: "inherit", padding: "14px 0" }}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div style={{ display: "flex", gap: 10, paddingTop: 16 }}>
                    <Link to="/login" style={{ flex: 1, padding: "11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>Login</Link>
                    <Link to="/signup" style={{ flex: 1, padding: "11px", background: "#d4af37", border: "none", borderRadius: 10, color: "#0a0a0a", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Sign Up</Link>
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