const supabase = require('../config/supabase');

// الحصول على سلة المستخدم
exports.getCart = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products:product_id (*)
      `)
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ cartItems: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// إضافة منتج للسلة
exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity, selected_size, selected_color } = req.body;

    // تحقق من وجود المنتج بنفس المواصفات
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('product_id', product_id)
      .eq('selected_size', selected_size)
      .eq('selected_color', selected_color)
      .single();

    if (existing) {
      // تحديث الكمية
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select();

      if (error) return res.status(400).json({ error: error.message });
      return res.json({ message: 'Cart updated', cartItem: data[0] });
    }

    // إضافة عنصر جديد
    const { data, error } = await supabase
      .from('cart_items')
      .insert([
        {
          user_id: req.user.id,
          product_id,
          quantity,
          selected_size,
          selected_color
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Added to cart',
      cartItem: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// تحديث كمية المنتج
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return await exports.removeFromCart(req, res);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Cart item updated', cartItem: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف منتج من السلة
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف السلة كاملة
exports.clearCart = async (req, res) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};