import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function BlandHeader({navigation}) {
    return (
        <View 
            style={{
                alignSelf: 'stretch', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
                backgroundColor: "#fff",
                height: 52,
            }}
        >
            <TouchableOpacity onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
            }}>
                <Text style={styles.logout}>
                    Logout
                </Text>
            </TouchableOpacity>
            <Image 
                style={{
                    width: 50, 
                    height: 50, 
                    marginVertical: 1,
                }} 
                source={
                    require('../../../../assets/logo.jpg')
                } 
            />
            <Text style={{...styles.logout, color: 'transparent'}}>
                Logout
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    logout: {
        color: "#F21D1D",
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingRight: 15,
    }
});

export default BlandHeader;