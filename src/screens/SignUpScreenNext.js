import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import FilledButton from "../components/FilledButton";
import HollowTextField from "../components/HollowTextField";
import BlandHeader from "../components/BlandHeader";
import FormScreensStyle from '../style/FormScreens/FormScreensStyle';

function SignUpScreenNext({navigation}) {
    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
        
                <View>
                    <HollowTextField placeholder="Data de nascimento"></HollowTextField>
                    <HollowTextField placeholder="Senha"></HollowTextField>
                    <HollowTextField placeholder="Confirme sua senha"></HollowTextField>
                </View>

                <FilledButton width={170} height={47} textStyle={FormScreensStyle.smallButtonText} text="Continuar" onPress={() => navigation.navigate('Login')} />
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreenNext;
