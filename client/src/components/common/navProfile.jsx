import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import {ClipLoader} from "react-spinners";

const override = {
    margin: "0 21px"
};

function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());

    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return <ClipLoader color="#000000" size={20} cssOverride={override}/>


    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="dropdown-toggle">
                <p className="me-2">{currentUser.name}</p>
                <i className="bi bi-person-fill"></i>

            </div>
            <div className={"dropdown-menu" + (isOpen ? " show" : "")}>
                <Link

                    to={`/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Log Out
                </Link>
            </div>
        </div>
    );
}

export default NavProfile;
