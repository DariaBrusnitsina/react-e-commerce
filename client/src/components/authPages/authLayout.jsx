import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";


const AuthLayout = () => {
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
        <div className="login__page">
                    {formType === "register" ? (
                        <div className="register__card">
                            <RegisterForm />
                            <p className="dont_have_account">
                                Already have an account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign In
                                </a>
                            </p>
                        </div>
                    ) : (
                        <div className="login__card">
                            <LoginForm path={"/shop"}/>
                            <p className="dont_have_account">
                                Don't have an account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    )}
        </div>
    );
};

export default AuthLayout;
