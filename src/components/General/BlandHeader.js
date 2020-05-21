import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AllIcons from "./AllIcons";
import { IconType } from "../../utilities/constants";

function BlandHeader({navigation}) {
    return (
        <View 
            style={{
                alignSelf: 'stretch', 
                alignItems: 'center', 
                justifyContent: 'flex-start', 
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 5,
            }}
        >
            <TouchableOpacity 
                style={{
                    width: 40, 
                    height: 40, 
                    justifyContent: 'center',
                    alignItems: 'center',
                }} 
                onPress={
                    () => navigation.goBack()
                }
            >
                <AllIcons 
                    iconType={IconType.Ionicons}
                    name="ios-arrow-back"
                    size={33}
                    color="#f21d1d"
                />
            </TouchableOpacity>
        </View>
    );
};

export default BlandHeader;