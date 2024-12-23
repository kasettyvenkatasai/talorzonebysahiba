const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  selleremail: String,
  name: String,
  price: String,
  productId:{
    type:String,
    unique:true
  },
  brand:{
   type:String,
   required :true 
  },
  img: String,
  category: String,
  inStockValue: Number,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;