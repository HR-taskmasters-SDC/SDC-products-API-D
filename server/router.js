const express = require('express');
const router = express.Router();
const { getAllProducts, getOneProduct, getStyles, getRelated, getCart, postCart } = require('./controller.js');

router.get('/products', getAllProducts);
router.get('/products/:product_id', getOneProduct);
router.get('/products/:product_id/styles', getStyles);
router.get('/products/:product_id/related', getRelated);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.get('/loaderio-acb3a28d5f976518faac5285207fc3da', (req, res) => ('loaderio-acb3a28d5f976518faac5285207fc3da'));


module.exports = router;