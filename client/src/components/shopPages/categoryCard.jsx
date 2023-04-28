import React from "react";

const CssClasses = {
    CARD: "categories__card"
}

const CategoryCard = ({item}) => {
    return (
        <div className={CssClasses.CARD} style={{'backgroundImage': `url(${item.url})`}}>
            <p>{item.name}</p>
        </div>
    );
};

export default CategoryCard;
