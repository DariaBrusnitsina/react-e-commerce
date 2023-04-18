import React from "react";
import { useParams } from "react-router-dom";
// import Navigation from "../navigation";
import ShopPage from "../pages/shopPage/shopPage";
import ItemPage from "../pages/itemPage/itemPage";

const Shop = () => {
    const params = useParams();
    const { itemId } = params;


    return (
    <div className="shop">
        <header>
            <div className="container">
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
            {itemId ? <ItemPage itemId={itemId} /> : <ShopPage/>}
            </div>
        </main>
    </div>
    );
};

export default Shop;
