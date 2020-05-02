import React from "react";
import { View, Text, Image } from "react-native";

function SemPius() {
    return (
        <View style={{height: 120, paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: 50, width: 50}} source={require('../../../../assets/semPius.png')}></Image>
            <Text style={{color: "#888", fontSize: 16}}>Sem mais pius...</Text>
        </View>
    );
};

export default SemPius;