import React from "react";
import { View, Text, Image } from "react-native";
import { getRelativeTime, getTimeFromPiuId } from "../../../utilities/GeneralFunctions";
import { baseDeDados } from "../../../utilities/baseDeDados";

function PiuReply({piuReplyId}) {
    const infoUsuario = baseDeDados.getDadosUsuarioFromPiuId(piuReplyId);
    const piuReplyData = baseDeDados.getDadosPiuFromPiuId(piuReplyId);

    return (
        <View style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#ddd",
            paddingHorizontal: 15,
            marginTop: 10,
            marginBottom: 3,
            paddingBottom: 15,
        }}>
            <View style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                marginTop: 10,
            }} >
                <View style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        marginRight: 4,
                    }} 
                >
                    <Image style={{
                            width: 26,
                            height: 26,
                            borderRadius: 15,
                            backgroundColor: "#ddd"
                        }} 
                        source={infoUsuario.avatar} />
                </View>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 15,
                }} >{infoUsuario.nome}</Text>
                <Text style={{
                    color: "#8F8F8F",
                    fontSize: 15,
                    display: 'none',
                }} >@{infoUsuario.username}</Text>
                <View style={{
                    backgroundColor: "#C4C4C4", 
                    height: 5, 
                    width: 5, 
                    borderRadius: 2.5,
                    marginHorizontal: 8,
                }} />
                <Text style={{
                    color: "#8F8F8F",
                    fontSize: 15,
                }} >{getRelativeTime(getTimeFromPiuId(piuReplyId))}</Text>
            </View>
            <View style={{
                    flex: 1,
            }} >
                <View>
                    <Text style={{
                        fontSize: 15,
                    }} >{piuReplyData.message}</Text>
                </View>
            </View>
        </View>
    );
};

export default PiuReply;