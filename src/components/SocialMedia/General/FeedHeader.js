import React from "react";
import { View, Image, Text } from "react-native";

function BlandHeader() {
    return (
        <View 
            style={{
                alignSelf: 'stretch', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'row',
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
                backgroundColor: "#fff"
            }}
        >
            <Image 
                style={{
                    width: 50, 
                    height: 50, 
                    marginVertical: 1,
                }} 
                source={
                    require('../../../../assets/logo.jpg')
                } 
            />
        </View>
    );
};

export default BlandHeader;