import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../common/itemCard";
import { useCart } from "../../hooks/useCart";
import {getCurrentUserData, updateUserData} from "../../store/users";
import {useDispatch, useSelector} from "react-redux";
import CartModal from "./cartModal";


const CssClasses = {
    CART: "cart",
    WRAPPER: "cart__wrapper",
    TITLE: "cart__title",
    SUBTITLE: "cart__subtitle",
    CHECKOUT: "checkout",
    PRICE: "checkout__price",
    TO_MODAL: "button-submit",
    CLEAR: "checkout__button--clear"
}

const Cart = () => {
    const {cart, clearCart, cartLength, totalPrice} = useCart()
    const [modalIsOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    return (
        <div className={CssClasses.CART + " container"}>
            {cart.length !== 0 ?
                <>
                    <h1 className={CssClasses.TITLE}>Your cart</h1>
                    <div className={CssClasses.WRAPPER}>
                        <div>
                            {cart.map((data) => (
                                <CartItem data={data} size="large"/>
                            ))}
                        </div>

                        <div className={CssClasses.CHECKOUT}>
                            <h2>Totally</h2>
                            <div className={CssClasses.PRICE}>
                                <p>{cartLength} items</p>
                                <p>{totalPrice} ₽</p>
                            </div>
                            <button onClick={() => handleOpenModal()} className={CssClasses.TO_MODAL}>
                                Checkout
                                <i className="bi bi-bag-check"></i>
                            </button>
                            <div>
                                <button onClick={() => clearCart()} className={CssClasses.CLEAR}>clear cart</button>
                            </div>
                        </div>
                    </div>

                    <div className={"modal"}>
                        <CartModal cart={cart} closeModal={handleCloseModal} totalPrice={totalPrice} clearCart={clearCart} modalIsOpen={modalIsOpen}/>
                    </div>
                </>

                : <>
                    <h1 className={CssClasses.TITLE}>Your cart is empty!</h1>
                    <p className={CssClasses.SUBTITLE}>Navigate to <Link style={{color: "#81b4e5"}} to="/shop">shop</Link> or <Link style={{color: "#81b4e5"}} to="/">home</Link></p>
                </>
            }

        </div>
    );
};

export default Cart;