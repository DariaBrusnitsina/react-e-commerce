import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {getCurrentUserData} from "../../store/users";
import LoginForm from "../authPages/loginForm";
import Modal from 'react-modal';
import {Link} from "react-router-dom";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        padding: 0
    },
};

const DELIVERY_COST = 300
const CssClasses = {
    MODAL: "cart-modal",
    TITLE: "cart-modal__title",
    AUTH: "cart-modal__auth",
    INFO:"cart-modal__auth-info",
    LOGIN: "cart-modal__auth-login",
    SUBTITLE: "cart-modal__subtitle",
    PART: "cart-modal__part",
    RADIO: "cart-modal__radio",
    CHECKOUT: "button-submit"
}

const CartModalTexts = {
    UNAUTHORIZED: "To place an order, you need to log in to the system",
    SUBTITLE: "Voluptate nulla atque minus dolores quas minima doloremque.",
    DELIVERY_TEXT: "Estimated delivery date: ",
}

const CartModal = ({totalPrice, clearCart, modalIsOpen, closeModal}) => {
    const now = Date.now()
    const date = new Date(now);
    date.setDate((date.getDate() + 3))
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const displayDate = date.toLocaleDateString('en-EN', options)
    const currentUser = useSelector(getCurrentUserData());


    return (
        <Modal isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
               onRequestClose={closeModal}
               style={customStyles}
        >

            {currentUser
                ?
                <div className={CssClasses.MODAL}>
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
                        <button className={CssClasses.CHECKOUT}>
                            Checkout
                            <i className="bi bi-bag-fill"></i>

                        </button>
                    </div>

                </div>
                :
                <div className={CssClasses.AUTH}>
                    <div className={CssClasses.INFO}>
                        <h1 className={CssClasses.TITLE}>{CartModalTexts.UNAUTHORIZED}</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing. Elit, sed do eiusmod? <Link to={`/login`}><a>Go to auth page</a></Link></p>

                    </div>
                    <div className={CssClasses.LOGIN}><LoginForm path={"/cart"}/></div>
                </div>
            }

        </Modal>
    );
};

export default CartModal;
