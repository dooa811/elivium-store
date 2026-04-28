const {supabase} = require('../config/supabase');

// إنشاء طلب جديد
exports.createOrder = async (req, res) => {
  try {
    const { subtotal, shipping, payment_method, shipping_address } = req.body;

    const total = subtotal + shipping;

    // إنشاء الطلب
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: req.user.id,
          subtotal,
          shipping,
          total,
          payment_method,
          shipping_address,
          status: 'confirmed'
        }
      ])
      .select();

    if (orderError) {
      return res.status(400).json({ error: orderError.message });
    }

    const orderId = orderData[0].id;

    // نقل عناصر السلة إلى جدول order_items
    const { data: cartItems } = await supabase
      .from('cart_items')
      .select(`
        *,
        products:product_id (name, price)
      `)
      .eq('user_id', req.user.id);

    if (cartItems && cartItems.length > 0) {
      const orderItems = cartItems.map(item => ({
        order_id: orderId,
        product_id: item.product_id,
        product_name: item.products.name,
        quantity: item.quantity,
        price: item.products.price,
        selected_size: item.selected_size,
        selected_color: item.selected_color
      }));

      await supabase.from('order_items').insert(orderItems);

      // حذف السلة بعد الطلب
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', req.user.id);
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: orderData[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// الحصول على طلبات المستخدم
exports.getUserOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ orders: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// الحصول على طلب واحد
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جميع الطلبات (للأدمن)
exports.getAllOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users (name, email),
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ orders: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};