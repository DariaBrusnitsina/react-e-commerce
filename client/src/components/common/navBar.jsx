import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, getIsLoggedIn} from "../../store/users";
import NavProfile from "./navProfile";
import {getAdmins} from "../../store/admin";
import localStorageService from "../../services/localStorage.service";

const CssClasses = {
    NAV: "navigation",
    LIST: "navigation__list",
    ITEM: "navigation--item"
}

const NavBar = () => {
    const {cartLength} = useCart()
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUserData());
    const admins = useSelector(getAdmins());
    let isAdmin

    if (currentUser) {
        let result = admins.find((a) => a.email === currentUser.email);
        isAdmin = result ? true : false
    }

    return (
    <div className={CssClasses.NAV}>
        <nav className="container">
            <NavLink className={CssClasses.ITEM} to="/">Home</NavLink>

            <ul className={CssClasses.LIST}>
                <li><NavLink className={CssClasses.ITEM} to="about">About</NavLink></li>
                <li><NavLink className={CssClasses.ITEM} to="shop">Shop</NavLink></li>
                <li><NavLink className={CssClasses.ITEM} to="contact">Contact</NavLink></li>
                <li><NavLink className={CssClasses.ITEM} to="cart">Cart({cartLength})</NavLink></li>
                {isAdmin && <li><NavLink style={{color: "#ca646f"}} className={CssClasses.ITEM} to="/admin">Admin</NavLink></li>}

                {isLoggedIn
                    ? (
                        <li><NavProfile className={CssClasses.ITEM} to="login">Login</NavProfile></li>
                    )
                    : (
                        <li><NavLink className={CssClasses.ITEM} to="auth/login">Login</NavLink></li>
                    )}
            </ul>
        </nav>
    </div>
    );
};

export default NavBar;
