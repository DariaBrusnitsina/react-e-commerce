import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import ToggleButton from "../common/toggleButton";

const CssClasses = {
    AUTH: "auth_page",
    CARD: "auth_page__card"
}

const AuthPage = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className={CssClasses.AUTH}>
            {formType === "register" ? (
                <div className={CssClasses.CARD}>
                    <RegisterForm />
                    <ToggleButton text="Already have an account? " btn="Sign In" toggle={toggleFormType}/>
                </div>
            ) : (
                <div className={CssClasses.CARD}>
                    <LoginForm path={"/shop"}/>
                    <ToggleButton text="Don't have an account? " btn="Sign Up" toggle={toggleFormType}/>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
