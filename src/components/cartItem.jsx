import React from "react";
import { Link } from "react-router-dom";

const CartItem = ( {item} ) => {

    return (
    <div  key={item._id} className="cart__item">
        <img className="" src={item.url} alt="Card cap" width={150}/>

        <div className="cart__item--title">
            <Link to={`/shop/${item._id}`}><h3>{item.name}</h3></Link>
            <p>cathegory</p>
        </div>

        <div className="cart__item--counter">
            <button>-</button>
            <p>1</p>
            <button>+</button>
        </div>

        <div className="cart__item--price">
            <p>{item.price} ₽</p>
            <button>remove</button>
        </div>

    </div>
    );
};

export default CartItem;
