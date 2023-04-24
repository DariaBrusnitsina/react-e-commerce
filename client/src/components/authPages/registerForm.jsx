import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Please enter email"
            },
            isEmail: {
                message: "Email address is invalid"
            }
        },
        phone: {
            isRequired: {
                message: "Please enter phone number"
            }
        },
        name: {
            isRequired: {
                message: "Please enter your name"
            }
        },
        surname: {
            isRequired: {
                message: "Please enter your surname"
            }
        },
        password: {
            isRequired: {
                message: "Please enter password"
            },
            isCapitalSymbol: {
                message: "Password must contain an upper case letter"
            },
            isContainDigit: {
                message: "Password must contain numbers"
            },
            min: {
                message: "Password must contain 8 characters or more",
                value: 8
            }
        },
        licence: {
            isRequired: {
                message:
                    "Please agree password"
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
        const isValid = validate();
        if (!isValid) return;
        const newData = {...data};
        dispatch(signUp(newData));
        navigate('/shop', {replace: true})
    };

    return ( <div>
        <h2 className="login__title">Registration</h2>

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
            >
                Agree to our <a>Terms of Service </a> and confirm that you have read our <a>Privacy Policy</a>.
            </CheckBoxField>
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

export default RegisterForm;
