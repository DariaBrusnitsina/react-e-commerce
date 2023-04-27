import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, login } from "../../store/users";
import {useNavigate} from "react-router-dom";

const CssClasses = {
    LOGIN: "button-submit"
}

const LoginForm = ({path}) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const loginError = useSelector(getAuthError());
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: { isRequired: { message: "Please enter email address" }, isEmail: { message: "Email address is invalid" } },

        password: {
            isRequired: {
                message: "Please enter password"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
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
        dispatch(login({ payload: data }));
        navigate(path, {replace: true})

    };
    return (
        <div >
            <h2 className="login__title">Login</h2>

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

            {loginError && <p className="text-danger">{loginError}</p>}
                <div className="form-btn">
                    <button
                        className={isValid ? "button-submit validform" : "button-submit invalidform"}
                        type="submit"
                    >
                        Log In
                        <i className="bi bi-box-arrow-in-right"></i>
                    </button>
                </div>
        </form>
        </div>
    );
};

export default LoginForm;
