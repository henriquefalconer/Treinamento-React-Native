import React from "react";
import { View, Image, Text } from "react-native";
import { baseDeDados, loggedInUser } from "../../../utilities/baseDeDados";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PiusSearchBar({username, onPress}) {
    const infoUsuario = baseDeDados.getDadosUsuarioFromUsername(username).infoUsuario;

    return (
        <TouchableOpacity
            onPress={() => onPress(username)} 
        >
            <View style={{
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                flex: 1,
            }}>
                <Image 
                    style={{
                        height: 47,
                        width: 47,
                        borderRadius: 25, 
                        backgroundColor: '#ddd',
                        marginRight: 10, 
                    }}
                    source={infoUsuario.avatar}    
                />
                <View>
                    <Text style={{
                        fontSize: 15,
                    }}>
                        {infoUsuario.nome}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            color: '#999'
                        }}>
                            @{infoUsuario.username}
                        </Text>
                        {
                            baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.seguindo.includes(infoUsuario.username)
                            ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{
                                    backgroundColor: '#bbb',
                                    height: 5,
                                    width: 5,
                                    borderRadius: 3,
                                    top: 0.8,
                                    marginHorizontal: 6, 
                                }} />
                                <Text style={{
                            color: '#999'
                                }}>
                                    Seguindo
                                </Text>
                            </View>
                            : null
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};