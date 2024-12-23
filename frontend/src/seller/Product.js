import { useState, useEffect } from 'react';
import './Product.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { toast } from "react-toastify";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProducttitle, setNewProducttitle] = useState('');
  const [newProductprice, setNewProductprice] = useState();
  const [newProductimage, setNewProductimage] = useState('');
  const [newProductbrand,setNewProductbrand] = useState('');
  const [newProductcategory, setNewProductcategory] = useState('');
  const [newProductstock, setNewProductstock] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [email, setEmail] = useState(''); 

  useEffect(() => {
    const token = Cookies.get('authToken2');
    if (token) {
      try {
        const decoded = decodeToken(token);
        const fetchemail = decoded.email;
        setEmail(fetchemail);  // Set email state directly
        console.log(fetchemail);
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`http://localhost:3020/products?email=${fetchemail}`, {
              withCredentials: true,
            });
            console.log('Fetched products:', response.data); // Log the response
            setProducts(response.data);
            navigate('/sellerhome');
          } catch (error) {
            console.log('Error fetching products');
          }
        };
        fetchProducts();
      } catch (error) {
        console.log('Token validation error', error);
      }
    }
  }, []); // This useEffect runs once when the component mounts

  // Make sure the email is available before submitting the form
  const addProduct = async (e) => {
    e.preventDefault();
    const productId = uuidv4();
    const token = Cookies.get('authToken2');
    if (token) {
      try {
        const decoded = decodeToken(token);
        const fetchemail = decoded.email;
        setEmail(fetchemail);  // Ensure email is set
      } catch (error) {
        console.error('Token validation failed', error);
      }
    } else {
      console.log('No user details found');
    }

    // Make sure email is available before submitting
    if (email) {
      try {
        const formData = new FormData();
        formData.append('id', productId);  
        formData.append('title', newProducttitle);
        formData.append('price', newProductprice);
        formData.append('category', newProductcategory);
        formData.append('stock', newProductstock);
        formData.append('email', email);
        formData.append('brand' , newProductbrand);

        if (imageFile) {
          formData.append('image', imageFile);
        }

        console.log(formData.get('image'));
        console.log(formData.get('email'));
        const response = await axios.post(
          'http://localhost:3020/addnewproduct',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log('Product added successfully:', response.data);
          
          setNewProducttitle('');
          setNewProductprice('');
          setNewProductcategory('');
          setNewProductstock('');
          setImageFile(null);
          setNewProductbrand('');
          navigate(0);
          toast.success("product added sucessfully")
        } else {
          console.error('Error adding product:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Email not found or not set yet');
    }
  };

  const updateStock = (id, action) => {
    const product = products.find((product) => product._id === id);
    let newStock = product.stock;

    if (action === 'increment') {
      newStock += 1;
    } else if (action === 'decrement' && newStock > 0) {
      newStock -= 1;
    }

    const updatedProducts = products.map((product) =>
      product._id === id ? { ...product, stock: newStock } : product
    );
    setProducts(updatedProducts);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    console.log(file);
  };
  const handledelete = async (productId) => {
    try {
      const token = Cookies.get('authToken2');
      const decoded = decodeToken(token);
      const fetchemail = decoded.email;
      setEmail(fetchemail);
      console.log(productId,email);
      const response = await axios.delete(`http://localhost:3020/deleteproducts/${productId}`, {
        params: { fetchemail },
        withCredentials: true,
      });
    
      if (response.status === 200) {
        console.log('Product deleted successfully:', response.data);
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId)); // Update the products state
      }
      console.log('Product deleted successfully:', response.data);
      
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', width: '100vw', backgroundColor: '#393e46' }}>
      <div>
        <h1 className="seller-products-title">Product List</h1>

        <form onSubmit={addProduct} className="seller-products-form">
          <h3 className="seller-products-form-title">Add Product</h3>
          <input
            type="text"
            placeholder="Title"
            value={newProducttitle}
            onChange={(e) => { setNewProducttitle(e.target.value); }}
            required
            className="seller-products-input"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProductprice}
            onChange={(e) => { setNewProductprice(e.target.value); }}
            required
            className="seller-products-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="seller-products-input"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProductcategory}
            onChange={(e) => { setNewProductcategory(e.target.value); }}
            required
            className="seller-products-input"
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProductbrand}
            onChange={(e) => { setNewProductbrand(e.target.value); }}
            required
            className="seller-products-input"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProductstock}
            onChange={(e) => { setNewProductstock(e.target.value); }}
            required
            className="seller-products-input"
          />
          <button type="submit" className="seller-products-button">Add Product</button>
        </form>

        <div className="seller-products-list">
          {products.map((product) => (
            <div key={product._id} className="seller-products-item">
              <img src={product.image} alt={product.title} className="seller-products-image" />
              <h3 className="seller-products-item-title">{product.name}</h3>
              <p className="seller-products-item-price">Price: ${product.price}</p>
              <p className="seller-products-item-category">Category: {product.category}</p>
              <p className="seller-products-item-category">Brand: {product.brand}</p>
              <div className="seller-products-item-stock">
                <button onClick={() => updateStock(product._id, 'increment')} className="seller-products-button">+</button>
                <span className="seller-products-item-stock-number">{product.inStockValue}</span>
                <button onClick={() => updateStock(product._id, 'decrement')} className="seller-products-button">-</button>
              </div>
              <button onClick={()=>{handledelete(product._id)}} className="seller-products-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
