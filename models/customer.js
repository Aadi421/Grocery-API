const mongoose = require('mongoose');
const { isEmail } =require('validator');

const CustomerSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    // validate: [isEmail, 'invalid email'],
    required: true,
    // required: 'Email address is required',
    // validate: [validateEmail, 'Please fill a valid email address'],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: { type: String, required: true, trim: true },
  number: { type: Number }

}, { timestamps: true });


// var validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email)
// };

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;