const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// ✅ التعديل
const { verifyToken } = require('../middleware/auth');

// Public
router.get('/product/:productId', reviewController.getProductReviews);

// Protected
router.post('/', verifyToken, reviewController.createReview);

module.exports = router;