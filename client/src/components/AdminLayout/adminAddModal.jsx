import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import TextField from "../common/form/textField";
import * as yup from "yup";
import {addItem} from "../../store/items";
import {useDispatch} from "react-redux";
import {addCategory} from "../../store/categories";

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
        padding: "50px",
        background: "#efefef",
        border: "2px solid #8f8f8f",
        width: "800px"
    },
};

const AdminAddModal = ({modalIsOpen, closeModal, item}) => {
    const dispatch = useDispatch()
    const productData = ["name", "url", "category", "description", "price"]
    const categoryData = ["id", "name", "url"]
    const isProduct = item === "product"
    const productConfig = {
        name: "",
        url: "",
        category: "",
        description: "",
        price: 0
    }
    const categoryConfig = {
        id: "",
        name: "",
        url: ""
    }
    const [data, setData] = useState( isProduct ? productConfig : categoryConfig);
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    function handleCloseModal() {
        closeModal(false)
        setErrors(null)
        setData(null)
    }

    const validateSchemeProduct = yup.object().shape({
        price: yup.number(),
        description: yup.string()
            .required("Please add description"),
        category: yup.string()
            .required("Please add an id of one of the categories"),
        url: yup.string()
            .required("Please add url"),
        name: yup.string()
            .required("Please add item or category name"),
    })

    const validateSchemeCategories = yup.object().shape({
        url: yup.string()
            .required("Please add url"),
        name: yup.string()
            .required("Please add item or category name"),
        id: yup.string()
            .required("Please add category id"),
    })

    const validate = () => {
        isProduct ?  validateSchemeProduct
                .validate(data)
                .then(() => setErrors({}))
                .catch((err) => setErrors({[err.path]: err.message}))
            : validateSchemeCategories
                .validate(data)
                .then(() => setErrors({}))
                .catch((err) => setErrors({[err.path]: err.message}))


        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (isProduct) {
            dispatch(addItem(data))
        } else {
            dispatch(addCategory(data))
        }
        handleCloseModal()
    };

    return (
        <Modal isOpen={modalIsOpen}
               onRequestClose={closeModal}
               style={customStyles}
        >
            <h1 style={{fontSize: "40px"}}>Add {item}</h1>

            <form onSubmit={handleSubmit}>
                {isProduct ? productData.map((p) => {
                    return <TextField
                        label={p}
                        name={p}
                        value={data[p]}
                        onChange={handleChange}
                        error={errors[p]}
                    />
                }) : categoryData.map((p) => {
                    return <TextField
                        label={p}
                        name={p}
                        value={data[p]}
                        onChange={handleChange}
                        error={errors[p]}
                    />
                })

                }

                <button
                    type="submit"
                    className={isValid ? CssClasses.BTN_VALID: CssClasses.BTN_INVALID}
                >
                    Save
                </button>
            </form>
        </Modal>



    );
};

export default AdminAddModal;
