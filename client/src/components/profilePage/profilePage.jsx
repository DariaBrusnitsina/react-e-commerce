import React from "react";
import { useSelector } from "react-redux";
import {getCurrentUserData} from "../../store/users";
import {useParams} from "react-router-dom";
import ProfileInfo from "./profileInfo";
import ProfileEdit from "./editForm";

const CssClasses = {
    AUTH: "auth_page",
    CARD: "auth_page__card"
}

const ProfilePage = () => {
    const currentUser = useSelector(getCurrentUserData());
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
        {userId ? (
                edit ? (
                    <div className={CssClasses.AUTH}>
                        <div className={CssClasses.CARD}>
                            <ProfileEdit user={currentUser}/>
                        </div>
                    </div>
                ) : (
                    <ProfileInfo user={currentUser} />
                )
            ) : (
                <h1>Loading</h1>
            )}
        </>
    )
};

export default ProfilePage;
