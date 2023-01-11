import React from "react";
import Navigation from "../navigation";
import ShopPage from "../pages/shopPage/shopPage";

const Shop = () => {
    return (
    <>
    <header>
        <div className="container">
            <Navigation/>
            <h1 className="shop__title">Lorem ipsum dolor sit amet</h1>
            <p className="shop__subtitle">Praesentium facere quo consequatur laudantium, omnis mollitia eaque.</p>
            <ShopPage />
        </div>
    </header>
    <main>
        <div className="container">

        </div>
    </main>
    </>
    );
};

export default Shop;
