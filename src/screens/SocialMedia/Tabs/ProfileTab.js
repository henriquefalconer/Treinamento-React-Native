import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileContent from "../../../components/SocialMedia/Profile/ProfileContent";
import { loggedInUser } from '../../../utilities/baseDeDados';

const Stack = createStackNavigator();

export default function ProfileTab() {
    return (
        <Stack.Navigator 
            initialRouteName="Profile" 
            headerMode="none"
        > 
            <Stack.Screen 
                name="Profile" 
                component={ProfileContent} 
                initialParams={{
                    selectedUsername: loggedInUser,
                    canGoBack: false,
                }}
            />
        </Stack.Navigator>
    );
}