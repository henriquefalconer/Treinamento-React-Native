import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationsContent from "../../../components/SocialMedia/Notifications/NotificationsContent";
import ProfileContent from "../../../components/SocialMedia/Profile/ProfileContent";

const Stack = createStackNavigator();

export default function FeedTab() {
    return (
        <Stack.Navigator 
            initialRouteName="Notifications" 
            headerMode="none"
        > 
            <Stack.Screen 
                name="Notifications" 
                component={NotificationsContent}
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileContent}
            />
        </Stack.Navigator>
    );
}