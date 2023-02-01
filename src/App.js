import './css/reset.css';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/layouts/home';
import About from './components/layouts/about';
import Shop from './components/layouts/shop';
import Contact from './components/layouts/contact';
import Cart from './components/layouts/cart';
import Login from './components/layouts/login';

function App() {
  return (
    <Routes>
      <Route path="react-e-commerce/" exact element={<Home />}/>
      <Route path="react-e-commerce/about" element={<About />}/>
      <Route path="react-e-commerce/shop/:itemId?" element={<Shop />}/>
      <Route path="react-e-commerce/shop" element={<Shop />}/>
      <Route path="react-e-commerce/contact" element={<Contact />}/>
      <Route path="react-e-commerce/cart" element={<Cart />}/>
      <Route path="react-e-commerce/login" element={<Login />}/>
    </Routes>
  );
}

export default App;
