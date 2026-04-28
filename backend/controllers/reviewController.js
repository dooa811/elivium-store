const supabase = require('../config/supabase');

// الحصول على تقييمات منتج
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ reviews: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// إضافة تقييم
exports.createReview = async (req, res) => {
  try {
    const { product_id, rating, text } = req.body;
    const { name } = req.body;

    if (!product_id || !rating || !text) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id,
          user_id: req.user.id,
          name: name || 'Anonymous',
          rating,
          text
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Review created successfully',
      review: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};