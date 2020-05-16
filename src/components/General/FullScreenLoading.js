import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Modal from 'react-native-modal';

export default function FullScreenLoading({ isLoading, text="Carregando..." }) {
    return (
        <Modal 
            transparent
            visible={isLoading}
        >
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}
            >
                <ActivityIndicator 
                    size='large'
                    color='#888'
                />
                {
                    text === null 
                    ? null
                    : <Text 
                        style={{
                            fontSize: 20,
                            marginTop: 10,
                            color: '#777',
                        }}
                    >
                        {text}
                    </Text>
                }
            </View>
        </Modal>
    );
};