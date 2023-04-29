import React from "react";

const ToggleButton = ({text, btn, toggle}) => {
    return (
        <p style={{margin: "20px 0"}}>
            {text}
            <button role="button" onClick={toggle} style={{color: "#81b4e5"}}>{btn}</button>
        </p>
    );
};

export default ToggleButton;
