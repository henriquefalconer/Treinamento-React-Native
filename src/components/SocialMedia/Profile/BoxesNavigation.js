import React from "react";
import { StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';

function BoxesNavigation({title, active, onPress}) {
    return (
        <View
            style={{
                flex: 1, 
                borderBottomWidth: active ? 2.5 : 1,
                borderBottomColor: active ? '#f21d1d' : '#999',
                justifyContent: 'center',
            }}
        >
        <TouchableOpacity style={{flex: 1}} onPress={() => onPress()}>
            <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: 10,
                }}>{title}</Text>
        </TouchableOpacity>
        </View>
    );
};

export default BoxesNavigation;