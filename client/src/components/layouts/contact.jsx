import React from "react";

const CssClasses = {
    CONTACT: "contact",
    NAME: "contact__name",
    LIST: "contact__list",
}

const Contact = () => {
    return (
    <div className={CssClasses.CONTACT + " container"}>
        <h1 className={CssClasses.NAME}>Duis Aute</h1>
        <div className={CssClasses.LIST}>
            <h2>Get in touch</h2>
            <ul>
                <li><a href="#"><i className="bi bi-whatsapp"></i> duisaute</a></li>
                <li><a href="#"><i className="bi bi-envelope"></i> duisaute@mail.rue</a></li>
                <li><a href="#"><i className="bi bi-telephone"></i> +2-345-678-97-47e</a></li>
                <li><a href="#"><i className="bi bi-geo"></i> Neque, Porro quisquam 45, 123414</a></li>

            </ul>

        </div>
    </div>
    );
};

export default Contact;
