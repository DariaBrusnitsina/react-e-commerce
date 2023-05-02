import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, logOut} from "../../store/users";
import {ClipLoader} from "react-spinners";
import localStorageService from "../../services/localStorage.service";
import {getAdmins} from "../../store/admin";

const override = {
    margin: "0 21px"
};

function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());
    const admins = useSelector(getAdmins());

    const token = localStorageService.getAccessToken()
    const dispatch = useDispatch();
    let isAdmin

    if (admins && currentUser) {
        let result = admins.find((a) => a.email === currentUser.email);
        isAdmin = !!result
    }

    if (token === "undefined") {
        localStorageService.removeAuthData()
        dispatch(logOut());
    }

    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    if (!currentUser) return <ClipLoader color="#000000" size={20} cssOverride={override}/>

    return (
        <div>
            <div className="dropdown" onClick={toggleMenu}>
                <div className="dropdown-toggle">
                    <p className="me-2">{currentUser.name}</p>
                    <i className="bi bi-person-fill"></i>

                </div>
                <div className={"dropdown-menu" + (isOpen ? " show" : "")}>
                    <Link

                        to={`/profile`}
                        className="dropdown-item"
                    >
                        Profile
                    </Link>
                    <Link to="/auth/logout" className="dropdown-item">
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavProfile;
