import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const {cartLength} = useCart()
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
    <div className="navigation">
        <nav className="container">
            <NavLink className="navigation--item"to="/">Home</NavLink>

            <ul className="navigation__list">
                <li><NavLink className="navigation--item" to="/about">About</NavLink></li>
                <li><NavLink className="navigation--item" to="shop">Shop</NavLink></li>
                <li><NavLink className="navigation--item" to="contact">Contact</NavLink></li>
                <li><NavLink className="navigation--item" to="cart">Cart({cartLength})</NavLink></li>
                {isLoggedIn
                    ? (
                        <li><NavProfile className="navigation--item" to="login">Login</NavProfile></li>
                    )
                    : (
                        <li><NavLink className="navigation--item" to="login">Login</NavLink></li>

                    )}
            </ul>
        </nav>
    </div>
    );
};

export default NavBar;
