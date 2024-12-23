const User = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "venkat";
const Product = require('../models/product')
const nodemailer = require('nodemailer');
const Wishlist = require('../models/wishlist')
const Cart =  require('../models/cartmodel')
const Order = require('../models/Order');
const seller =require('../models/seller');
const Admin = require('../models/admin')

async function adminlogin(req,res) {
    const {email , password} = req.body;
        try {
            const isuser = await Admin.findOne({email:email})
            if(!isuser){
                return res.status(400).json({ message: "User does not exist, please signup" });
            }
           if (password != isuser.password) {
            return res.status(400).json({message:'invalid password'});
           }
            
            const token = jwt.sign(
                { email: isuser.email, name: isuser.name }, 
                secret, 
                { expiresIn: '1h' }
            );
            res.cookie('authToken3', token, { 
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
async function fetchcustomers(req, res) {
    try {
      // Fetch all users from the database
      const users = await User.find();
  
      // Check if there are no users
      if (users.length === 0) {
        return res.status(404).json({ message: "No customers found" });
      }
  
      // Send the list of users as a JSON response
      return res.status(200).json(users);
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error("Error fetching customers:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }
  async function handledelete(req,res) {
    const { id} = req.params;
    await User.findByIdAndDelete({
        _id:id
    });
    return res.status(200).json({message:"user deleted sucessfully"});

  }
  async function fetchsellers(req, res) {
    try {
      // Fetch all users from the database
      const users = await seller.find();
  
      // Check if there are no users
      if (users.length === 0) {
        return res.status(404).json({ message: "No customers found" });
      }
  
      // Send the list of users as a JSON response
      return res.status(200).json(users);
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error("Error fetching customers:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }
  async function handledelete2(req,res) {
    const { id} = req.params;
    await seller.findByIdAndDelete({
        _id:id
    });
    return res.status(200).json({message:"user deleted sucessfully"});

  }
module.exports = {adminlogin,fetchcustomers,handledelete,fetchsellers,handledelete2}