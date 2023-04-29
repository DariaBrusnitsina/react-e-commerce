import React from "react";
import { useNavigate} from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import {useSelector} from "react-redux";
import {getItemById, getItems} from "../../store/items";

const ProductCard = ({item, width, display}) => {
    const {addCartItem} = useCart();
    const navigate = useNavigate()

    function handleNavigate() {
        navigate(`/shop/${item._id}`, {replace: true})
    }

    return (
    <div key={item._id} className="shop-item">
        <button onClick={handleNavigate}>
            <img src={item.url} alt="Card cap" width={width}/>
        </button>
        <div className="shop-item__text" width={width}>
            <div onClick={handleNavigate} style={{color: "black", textDecoration: 'none', cursor: 'pointer'}}>
                <h5>{item.name}</h5>
                <p>{item.price} ₽</p>
            </div>
            <button style={{display: display}} onClick={() => addCartItem(item)} className="shop-item__add-btn">Add <i className="bi bi-cart"></i></button>
        </div>
    </div>
    );
};

export default ProductCard;
