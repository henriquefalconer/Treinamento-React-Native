import React, { useState } from "react";
import FeedContent from "../../../components/SocialMedia/Feed/FeedContent";
import ProfileTab from "./ProfileTab";

export default function FeedTab(props) {
    let [selectedUsername, setSelectedUsername] = useState(null);

    return (
        selectedUsername == null 
            ? <FeedContent 
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