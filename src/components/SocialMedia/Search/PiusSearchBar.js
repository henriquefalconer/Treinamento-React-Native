import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AllIcons from "../../General/AllIcons";
import { IconType } from "../../../utilities/constants";

export default function PiusSearchBar({
        placeholder="Pesquisar no PiuPiuwer", 
        onChange, 
        value, 
        onSubmitEditing, 
        onFocus,
        style, 
        active=false,
    }) {

    return (
        <View style={{
            backgroundColor: active ? null : "#e3e3e3",
            borderColor: active ? "#f21d1d" : "#e3e3e3",
            borderWidth: 2,
            borderRadius: 30,
            paddingLeft: 15,
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            ...style,
        }}>
            <AllIcons 
                iconType={IconType.Ionicons}
                name="ios-search"
                size={23}
                color="#999"
            />
            <TextInput 
                style={{
                    fontSize: 16,
                    flex: 1,
                    marginLeft: 10, 
                }} 
                onFocus={onFocus}
                placeholder={placeholder} 
                onChangeText={onChange}
                autoCapitalize='none'
                autoCorrect={false}
                value={value}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
};