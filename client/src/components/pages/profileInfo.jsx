import React from "react";
import {Link, redirect, useNavigate} from "react-router-dom";

const ProfileInfo = ({ user }) => {
    const navigate = useNavigate();

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
                                <li><span>Phone:</span> {user.phone}</li>
                                <li><span>Birth date:</span> {user.address ? user.address : <button onClick={handleClick}>add</button>}</li>
                                <li><span>Address:</span> {user.address ? user.address : <button onClick={handleClick}>add</button>}</li>
                            </ul>

                            <button onClick={handleClick}>Edit contact information</button>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h2>Your orders</h2>
                            { user.orders
                                ? <div>
                                    <h3>Orders</h3>
                                    <ul>

                                    </ul>
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
