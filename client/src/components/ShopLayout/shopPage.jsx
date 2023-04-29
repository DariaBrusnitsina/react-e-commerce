import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate"
import _ from "lodash";
import ProductCard from "../common/productCard";
import Pagination from "../common/pagination";
import CategoriesList from "./categoriesList";
import SortButton from "./sortButton";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../store/items";
import {getCategories} from "../../store/categories";
import SkeletonShop from "../skeleton/skeletonShop";

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
        const sortedItems = _.orderBy(
            filteredItems,
            ['price'],
            sortBy
        );

        const itemsCrop = paginate(sortedItems, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedCategory();
        };

        return (
            <div className="shop">
                <div className="container">
                <header>
                    <div className="container">
                        <h1 className="title">Lorem ipsum dolor sit amet</h1>
                        <p className="subtitle">Praesentium facere quo consequatur laudantium, omnis mollitia eaque.</p>
                    </div>
                </header>

                <div className="shop__section">
                    {categories && (
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
                                itemsCrop.map((item) => (
                                    <ProductCard key={item.name} item={item} width={270}/>
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
                </div>
            </div>
        );
    }
    return <SkeletonShop />;
};

export default ShopPage;
