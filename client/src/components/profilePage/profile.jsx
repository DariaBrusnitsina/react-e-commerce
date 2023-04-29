import React from "react";
import { useSelector } from "react-redux";
import {getCurrentUserData} from "../../store/users";
import {useParams} from "react-router-dom";
import ProfileInfo from "./profileInfo";
import ProfileEdit from "./profileEdit";
import OrdersList from "./profileOrdersPage";


const Profile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const params = useParams();
    const { userId, edit } = params;

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
