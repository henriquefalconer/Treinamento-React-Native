import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import HollowTextField from "../components/HollowTextField";
import BlandHeader from "../components/BlandHeader";
// import ReturnArrow from '../../assets/return.svg';

function LoginScreen({navigation}) {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <BlandHeader navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
        
                <View>
                    <HollowTextField placeholder="Nome de usuário"></HollowTextField>
                    <HollowTextField placeholder="Senha"></HollowTextField>
                </View>

                <FilledButton width={170} height={47} textStyle={styles.smallButtonText} text="Continuar" onPress={() => {}} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
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
