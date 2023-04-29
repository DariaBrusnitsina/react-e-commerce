import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {getAuthError, getIsLoggedIn, login} from "../../store/users";
import {Navigate, useNavigate} from "react-router-dom";
import * as yup from 'yup';
import ToggleButton from "../common/toggleButton";

const CssClasses = {
    AUTH: "auth_page",
    TITLE: "title",
    BTN_VALID: "button-submit",
    BTN_INVALID: "button-submit invalid-form",
    DANGER: "auth_page__text-danger",
    CENTER: "button-wrapper--center",
    CARD: "auth_page__card"
}

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthError());
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const isLoggedIn = useSelector(getIsLoggedIn())

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateScheme = yup.object().shape({
        password: yup.string()
            .required("Please enter password"),
        email: yup.string()
            .required("Please enter email address")
            .email("Email address is invalid"),
    })

    const validate = () => {
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({[err.path]: err.message}))
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(login({ payload: data }))
            .then(() => {
                // navigate("/cart", {replace: true})

        }).catch((err) => {
            console.log(err)
        })
        // navigate(path, {replace: true})
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />
    }

    return (
        <div className={CssClasses.AUTH}>
        <div className={CssClasses.CARD}>
            <h2 className={CssClasses.TITLE}>Login</h2>

            <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            {loginError && <p className={CssClasses.DANGER}>{loginError}</p>}
                <div className={CssClasses.CENTER}>
                    <button
                        className={isValid ?  CssClasses.BTN_VALID: CssClasses.BTN_INVALID}
                        type="submit"
                    >
                        Log In
                        <i className="bi bi-box-arrow-in-right"></i>
                    </button>
                </div>
        </form>
            <ToggleButton text="Don't have an account? " btn="Sign Up" to="register" />
        </div>
        </div>
    );
};

export default LoginForm;
