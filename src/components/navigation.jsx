import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({cartNumber}) => {
    return (
    <nav className="navigation">
        <Link className="navigation--item"to="/react-e-commerce/">Home</Link>

        <ul className="navigation__list">
            <li><Link className="navigation--item" to="/react-e-commerce/about">About</Link></li>
            <li><Link className="navigation--item" to="/react-e-commerce/shop">Shop</Link></li>
            <li><Link className="navigation--item" to="/react-e-commerce/contact">Contact</Link></li>
            <li><Link className="navigation--item" to="/react-e-commerce/cart">Cart({cartNumber})</Link></li>
            <li><Link className="navigation--item" to="/react-e-commerce/login">Login</Link></li>
        </ul>
    </nav>
    );
};

export default Navigation;
