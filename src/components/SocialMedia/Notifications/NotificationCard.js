import React from "react";
import { View, Text, Image } from "react-native";
import * as GeneralFunctions from "../../../utilities/GeneralFunctions";
import { baseDeDados } from "../../../utilities/baseDeDados";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NotificationCard({ notificationInfo, onPressUser }) {
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
            <TouchableOpacity
                onPress={() => onPressUser(notificationInfo.user)}
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
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPressUser(notificationInfo.user)}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                    }}
                >
                    {notificationInfo.user}
                </Text>
            </TouchableOpacity>
            <Text>
                {
                    notificationInfo.type == 'follow'
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