import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, updateUserData} from "../../store/users";
import LoginForm from "../AuthLayout/loginForm";
import Modal from 'react-modal';
import {Link, NavLink} from "react-router-dom";
import RadioField from "../common/form/radioField";
import {getDiscount} from "../../utils/getDiscount";
import {useCart} from "../../hooks/useCart";

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
    DATA: "cart-modal__data",
    RESULT: "cart-modal__result",
    RADIO: "cart-modal__radio",
    CHECKOUT: "button-submit",
    PRICE: "cart-modal__result-price",
}

const CartModalTexts = {
    UNAUTHORIZED: "To place an order, you need to log in to the system",
    SUBTITLE: "Voluptate nulla atque minus dolores quas minima doloremque.",
}

const CartModal = ({totalPrice, modalIsOpen, closeModal, cart}) => {
    const {clearCart} = useCart()
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [payment, setPayment] = useState(null)
    const now = Date.now()
    const date = new Date(now);
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const from = date.toLocaleDateString('en-EN', options)
    date.setDate((date.getDate() + 3))
    const to = date.toLocaleDateString('en-EN', options)
    const discount = currentUser ?  getDiscount(currentUser) : 0

    const handleChange = (target) => {
        setPayment(target.value)
    }

    const submitCart = async (e) => {
        e.preventDefault();
        if (payment === null || !currentUser.address.length) return
        const newData = {...currentUser}
        let cartArray = newData.orders
        newData.orders = [...cartArray, {cart, from, to, payment}]
        newData.sale = getDiscount(newData) > 15 ? 15 : getDiscount(newData)
        dispatch(updateUserData(newData))
        clearCart()
        closeModal(true)
    };

    return (
        <Modal isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
               onRequestClose={closeModal}
               style={customStyles}
        >

            {currentUser
                ?
                <div className={CssClasses.MODAL}>
                    <div className={CssClasses.DATA}>
                        <div>
                            <h3 className={CssClasses.SUBTITLE}>1. Contact information</h3>
                            <p><span>Name: </span>{currentUser.name}</p>
                            <p><span>Surname: </span>{currentUser.surname}</p>
                            <p><span>Email: </span>{currentUser.email}</p>
                            <p><span>Phone: </span>{currentUser.phone}</p>
                        </div>

                        <div>
                            <h3 className={CssClasses.SUBTITLE}>2. Delivery</h3>
                            {currentUser.address.length
                                ?
                                <div>
                                    <p><span>Address: </span>{currentUser.address}</p>
                                    <p><span>Estimated delivery date: </span>{to}</p>
                                </div>
                                :
                                <NavLink to={`/${currentUser._id}/edit`}><i className="bi bi-pencil-fill"></i> Add address in your profile</NavLink>
                            }
                        </div>

                        <div>
                            <h3 className={CssClasses.SUBTITLE}>3. Payment Methods</h3>
                            <form action="">
                                <RadioField
                                    options={[
                                        { name: "Debit/Credit card", value: "card" },
                                        { name: "Cash on delivery", value: "cash" }
                                    ]}
                                    name="payment"
                                    onChange={handleChange}
                                    label="Choose a payment method"
                                    value={payment}
                                />
                            </form>
                        </div>
                    </div>

                    <div className={CssClasses.RESULT}>
                        <h3 className={CssClasses.SUBTITLE}>Total cost</h3>
                        <p><span>Purchase amount: </span>{totalPrice}₽</p>
                        <p><span>With discount: </span>{(totalPrice * (100-discount))/100}₽</p>
                        <p><span>Delivery cost: </span> {DELIVERY_COST}₽</p>
                        <h4 className={CssClasses.PRICE}>Final price: {(totalPrice * (100-discount))/100 + DELIVERY_COST}₽</h4>
                        <button className={CssClasses.CHECKOUT} onClick={(e) => submitCart(e)}>
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
