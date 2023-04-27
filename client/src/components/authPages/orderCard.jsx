import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useCart} from "../../hooks/useCart";
import OrderItem from "./orderItem";

const OrderCard = ( {data} ) => {
    let totalPrice = 0
    const now = Date.now()
    const date = new Date(now);
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const today = date.toLocaleDateString('en-EN', options)
    const isDone = today === data.to
    const icon = isDone ? "bi bi-check-circle" : "bi bi-truck"
    const status = isDone ? " Delivered " : " Delivery date: "

    data.cart.map((item) => (
        totalPrice = totalPrice + (item.counter * item.item.price)
    ))

    const index = new Date(data.from)
    console.log(Date.parse(index))

    return (
        <>
            <div className="orders-list">
                <p>Order №{Date.parse(index)}</p>
                {data.cart.map((item) => (
                    <OrderItem data={item}/>
                ))}
                <div className="orders-info">
                    <p>Totally: {totalPrice}₽</p>
                    <div>
                        <p><i className={icon}></i>{status}{data.to}</p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default OrderCard;
