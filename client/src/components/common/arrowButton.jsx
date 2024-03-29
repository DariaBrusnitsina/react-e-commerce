import React from "react";
import {Link} from "react-router-dom";

const ArrowBtn = ({text, color, link}) => {

    let linkType = link[0] === "/"
        ?
        <Link to={link} style={{"color": color}}>{text}</Link>
        :
        <a href={link} style={{"color": color}}>{text}</a>

    return (
        <button className="arrow--btn">
            <svg style={{"fill": color}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-down"
                 viewBox="0 0 16 16">
                <path fillRule="evenodd"
                      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
            </svg>
            {linkType}
        </button>
    );
};

export default ArrowBtn;
