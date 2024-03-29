import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import {useDispatch, useSelector} from "react-redux";
import {getAuthError, getIsLoggedIn, signUp} from "../../store/users";
import {Navigate, useNavigate} from "react-router-dom";
import * as yup from 'yup';
import ToggleButton from "../common/toggleButton";

const CssClasses = {
    AUTH: "auth_page",
    TITLE: "title",
    BTN_VALID: "button-submit",
    BTN_INVALID: "button-submit invalid-form",
    CENTER: "button-wrapper--center",
    CARD: "auth_page__card",
    DANGER: "auth_page__text-danger"
}

const RegisterForm = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const dispatch = useDispatch();
    const authError = useSelector(getAuthError())
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        sale: 0,
        licence: false
    });

    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validateScheme = yup.object().shape({
        licence: yup.boolean().oneOf([true],'Please agree with Terms of Service'),
        password: yup.string()
            .required("Please enter password").min(8),
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid')
            .required("Please enter phone number")
            .min(11),
        email: yup.string()
            .required("Please enter email address")
            .email("Email address is invalid"),
        surname: yup.string()
            .required("Please enter your name"),
        name: yup.string()
            .required("Please enter your name")
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
        const newData = {...data};
        dispatch(signUp(newData))
    };

    if (isLoggedIn) {
        return <Navigate to="/profile" />
    }

    return (
        <div className={CssClasses.AUTH}>

        <div className={CssClasses.CARD}>
        <h2 className={CssClasses.TITLE}>Registration</h2>

        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />

            <TextField
                label="Surname"
                name="surname"
                value={data.surname}
                onChange={handleChange}
                error={errors.surname}
            />

            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />

            <TextField
                label="Phone"
                type="phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                error={errors.phone}
            />

            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            > Agree to our <a style={{color: "#81b4e5"}}>Terms of Service</a>
            </CheckBoxField>

            <div className={CssClasses.CENTER}>
                <button
                    className={isValid ?  CssClasses.BTN_VALID: CssClasses.BTN_INVALID}
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
                {authError && <p className={CssClasses.DANGER}>{authError}</p>}
            </div>
        </form>
            <ToggleButton text="Already have an account? " btn="Sign In" to="login"/>

        </div>
        </div>
    );
};

export default RegisterForm;
