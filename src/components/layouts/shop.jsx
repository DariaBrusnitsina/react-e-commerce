import React from "react";
import { useParams } from "react-router-dom";
import Navigation from "../navigation";
import ShopPage from "../pages/shopPage/shopPage";

const Shop = () => {
    const params = useParams();
    const { itemId } = params;
    return (
    <>
    <header>
        <div className="container">
            <Navigation/>
            {itemId
            ? ""
            :<>
                <h1 className="shop__title">Lorem ipsum dolor sit amet</h1>
                <p className="shop__subtitle">Praesentium facere quo consequatur laudantium, omnis mollitia eaque.</p>
            </>
            }
        </div>
    </header>
    <main>
        <div className="container">
           {itemId ? <itemPage itemId={itemId} /> : <ShopPage />}
        </div>
    </main>
    </>
    );
};

export default Shop;
