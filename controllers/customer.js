const Customer = require('../models/customer');
const { to, ReE, ReS }  = require('../config/util');
const mongoose = require('mongoose');

module.exports.createCustomer = async function(req, res){
    const {email,number,name}=req.body
    if(!email) 
    {
        ReE(res, 'Please provide email')
    }
    else if(!number){
        ReE(res, 'Please provide number')
    }
    else if(!name){
        ReE(res, 'Please provide name')
    }
    else{
        createCustomer(req,res);
    }
}
const createCustomer = async function(req, res){

        const {email,number,name}=req.body
        let err,customer ;
        [err,customer]=await to(Customer.findOne({email}));

        if(err) 
        {
            ReE(res,err.message);
        }
        else
        {
            if(customer) 
            {
                ReE(res,`customer already exist with email ${email}`)
            }
            else
            {
                let customerData = new Customer({
                    email,
                    number,
                    name
                })
                let save = await customerData.save();
                if(save) {
                    ReS(res, {message:'Customer created successfully'}, 201);
                }
                else{
                    ReE(res, {message:'Customer failed to create'}, 201);
                }
            }
        }
}

module.exports.getCustomerList = async function(req, res){
        getCustomerList(req,res);
}
const getCustomerList = async function(req, res){
    const {page,limit} =req.body

    let err,customer,count;
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
    [err, count] = await to(Customer.count({}));
    if (err)
    {
        ReE(res,err.message);
    }
    else
    {
        [err,customer] = await to(Customer.find({}).sort({updatedAt:-1}).skip(pages).limit(limits));

        if(err) 
        {
            ReE(res,err.message);
        }
        else{
            if(!customer || customer.length==0){
                ReE(res,"Customer not found");
            }
            else{
                ReS(res, {data: customer,count: count}, 201);

            }
        }
    }
}