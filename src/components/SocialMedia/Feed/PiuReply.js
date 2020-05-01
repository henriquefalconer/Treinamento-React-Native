
import React from "react";
import { View, Text, Image } from "react-native";

function PiuReply({piuReplyData}) {
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
                <Image style={{
                        width: 30,
                        height: 30,
                        marginRight: 8,
                    }} 
                    source={piuReplyData.avatar} />
                <Text style={{
                    marginRight: 6,
                    fontWeight: "bold",
                    fontSize: 15,
                }} >{piuReplyData.name}</Text>
                <Text style={{
                    color: "#8F8F8F",
                    fontSize: 15,
                    fontFamily: 'Sana',
                    }} >@{piuReplyData.username}</Text>
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
                }} >{piuReplyData.time}</Text>
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