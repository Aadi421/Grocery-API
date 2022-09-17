const Product = require('../models/product');
const { to, ReE, ReS } = require('../config/util');
const mongoose = require('mongoose');

module.exports.createProduct = async function (req, res) {
    const {  productCategory,productInfo,price,quantityTotal } = req.body
    if (!productCategory) {
        ReE(res, 'Please provide product category')
    }
    else if (!productInfo) {
        ReE(res, 'Please provide product info')
    }
    else if (!price) {
        ReE(res, 'Please provide product price')
    }
    else if (!quantityTotal) {
        ReE(res, 'Please provide product quantity')
    }
    else {
        createProduct(req, res);
    }
}
const createProduct = async function (req, res) {

    const {  productCategory,productInfo,price,quantityTotal } = req.body
    let err, product;
    [err, product] = await to(Product.findOne({ "productInfo.name":productInfo.name }));

    if (err) {
        ReE(res, err.message);
    }
    else {
        if (product) {
            ReE(res, `Product already exist with product name ${productInfo.name}`)
        }
        else {
            let productData = new Product({
                productCategory,
                productInfo,
                price,
                quantityAvailable:quantityTotal,
                quantityTotal,
            })
            let save = await productData.save();
            if (save) {
                ReS(res, { message: 'Product created successfully' }, 201);
            }
            else {
                ReE(res, {data:save, message: 'Product failed to create' }, 201);
            }
        }
    }
}

module.exports.updateProduct = async function (req, res) {
    const {  productId,price } = req.body
    if (!productId) {
        ReE(res, 'Please provide product Id')
    }
    else if (!price) {
        ReE(res, 'Please provide product price')
    }
    else {
        updateProduct(req, res);
    }
}
const updateProduct = async function (req, res) {

    const {  productId,price } = req.body
    let err, product;
    [err, product] = await to(Product.findOne({ _id:mongoose.Types.ObjectId(productId)}));

    if (err) {
        ReE(res, err.message);
    }
    else {
        if (!product) {
            ReE(res, `Product not found`)
        }
        else {
            [err, product] = await to(Product.findOneAndUpdate({ _id:mongoose.Types.ObjectId(productId)},{
                $set:{
                    price,
                }
            },{new:true}))
           
            if (err) {
                ReE(res, { message: 'Product failed to update' }, 201);
                
            }
            else {
                if(!product){
                    ReE(res, { message: 'Some error occur please try agian' }, 201);
                }
                else{
                    ReS(res, {data:product, message: 'Product updated successfully' }, 201);
                }
            }
        }
    }
}

module.exports.getProductList = async function(req, res){
    getProductList(req,res);
}

const getProductList = async function(req, res){

const {page,limit,productId} =req.body
let query=[{}]
let err,product,count;
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
if(productId){
    query.push({"_id":mongoose.Types.ObjectId(productId)})
}

[err, count] = await to(Product.count({$and:query}));
if (err)
{
    ReE(res,err.message);
}
else
{
    [err,product] = await to(Product.find({$and:query}).sort({updatedAt:-1}).skip(pages).limit(limits));

    if(err) 
    {
        ReE(res,err.message);
    }
    else{
        if(!product || product.length==0){
            ReE(res,"Product Not found");
        }
        else{

            ReS(res, {data: product,count: count}, 201);
        }
    }
}
}