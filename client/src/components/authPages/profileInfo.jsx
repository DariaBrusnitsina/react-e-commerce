import React from "react";
import {Link, useNavigate} from "react-router-dom";
import OrderCard from "./orderCard";

const ProfileInfo = ({user}) => {
    const navigate = useNavigate();
    let ordersArray = user ? [...user.orders] : []
    if (ordersArray.length > 3 ) {
        ordersArray = ordersArray.slice(0,3)
    }
    const handleClick = () => {
        const path = `/${user._id}/edit`
        navigate(path, { replace: true });
    };

    if (user) {
        return (
            <div className="profile">
                <div className="container">
                    <div className="profile-info">
                        <h1>{user.name + " " + user.surname}</h1>

                        <h3><span>Your sale:</span>  {user.sale}%</h3>
                        <div className="sale-info">
                            For every 1000 rubles in the order, you get +1% to the cumulative discount for the next orders. The maximum discount under the accumulative program is 15%.
                        </div>
                        <div className="contact-info">
                            <h4>Contact information</h4>
                            <ul>
                                <li><span>Email:</span> {user.email}</li>
                                <li><span>Phone:</span> {user.phone}</li>
                                <li><span>Address:</span> {user.address ? user.address : <button onClick={handleClick}>add</button>}</li>
                            </ul>

                            <button onClick={handleClick}>Edit contact information</button>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h2>Your last orders</h2>
                            { user.orders && user.orders.length !== undefined
                                ? <div>
                                    <ul>
                                        {ordersArray.reverse().map((data) => (
                                            <li><OrderCard data={data}/></li>
                                        ))}
                                    </ul>
                                    {user.orders.length > 3 ? <p>All orders</p> : ""}
                                </div>
                                : <p>You have no orders! Start <Link to="/shop">shopping</Link> now.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

export default ProfileInfo;
