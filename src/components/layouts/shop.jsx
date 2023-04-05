import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import Navigation from "../navigation";
import ShopPage from "../pages/shopPage/shopPage";
import ItemPage from "../pages/itemPage/itemPage";

const Shop = () => {
    const params = useParams();
    const { itemId } = params;
    const [cartNumber, setCartNumber] = useState(0)

    const handleChangeCart = () => {
        const cartValue = localStorage.getItem("cart")

        if (cartValue) {
            const cartNum = JSON.parse(cartValue).length
            setCartNumber(cartNum)
        } else {
            setCartNumber(0)
        }
    }

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
            {itemId ? <ItemPage itemId={itemId} /> : <ShopPage onChangeCart={handleChangeCart}/>}
            </div>
        </main>
    </div>
    );
};

export default Shop;
