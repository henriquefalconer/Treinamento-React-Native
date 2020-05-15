import React from "react";
import { View, Modal, ActivityIndicator } from "react-native";

export default function FullScreenLoading({ isLoading }) {
    return (
        <Modal 
            transparent
            visible={isLoading}
        >
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: `rgba(0,0,0,0.1)`
                }}
            >
                <ActivityIndicator />
            </View>
        </Modal>
    );
};