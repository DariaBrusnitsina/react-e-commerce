import React from "react";

const SortButton = ({ onSort, selectedSort}) => {
    const handleSort = () => {
        onSort(selectedSort === "asc" ? "desc" : "asc")
    };

    const rendeSortArrow = (selectedSort) => {
        if (selectedSort === "asc") {
            return <i className="bi bi-caret-down-fill"></i>;
        } else {
            return <i className="bi bi-caret-up-fill"></i>;
        }
    };

    return (
        <button className="sort-button" onClick={handleSort}>
            {rendeSortArrow(selectedSort)}
            <p>Price</p>
        </button>
    );
};

export default SortButton;
