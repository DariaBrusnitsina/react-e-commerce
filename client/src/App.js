import './sass/main.scss';
// import './sass/App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/layouts/home';
import About from './components/layouts/about';
import Shop from './components/layouts/shop';
import Contact from './components/layouts/contact';
import Cart from './components/layouts/cart';
import AuthLayout from './components/layouts/auth/authLayout';
import NavBar from './components/navBar';
import { CartProvider } from './hooks/useCart';
import AppLoader from "./hoc/appLoader";
import Profile from "./components/layouts/profile";

function App() {
  return (
      <div>
          <CartProvider>
            <AppLoader>

            <NavBar/>
            <Routes>
              <Route index exact element={<Home />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/shop/*" element={<Shop />}/>
              <Route path="/shop" element={<Shop />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/login" element={<AuthLayout />}/>
              <Route path="/:userId?/:edit?" element={<Profile />}/>
            </Routes>
            </AppLoader>

          </CartProvider>
      </div>

  );
}

export default App;
