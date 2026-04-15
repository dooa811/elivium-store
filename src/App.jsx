import { BrowserRouter }   from "react-router-dom";
import { AuthProvider }     from "./context/AuthContext.jsx";
import { CartProvider }     from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import AppRoutes            from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}