const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// ✅ التعديل هون
const { verifyToken } = require('../middleware/auth');


// Routes عامة
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/new', productController.getNewProducts);
router.get('/sale', productController.getSaleProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);


// Routes للأدمن (محمية بالتوكن)
router.post('/', verifyToken, productController.createProduct);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;