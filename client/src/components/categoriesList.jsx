import React from "react";

const CategoriesList = ({
    items,
    onItemSelect,
    selectedItem
}) => {
    return (
        <ul>
            {items.map((item) => (
                <li
                    key={item._id}
                    className={
                        "shop__category" +
                        (item === selectedItem ? "-active" : "")
                    }
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};


export default CategoriesList;
