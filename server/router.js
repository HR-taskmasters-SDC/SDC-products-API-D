const express = require('express');
const router = express.Router();
const { getAllProducts, getOneProduct, getStyles, getRelated, getCart, postCart } = require('./controller.js');

router.get('/products', getAllProducts);
router.get('/products/:product_id', getOneProduct);
router.get('/products/:product_id/styles', getStyles);
router.get('/products/:product_id/related', getRelated);
router.get('/cart', getCart);
router.post('/cart', postCart);


module.exports = router;