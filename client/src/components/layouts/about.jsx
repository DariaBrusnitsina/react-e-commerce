import React from "react";
import {AboutPageTexts} from "../../content/texts";

const CssClasses = {
    ABOUT: "about-page",
    TITLE: "title",
    SUBTITLE: "subtitle",
    LIST: "about-page__list"
}

const About = () => {
    return (
    <div className={CssClasses.ABOUT + " container"}>
        <img alt="about" src="https://sun9-66.userapi.com/impg/bK_3aMF5Z0Y_5pM48jDOdYuq0rKw_u4W76FgCA/G23G9CJnyCg.jpg?size=1201x1600&quality=95&sign=41196dca9b1a8d3ea9d2a773cd3ef5af&type=album"  width={470}/>

        <div>
            <h1 className={CssClasses.TITLE}>{AboutPageTexts.TITLE}</h1>
            <p className={CssClasses.SUBTITLE}>{AboutPageTexts.SUBTITLE}</p>
            <ul className={CssClasses.LIST}>
                <li>{AboutPageTexts.LIST1}</li>
                <li>{AboutPageTexts.LIST2}</li>
                <li>{AboutPageTexts.LIST3}</li>
                <li>{AboutPageTexts.LIST4}</li>
            </ul>
        </div>
    </div>
    );
};

export default About;
