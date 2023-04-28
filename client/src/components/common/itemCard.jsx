import React, {useState} from "react";
import { Link } from "react-router-dom";
import {useCart} from "../../hooks/useCart";

const CssClassesLarge = {
    ITEM: "item-card--large",
    TITLE: "item-card__title--large",
    COUNTER: "item-card__counter--large",
    REMOVE: "item-card__button--remove--large"
}

const CssClassesSmall = {
    ITEM: "item-card--small",
    TITLE: "item-card__title--small",
    COUNTER: "item-card__counter--small"
}

const ItemCard = ( {data, size} ) => {
    const { incrementItem, decrementItem, removeCartItem} = useCart()
    const [exist, setExist] = useState(true)
    const isLarge = size === "large"

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
                <div className={isLarge ? CssClassesLarge.ITEM : CssClassesSmall.ITEM}>
                    {isLarge && <img src={data.item.url}  width={150}/>}

                    <div className={isLarge ? CssClassesLarge.TITLE : CssClassesSmall.TITLE}>
                        <Link to={`/shop/${data.item._id}`}><p>{data.item.name}</p></Link>
                    </div>

                    <div className={isLarge ? CssClassesLarge.COUNTER : CssClassesSmall.COUNTER}>
                        {isLarge && <button onClick={handleDecrement}>-</button>}
                        <p>{data.counter}</p>
                        {isLarge && <button onClick={handleIncrement}>+</button>}
                    </div>

                    <div>
                        <p>{data.item.price * data.counter} ₽</p>
                    </div>

                    {isLarge && <button className={CssClassesLarge.REMOVE} onClick={handleRemove}><i className="bi bi-x-lg"></i></button>}

                </div>
            )}
        </>
    );
};

export default ItemCard;
