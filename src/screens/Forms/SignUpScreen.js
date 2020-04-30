import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';

function SignUpScreen({navigation}) {
    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
        
                <View>
                    <HollowTextField placeholder="Insire seu nome"></HollowTextField>
                    <HollowTextField placeholder="Insire o nome de usuário"></HollowTextField>
                    <HollowTextField placeholder="Insire o email"></HollowTextField>
                </View>

                <FilledButton width={170} height={47} textStyle={FormScreensStyle.continueButtonText} text="Próximo" onPress={() => navigation.navigate('CadastroNext')} />
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreen;
