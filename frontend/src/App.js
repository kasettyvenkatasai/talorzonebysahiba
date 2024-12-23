import './App.css';
import Footer from './Footer';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import ScrollingText from './Scrolling';
import Header from './Header';
import LoginForm from './user/Login';
import Register from './user/Register';
import UserPage from './user/Userpage';
import Home from './user/Home';
import SellerRegister from './seller/sellerRegister';
import SellerLogin from './seller/sellerLogin';
import SellerHeader from './seller/SellerHeader';
import SellerAccount from './seller/sellerAccount';
import SellerProductsPage from './seller/Product';
import Saree from './user/Saree';
import Bestseller from './user/BestSeller';
import Ethinicwear from './user/Ethnicwear';
import Wishlist from './user/WishList';
import Cart from './user/Cart';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewArrivals from './seller/head';
import New from './user/NewArrivals';
import Kurtas from './user/kurtas';
import AdminLogin from './admin/adminLogin'
import AdminHeader from './admin/AdminHeader'
import CustomerList from './admin/HandleCustomers';
import SellerList from './admin/SellerList'
function App() {
  return (
    <div className="App">
    <Router>
    <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path='/' element={<><ScrollingText></ScrollingText><Header></Header><LoginForm></LoginForm><Footer></Footer></>}></Route>
        <Route path='/register' element={<><ScrollingText></ScrollingText><Header></Header><Register></Register><Footer></Footer></>}></Route>
        <Route path='/home' element={<><ScrollingText></ScrollingText><Header></Header><Home></Home><NewArrivals></NewArrivals><New></New><Footer></Footer></>}></Route>
        <Route path='/userpage' element={<><ScrollingText></ScrollingText><Header></Header><UserPage></UserPage><Footer></Footer></>}></Route>
        <Route path='/seller' element={<><SellerRegister></SellerRegister></>}></Route>
        <Route path='/sellerlogin' element={<><SellerLogin></SellerLogin></>}></Route>
        <Route path='/sellerhome' element={<><SellerHeader></SellerHeader><SellerProductsPage></SellerProductsPage></>}></Route>
        <Route path='/seller/account' element={<><SellerHeader></SellerHeader><SellerAccount></SellerAccount></>}></Route>
        <Route path='/seller/orders' element={<><SellerHeader></SellerHeader></>}></Route>
        <Route path='/ethinicwear' element={<><ScrollingText></ScrollingText><Header></Header><Ethinicwear></Ethinicwear><Footer></Footer></>}></Route>
        <Route path='/kurtas' element={<><ScrollingText></ScrollingText><Header></Header><Kurtas></Kurtas><Footer></Footer></>}></Route>
        <Route path='/sarees' element={<><ScrollingText></ScrollingText><Header></Header><Saree></Saree><Footer></Footer></>}></Route>
        <Route path='/bestsellers' element={<><ScrollingText></ScrollingText><Header></Header><Bestseller></Bestseller><Footer></Footer></>}></Route>
        <Route path='/wishlist' element={<><ScrollingText></ScrollingText><Header></Header><Wishlist> </Wishlist><Footer></Footer></>}></Route>
        <Route path='/cart' element={<><ScrollingText></ScrollingText><Header></Header><Cart></Cart><Footer></Footer></>}></Route>
        <Route path='/adminlogin' element={<><AdminLogin></AdminLogin></>}></Route>
        <Route path='/adminhome' element={<><AdminHeader></AdminHeader><CustomerList></CustomerList></>}></Route>
        <Route path='/admin-sellers' element={<><AdminHeader></AdminHeader><SellerList></SellerList></>}></Route>

      </Routes>
    </Router>
    </div>
  );
}

export default App;
  