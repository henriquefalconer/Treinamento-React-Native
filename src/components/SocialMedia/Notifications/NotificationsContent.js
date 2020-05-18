import React from "react";
import { View, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as GeneralFunctions from "../../../utilities/GeneralFunctions";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import NotificationCard from "./NotificationCard";

export default function NotificationsContent({ navigation, onPressUser }) {
    const notifications = [
        {
            type: 'like',
            user: 'cleber.cunha',
            piuId: GeneralFunctions.createPiuId({
                username: "cleber.cunha",
                time: Date.parse("15 Apr 2020 8:00:00"),
            }),
            time: Date.parse("15 Apr 2020 8:00:00"),
        },
        {
            type: 'follow',
            user: 'richar.lison',
            piuId: null,
            time: Date.parse("15 Apr 2020 9:00:00"),
        },
        {
            type: 'follow',
            user: 'rosi.plat',
            piuId: null,
            time: Date.parse("15 Apr 2020 10:00:00"),
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SocialMediaHeader navigation={navigation} />
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
            }}>
                <FlatList 
                    data={notifications}
                    keyExtractor={(element) => JSON.stringify(element)}
                    renderItem={
                        ({ item }) => {
                            return (
                                <NotificationCard
                                    notificationInfo={item}
                                    onPressUser={onPressUser}
                                />
                            )
                        }
                    }
                />
            </View>
            <PiarButton navigation={navigation} />
        </SafeAreaView>
    );
};