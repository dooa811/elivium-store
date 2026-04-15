export const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export const calculateDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100);

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateForm = (fields) => {
  const errors = {};
  Object.entries(fields).forEach(([key, val]) => {
    if (!val || !val.toString().trim()) errors[key] = `${key} is required`;
  });
  return errors;
};