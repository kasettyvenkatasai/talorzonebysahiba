const seller =require('../models/seller');
const Product = require('../models/product'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "venkat";
const nodemailer = require('nodemailer');
async function registerseller(req,res) {
    const { name, email,password , businessName} = req.body;
    console.log(name, email,password)
    try {
       const user  = await seller.findOne({email:email});
       if(user){
        return res.status(400).json({message:"user already exists"});
       }
       const hashedpassword = await bcrypt.hash(password,10);
       await seller.create({
        name : name,
        email:email,
        password:hashedpassword,
        businessName:businessName
       });
       const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kbhargavreddy22@gmail.com', 
            pass: 'ygbi lfdv bpsb giza' 
        },
      });
      const mailOptions = {
        from: 'kbhargavreddy22@gmail.com',
        to: email,
        subject: 'Shop register Request Accepted',
        text: `Dear Seller,
  
  We are pleased to inform you that your request to add register to  our website "MytalorZone" has been accepted successfully.
  
  Thank you for choosing our platform.
  
  Best regards,
  Mytalorzone Team`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          return res.status(500).json("College added but email notification failed.");
        }
        console.log("Email sent: ", info.response);
        res.status(200).json({message:"user registered successfully"});
      });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
}
async function sellerlogin(req,res) {
    const {email , password} = req.body;
    try {
        const isuser = await seller.findOne({email:email})
        if(!isuser){
            return res.status(400).json({ message: "User does not exist, please signup" });
        }
        const ismatch = await bcrypt.compare(password,isuser.password);
        if(!ismatch){
            return res.status(400).json({message:'invalid password'});
        }
        const token = jwt.sign(
            { email: isuser.email, name: isuser.name }, 
            secret, 
            { expiresIn: '1h' }
        );
        res.cookie('authToken2', token, { 
            httpOnly: false, 
            secure: true,  
            sameSite: 'Lax'
        });
        
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log("Error:", error);
    res.status(500).json({ message: 'Internal server error' });
    }
    
}
async function addproduct(req,res) {
    try {
      const {title ,id, price , category ,stock,email,brand} = req.body;
      console.log(req.file);
      console.log(email);
      let imageurl = null;
      if(req.file){
        imageurl = `/uploads/${req.file.filename}`
      }
     console.log(imageurl)
      await Product.create({
        productId:id,
        selleremail:email,
        name:title,
        price:price,
        category:category,
        inStockValue:stock,
        img:imageurl,
        brand:brand,
      })
      res.status(200).json({message:'product added successfully'});
     
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'internal server error'})
    }
  }
  async function getproducts(req, res) {
    const { email } = req.query;
    console.log(email)
    try {
      const products = await Product.find({ selleremail: email });
      console.log(products)
      const updatedProducts = products.map(product => {
        console.log("Product image field:", product.img); 
  
        // Directly use the stored image path, no need to add 'uploads/' again
        const imagePath = product.img;
  
        console.log("Constructed image path:", imagePath); // Log the constructed image path
  
        return {
          ...product.toObject(),
          image: product.img ? `${req.protocol}://${req.get('host')}${imagePath}` : null,
        };
      });
  
      res.status(200).json(updatedProducts);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async function deleteproduct(req, res) {
    const { productId } = req.params; // Use route parameters
    const { fetchemail } = req.query; // Use query parameters
    console.log('Email:', fetchemail);
  
    try {
      
      const isproduct = await Product.findOne({ 
        _id: productId,
        selleremail: fetchemail, 
      });
  
      if (isproduct) {
        await Product.findByIdAndDelete(isproduct._id);
        return res.status(200).json({ message: "Product deleted successfully" });
      }
  
      return res.status(404).json({ message: "No product found" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
module.exports = {registerseller,sellerlogin, addproduct,getproducts,deleteproduct};