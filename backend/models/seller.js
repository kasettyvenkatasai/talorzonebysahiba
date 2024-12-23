const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  businessName: { type: String, required: true },
  products:[
    {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true }
    }
],
});


const seller=  mongoose.model('Seller', SellerSchema);
module.exports = seller;