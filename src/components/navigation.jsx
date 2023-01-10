import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
    <nav className="navigation">
        <Link className="navigation--item"to="/">Home</Link>

        <ul className="navigation__list">
            <li><Link className="navigation--item" to="/about">About</Link></li>
            <li><Link className="navigation--item" to="/shop">Shop</Link></li>
            <li><Link className="navigation--item" to="/contact">Contact</Link></li>
            <li><Link className="navigation--item" to="/cart">Cart()</Link></li>
            <li><Link className="navigation--item" to="/login">Login</Link></li>
        </ul>
    </nav>
    );
};

export default Navigation;
