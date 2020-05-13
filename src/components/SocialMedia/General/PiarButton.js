import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import FilledButton from "../../FilledButton";

function PiarButton({navigation}) {
    return (
        <View>
            <View style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                borderRadius: 50,
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
                <TouchableOpacity
                    onPress={() => 
                        navigation.navigate('Piar')
                    }
                >
                    <View style={{
                        height: 70,
                        width: 70,
                        padding: 12,
                    }}>
                        <Image source={require('../../../../assets/Piar.png')} style={{
                            height: undefined,
                            width: undefined,
                            flex: 1,
                        }}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PiarButton;