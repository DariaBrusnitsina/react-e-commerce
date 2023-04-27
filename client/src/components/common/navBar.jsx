import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../store/users";
import NavProfile from "./navProfile";

const CssClasses = {
    NAV: "navigation",
    LIST: "navigation__list",
    ITEM: "navigation--item"
}

const NavBar = () => {
    const {cartLength} = useCart()
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
    <div className={CssClasses.NAV}>
        <nav className="container">
            <NavLink className={CssClasses.ITEM} to="/">Home</NavLink>

            <ul className={CssClasses.LIST}>
                <li><NavLink className={CssClasses.ITEM} to="/about">About</NavLink></li>
                <li><NavLink className={CssClasses.ITEM} to="shop">Shop</NavLink></li>
                <li><NavLink className={CssClasses.ITEM} to="contact">Contact</NavLink></li>
                <li><NavLink className={CssClasses.ITEM} to="cart">Cart({cartLength})</NavLink></li>

                {isLoggedIn
                    ? (
                        <li><NavProfile className={CssClasses.ITEM} to="login">Login</NavProfile></li>
                    )
                    : (
                        <li><NavLink className={CssClasses.ITEM} to="login">Login</NavLink></li>
                    )}
            </ul>
        </nav>
    </div>
    );
};

export default NavBar;
