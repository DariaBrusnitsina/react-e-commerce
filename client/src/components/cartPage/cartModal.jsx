import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../../store/users";
import LoginForm from "../authPages/loginForm";

const DELIVERY_COST = 300
const CssClasses = {
    MODAL: "cart-modal",
    TITLE: "cart-modal__title",
    AUTH: "cart-modal__auth",
    SUBTITLE: "cart-modal__subtitle",
    PART: "cart-modal__part",
    CONTAINER: "cart-modal__container",
    RADIO: "cart-modal__radio",
}

const CartModalTexts = {
    UNAUTHORIZED: "To place an order, you need to log in to the system",
    SUBTITLE: "Voluptate nulla atque minus dolores quas minima doloremque.",
    DELIVERY_TEXT: "Estimated delivery date: ",
}

const CartModal = ({totalPrice, clearCart}) => {
    const now = Date.now()
    const date = new Date(now);
    date.setDate((date.getDate() + 3))
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const displayDate = date.toLocaleDateString('en-EN', options)

    const currentUser = useSelector(getCurrentUserData());

    return (
        <div className={CssClasses.MODAL}>

            {currentUser
                ?
                <div className={CssClasses.CONTAINER}>
                    <div className={CssClasses.PART}>
                        <h3 className={CssClasses.SUBTITLE}>1. Contact information</h3>
                        <p>Name: {currentUser.name}</p>
                        <p>Surname: {currentUser.surname}</p>
                        <p>Email: {currentUser.email}</p>
                        <p>Phone: {currentUser.phone}</p>
                    </div>

                    <div className={CssClasses.PART}>
                        <h3 className={CssClasses.SUBTITLE}>2. Delivery</h3>
                        {currentUser.address.length
                            ?
                            <div>
                                <p>Address: {currentUser.address}</p>
                                <p>{CartModalTexts.DELIVERY_TEXT}{displayDate}</p>
                            </div>
                            :
                            <p>EDIT</p>}

                    </div>

                    <div className={CssClasses.PART}>
                        <h3 className={CssClasses.SUBTITLE}>3. Payment Methods</h3>
                        <div className={CssClasses.RADIO}>
                            <input type="radio" id="online"
                                   name="contact" value="online"/>
                            <label htmlFor="online">Online payment</label>

                            <input type="radio" id="receipt"
                                       name="contact" value="receipt"/>
                            <label htmlFor="receipt">Payment upon receipt in cash or by card</label>
                        </div>
                    </div>

                    <div className={CssClasses.PART}>
                        <h3 className={CssClasses.SUBTITLE}>3. Total cost</h3>
                        <p>Purchase amount: {totalPrice}₽</p>
                        <p>Delivery cost: {DELIVERY_COST}₽</p>
                        <p>Amount of discount:</p>
                        <p>Final price: {totalPrice + DELIVERY_COST}</p>
                        <button>Make</button>
                    </div>

                </div>
                :
                <div className={CssClasses.AUTH}>
                    <p className={CssClasses.TITLE}>{CartModalTexts.UNAUTHORIZED}</p>
                    <LoginForm path={"/cart"}/>
                </div>
            }


        </div>
    );
};

export default CartModal;