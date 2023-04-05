import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({cartNumber}) => {



// $(document).scroll(function(e) {
//     $(window).scrollTop() > 100 ? $('.nav').addClass('nav__color') : $('.nav').removeClass('nav__color');
// });
    return (
    <div className="navigation">
        <nav className="container">
            <NavLink className="navigation--item"to="/">Home</NavLink>

            <ul className="navigation__list">
                <li><NavLink className="navigation--item" to="/about">About</NavLink></li>
                <li><NavLink className="navigation--item" to="shop">Shop</NavLink></li>
                <li><NavLink className="navigation--item" to="contact">Contact</NavLink></li>
                <li><NavLink className="navigation--item" to="cart">Cart({cartNumber})</NavLink></li>
                <li><NavLink className="navigation--item" to="login">Login</NavLink></li>
            </ul>
        </nav>
    </div>
    );
};

export default NavBar;
