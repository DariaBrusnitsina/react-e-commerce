import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useCart} from "../../hooks/useCart";

const OrderItem = ( {data} ) => {
    const { incrementItem, decrementItem, removeCartItem} = useCart()
    const [exist, setExist] = useState(true)

    const handleIncrement = () => {
        data.counter++
        incrementItem(data.item)
    };

    const handleDecrement = () => {
        if (data.counter !== 1) {
            data.counter--
            decrementItem(data.item)
        }
    };

    const  handleRemove = () => {
        removeCartItem(data)
        setExist(false)
    }

    return (
        <>
                <div className="order-item">
                    <img className="" src={data.item.url}  width={100}/>

                    <div className="order-item__title">
                        <Link to={`/shop/${data.item._id}`}><p>{data.item.name}</p></Link>
                    </div>

                    <div className="order-item__counter">
                        <p>{data.counter}</p>

                    </div>

                    <div className="cart__item--price">
                        <p>{data.item.price * data.counter} ₽</p>
                    </div>

                </div>
        </>
    );
};

export default OrderItem;
