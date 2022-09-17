const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productCategory: {type: String},
    productInfo: {type: Object},
    price: {type: Number},
    quantityTotal: {type: Number},
    quantityAvailable: {type: Number}
    
}, {timestamps: true});

const Product= mongoose.model('Product', ProductSchema);
module.exports = Product;
