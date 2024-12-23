import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import "./Cart.css"; // You can adjust this import if needed
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchCart = async () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          const decoded = decodeToken(token);
          const fetchemail = decoded.email;
    console.log(fetchemail);
          try {
            const response = await axios.get("http://localhost:3020/getcartitems", {
              params: { email: fetchemail },
              withCredentials: true,
            });

            setCart(response.data.updatedProducts || []);
          } catch (error) {
            console.error("Error fetching cart items:", error);
          }
        } catch (error) {
          console.error("Token validation error:", error);
        }
      } else {
        console.error("No auth token found");
      }
    };

    fetchCart();
  }, []);

 

  const handleDecreaseQuantity = async(id,qty) => {
    try {
        const token = Cookies.get("authToken");
        const decoded = decodeToken(token);
        const fetchemail = decoded.email;
        console.log(fetchemail)
        await axios.delete(`http://localhost:3020/decreasequantity/${id}`, {
          params: { email: fetchemail , qty: qty },
          withCredentials: true,
        });
       
       navigate(0); 
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
  };

  const handleIncreaseQuantity = async(id,qty) => {
    try {
        const token = Cookies.get("authToken");
        const decoded = decodeToken(token);
        const fetchemail = decoded.email;
        console.log(fetchemail)
        await axios.delete(`http://localhost:3020/increasequantity/${id}`, {
          params: { email: fetchemail , qty: qty },
          withCredentials: true,
        });
       
       navigate(0); 
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
  };

  const handleRemoveFromCart = async (id,qty) => {
    try {
      const token = Cookies.get("authToken");
      const decoded = decodeToken(token);
      const fetchemail = decoded.email;
      await axios.delete(`http://localhost:3020/removefromcart/${id}`, {
        params: { email: fetchemail , qty: qty },
        withCredentials: true,
      });
      toast.success("item removed from cart sucessfully");
     navigate(0); 
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.productQty, 0);
  };
  const handlePlaceOrder = async () => {
    try {
      const token = Cookies.get("authToken");
      const decoded = decodeToken(token);
      const fetchemail = decoded.email;
      console.log(fetchemail)
      await axios.post("http://localhost:3020/placeorder", { email: fetchemail, items: cart });
      alert("Order placed successfully!");
      setCart([]); // Clear cart after placing order
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item._id} className="cart-item">
              <div className="cart-item-details">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">Price: ₹{item.price}</p>
                <div className="cart-item-quantity">
                  <button className="cart-quantity-button" onClick={() => handleDecreaseQuantity(item._id,item.productQty)}>-</button>
                  <span className="cart-item-quantity-value">{item.productQty}</span>
                  <button className="cart-quantity-button" onClick={() => handleIncreaseQuantity(item._id,item.productQty)}>+</button>
                </div>
              </div>
              <div className="cart-item-actions">
                <button
                  className="cart-remove-button"
                  onClick={() => handleRemoveFromCart(item._id , item.productQty)}
                >
                  Remove from Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
       <div className="cart-total">
        <h3>Total Amount: ₹{calculateTotalAmount()}</h3>
      </div>
      <button className="cart-place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;
