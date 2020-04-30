import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";
import HollowTextField from "../components/HollowTextField";
import BlandHeader from "../components/BlandHeader";

function SignUpScreen({navigation}) {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <BlandHeader navigation={navigation} />
            <View style={styles.container}>
                <Text style={styles.title}>Cadastro</Text>
        
                <View>
                    <HollowTextField placeholder="Insire seu nome"></HollowTextField>
                    <HollowTextField placeholder="Insire o nome de usuário"></HollowTextField>
                    <HollowTextField placeholder="Insire o email"></HollowTextField>
                </View>

                <FilledButton width={170} height={47} textStyle={styles.smallButtonText} text="Próximo" onPress={() => navigation.navigate('CadastroNext')} />
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
      justifyContent: 'space-around',
      paddingVertical: 0,
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

export default SignUpScreen;
