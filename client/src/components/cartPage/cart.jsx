import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./cartItem";
import { useCart } from "../../hooks/useCart";
import {getCurrentUserData, updateUserData} from "../../store/users";
import {useDispatch, useSelector} from "react-redux";

const Cart = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const {cart, clearCart, cartLength, totalPrice} = useCart()

    const submitCart = async (e) => {
        e.preventDefault();
        const newData = {...currentUser}
        console.log("1", newData)

        let cartArray = newData.orders

        newData.orders = [...cartArray, ...[cart]]
        console.log(newData)
        dispatch(updateUserData(newData));
        // console.log(newData)
        // navigate(path, { replace: true });
    };

    // console.log(currentUser.orders)
    return (
        <div className="container cart">
            {cart.length !== 0 ?
                <>
                    <h1 className="cart__title">Your cart</h1>
                    <div className="cart__container">
                        <div className="cart__container--list">
                            {cart.map((data) => (
                                <CartItem data={data}/>
                            ))}
                        </div>

                        <div className="cart__container--sum">
                            <h2>Totally</h2>
                            <div className="cart__container--price">
                                <p>{cartLength} items</p>
                                <p>{totalPrice} ₽</p>
                            </div>
                            <button onClick={(e) => submitCart(e)} className="checkout_cart">Checkout</button>
                            <div>
                                <button onClick={() => clearCart()} className="clear_cart">clear cart</button>
                            </div>

                        </div>

                    </div>
                </>
                : <>
                    <h1 className="cart__title">Your cart is empty</h1>
                    <p className="cart__subtitle">Navigate to <Link to="/shop">shop</Link> or <Link to="/">home</Link></p>
                </>
            }

        </div>
    );
};

export default Cart;