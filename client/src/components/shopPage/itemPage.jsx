import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getItemById, getItems} from "../../store/items";
import {useCart} from "../../hooks/useCart";

const ItemPage = ({ itemId }) => {
    const {addCartItem} = useCart();
    const items = useSelector(getItems());
    const item = useSelector(getItemById(itemId))

    if (item) {
        return (<>
                <div className="item-page">
                    <div className="item-img">
                        <p className="item-nav">{<Link className="navigation--item" to="/shop">Shop</Link>} {">"} {item.name}</p>
                        <img className="" src={item.url} width={470} alt="Card cap" />
                    </div>
                    <div className="item-text">
                        <h1>{item.name}</h1>
                        <h4>cathegory</h4>
                        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, maxime! Deserunt sint repellendus architecto ipsum laboriosam non. Sit minus, voluptate aliquam in architecto repudiandae, iure maiores iusto facere est doloremque.</h5>
                        <div className="item-btn">
                            <p>{item.price} ₽</p>
                            <button onClick={() => addCartItem(item)} className="add-cart-btn">Add <i className="bi bi-cart"></i></button>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <p className="loading">loading...</p>;
    }
};

export default ItemPage;
