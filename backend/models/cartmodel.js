const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: String,
  productsInCart: [{
    productId: String,
    productQty: { type: Number, default: 1 } 
  }]
});

const Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart;