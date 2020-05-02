import React from "react";
import { View, Text, Image } from "react-native";
import PiuAction from "./PiuAction";
import PiuReply from "./PiuReply";
import { IconType, firstLastName } from '../../../utilities/constants';
import { baseDeDados, loggedInUser } from "../../../utilities/baseDeDados";
import { getRelativeTime, getTimeFromPiuId } from "../../../utilities/GeneralFunctions";

export default function Piu({piuId}) {
    const infoUsuario = baseDeDados.getDadosUsuarioFromPiuId(piuId);
    const piuData = baseDeDados.getDadosPiuFromPiuId(piuId);

    return (
        <View style={{padding: 8, backgroundColor: '#fff', marginBottom: 8}}>
            <View style={{flexDirection: 'row'}} >
                <View>
                    <Image style={{
                            width: 45,
                            height: 45,
                        }} 
                        source={infoUsuario.avatar} />
                </View>
                <View style={{
                        marginHorizontal: 10,
                        flex: 1,
                }} >
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginTop: 10,
                    }} >
                        <Text style={{
                            marginRight: 6,
                            fontWeight: "bold",
                            fontSize: 15,
                        }} >{firstLastName(infoUsuario.nome)}</Text>
                        <Text style={{
                            color: "#8F8F8F",
                            fontSize: 15,
                            fontFamily: 'Sana',
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
                        }} >{getRelativeTime(getTimeFromPiuId(piuId))}</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 15,
                        }} >{piuData.message}</Text>
                    </View>
                    {piuData.piuReplyId != undefined && 
                    (<PiuReply piuReplyId={piuData.piuReplyId} />)}
                </View>
            </View>
            <View style={{
                marginHorizontal: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                marginLeft: 50,
                marginRight: 45,
            }} >
                <PiuAction 
                    iconType={IconType.Ionicons} 
                    icon="ios-heart" 
                    size={19} 
                    actionCount={piuData.getLikes().length} 
                    active={(piuData.getLikes()).includes(loggedInUser)}
                    onPress={() => baseDeDados.togglePiuLike(piuId)} />
                <PiuAction 
                    iconType={IconType.MaterialCommunityIcons} 
                    icon="chat" 
                    size={21} 
                    actionCount={piuData.getReplies().length} 
                    active={(piuData.getReplies()).includes(loggedInUser)}
                    onPress={() => {}} />
                <PiuAction 
                    iconType={IconType.MaterialCommunityIcons} 
                    icon="pin" 
                    size={20} 
                    active={piuData.hasDestaque()}
                    onPress={() => baseDeDados.togglePiuDestaque(piuId)} />
            </View>
        </View>
    );
};