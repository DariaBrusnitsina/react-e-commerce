import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
// import BackHistoryButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUserData } from "../../store/users";
import {useNavigate} from "react-router-dom";

const EditUserPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUserData({...data})
        );
        const path = `/${currentUser._id}`
        navigate(path, { replace: true });
    };

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (!data) {
            setData({
                ...currentUser});
        }
    }, [ data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="edit">
            <div className="container">
                {/*<BackHistoryButton />*/}

                <div className="edit-card">
                    <h1 className="login__title">Edit Profile</h1>
                    {!isLoading
                        ? (
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
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                />
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    error={errors.address}
                                />

                                <button
                                    type="submit"
                                    className={isValid ? "submit-btn validform" : "submit-btn invalidform"}
                                >
                                    Save
                                </button>
                            </form>
                        )
                        : (
                            "Loading..."
                        )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
