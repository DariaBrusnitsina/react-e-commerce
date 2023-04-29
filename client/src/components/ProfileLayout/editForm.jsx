import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentUserData, getDataStatus,
    getUserById,
    getUsersLoadingStatus,
    logOut,
    removeUser,
    updateUserData
} from "../../store/users";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Modal from 'react-modal';
import {EditPageTexts} from "../../content/texts"
import * as yup from 'yup';
import {ClipLoader} from "react-spinners";

const CssClasses = {
    AUTH: "auth_page",
    CARD: "auth_page__card",
    TITLE: "title",
    SUBTITLE: "subtitle",
    BTN_VALID: "button-submit",
    BTN_INVALID: "button-submit invalid-form",
    CENTER: "button-wrapper--center",
    DELITE_BTNS: "edit-modal_delete"
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

const override = {
    margin: "100px 0"
};

const EditUserPage = () => {
    const currentUser = useSelector(getCurrentUserData());
    const status = useSelector(getUsersLoadingStatus())
    const statusData = useSelector(getDataStatus())
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
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
        setData(currentUser)
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, );

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validateScheme = yup.object().shape({
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

    if (!currentUser && !statusData && !status ) {
        return <Navigate to="/" />
    }

    return (
        <div className={CssClasses.AUTH}>
        <div className={CssClasses.CARD}>
            <h1 className={CssClasses.TITLE}>Edit Profile</h1>
            {!isLoading
                ? (
                    <div>
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
                                className={isValid ?  CssClasses.BTN_VALID: CssClasses.BTN_INVALID}
                            >
                                Save
                            </button>
                        </form>
                        <button onClick={() => openModal()} style={{color: "#CA646FFF"} }>Delete Profile</button>
                    </div>


                )
                : (
                    <div style={{textAlign: "center"}}>
                        <ClipLoader color="#000000" size={20} cssOverride={override}/>
                    </div>
                )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div>
                    <p className={CssClasses.SUBTITLE}>{EditPageTexts.MODAL_TITLE}</p>
                    <p>{EditPageTexts.MODAL_SUBTITLE}</p>
                    <div className={CssClasses.DELITE_BTNS}>
                        <button style={{color: "#CA646FFF"}} onClick={(e) => handleDelete(e)}>{EditPageTexts.MODAL_YES_BTN}</button>
                        <button onClick={() => closeModal()}>{EditPageTexts.MODAL_NO_BTN}</button>
                    </div>
                </div>

            </Modal>
        </div>
        </div>
    );
};

export default EditUserPage;
