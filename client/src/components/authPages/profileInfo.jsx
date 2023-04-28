import React, {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import OrderCard from "./orderCard";
import OrdersListModal from "./ordersListModal";

const CssClasses = {
    PROFILE: "profile",
    INFO: "profile__info",
    SALE: "profile__sale",
    CONTACTS: "profile__contacts",
    TITLE: "profile__title",
    SUBTITLE: "profile__subtitle",
    FORM: "profile__form-element",
    LIST: "orders-list",
    REDIRECT_BTN: "profile__btn"
}

const ProfileInfo = ({user}) => {
    const navigate = useNavigate();
    let ordersArray = user ? [...user.orders] : []
    if (ordersArray.length > 3 ) {
        ordersArray = ordersArray.slice(0,3)
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true);
        document.getElementsByTagName("body")[0].style.overflow = 'hidden';
    }

    function handleCloseModal() {
        setIsOpen(false);
        document.getElementsByTagName("body")[0].style.overflow = 'scroll';

    }

    if (!user) {
        navigate("/",{ replace: true } )
    }

    if (user) {
        return (
            <div className={CssClasses.PROFILE}>
                <div className="container">

                    <div className={CssClasses.INFO}>
                        <div>
                            <h1>{user.name + " " + user.surname}</h1>
                            <h2 className={CssClasses.TITLE}>Your sale: {user.sale}%</h2>
                            <div className={CssClasses.SALE}>
                                <p>For every 1000 rubles in the order, you get +1% to the cumulative discount for the next orders. The maximum discount under the accumulative program is 15%.</p>
                            </div>
                        </div>

                        <div className={CssClasses.CONTACTS}>
                            <h3 className={CssClasses.SUBTITLE}>Contact information</h3>
                            <ul>
                                <li className={CssClasses.FORM}><span>Email:</span> {user.email}</li>
                                <li className={CssClasses.FORM}><span>Phone:</span> {user.phone}</li>
                                <li className={CssClasses.FORM}><span>Address:</span> {user.address ? user.address : <NavLink to={"edit"}>add</NavLink>}</li>
                            </ul>

                            <NavLink className={CssClasses.REDIRECT_BTN} to={'edit'}>Edit contact information</NavLink>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h2 className={CssClasses.TITLE}>Your last orders</h2>
                            { user.orders && user.orders.length !== undefined
                                ? <div>
                                    <ul className={CssClasses.LIST}>
                                        {ordersArray.reverse().map((data) => (
                                            <li><OrderCard data={data}/></li>
                                        ))}
                                        <li>{user.orders.length > 3 ? <button className={CssClasses.REDIRECT_BTN} onClick={() => handleOpenModal()}>All orders</button> : ""}</li>
                                    </ul>

                                </div>
                                : <p>You have no orders! Start <Link to="/shop">shopping</Link> now.</p>
                            }
                        </div>
                    </div>
                </div>
                <OrdersListModal orders={user.orders} closeModal={handleCloseModal} modalIsOpen={modalIsOpen}/>
            </div>

        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default ProfileInfo;
