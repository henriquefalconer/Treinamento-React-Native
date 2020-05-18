import React, { useState } from "react";
import SearchContent from "../../../components/SocialMedia/Search/SearchContent";
import ProfileTab from "./ProfileTab";

export default function SearchTab(props) {
    let [selectedUsername, setSelectedUsername] = useState(null);

    return selectedUsername == null 
        ? <SearchContent 
            {...props} 
            onPressUser={setSelectedUsername} 
        /> 
        : <ProfileTab 
            {...props} 
            selectedUsername={selectedUsername} 
            onReturnFromSearch={() => setSelectedUsername(null)} 
        />
}