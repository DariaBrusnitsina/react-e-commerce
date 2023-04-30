import React from "react";
import ItemCard from "../common/itemCard";

const CssClasses = {
    SUBTITLE: "profile__subtitle",
    ITEM: "order-item",
    FORM: "profile__form-element"
}

const ProfileOrderCard = ({data} ) => {
    let totalPrice = 0
    const now = Date.now()
    const date = new Date(now);
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    const today = date.toLocaleDateString('en-EN', options)
    const isDone = today === data.to
    const icon = isDone ? "bi bi-check-circle" : "bi bi-truck"
    const status = isDone ? " Delivered " : " Delivery date: "
    data.cart.map((item) => (
        totalPrice = totalPrice + (item.counter * item.item.price)
    ))
    const index = new Date(data.from)

    return (
        <li>
            <div className={CssClasses.ITEM}>
                <h3 className={CssClasses.SUBTITLE}>Order №{Date.parse(index)}</h3>
                {data.cart.map((item) => (
                    <ItemCard key={data.id + item.item._id} data={item} size="small"/>
                ))}
                <div className="orders-info">
                    <p className={CssClasses.FORM}><span>Totally:</span> {totalPrice}₽</p>
                    <div>
                        <p className={CssClasses.FORM}><i className={icon}></i><span>{status}</span>{data.to}</p>
                    </div>
                </div>
            </div>
        </li>

    );
};

export default ProfileOrderCard;
