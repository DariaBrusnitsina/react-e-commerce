import './sass/main.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/layouts/home';
import About from './components/layouts/about';
import Shop from './components/shopPage/shop';
import Contact from './components/layouts/contact';
import Cart from './components/cartPage/cart';
import AuthPage from './components/authPage/authPage';
import NavBar from './components/common/navBar';
import { CartProvider } from './hooks/useCart';
import AppLoader from "./hoc/appLoader";
import Profile from "./components/profilePage/profile";
import LogOut from "./components/authPage/logOut";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/common/footer";


function App() {
  return (
      <div className="body">
          <CartProvider>
            <AppLoader>

            <NavBar/>
            <Routes>
              <Route index exact element={<Home />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/shop/:itemId?" element={<Shop />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/login" element={<AuthPage />}/>
              <Route path="/:userId?/:edit?" element={<Profile />}/>
              <Route path="/logout" element={<LogOut />} />
            </Routes>
            </AppLoader>

          </CartProvider>
          <Footer/>
      </div>

  );
}

export default App;
