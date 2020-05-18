import React, { useState } from "react";
import ProfileContent from "../../../components/SocialMedia/Profile/ProfileContent";
import { loggedInUser } from "../../../utilities/baseDeDados";

export default function ProfileTab(props) {
    let [profileTabSelectedUsername, setSelectedUsername] = useState(props.selectedUsername);

    function ReloadableProfileContent(props) {
        return <ProfileContent {...props} />;
    }

    return (
        profileTabSelectedUsername == undefined 
            ? <ReloadableProfileContent 
                {...props} 
                selectedUsername={loggedInUser} 
                onPressUser={(username) => setSelectedUsername(username)}
            />
            : <ReloadableProfileContent 
                {...props} 
                selectedUsername={profileTabSelectedUsername} 
                onReturnFromSearch={
                    props.onReturnFromSearch 
                        ? props.onReturnFromSearch 
                        : () => setSelectedUsername(props.selectedUsername)
                } 
                onPressUser={(username) => setSelectedUsername(username)}
            />
    );
}