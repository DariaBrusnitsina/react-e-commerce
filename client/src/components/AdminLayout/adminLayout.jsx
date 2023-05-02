import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData} from "../../store/users";
import {getAdmins} from "../../store/admin";
import {Navigate} from "react-router-dom";
import {deleteItem, getItems} from "../../store/items";
import {deleteCategory, getCategories} from "../../store/categories";
import AdminEditModal from "./adminEditModal";
import AdminAddModal from "./adminAddModal";

const CssClasses = {
    ADMIN: "admin-page",
    TITLE: "title",
    SUBTITLE: "subtitle",
    LIST: "about-page__list"
}

const Admin = () => {
    const currentUser = useSelector(getCurrentUserData());
    const admins = useSelector(getAdmins());
    const items = useSelector(getItems());
    const dispatch = useDispatch()
    const categories = useSelector(getCategories());
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState()
    const [selectedAdd, setSelectedAdd] = useState()
    let isAdmin

    if (currentUser && admins) {
        let result = admins.find((a) => a.email === currentUser.email);
        isAdmin = !!result

        if (!isAdmin) {
            return <Navigate to="/" />
        }
    }

    function handleOpenEditModal(item) {
        setModalEditIsOpen(true);
        setSelectedEdit(item)
    }

    function handleOpenAddModal(item) {
        setModalAddIsOpen(true);
        setSelectedAdd(item)
    }

    function handleCloseEditModal() {
        setModalEditIsOpen(false);
    }

    function handleCloseAddModal(item) {
        setModalAddIsOpen(false);
        setSelectedAdd( null)
    }

    function handleDelete(object) {
        if (object.price) {
            dispatch(deleteItem(object._id))
        } else {
            dispatch(deleteCategory(object._id))
        }
    }

    if (items && categories) {
        return (
            <div className={CssClasses.ADMIN}>
                <div className="container">

                    <div>
                        <h1 className="title">Products list</h1>
                        <p className="">Totally {items.length} items</p>
                        <ul>
                            {items.map((i, index) =>
                                <li key={i._id}>
                                    <p>{index + 1}. {i.name} </p>
                                    <button onClick={() => handleOpenEditModal(i)}><i
                                        className="bi bi-pencil-square"></i></button>
                                    <button onClick={() => handleDelete(i)}><i className="bi bi-trash"></i></button>
                                </li>
                            )}
                            <button onClick={() => handleOpenAddModal("product")}><i className="bi bi-plus-lg"></i> Add
                                new product
                            </button>
                        </ul>
                    </div>

                    <div>
                        <h1 className="title">Categories list</h1>
                        <p className="">Totally {categories.length} items</p>
                        <ul>
                            {categories.map((c, index) => <li key={c._id}>
                                    <p>{index + 1}. {c.name} <span style={{color: "gray", fontWeight: "400"}}>{c.id}</span>
                                    </p>
                                    <button onClick={() => handleOpenEditModal(c)}><i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(c)}><i className="bi bi-trash"></i></button>
                                </li>
                            )}
                            <button onClick={() => handleOpenAddModal("category")}><i className="bi bi-plus-lg"></i> Add
                                new category
                            </button>

                        </ul>
                    </div>
                </div>
                {selectedEdit && <AdminEditModal item={selectedEdit} closeModal={handleCloseEditModal}
                                                 modalIsOpen={modalEditIsOpen}/>}
                {selectedAdd &&
                    <AdminAddModal item={selectedAdd} closeModal={handleCloseAddModal} modalIsOpen={modalAddIsOpen}/>}
            </div>
        );
    }
};

export default Admin;
