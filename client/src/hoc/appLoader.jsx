import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    loadUsersList,
} from "../store/users";
import {loadItemsList} from "../store/items";
import {loadCategoriesList} from "../store/categories";
import {loadAdminList} from "../store/admin";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    dispatch(loadAdminList())

    useEffect(() => {
        dispatch(loadItemsList());
        dispatch(loadCategoriesList());
        dispatch(loadAdminList())

        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    return children;
};

export default AppLoader;

