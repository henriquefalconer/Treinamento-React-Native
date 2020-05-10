import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedTab from './Tabs/FeedTab';
import SearchTab from './Tabs/SearchTab';
import NotificationsTab from './Tabs/NotificationsTab';
import ProfileTab from './Tabs/ProfileTab';

import IconWithBadge from "../../components/SocialMedia/General/IconWithBadge";
import CustomStatusBar from "../../components/General/CustomStatusBar";

const Tab = createBottomTabNavigator();

export default function SocialMediaScreen() {
  return (
      <View style={styles.background}>
        <CustomStatusBar barStyle='dark-content' backgroundColor="#fff" />
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let badgeCount;

                    switch (route.name) {
                        case 'Feed':
                            iconName = focused
                                ? 'md-home'
                                : 'md-home';
                            badgeCount = 0;
                            break;
                        case 'Search':
                            iconName = focused
                                ? 'ios-search'
                                : 'ios-search';
                            badgeCount = 0;
                            break;
                        case 'Notifications':
                            iconName = focused
                                ? 'md-notifications'
                                : 'md-notifications';
                            badgeCount = 3;
                            break;
                        case 'Profile':
                            iconName = focused
                                ? 'md-person'
                                : 'md-person';
                            badgeCount = 0;
                            break;
                        default:
                            break;
                    }

                    return <IconWithBadge name={iconName} size={28} color={color} badgeCount={badgeCount} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: '#F21D1D',
                inactiveTintColor: 'gray',
                showLabel: false,
            }}
        >
            <Tab.Screen name="Feed" component={FeedTab} />
            <Tab.Screen name="Search" component={SearchTab} />
            <Tab.Screen name="Notifications" component={NotificationsTab} />
            <Tab.Screen name="Profile" component={ProfileTab} />
        </Tab.Navigator>
      </View>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#eee',
    },
});