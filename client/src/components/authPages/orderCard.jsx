import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useCart} from "../../hooks/useCart";
import OrderItem from "./orderItem";

const OrderCard = ( {data, index} ) => {
    let totalPrice = 0

    data.map((item) => (
        totalPrice = totalPrice + (item.counter * item.item.price)
    ))

    return (
        <>
            <div className="orders-list">
                <p>Order №{index+1}</p>
                {data.map((item) => (
                    <OrderItem data={item}/>
                ))}
                <div className="orders-info">
                    <p>Totally: {totalPrice}₽</p>
                    <p>12/12/12</p>
                </div>

            </div>
        </>
    );
};

export default OrderCard;
