import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import TextField from "./common/form/textField";
import * as yup from "yup";

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

const AdminModal = ({modalIsOpen, closeModal, item}) => {
    const isProduct = item.price ? true : false
    const categoryData = ["id", "name", "url"]
    const productData = ["name", "url", "category", "description", "price"]
    const [data, setData] = useState(item);
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
    }

    const validateSchemeProduct = yup.object().shape({
        price: yup.number(),
        description: yup.string()
            .required("Please add description"),
        category: yup.string()
            .required("Please add category id"),
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

    return (
            <Modal isOpen={modalIsOpen}
                   onRequestClose={closeModal}
                   style={customStyles}
            >
                <h1 style={{fontSize: "40px"}}>Edit</h1>
                <form>
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
                        className={isValid ?  CssClasses.BTN_VALID: CssClasses.BTN_INVALID}
                    >
                        Save
                    </button>
                    </form>


                {/*<p>{item.name}</p>*/}
                {/*{item.id && <p>{item.id}</p>}*/}
            </Modal>



    );
};

export default AdminModal;
