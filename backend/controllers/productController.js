const { supabase } = require('../config/supabase');

// الحصول على جميع المنتجات
exports.getAllProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ products: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// الحصول على منتج واحد
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// الحصول على منتجات حسب الفئة
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ products: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// المنتجات المميزة
exports.getFeaturedProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ products: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// المنتجات الجديدة
exports.getNewProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_new', true);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ products: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// المنتجات على الخصم
exports.getSaleProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gt('discount', 0);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ products: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// إضافة منتج جديد (للأدمن فقط)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subcategory,
      price,
      original_price,
      discount,
      colors,
      color_names,
      sizes,
      images,
      is_new,
      is_featured
    } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          category,
          subcategory,
          price,
          original_price,
          discount,
          colors,
          color_names,
          sizes,
          images,
          is_new: is_new || false,
          is_featured: is_featured || false,
          in_stock: true
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Product created successfully',
      product: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// تحديث منتج (للأدمن فقط)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Product updated successfully',
      product: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف منتج (للأدمن فقط)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};