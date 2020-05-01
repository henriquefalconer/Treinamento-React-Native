import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PiuAction from "./PiuAction";
import IconType from '../../../utilities/constants';
import PiuReply from "./PiuReply";

export default function Piu({piuData, piuReplyData}) {
    return (
        <View style={{padding: 8, backgroundColor: '#fff', marginBottom: 8}}>
            <View style={{flexDirection: 'row'}} >
                <View>
                    <Image style={{
                            width: 45,
                            height: 45,
                        }} 
                        source={piuData.avatar} />
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
                        }} >{piuData.name}</Text>
                        <Text style={{
                            color: "#8F8F8F",
                            fontSize: 15,
                            fontFamily: 'Sana',
                            }} >@{piuData.username}</Text>
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
                        }} >{piuData.time}</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 15,
                        }} >{piuData.message}</Text>
                    </View>
                    {piuReplyData != undefined && <PiuReply piuReplyData={piuReplyData} />}
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
                    actionCount={piuData.likes} 
                    active={piuData.likesActive} />
                <PiuAction 
                    iconType={IconType.MaterialCommunityIcons} 
                    icon="chat" 
                    size={21} 
                    actionCount={piuData.replies} 
                    active={piuData.repliesActive} />
                <PiuAction 
                    iconType={IconType.MaterialCommunityIcons} 
                    icon="pin" 
                    size={20} 
                    active={piuData.pinned} />
            </View>
        </View>
    );
};