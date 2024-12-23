const mongoose  =  require('mongoose');
const OrderSchema  =  new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
   productList : [{
    ProductId:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        default:1
    }}
   ]
})
const Order = mongoose.model('Order' , OrderSchema)
module.exports = Order;