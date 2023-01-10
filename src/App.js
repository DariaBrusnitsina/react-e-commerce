import './css/reset.css';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/home';
import About from './components/pages/about';
import Shop from './components/pages/shop';
import Contact from './components/pages/contact';
import Cart from './components/pages/cart';
import Login from './components/pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/shop" element={<Shop />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/login" element={<Login />}/>
  </Routes>
  );
}

export default App;
