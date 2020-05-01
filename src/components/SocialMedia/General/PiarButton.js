import React from "react";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function PiarButton() {
    return (
        <View style={{
            position: 'absolute',
            bottom: 60,
            right: 10,
            height: 70,
            width: 70,
            borderRadius: 50,
            padding: 12,
            backgroundColor: "#f21d1d",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            <Image source={require('../../../../assets/Piar.jpg')} style={{
                height: undefined,
                width: undefined,
                flex: 1,
            }}/>
        </View>
    );
};

export default PiarButton;