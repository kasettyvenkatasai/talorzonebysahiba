const User = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "venkat";
const Product = require('../models/product')
const nodemailer = require('nodemailer');
const Wishlist = require('../models/wishlist')
const Cart =  require('../models/cartmodel')
const Order = require('../models/Order')
async function registeruser(req,res) {
    const { firstName ,lastName , email,password} = req.body;
    console.log(firstName ,lastName , email,password)
    try {
       const user  = await User.findOne({email:email});
       if(user){
        return res.status(400).json({message:"user already exists"});
       }
       const hashedpassword = await bcrypt.hash(password,10);
       await User.create({
        name : firstName + lastName,
        email:email,
        password:hashedpassword
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
        to: email, // Recipient email
        subject: 'College Request Accepted',
        text: `Dear User,
  
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
async function loginuser(req,res) {
    const {email , password} = req.body;
    try {
        const isuser = await User.findOne({email:email})
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
        res.cookie('authToken', token, { 
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
async function fetchproducts(req, res) {
    try {
      const products = await Product.find({
        category:"saree"
      });
      console.log(products);
      const updatedProducts = products.map(product => {
        console.log("Product image field:", product.img); 
        const imagePath = product.img;
  
        console.log("Constructed image path:", imagePath); 
  
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
async function fetchproductskurtas(req, res) {
    try {
      const products = await Product.find({
        category:"kurtas"
      });
      console.log(products);
      const updatedProducts = products.map(product => {
        console.log("Product image field:", product.img); 
        const imagePath = product.img;
  
        console.log("Constructed image path:", imagePath); 
  
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
async function fetchproductsbest(req, res) {
    try {
      const products = await Product.find({
        category:"bestseller"
      });
      console.log(products);
      const updatedProducts = products.map(product => {
        console.log("Product image field:", product.img); 
        const imagePath = product.img;
  
        console.log("Constructed image path:", imagePath); 
  
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
async function fetchproductsethinic(req, res) {
    try {
      const products = await Product.find({
        category:"ethinic"
      });
      console.log(products);
      const updatedProducts = products.map(product => {
        console.log("Product image field:", product.img); 
        const imagePath = product.img;
  
        console.log("Constructed image path:", imagePath); 
  
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
  async function addtowishlist(req, res) {
    const { productId } = req.params;  
    const { fetchemail } = req.query;  
    console.log('Email:', fetchemail);
    try {
      
        const isproduct = await Product.findOne({ _id: productId });

        if (!isproduct) {
            return res.status(400).json({ message: "There is no product with this id" });
        }

     console.log(isproduct)
        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { email: fetchemail },  
            { $push: { productsInwishlist: { productId  } } },  // Push the product as an object with productId
            { new: true ,upsert:true}  
        );


        if (!updatedWishlist) {
            return res.status(404).json({ message: "cart not found for this user" });
        }

        return res.status(200).json({ message: "Item added to cart successfully", updatedWishlist });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
async function getwishlist(req,res) {
  const email = req.query.email;
       console.log(email);
       try {
      
        const wishlist = await Wishlist.findOne({ email });
    
        if (!wishlist) {
          return { message: 'Wishlist not found' };
        }
    
        const productIds = wishlist.productsInwishlist.map(item => item.productId);
    

        const products = await Product.find({ _id: { $in: productIds } });
        const updatedProducts = products.map(product => {
          console.log("Product image field:", product.img); 
          const imagePath = product.img;
    
          console.log("Constructed image path:", imagePath); 
    
          return {
            ...product.toObject(),
            image: product.img ? `${req.protocol}://${req.get('host')}${imagePath}` : null,
          };
        });
        return res.status(200).json({message:"items added to wishlist sucessfully" ,  updatedProducts});
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
        throw error;
      }
}
async function removefromwishlist(req, res) {
  const email = req.query.email;
  const { id } = req.params;
  console.log(email, id);

  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { email: email },
      { $pull: { productsInwishlist: { productId: id } } }, 
      { new: true } 
    );
   console.log(updatedWishlist);
    if (!updatedWishlist) {
      return res.status(404).json({ message: 'Wishlist not found or product not in wishlist' });
    }

    res.status(200).json({ message: 'Product removed from wishlist', wishlist: updatedWishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function addtocart(req, res) {
  const { productId } = req.params;  
  const { fetchemail } = req.query;  
  console.log('Email:', fetchemail);
  try {
    
      const isproduct = await Product.findOne({ _id: productId });

      if (!isproduct) {
          return res.status(400).json({ message: "There is no product with this id" });
      }

   console.log(isproduct)
      const updatedCart = await Cart.findOneAndUpdate(
          { email: fetchemail },  
          { $push: { productsInCart: { productId, productQty:1 } } },  // Push the product as an object with productId
          { new: true ,upsert:true}  
      );
  console.log(updatedCart)

      if (!updatedCart) {
          return res.status(404).json({ message: "Wishlist not found for this user" });
      }

      return res.status(200).json({ message: "Item added to cart successfully", updatedCart });

  } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ message: 'Internal server error' });
  }
}
async function getcartitems(req, res) {
  const email = req.query.email;
  console.log(email);

  try {
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIdsWithQty = cart.productsInCart.map(item => ({
      productId: item.productId,
      productQty: item.productQty,
    }));

    const productIds = productIdsWithQty.map(item => item.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    const updatedProducts = products.map(product => {
      const productInCart = productIdsWithQty.find(
        item => item.productId === product._id.toString()
      );

      return {
        ...product.toObject(),
        productQty: productInCart ? productInCart.productQty : 0, 
        image: product.img ? `${req.protocol}://${req.get('host')}${product.img}` : null,
      };
    });

    return res.status(200).json({
      message: "Cart items retrieved successfully",
      updatedProducts,
    });
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function removefromcart(req, res) {
  const email = req.query.email;
  const { id } = req.params;

  console.log(email, id);

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { email: email },
      { $pull: { productsInCart: { productId: id } } }, // Remove based on productId only
      { new: true }
    );

    console.log(updatedCart);

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found or product not in cart' });
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
async function fetchproductsnew(req, res) {
  try {
    const products = await Product.find({
      category:"new-arrival"
    });
    console.log(products);
    const updatedProducts = products.map(product => {
      console.log("Product image field:", product.img); 
      const imagePath = product.img;

      console.log("Constructed image path:", imagePath); 

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
async function decreasequantity(req, res) {
  const { email, qty } = req.query; // `qty` is optional; you can default it to 1 if needed
  const { id } = req.params;
  console.log(email , qty ,id)
  try {
    // Find the cart item for the given email
    const cartItem = await Cart.findOne({ email: email });

    if (cartItem && cartItem.productsInCart.length > 0) {
      // Find the product in the cart
      const product = cartItem.productsInCart.find((product) => product.productId === id);

      if (product) {
        // Check if product quantity is greater than 0 before decreasing
        if (product.productQty > 0) {
          product.productQty  = qty-1;

          // If quantity becomes zero, you can optionally remove the product from the cart
          if (product.productQty <= 0) {
            cartItem.productsInCart = cartItem.productsInCart.filter(
              (p) => p.productId !== id
            );
          }

          // Save the updated cart
          await cartItem.save();

          res.status(200).json({
            message: 'Product quantity updated successfully',
            cart: cartItem,
          });
        } else {
          res.status(400).json({
            message: 'Product quantity is already at zero',
          });
        }
      } else {
        res.status(404).json({
          message: 'Product not found in the cart',
        });
      }
    } else {
      res.status(404).json({
        message: 'Cart not found or empty',
      });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function increasequantity(req, res) {
  const { email, qty } = req.query; // `qty` defaults to 1 if not provided
  const { id } = req.params;

  console.log(email, qty, id);

  try {
    // Find the cart item for the given email
    const cartItem = await Cart.findOne({ email });

    if (cartItem) {
      // Find the product in the cart
      const product = cartItem.productsInCart.find(
        (product) => product.productId === id
      );

      if (product) {
        // Convert qty to an integer (default to 1 if not provided)
        const quantityToAdd =1;

        // Increase the product quantity
        product.productQty += quantityToAdd;

        // Save the updated cart
        await cartItem.save();

        res.status(200).json({
          message: 'Product quantity increased successfully',
          cart: cartItem,
        });
      } else {
        res.status(404).json({
          message: 'Product not found in the cart',
        });
      }
    } else {
      res.status(404).json({
        message: 'Cart not found',
      });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function placeorder(req, res) {
  const { email, items } = req.body;

  // Debugging lines
  console.log("Email:", email);
  console.log("Items:", items);

  // Validate email and items
  if (!email || !items || items.length === 0) {
    return res.status(400).json({ message: "Email or items are missing" });
  }

  // Prepare the product list
  const productList = items.map(item => ({
    ProductId: item.productId, // Assuming this is the correct field
    qty: item.productQty,
  }));
  console.log("Product List:", productList);

  try {
    // Create the order
    const newOrder = await Order.create({ email, productList });

    // Update stock for each product
    for (let item of productList) {
      const product = await Product.findOne({ productId: item.ProductId }); // Adjust field if needed
      if (!product) {
        console.error('Product not found for ID:', item.ProductId);
        throw new Error(`Product with ID ${item.ProductId} not found`);
      }

      // Validate stock
      if (product.inStockValue < item.qty) {
        throw new Error(`Insufficient stock for product ID ${item.ProductId}`);
      }

      // Update stock
      product.inStockValue -= item.qty;
      await product.save();
    }
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
      subject: 'Order Confirmed',
      text: `Dear User,

      We are excited to inform you that your order has been placed successfully on MytalorZone!
      
      Your items will be processed and shipped shortly. Thank you for choosing our platform for your shopping needs.
      
      If you have any questions or need assistance, please feel free to contact our support team.
      
      Best regards,
      MytalorZone Team`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        return res.status(500).json("College added but email notification failed.");
      }
      console.log("Email sent: ", info.response);

    });
    // Send success response
    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
}
async function fetchorders(req, res) {
  try {
    const { email } = req.params;
    // Fetch the order with productList
    console.log("email22" , email)
    const order = await Order.findOne({ email: email });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Get the list of ProductIds from the productList
    const productIds = order.productList.map(product => product.ProductId);

    // Fetch product details based on ProductId
    const products = await Product.find({
      productId: { $in: productIds }
    });

    // Create an array of products with details
    const productDetail = order.productList.map(product => {
      const productDetail = products.find(p => p.productId === product.ProductId);
      return {
        ...productDetail.toObject(),  // Spread the product details
        qty: product.qty  // Include quantity from the order
      };
    });
 console.log(productDetail);
 console.log("these are product details")
 const productDetails = products.map(product => {
  console.log("Product image field:", product.img); 
  const imagePath = product.img;

  console.log("Constructed image path:", imagePath); 

  return {
    ...product.toObject(),
    image: product.img ? `${req.protocol}://${req.get('host')}${imagePath}` : null,
  };
});
    return res.status(200).json(productDetails);  // Send back the full product details

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
}








module.exports= {registeruser,loginuser,fetchproductskurtas,fetchproducts,fetchproductsbest, fetchproductsethinic, addtowishlist, getwishlist,removefromwishlist,addtocart,getcartitems, removefromcart,fetchproductsnew,decreasequantity,increasequantity,placeorder,fetchorders};