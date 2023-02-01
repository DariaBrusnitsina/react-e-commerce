import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ( {item, onChangeCart, width, display}) => {

    const handleAddItem = (data) => {
        const local = localStorage.getItem("cart")

        if (local) {
            const cartSet = JSON.parse(local)
            cartSet.push(data)
            localStorage.setItem("cart", JSON.stringify(cartSet))

        } else {
            let local = []
            local.push(data)
            localStorage.setItem("cart", JSON.stringify(local))
        }
        onChangeCart()
    }

    return (
    <div className="shop__item">
        <Link key={item._id} to={`/react-e-commerce/shop/${item._id}`}>
            <img className="" src={item.url} alt="Card cap" width={width} />
        </Link>
        <div className="shop__item--text">
            <Link key={item._id} to={`/react-e-commerce/shop/${item._id}`} style={{color: "black", textDecoration: 'none'}}>
                <h5>{item.name}</h5>
                <p>{item.price} ₽</p>
            </Link>
            <button style={{display: display}}onClick={() => handleAddItem(item)} className="add-cart-btn">Add <i className="bi bi-cart"></i></button>
        </div>
    </div>
    );
};

export default ItemCard;
