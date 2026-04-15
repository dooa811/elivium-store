import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import PublicLayout    from "../components/layout/PublicLayout.jsx";
import Home            from "../pages/public/Home.jsx";
import Shop            from "../pages/public/Shop.jsx";
import ProductDetails  from "../pages/public/ProductDetails.jsx";
import About           from "../pages/public/About.jsx";
import Contact         from "../pages/public/Contact.jsx";
import Login           from "../pages/auth/Login.jsx";
import Signup          from "../pages/auth/Signup.jsx";
import Cart            from "../pages/cart/Cart.jsx";
import Checkout        from "../pages/cart/Checkout.jsx";
import Success         from "../pages/cart/Success.jsx";
import Wishlist        from "../pages/user/Wishlist.jsx";
import Orders          from "../pages/user/Orders.jsx";
import Profile         from "../pages/user/Profile.jsx";
import NotFound        from "../pages/errors/NotFound.jsx";
import Loader          from "../components/ui/Loader.jsx";

function Protected({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loader fullScreen />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function Guest({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/"              element={<Home />}           />
        <Route path="/shop"          element={<Shop />}           />
        <Route path="/product/:id"   element={<ProductDetails />} />
        <Route path="/about"         element={<About />}          />
        <Route path="/contact"       element={<Contact />}        />
        <Route path="/cart"          element={<Cart />}           />
        <Route path="/wishlist"      element={<Wishlist />}       />
      </Route>

      {/* Checkout (no footer) */}
      <Route path="/checkout"         element={<Checkout />} />
      <Route path="/checkout/success" element={<Success />}  />

      {/* Auth */}
      <Route path="/login"  element={<Guest><Login  /></Guest>} />
      <Route path="/signup" element={<Guest><Signup /></Guest>} />

      {/* Protected */}
      <Route path="/orders"  element={<Protected><PublicLayout /></Protected>}>
        <Route index element={<Orders />} />
      </Route>
      <Route path="/profile" element={<Protected><PublicLayout /></Protected>}>
        <Route index element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}