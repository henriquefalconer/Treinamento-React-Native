import React from "react";
import { StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';

function BoxesNavigation({title}) {
    return (
        <TouchableOpacity>
            <View
                style={{
                    borderBottomWidth: 2,
                    borderBottomColor: '#999'
            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BoxesNavigation;