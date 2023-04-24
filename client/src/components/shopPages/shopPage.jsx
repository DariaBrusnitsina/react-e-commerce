import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate"
import _ from "lodash";
import ItemCard from "./itemCard";
import Pagination from "./pagination";
import CategoriesList from "./categoriesList";
import SortButton from "./sortButton";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../store/items";
import {getCategories} from "../../store/categories";
import ImageGrid from "./skeletonShop";

const ShopPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState("asc");
    const pageSize = 6;

    const items = useSelector(getItems());
    const categories = useSelector(getCategories());

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
                        JSON.stringify(item.category) ===
                        JSON.stringify(selectedCategory.id)
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
                                <ItemCard key={item.name} item={item} width={270}/>
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
    return <ImageGrid />;
};

export default ShopPage;
