const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// ✅ التعديل
const { verifyToken } = require('../middleware/auth');

// حماية كل الروتات
router.use(verifyToken);

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

// Admin (لاحقًا تضيفي role check)
router.get('/', orderController.getAllOrders);

module.exports = router;