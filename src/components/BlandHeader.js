import React from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function BlandHeader({navigation, title}) {
    return (
        <View 
            style={{
                alignSelf: 'stretch', 
                alignItems: 'center', 
                justifyContent: 'flex-start', 
                flexDirection: 'row',
            }}
        >
            <TouchableOpacity 
                style={{
                    width: 40, 
                    height: 40, 
                    margin: 10,
                }} 
                onPress={
                    () => navigation.goBack()
                }
            >
                <Image 
                    style={{
                        height: undefined, 
                        width: undefined, 
                        flex: 1, 
                    }} 
                    source={
                        require('../../assets/red-back-arrow.jpg')
                    } 
                />
            </TouchableOpacity>
            <Text>{title || ''}</Text>
        </View>
    );
};

export default BlandHeader;