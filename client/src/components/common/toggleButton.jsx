import React from "react";
import {NavLink} from "react-router-dom";

const ToggleButton = ({text, btn, to}) => {
    return (
        <p style={{margin: "20px 0"}}>
            {text}
            <NavLink to={`/auth/${to}`} style={{color: "#81b4e5"}}>{btn}</NavLink>
        </p>
    );
};

export default ToggleButton;
