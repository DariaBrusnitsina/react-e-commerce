import React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import OrderCard from "./orderCard";

const CssClasses = {
    PROFILE: "profile",
    INFO: "profile__info",
    SALE: "profile__sale",
    CONTACTS: "profile__contacts",
    TITLE: "profile__title",
    SUBTITLE: "profile__subtitle",
    FORM: "profile__form-element",
    LIST: "orders-list",
    REDIRECT_BTN: "profile__btn"
}

const OrdersList = ({user}) => {
    const navigate = useNavigate();
    let ordersArray = user ? [...user.orders] : []
    if (ordersArray.length > 3 ) {
        ordersArray = ordersArray.slice(0,3)
    }

    if (!user) {
        navigate("/",{ replace: true } )
    }

        return <h1>Orders</h1>;
};

export default OrdersList;
