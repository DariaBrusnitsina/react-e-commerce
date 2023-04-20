import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useCart} from "../../hooks/useCart";

const CartItem = ( {data} ) => {
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
            { exist && (
                <div className="cart__item">
                <img className="" src={data.item.url}  width={150}/>

                <div className="cart__item--title">
                <Link to={`/shop/${data.item._id}`}><h3>{data.item.name}</h3></Link>
                <p>{data.item.category.name}</p>
                </div>

                <div className="cart__item--counter">
                <button onClick={handleDecrement}>-</button>
                <p>{data.counter}</p>
                <button onClick={handleIncrement}>+</button>
                </div>

                <div className="cart__item--price">
                <p>{data.item.price * data.counter} ₽</p>
                <button onClick={handleRemove}>remove</button>
                </div>

                </div>
            )}
        </>
    );
};

export default CartItem;
