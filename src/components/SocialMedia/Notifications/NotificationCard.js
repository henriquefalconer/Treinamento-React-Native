import React from "react";
import { View, Text, Image } from "react-native";
import * as GeneralFunctions from "../../../utilities/GeneralFunctions";
import { baseDeDados } from "../../../utilities/baseDeDados";

export default function NotificationCard({ notificationInfo }) {
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
                    fontWeight: 'bold',
                }}
            >
                {notificationInfo.user}
            </Text>
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