const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const {registeruser,loginuser , fetchproducts , fetchproductsbest , fetchproductsethinic, addtowishlist,getwishlist,removefromwishlist,addtocart,getcartitems ,removefromcart,fetchproductsnew,decreasequantity,increasequantity,placeorder,fetchproductskurtas,fetchorders} = require('../controllers/user');
const {registerseller , sellerlogin , addproduct, getproducts ,deleteproduct} = require('../controllers/seller');
const {adminlogin,fetchcustomers, handledelete,fetchsellers,handledelete2} = require('../controllers/admin')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads')); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  // Multer Middleware
  const upload = multer({ storage });
  
    
router.post('/register', registeruser)
router.post('/login', loginuser)
router.post('/seller-register', registerseller)
router.post('/sellerlogin', sellerlogin);
router.post('/addnewproduct' , upload.single('image') , addproduct);
router.get('/products' ,  getproducts);
router.delete('/deleteproducts/:productId', deleteproduct);
router.get('/fetchproducts' ,  fetchproducts)
router.get('/fetchproductsbest' ,  fetchproductsbest);
router.get('/fetchproductsnew' ,  fetchproductsnew);
router.get('/fetchproductskurtas' ,  fetchproductskurtas);
router.get('/fetchproductsethinic' ,  fetchproductsethinic);
router.post('/addtowishlist/:productId' , addtowishlist);
router.post('/addtocart/:productId' , addtocart);
router.get('/getwishlistitems' , getwishlist );
router.get('/getcartitems' , getcartitems );
router.delete('/removefromwishlist/:id' ,  removefromwishlist)
router.delete('/removefromcart/:id' ,  removefromcart);
router.delete('/decreasequantity/:id' , decreasequantity);
router.delete('/increasequantity/:id' , increasequantity);
router.post('/placeorder' , placeorder);
router.get('/fetchorders/:email' , fetchorders);
router.post("/adminlogin" ,  adminlogin);
router.get('/fetchcustomers' , fetchcustomers);
router.get('/fetchsellers' , fetchsellers);
router.delete('/deleteuser/:id' , handledelete);
router.delete('/deleteuser2/:id' , handledelete2);
module.exports = router;