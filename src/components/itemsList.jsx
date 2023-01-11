import React from "react";
import { Link } from "react-router-dom";

const ItemsList = ( {items}) => {
    return (
    <div className="shop__items--list">
         {items.map((item) => (
                    <div className="shop__item">
                        <Link key={item._id} to={`posts/${item._id}`}><img className="" src={item.url} alt="Card cap" width={270} ></img></Link>
                        <Link key={item._id} to={`posts/${item._id}`} style={{color: "black", textDecoration: 'none'}}>
                            <div className="mt-2">
                                <h5>{item.name}</h5>
                                <p>{item.price} ₽</p>
                            </div>
                        </Link>
                    </div>
                ))}
    </div>
    );
};

export default ItemsList;
