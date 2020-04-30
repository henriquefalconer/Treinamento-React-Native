import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import HollowTextField from "../components/HollowTextField";
import BlandHeader from "../components/BlandHeader";

function SignUpScreenNext({navigation}) {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <BlandHeader navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Cadastro</Text>
        
                <View>
                    <HollowTextField placeholder="Data de nascimento"></HollowTextField>
                    <HollowTextField placeholder="Senha"></HollowTextField>
                    <HollowTextField placeholder="Confirme sua senha"></HollowTextField>
                </View>

                <FilledButton width={170} height={47} textStyle={styles.smallButtonText} text="Continuar" onPress={() => navigation.navigate('Login')} />
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

export default SignUpScreenNext;
