import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedContent from "../../../components/SocialMedia/Feed/FeedContent";
import ProfileContent from "../../../components/SocialMedia/Profile/ProfileContent";

const Stack = createStackNavigator();

export default function FeedTab() {
    return (
        <Stack.Navigator 
            initialRouteName="Feed" 
            headerMode="none"
        > 
            <Stack.Screen 
                name="Feed" 
                component={FeedContent}
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileContent}
            />
        </Stack.Navigator>
    );
}