import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData} from "../../store/users";
import {getAdmins} from "../../store/admin";
import {Navigate} from "react-router-dom";
import {deleteItem, getItems} from "../../store/items";
import {deleteCategory, getCategories} from "../../store/categories";
import AdminModal from "../adminModal";

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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState()
    let isAdmin

    if (currentUser) {
        let result = admins.find((a) => a.email === currentUser.email);
        isAdmin = result ? true : false
    }

    if (!isAdmin) {
        return <Navigate to="/" />
    }

    function handleOpenModal(item) {
        setIsOpen(true);
        setSelected(item)
    }

    function handleCloseModal() {
        setSelected(null)
        setIsOpen(false);
    }

    function handleDelete(object) {
        if (object.price) {
            dispatch(deleteItem(object._id))
        } else {
            dispatch(deleteCategory(object._id))
        }
    }

    return (
        <div className={CssClasses.ADMIN}>
            <div className="container">

                <div>
                    <h1 className="title">Products list</h1>
                    <p className="">Totally {items.length} items</p>
                    <ul>
                        {items.map((i, index) =>
                                <li key={i._id}>
                                    <p>{index+1}. {i.name} </p>
                                    <button onClick={() => handleOpenModal(i)}><i className="bi bi-pencil-square"></i></button>
                                    <button onClick={() => handleDelete(i)}><i className="bi bi-trash"></i></button>
                                </li>
                        )}
                        <button><i className="bi bi-plus-lg"></i> Add new product</button>
                    </ul>
                </div>

                 <div>
                    <h1 className="title">Categories list</h1>
                     <p className="">Totally {categories.length} items</p>
                     <ul>
                         {categories.map((c, index) => <li key={c._id}>
                             <p>{index+1}. {c.name} </p>
                             <button onClick={() => handleOpenModal(c)}><i className="bi bi-pencil-square"></i></button>
                             <button onClick={() => handleDelete(c)}><i className="bi bi-trash"></i></button>
                         </li>
                        )}
                         <button><i className="bi bi-plus-lg"></i> Add new category</button>

                     </ul>
                 </div>
            </div>
            {selected && <AdminModal item={selected} closeModal={handleCloseModal} modalIsOpen={modalIsOpen}/>}
        </div>
    );
};

export default Admin;
