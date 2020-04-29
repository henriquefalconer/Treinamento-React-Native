import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import HollowTextField from "../components/HollowTextField";
// import ReturnArrow from '../../assets/return.svg';

function LoginScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
    
            <View>
                <HollowTextField placeholder="Nome de usuário"></HollowTextField>
                <HollowTextField placeholder="Senha"></HollowTextField>
            </View>

            <FilledButton width={170} height={47} textStyle={styles.smallButtonText} text="Continuar" onPress={() => {}} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 40,
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 30,
      color: '#F21D1D',
      textAlign: 'center',
    },
    smallButtonText: {
        fontSize: 20,
        color: "#FFF",
    },
});

export default LoginScreen;
