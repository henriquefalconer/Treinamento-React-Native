import React, { useState } from "react";
import NotificationsContent from "../../../components/SocialMedia/Notifications/NotificationsContent";
import ProfileTab from "./ProfileTab";

export default function NotificationTab(props) {
    let [selectedUsername, setSelectedUsername] = useState(null);

    return (
        selectedUsername == null 
            ? <NotificationsContent 
                {...props} 
                onPressUser={setSelectedUsername} 
            /> 
            : <ProfileTab 
                {...props} 
                selectedUsername={selectedUsername} 
                onReturnFromSearch={() => setSelectedUsername(null)} 
            />
    );
}