import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../ui/form/textField";
// import BackHistoryButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUserData } from "../../store/users";

const EditUserPage = () => {
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

        // history.push(`/users/${currentUser._id}`);
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
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
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
