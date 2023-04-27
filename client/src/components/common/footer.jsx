import React from "react";

const CssClasses = {
    FOOTER: "footer",
    lINKS: "footer__links"
}

const Footer = () => {

    return (
        <footer className="footer">
            <div className="container">
                <p>ⓒ 2023 Lorem ipsum dolor</p>

                <div className={CssClasses.lINKS}>
                    <a href="https://github.com/DariaBrusnitsina" target="_blank"><i className="bi bi-github"></i></a>
                    <a href="https://result.school" target="_blank"><img src="https://result.school/_next/static/media/main-logo-black.85858284.svg" alt=""/></a>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
