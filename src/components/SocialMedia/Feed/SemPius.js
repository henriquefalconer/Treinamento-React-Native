import React from "react";
import { View, Text, Image } from "react-native";

function SemPius({ footerMode=true }) {
    return (
        <View style={{height: footerMode ? 120 : 250, paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: footerMode ? 50 : 80, width: footerMode ? 50 : 80}} source={require('../../../../assets/semPius.png')}></Image>
            <Text style={{color: "#888", fontSize: 16}}>
                {footerMode ? "Sem mais pius..." : "Não há pius..."}
            </Text>
        </View>
    );
};

export default SemPius;