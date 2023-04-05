import React, { useState, useEffect } from "react";
import TextField from "../textField";
import { validator } from "../utils/validator";


const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ });

    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    const validatorConfing = {
        email: { isRequired: { message: "Please enter email address" }, isEmail: { message: "Email address is invalid" } },
        password: {
            isRequired: { message: "Please enter password" },
            isCapitalSymbol: { message: "Password must contains a minimum of 1 upper case letter" },
            isContainDigit: { message: "Password must contains a minimum of 1 numeric character" },
            min: { message: "Password must be at least 8 characters long", value: 8 }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfing);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="login__page">
            <div className="container">
                <div className="login__container">
                    <div className="login__card">
                        <h2 className="login__title">Login</h2>
                        <form className="login__form" onSubmit={handleSubmit}>
                            <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email}/>
                            <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password}/>
                            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
