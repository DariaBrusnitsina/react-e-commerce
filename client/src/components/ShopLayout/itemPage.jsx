import React from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getItemById, getItemsLoadingStatus} from "../../store/items";
import {useCart} from "../../hooks/useCart";
import SkeletonShopItem from "../skeleton/skeletonShopItem";

const ItemPage = () => {
    const {itemId} = useParams()
    const {addCartItem} = useCart();
    const item = useSelector(getItemById(itemId))
    const status = useSelector(getItemsLoadingStatus())

    if (item === undefined && !status) {
        return <Navigate to="/shop" />
    }

    if (item) {
        return (
            <div className="shop">
                <div className="container">
                    <div className="item-page">
                        <div className="item-img">
                            <p className="item-nav">{<Link className="navigation--item" to="/shop">Shop</Link>} {">"} {item.name}</p>
                            <img className="" src={item.url} width={470} alt="Card cap" />
                        </div>
                        <div className="item-text">
                            <h1>{item.name}</h1>
                            <h5>{item.description}</h5>
                            <div className="item-btn">
                                <p>{item.price} ₽</p>
                                <button onClick={() => addCartItem(item)} className="add-cart-btn">Add <i className="bi bi-cart"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <SkeletonShopItem/>;
    }
};

export default ItemPage;
