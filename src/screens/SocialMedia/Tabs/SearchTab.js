import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchContent from "../../../components/SocialMedia/Search/SearchContent";
import ProfileContent from "../../../components/SocialMedia/Profile/ProfileContent";

const Stack = createStackNavigator();

export default function FeedTab() {
    return (
        <Stack.Navigator 
            initialRouteName="Search" 
            headerMode="none"
        > 
            <Stack.Screen 
                name="Search" 
                component={SearchContent}
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileContent}
            />
        </Stack.Navigator>
    );
}