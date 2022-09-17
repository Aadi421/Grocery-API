const express = require('express');
const router = express.Router();

const customer = require('../controllers/customer');
const product = require('../controllers/product');
const order = require('../controllers/order');


router.post('/product/createProduct',product.createProduct);
router.post('/product/updateProduct',product.updateProduct);
router.post('/product/getProductList',product.getProductList);
router.post('/customer/createCustomer',customer.createCustomer);
router.post('/customer/getCustomerList',customer.getCustomerList);
router.post('/order/getCustomerOrder',order.getCustomerOrder);
router.post('/order/createOrder',order.createOrder);
// router.post('/customer/getCustomerDetails', product.getCustomerDetails);


module.exports = router;