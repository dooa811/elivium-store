const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// ✅ التعديل
const { verifyToken } = require('../middleware/auth');

// حماية كل الروتات
router.use(verifyToken);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;