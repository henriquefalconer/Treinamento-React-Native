import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as GeneralFunctions from "../../../utilities/GeneralFunctions";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { baseDeDados } from "../../../utilities/baseDeDados";

function NotificationCard({ notificationInfo }) {
    const infoUsuario = baseDeDados.getDadosUsuarioFromUsername(notificationInfo.user).infoUsuario;

    return (
        <View 
            style={{
                height: 65,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
            }}
        >
            <Image
                style={{
                    height: 45, 
                    width: 45,
                    borderRadius: 25,
                    marginRight: 10,
                }}
                source={infoUsuario.avatar}
            />
            <Text
                style={{
                    fontWeight: '600',
                }}
            >
                {notificationInfo.user}
            </Text>
            <Text>
                {
                    notificationInfo.type == 'like'
                    ? ' começou a seguir você. '
                    : ' deu um like no seu piu. '
                }
            </Text>
            <Text
                style={{
                    color: '#aaa'
                }}
            >
                {GeneralFunctions.getRelativeTime(notificationInfo.time)}
            </Text>
        </View>
    );
}

function NotificationTab({navigation}) {
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
    ];

    return (
        <SafeAreaView style={styles.background}>
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default NotificationTab;