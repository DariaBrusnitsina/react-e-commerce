import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../cartItem";

const Cart = () => {
    const [cartItems, setCartItems] = useState()

    useEffect(() => {
        const cartValue = localStorage.getItem("cart")
        const cartStorage = JSON.parse(cartValue)
        setCartItems(cartStorage)
    }, []);

    const handleClearCart = () => {
        setCartItems(localStorage.removeItem("cart"))
    };

    return (
    <div className="container cart">

        {cartItems ?
        <>
            <h1 className="cart__title">Your cart</h1>
            <div className="cart__container">
                <div className="cart__container--list">
                {cartItems.map((item) => (
                    <CartItem item={item}/>
                    ))}
                </div>

                <div className="cart__container--sum">
                    <h2>Totaly</h2>
                    <div className="cart__container--price">
                        <p>{cartItems.length} items</p>
                        <p>1440 ₽</p>
                    </div>
                    <button className="checkout_cart">Checkout</button>
                    <div>
                        <button onClick={handleClearCart} className="clear_cart">clear cart</button>
                    </div>

                </div>

            </div>
        </>
        : <>
            <h1 className="cart__title">Your cart is empty</h1>
            <p className="cart__subtitle">Navigate to <Link to="/react-e-commerce/shop">shop</Link> or <Link to="/react-e-commerce/">home</Link></p>
        </>
    }

    </div>
    );
};

export default Cart;