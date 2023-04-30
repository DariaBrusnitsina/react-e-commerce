import React, { useState } from "react";

const CssClasses = {
    LABEL: "input-label",
    FIELD: "input-field",
    NULL: "input-group is-null",
    INVALID: "input-group is-invalid",
    VALID: "input-group",
    EYE: "eye-btn",
    FEEDBACK: "invalid-feedback"
}

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        if (error) {
            if (!value) {
                return CssClasses.NULL
            } else {
                return CssClasses.INVALID
            }
        } else {
            return CssClasses.VALID
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className={getInputClasses()}>
            <label className={CssClasses.LABEL} htmlFor={name}>{label}</label>
            <div>
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={CssClasses.FIELD}
                />
                {type === "password" && (
                        <button
                            className={CssClasses.EYE}
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
                {error && <div className={CssClasses.FEEDBACK}>{error}</div>}
            </div>
        </div>
    );
};

export default TextField;
