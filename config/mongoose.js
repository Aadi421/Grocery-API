const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/grocery_store',{
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting mongoDB'));
db.once('open', () => {
    console.log('connected to database::mongoDB');

});
module.exports = db;