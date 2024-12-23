import React from "react";
import "./Header.css";
import { FaUser, FaShoppingCart ,FaHeart} from "react-icons/fa"; // Icons for profile and cart
import {useNavigate} from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  function handleusericon(e){
    e.preventDefault();
    navigate('/userpage');
  }
  function handlewishlist(e){
    e.preventDefault();
    navigate('/wishlist');
  }
  function handlecart(e){
    e.preventDefault();
    navigate('/cart');
  }
  function handleethinic(){
    navigate('/ethinicwear');
  }
  function handlebestsellers(){
    navigate('/bestsellers');
  }
  function handlesarees(){
    navigate('/sarees');
  }
  function handlekurtas(){
    navigate('/kurtas');
  }
  return (
    <header className="header">
      
      <div className="search-bar">
        <input type="text" placeholder="Search for products..." />
      </div>

      <div className="title">
        <h1>Mytalorzone By Sahiba</h1>
      </div>

      <nav className="menu">
        <ul>
          <li onClick={handlekurtas}>kurtas</li>
          <li onClick={handleethinic}>Ethnic</li>
          <li onClick={handlebestsellers}>Best Sellers</li>
          <li onClick={handlesarees}>Sarees</li>
        </ul>
      </nav>

     
      <div className="icons">
        <FaUser className="icon" title="Profile" onClick={handleusericon} />
        <FaHeart className="icon" title="Wishlist" onClick={handlewishlist} />
        <FaShoppingCart className="icon" title="Cart"  onClick={handlecart}/>
      </div>
    </header>
  );
};

export default Header;
