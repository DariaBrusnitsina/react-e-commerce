import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate"
import api from "../../../api";
import _ from "lodash";
import ItemCard from "../../itemCard";
import Pagination from "../../pagination";
import CategoriesList from "../../categoriesList";
import SortButton from "../../sortButton";

const ShopPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState("asc");
    const pageSize = 6;
    const [items, setItems] = useState();

    useEffect(() => {
        api.items.fetchAll().then((data) => setItems(data));
    }, []);

    useEffect(() => {
        api.categories.fetchAll().then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const handleCategorySelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedCategory(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (items) {
        const filteredItems = searchQuery
            ? items.filter(
                (item) =>
                    item.name
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1
            )
            : selectedCategory
                ? items.filter(
                    (item) =>
                        JSON.stringify(item.category.name) ===
                        JSON.stringify(selectedCategory.name)
                )
                : items;

        const count = filteredItems.length;
        const sortedUsers = _.orderBy(
            filteredItems,
            ['price'],
            sortBy
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedCategory();
        };

        return (
            <div className="shop__section">
                {categories && (
                    <div>
                        <div className="shop__categories">
                            <CategoriesList
                                selectedItem={selectedCategory}
                                items={categories}
                                onItemSelect={handleCategorySelect}
                            />
                            <button
                                className="reset-categories-btn"
                                onClick={clearFilter}
                            >
                                {" "}
                                reset filter
                            </button>
                        </div>
                    </div>
                )}
                <div className="shop__items">
                    <div className="shop__items--bar">
                        <input
                            className="search-input"
                            type="text"
                            name="searchQuery"
                            placeholder="Search..."
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        />
                        <SortButton onSort={handleSort} selectedSort={sortBy}/>
                    </div>

                    <div className="shop__items--list">
                        {count > 0 &&
                            usersCrop.map((item) => (
                                <ItemCard item={item} width={270}/>
                            ))
                        }
                    </div>

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <p className="loading">loading...</p>;
};

export default ShopPage;
