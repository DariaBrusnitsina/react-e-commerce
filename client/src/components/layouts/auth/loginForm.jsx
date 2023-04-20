import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../ui/form/textField";
import CheckBoxField from "../../ui/form/checkBoxField";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAuthError, login } from "../../store/users";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    // const history = useHistory();
    const dispatch = useDispatch();
    // const loginError = useSelector(getAuthError());
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

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
         console.log(data)
        const isValid = validate();
        if (!isValid) return;
        // const redirect = history.location.state
        //     ? history.location.state.from.pathname
        //     : "/";

        // dispatch(login({ payload: data, redirect }));
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

            {/*{loginError && <p className="text-danger">{loginError}</p>}*/}
                <div className="form-btn">
                    <button
                        className={isValid ? "submit-btn validform" : "submit-btn invalidform"}
                        type="submit"
                        disabled={!isValid}
                    >
                        Submit
                    </button>
                </div>
        </form>
        </div>
    );
};

export default LoginForm;
