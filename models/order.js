const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productList: {type: Array},//array of object
    customerDetail: {type: Object},//_id,name,email
    totalPrice: {type: Number},
    paymentInfo: {type: Object}
    
}, {timestamps: true});

const Order= mongoose.model('Order', OrderSchema);
module.exports = Order;