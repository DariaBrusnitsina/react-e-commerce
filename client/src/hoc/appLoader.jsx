import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from "../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    console.log("app", isLoggedIn)
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {

        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    if (usersStatusLoading) return "Loading...";
    return children;
};

export default AppLoader;
