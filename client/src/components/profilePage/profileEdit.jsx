import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {getCurrentUserData, logOut, removeUser, updateUserData} from "../../store/users";
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import {toast} from "react-toastify";
import {EditPageTexts} from "../../content/texts"

const CssClasses = {
    CONTAINER: "container",
    EDIT: "edit-container",
    CARD: "edit-card",
    DELETE: "edit__btn-delete",
    MODAL: "edit-modal",
    MODAL_TITLE: "edit-modal__title",
    MODAL_SUBTITLE: "edit-modal__subtitle",
    MODAL_YES: "edit-modal__btn-yes",
    MODAL_NO: "edit-modal__btn-no",
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const EditUserPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const [errors, setErrors] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUserData({...data}));
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

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(removeUser(currentUser._id));
        dispatch(logOut());
        const path = `/`
        navigate(path, { replace: true });

        // const isValid = validate();
        // if (!isValid) return;
        // dispatch(updateUserData({...data}));
        // const path = `/${currentUser._id}`
        // navigate(path, { replace: true });
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={CssClasses.EDIT}>
            <div className={CssClasses.CONTAINER}>

                <div className={CssClasses.CARD}>
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
                                    className={isValid ? "button-submit validform" : "button-submit invalidform"}
                                >
                                    Save
                                </button>
                            </form>
                        )
                        : (
                            "Loading..."
                        )}
                    <button onClick={() => openModal()} className={CssClasses.DELETE}>Delete Profile</button>

                </div>

            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className={CssClasses.MODAL}>
                    <p className={CssClasses.MODAL_TITLE}>{EditPageTexts.MODAL_TITLE}</p>
                    <p className={CssClasses.MODAL_SUBTITLE}>{EditPageTexts.MODAL_SUBTITLE}</p>
                    <button className={CssClasses.MODAL_YES} onClick={(e) => handleDelete(e)}>{EditPageTexts.MODAL_YES_BTN}</button>
                    <button className={CssClasses.MODAL_NO} onClick={() => closeModal()}>{EditPageTexts.MODAL_NO_BTN}</button>
                </div>

            </Modal>
        </div>
    );
};

export default EditUserPage;
