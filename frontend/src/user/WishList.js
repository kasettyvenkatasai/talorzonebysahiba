import { useState, useEffect  } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [email,setemail] = useState('');
 const navigate = useNavigate();
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          const decoded = decodeToken(token);
          const fetchemail = decoded.email;
          console.log("Fetched email:", fetchemail);

          try {
            const response = await axios.get("http://localhost:3020/getwishlistitems", {
              params: { email: fetchemail },
              withCredentials: true,
            });

            console.log("Fetched products:", response.data.updatedProducts);
            setWishlist(response.data.updatedProducts || []); // Update based on backend response
          } catch (error) {
            console.error("Error fetching wishlisted products:", error);
          }
        } catch (error) {
          console.error("Token validation error:", error);
        }
      } else {
        console.error("No auth token found");
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id) => {
    try {
        const token = Cookies.get("authToken");
        const decoded = decodeToken(token);
        const fetchemail = decoded.email;
        console.log("Fetched email:", fetchemail);
      await axios.delete(`http://localhost:3020/removefromwishlist/${id}` , { params:{email:fetchemail} , withCredentials:true} );
     
      navigate(0);
      toast.success("item removed from wishlist sucessfully");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

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
        toast.success('item added to cart sucessfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map((item) => (
            <li
              key={ item._id}
              className="wishlist-item"
            >
              <div className="wishlist-item-details">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="wishlist-item-image" 
                />
                <h4 className="wishlist-item-name">{item.name}</h4>
                <p className="wishlist-item-price">Price: ₹{item.price}</p>
              </div>
              <div className="wishlist-item-actions">
                <button
                  className="wishlist-remove-button"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                >
                  Remove from Wishlist
                </button>
                <button 
                  className="wishlist-add-button" 
                  onClick={() => handleAddToCart(item._id)}
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
