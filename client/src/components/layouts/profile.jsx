import React from "react";
import { useSelector } from "react-redux";
import {getCurrentUserData} from "../../store/users";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import ProfileInfo from "../pages/profileInfo";
import ProfileEdit from "../pages/profileEdit";

const Profile = () => {
    const currentUser = useSelector(getCurrentUserData());

    const params = useParams();
    const { userId, edit } = params;
    const navigate = useNavigate();
    console.log(currentUser)

    const handleClick = () => {
        navigate(currentUser._id + "/edit");
    };


    return (
        <>
        {userId ? (
                edit ? (
                    <ProfileEdit user={currentUser}/>
                ) : (
                    <ProfileInfo user={currentUser} />
                )
            ) : (
                <h1>Loading</h1>
            )}
        </>
    )
};

export default Profile;
