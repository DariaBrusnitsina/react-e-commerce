import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./cartItem";
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
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const {cart, clearCart, cartLength, totalPrice} = useCart()
    const [modalIsOpen, setIsOpen] = useState(false);


    const submitCart = async (e) => {
        e.preventDefault();
        setIsOpen(true)
        // const newData = {...currentUser}
        // console.log("1", newData)
        //
        // let cartArray = newData.orders
        //
        // newData.orders = [...cartArray, ...[cart]]
        // console.log(newData)
        // dispatch(updateUserData(newData));
        // console.log(newData)
        // navigate(path, { replace: true });
    };

    function closeModal() {
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
                                <CartItem data={data}/>
                            ))}
                        </div>

                        <div className={CssClasses.CHECKOUT}>
                            <h2>Totally</h2>
                            <div className={CssClasses.PRICE}>
                                <p>{cartLength} items</p>
                                <p>{totalPrice} ₽</p>
                            </div>
                            <button onClick={(e) => submitCart(e)} className={CssClasses.TO_MODAL}>
                                Checkout
                                <i className="bi bi-bag-check"></i>
                            </button>
                            <div>
                                <button onClick={() => clearCart()} className={CssClasses.CLEAR}>clear cart</button>
                            </div>
                        </div>

                    </div>

                    <div className={"modal"}>
                        <CartModal closeModal={closeModal} totalPrice={totalPrice} clearCart={clearCart} modalIsOpen={modalIsOpen}/>
                    </div>
                </>

                : <>
                    <h1 className={CssClasses.TITLE}>Your cart is empty</h1>
                    <p className={CssClasses.SUBTITLE}>Navigate to <Link to="/shop">shop</Link> or <Link to="/">home</Link></p>
                </>
            }

        </div>
    );
};

export default Cart;