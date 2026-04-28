import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("elivium_cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("elivium_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, size, color, qty = 1) => {
    setItems((prev) => {
      const key = `${product.id}-${size}-${color}`;
      const exists = prev.find((i) => i.key === key);
      
      if (exists) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      
      return [
        ...prev,
        {
          ...product,
          key,
          size,
          color,
          qty
        }
      ];
    });
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const updateQty = (key, qty) => {
    if (qty < 1) {
      removeFromCart(key);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const isInCart = (id) => items.some((i) => i.id === id);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isInCart,
        totalItems,
        subtotal,
        shipping,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};