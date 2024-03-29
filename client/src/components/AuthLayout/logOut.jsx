import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {logOut, removeUser} from "../../store/users";
import {useNavigate} from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
        const path = `/`
        navigate(path, { replace: true });
    }, []);
    return <h1>Loading</h1>;
};

export default LogOut;
