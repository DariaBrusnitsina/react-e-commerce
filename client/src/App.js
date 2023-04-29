import React from "react";
import './sass/main.scss';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './components/layouts/home';
import About from './components/layouts/about';
import Contact from './components/layouts/contact';
import Cart from './components/cartPage/cart';
import NavBar from './components/common/navBar';
import { CartProvider } from './hooks/useCart';
import AppLoader from "./hoc/appLoader";
import LogOut from "./components/AuthLayout/logOut";
import Footer from "./components/common/footer";
import ProfilePage from "./components/ProfileLayout/profilePage";
import ItemPage from "./components/ShopLayout/itemPage";
import ShopPage from "./components/ShopLayout/shopPage";
import RegisterForm from "./components/AuthLayout/registerForm";
import LoginForm from "./components/AuthLayout/loginForm";
import ProfileInfo from "./components/ProfileLayout/profileInfo";
import ProfileEdit from "./components/ProfileLayout/editForm";


function App() {
  return (
      <div className="body">
          <CartProvider>
            <AppLoader>

            <NavBar/>
            <Routes>
                <Route index element={<Home />}/>
                <Route path="about" element={<About />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/cart" element={<Cart />}/>

                <Route path="shop">
                    <Route index element={<ShopPage />}/>
                    <Route path=":itemId" element={<ItemPage/>}/>
                </Route>

                <Route path="auth">
                    <Route index element={<Navigate to="/auth/login"/>}/>
                    <Route path="register" element={<RegisterForm />}/>
                    <Route path="login" element={<LoginForm />}/>
                    <Route path="logout" element={<LogOut />} />
                    <Route path="*" element={<Navigate to="/auth/login"/>}/>

                </Route>

                <Route path="profile" >
                    <Route index element={<ProfileInfo />}/>
                    <Route path="edit" element={<ProfileEdit />}/>
                    <Route path="*" element={<Navigate to="/profile"/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/" />}/>

            </Routes>
            </AppLoader>

          </CartProvider>
          <Footer/>
      </div>

  );
}

export default App;
