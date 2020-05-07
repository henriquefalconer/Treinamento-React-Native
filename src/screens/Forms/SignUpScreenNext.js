import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import { useState } from 'react';

function SignUpScreenNext({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
        
                <View>
                    <HollowTextField 
                        placeholder="Insire o email"
                        value={email}
                        onChange = {valor => setEmail(valor)}
                        onTextSubmit={() => console.log('email enviado')}
                    >
                    </HollowTextField>
                    {/* <HollowTextField placeholder="Data de nascimento"></HollowTextField> */}
                    <HollowTextField 
                        placeholder="Senha"
                        value={password}
                        onChange={valor => setPassword(valor)}
                        onTextSubmit={() => console.log('senha enviada')}
                    >
                    </HollowTextField>
                    {/* <HollowTextField 
                        placeholder="Confirme sua senha"
                        value={passwordConfirm}
                        onChange={valor => setPasswordConfirm(valor)}
                    >
                    </HollowTextField> */}
                </View>

                <FilledButton width={170} height={47} textStyle={FormScreensStyle.continueButtonText} text="Cadastrar" onPress={() => navigation.navigate('SocialMedia')} />
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreenNext;
