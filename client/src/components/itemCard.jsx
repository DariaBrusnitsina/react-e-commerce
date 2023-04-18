import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const ItemCard = ( {item, width, display}) => {
    const {addCartItem} = useCart();

    return (
    <div key={item._id} className="shop__item">
        <NavLink key={item._id} to={`${item._id}`}>
            <img className="" src={item.url} alt="Card cap" width={width} />
        </NavLink>
        <div className="shop__item--text">
            <NavLink key={item._id} to={`${item._id}`} style={{color: "black", textDecoration: 'none'}}>
                <h5>{item.name}</h5>
                <p>{item.price} ₽</p>
            </NavLink>
            <button style={{display: display}} onClick={() => addCartItem(item)} className="add-cart-btn">Add <i className="bi bi-cart"></i></button>
        </div>
    </div>
    );
};

export default ItemCard;
