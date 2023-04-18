import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        if (error) {

            if (!value) {
                return "input-group" + " is-null"
            } else {
                return "input-group" + " is-invalid"
            }
        } else {
            return "input-group"
        }

        return "input-group" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className={getInputClasses()}>
            <label className="input-label" htmlFor={name}>{label}</label>
            <div>
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="input-field"
                />
                {type === "password" && (
                        <button
                            className="eye-btn"
                            type="button"
                            onClick={toggleShowPassword}
                        >
                            <i
                                className={
                                    "bi bi-eye" + (showPassword ? "-slash" : "")
                                }
                            ></i>
                        </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

export default TextField;
