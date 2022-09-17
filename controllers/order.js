const Order = require('../models/order');
const { to, ReE, ReS }  = require('../config/util');
const mongoose = require('mongoose');


module.exports.createOrder = async function (req, res) {
    const {   productList,customerDetail,totalPrice,paymentInfo} = req.body
    if (!productList || productList.length==0) {
        ReE(res, 'Please provide product to order')
    }
    else if (!customerDetail) {
        ReE(res, 'Please provide customer detail')
    }
    else if (!totalPrice) {
        ReE(res, 'Please provide product total price')
    }
    else if (!paymentInfo) {
        ReE(res, 'Please provide product payment info')
    }
    else {
        createOrder(req, res);
    }
}
const createOrder = async function (req, res) {

    const {  productList,customerDetail,totalPrice,paymentInfo} = req.body
    let orderData = new Order({
        productList,
        customerDetail,
        totalPrice,
        paymentInfo,
    })
    let save = await orderData.save();
    if (save) {
        ReS(res, { message: 'Order placed successfully' }, 201);
    }
    else {
        ReE(res, {data:save, message: 'Failed to placed the order' }, 201);
    }
}
module.exports.getCustomerOrder = async function(req, res){
        getCustomerOrder(req,res);
}
const getCustomerOrder = async function(req, res){
    const {page,limit,customerId} =req.body

    let query=[{}]
    let err,order,count;
    var pages = 0;
    if (page != undefined)
    {
        if (page >= 1)
        {
            pages = (page - 1) * parseInt(limit);
        }
    }

    var limits = 1000000;
    if (limit != undefined)
    {
        limits = parseInt(limit);
    }

    if(customerId){
        query.push({"customerDetail._id":customerId})
    }
    [err, count] = await to(Order.count({$and:query}));
    if (err)
    {
        ReE(res,err.message);
    }
    else
    {
        [err,order] = await to(Order.find({$and:query}).sort({updatedAt:-1}).skip(pages).limit(limits));

        if(err) 
        {
            ReE(res,err.message);
        }
        else{
            if(!order || order.length==0){
                ReE(res,"Order not found");
            }
            else{
                ReS(res, {data: order,count: count}, 201);
            }
           
        }
    }
}