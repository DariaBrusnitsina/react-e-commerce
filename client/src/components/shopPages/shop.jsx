import React from "react";
import { useParams } from "react-router-dom";
// import Navigation from "../navigation";
import ShopPage from "./shopPage";
import ItemPage from "./itemPage";

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
                    <h1 className="title">Lorem ipsum dolor sit amet</h1>
                    <p className="subtitle">Praesentium facere quo consequatur laudantium, omnis mollitia eaque.</p>
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
