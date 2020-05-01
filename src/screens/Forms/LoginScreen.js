import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
// import ReturnArrow from '../../assets/return.svg';

function LoginScreen({navigation}) {
    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Login</Text>
        
                <View>
                    <HollowTextField 
                        placeholder="Nome de usuário"
                    >
                    </HollowTextField>

                    <HollowTextField 
                        placeholder="Senha"
                    >
                    </HollowTextField>
                </View>

                <FilledButton 
                    width={170} 
                    height={47} 
                    textStyle={FormScreensStyle.continueButtonText} 
                    text="Continuar" 
                    onPress={
                        () => navigation.navigate('SocialMedia')
                    } 
                />
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;
