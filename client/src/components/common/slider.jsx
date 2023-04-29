import React, {useState} from "react";
import CategoryCard from "../shopPage/categoryCard";

const CssClasses = {
    SLIDER: "slider",
    LIST: "navigation__list",
    ITEM: "navigation--item"
}

const Slider = ({ array }) => {
    const [index, setIndex] = useState([0,1,2])
    let importedArray = [...array]
    let sliced = []
    index.map((i) => {
        sliced.push(importedArray[i])
    })
    const [sliders, setSliders] = useState(sliced)

    function handleIncrement() {
        sliced = []
        let newIndexes = []
        index.map((i) => {
            if (i === importedArray.length-1) {
                newIndexes.push(0)
                sliced.push(importedArray[0])
            } else {
                newIndexes.push(i+1)
                sliced.push(importedArray[i+1])
            }
        })
        setIndex(newIndexes)
        setSliders(sliced)
    }

    function handleDecrement() {
        sliced = []
        let newIndexes = []
        index.map((i) => {
            if (i === 0) {
                newIndexes.push(importedArray.length-1)
                sliced.push(importedArray[importedArray.length-1])
            } else {
                newIndexes.push(i-1)
                sliced.push(importedArray[i-1])
            }
        })
        setIndex(newIndexes)
        setSliders(sliced)
    }

    return (
        <div className={CssClasses.SLIDER}>
            <button onClick={handleDecrement}>←</button>
            {sliders.map((item) =>
                <CategoryCard item={item}/>
            )}
            <button onClick={handleIncrement}>→</button>
        </div>
    );
};

export default Slider;
