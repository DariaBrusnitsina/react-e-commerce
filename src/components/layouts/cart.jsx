import React from "react";
import Navigation from "../navigation";

const Cart = () => {
    return (
    <div className="container">
        <Navigation/>
        <h1 className="cart__title">Your cart</h1>
        <div className="cart__container">
            <div className="cart__container--list">

            </div>
            <div className="cart__container--sum">

            </div>
        </div>
    </div>
    );
};

export default Cart;


// ВАША КОРЗИНА ПУСТА
// Перейдите в каталог или на главную страницу