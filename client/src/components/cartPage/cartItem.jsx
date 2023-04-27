import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useCart} from "../../hooks/useCart";

const CssClasses = {
    ITEM: "cart-item",
    TITLE: "cart-item__title",
    COUNTER: "cart-item__counter",
    PRICE: "cart-item__price",
    REMOVE: "cart-item__button--remove"
}

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

    const handleRemove = () => {
        removeCartItem(data)
        setExist(false)
    }

    return (
        <>
            { exist && (
                <div className={CssClasses.ITEM}>
                    <img src={data.item.url}  width={150}/>

                    <div className={CssClasses.TITLE}>
                        <Link to={`/shop/${data.item._id}`}><h3>{data.item.name}</h3></Link>
                        <p>{data.item.category.name}</p>
                    </div>

                    <div className={CssClasses.COUNTER}>
                        <button onClick={handleDecrement}>-</button>
                        <p>{data.counter}</p>
                        <button onClick={handleIncrement}>+</button>
                    </div>

                    <div className={CssClasses.PRICE}>
                        <p>{data.item.price * data.counter} ₽</p>
                    </div>

                    <button className={CssClasses.REMOVE} onClick={handleRemove}><i className="bi bi-x-lg"></i></button>

                </div>
            )}
        </>
    );
};

export default CartItem;
