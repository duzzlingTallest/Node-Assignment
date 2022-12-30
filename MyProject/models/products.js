const mongoose = require('mongoose');
const products = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },

  price: {
    require: true,
    type: String,
  },

  description: {
    require: true,
    type: String
  },
});


module.exports = mongoose.model('products',products)