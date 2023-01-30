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
      <Route path="/" exact element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/shop/:itemId?" element={<Shop />}/>
      <Route path="/shop" element={<Shop />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/login" element={<Login />}/>
  </Routes>
  );
}

export default App;
