import { useState, useEffect } from 'react';
import axios from 'axios';
import './Saree.css';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { toast } from "react-toastify";


const New = () => {
  const [products, setProducts] = useState([]);
  const [email,setemail] = useState('');
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3020/fetchproductsnew');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const token = Cookies.get('authToken');
      const decoded = decodeToken(token);
      const fetchemail = decoded.email;
      setemail(fetchemail);
      console.log(productId,fetchemail);
      const response = await axios.post(
        `http://localhost:3020/addtocart/${productId}?fetchemail=${fetchemail}`,
        { withCredentials: true }
      );
      
    
      if (response.status === 200) {
        console.log('Product added to cart successfully:', response.data);        }
        toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddToWishlist =async (productId) => {
      try {
        const token = Cookies.get('authToken');
        const decoded = decodeToken(token);
        const fetchemail = decoded.email;
        setemail(fetchemail);
        console.log(productId,fetchemail);
        const response = await axios.post(
          `http://localhost:3020/addtowishlist/${productId}?fetchemail=${fetchemail}`,
          { withCredentials: true }
        );
        
       
        if (response.status === 200) {
          console.log('Product added to wishlist successfully:', response.data);        }
          toast.success("Item added to wishlist successfully!");
      } catch (error) {
        console.error('Error deleting product:', error);
      }
  };

  return (
    <div className="buyer-saree-product-grid-container">
      <div className="buyer-saree-product-grid">
        {products.map((product) => (
          <div key={product._id} className="buyer-saree-product-item">
            <img
              src={product.image}
              alt={product.title}
              className="buyer-saree-product-image"
            />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <div className="buyer-saree-product-actions">
              <button
                onClick={() => handleAddToCart(product._id)}
                className="buyer-saree-product-button"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToWishlist(product._id)}
                className="buyer-saree-product-button"
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default New;
