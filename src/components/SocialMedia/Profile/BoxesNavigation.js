import React from "react";
import { StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';

function BoxesNavigation({title, active=false, onPress}) {
    return (
        <View
            style={{
                borderBottomWidth: active ? 2.5 : 1,
                borderBottomColor: active ? '#FF0800' : '#999',
                flex: 1,
                justifyContent: 'center',
                height: 60,
        }}>
            <TouchableOpacity onPress={onPress} >
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: 10,
                }}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BoxesNavigation;