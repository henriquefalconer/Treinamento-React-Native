import React from "react";
import { View, Text } from "react-native";
import Modal from 'react-native-modal';
import FilledButton from "../General/FilledButton";

export default function StylizedModal({isVisible, onRequestClose, text}) {
    return (
        <Modal 
            isVisible={isVisible} 
            onRequestClose={onRequestClose}
        >
            <View 
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: 20,
                    borderRadius: 20,
                }}
            >
                <Text 
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        marginTop: 10,
                        marginHorizontal: 8,
                        marginBottom: 20,
                    }}
                >
                    {text}
                </Text>
                <FilledButton 
                    text="OK" 
                    onPress={onRequestClose}
                    textStyle={{fontSize: 17, color: "#fff"}} 
                    width={150}
                    height={47} 
                />
            </View> 
        </Modal>
    );
}