import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PiuAction from "./PiuAction";
import IconType from '../../../utilities/constants';

export default function Piu() {
    return (
        <View style={{padding: 10, marginBottom: 10}}>
            <View style={{flexDirection: 'row'}} >
                <View style={{
                    width: 50,
                    height: 100,
                }}
                >
                    <Image style={{
                            width: 50,
                            height: 50,
                        }} 
                        source={require("../../../../assets/avatars/Cleber.jpg")} />
                </View>
                <View style={{
                        marginHorizontal: 10,
                        flex: 1,
                }} >
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginVertical: 10,
                    }} >
                        <Text style={{
                            marginRight: 6,
                            fontWeight: "bold",
                        }} >Cleber Cunha</Text>
                        <Text style={{
                            color: "#8F8F8F",
                            }} >@cleber.cunha</Text>
                        <View style={{
                            backgroundColor: "#C4C4C4", 
                            height: 5, 
                            width: 5, 
                            borderRadius: 2.5,
                            marginHorizontal: 8,
                        }} />
                        <Text style={{
                            color: "#8F8F8F",
                        }} >2.5 h</Text>
                    </View>
                    <View>
                        <Text>
                            Este é meu 100º piu! Esperei bastante por este momento!
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{
                marginHorizontal: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
            }} >
                <PiuAction iconType={IconType.Ionicons} icon="ios-heart" size={19} actionCount={23} color="#aaa" />
                <PiuAction iconType={IconType.MaterialCommunityIcons} icon="chat" size={21} actionCount={2} color="#aaa" />
                <PiuAction iconType={IconType.MaterialCommunityIcons} icon="pin" size={20} color="#aaa" />
            </View>
        </View>
    );
};