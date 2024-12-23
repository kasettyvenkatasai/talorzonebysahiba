const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  email: String,
  productsInwishlist: [{
    productId: String,
  }]
});

const Wishlist= mongoose.model('Wishlist',wishlistSchema);
module.exports = Wishlist;