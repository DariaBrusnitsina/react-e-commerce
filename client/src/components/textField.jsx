import React, { useState } from "react";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((pervState) => !pervState);
    };

    return (
        <div className="input-element">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input className={getInputClasses()} type={showPassword ? "text" : type} id={name} value={value} name={name} onChange={onChange}/>
                { type === "password" && <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}><i className={"bi bi-eye" + (showPassword ? "-slash-fill" : "-fill")}></i></button> }
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

export default TextField;
