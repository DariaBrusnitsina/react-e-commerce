import React, { useState } from "react";
import Modal from 'react-modal';
import ProfileOrderCard from "./profileOrderCard";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "50px",
        height: "600px",
        background: "#efefef",
        border: "2px solid #8f8f8f"
    },
};

const CssClasses = {
    BUTTON: "orders-list__button--close",
}

const ProfileOrdersListModal = ({modalIsOpen, closeModal, orders}) => {

    function handleCloseModal() {
        closeModal(false)
    }

    return (
        <Modal isOpen={modalIsOpen}
               onRequestClose={closeModal}
               style={customStyles}
        >
            <button className={CssClasses.BUTTON} onClick={handleCloseModal}><i className="bi bi-x-lg"></i></button>

            <ul className={CssClasses.LIST}>
                {orders.map((data) => (
                    <li><ProfileOrderCard data={data}/></li>
                ))}
            </ul>
        </Modal>

    );
};

export default ProfileOrdersListModal;
