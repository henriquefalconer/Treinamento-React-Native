import React from "react";
import { View, Text, Image } from "react-native";
import { getRelativeTime, getTimeFromPiuId, getApiPiuIdFromPiuId } from "../../../utilities/GeneralFunctions";
import { baseDeDados } from "../../../utilities/baseDeDados";
import { firstLastName } from "../../../utilities/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

function PiuReply({ piuReplyId, onPressUser=(() => {}) }) {
    const infoUsuario = baseDeDados.getInfoUsuarioFromPiuId(piuReplyId);
    const piuReplyData = baseDeDados.getDadosPiuFromPiuId(piuReplyId);

    function montarPiuReplyConteudo() {
        if (getApiPiuIdFromPiuId(piuReplyId) == 'deleted') {
            return (
                <Text style={{
                    textAlign: 'center',
                    paddingVertical: 20,
                }}>
                    O piu mencionado foi deletado...
                </Text>
            );
        }

        if (infoUsuario == null || piuReplyData == null) {
            return (
                <Text style={{
                    textAlign: 'center',
                    paddingVertical: 20,
                }}>
                    Houve um erro ao carregar o piu...
                </Text>
            );
        }

        return (
            <View style={{
                flex: 1,
                paddingBottom: 15,
            }} >
                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginTop: 10,
                }} >
                    <TouchableOpacity
                        onPress={() => onPressUser(infoUsuario.username)}
                    >
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
                                source={infoUsuario.avatar} 
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onPressUser(infoUsuario.username)}
                    >
                        <Text 
                            style={{
                                fontWeight: "bold",
                                fontSize: 15,
                            }} 
                        >
                            {firstLastName(infoUsuario.nome)}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onPressUser(infoUsuario.username)}
                    >
                        <Text 
                            style={{
                                color: "#8F8F8F",
                                fontSize: 15,
                                display: 'none',
                            }} 
                        >
                            @{infoUsuario.username}
                        </Text>
                    </TouchableOpacity>
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
        
    }

    return (
        <View style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#ddd",
            paddingHorizontal: 15,
            marginTop: 10,
            marginBottom: 3,
        }}>
            {montarPiuReplyConteudo()}
        </View>
    );
};

export default PiuReply;