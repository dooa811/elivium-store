import api from './api.js';

export const productService = {
  // الحصول على جميع المنتجات
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // الحصول على منتج واحد
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // المنتجات المميزة
  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products/featured');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  // المنتجات الجديدة
  getNewProducts: async () => {
    try {
      const response = await api.get('/products/new');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching new products:', error);
      return [];
    }
  },

  // منتجات على الخصم
  getSaleProducts: async () => {
    try {
      const response = await api.get('/products/sale');
      return response.data.products;
    } catch (error) {
      console.error('Error fetching sale products:', error);
      return [];
    }
  },

  // منتجات حسب الفئة
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }
};