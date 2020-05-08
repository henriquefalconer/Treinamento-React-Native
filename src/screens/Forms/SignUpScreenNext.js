import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import { useState } from 'react';

function hasError(data) {
    return !Object.keys(data).includes('id');
}

function signUp({first_name, last_name, username, email, password}) {
    return fetch(
        'http://piupiuwer.polijr.com.br/usuarios/', 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'first_name': first_name, 
                'last_name': last_name, 
                'username': username,
                'email': email,
                'password': password,
            })
        }
    )
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        if (hasError(json)) {
            return 'Insira os dados corretamente.';
        } else {
            return null;
        }
    })
    .catch((error) => {
        console.log(error);
        return 'Erro de conexão.';
    });
}

function SignUpScreenNext({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
        
                <View>
                    <Text style={{color: 'red'}}>{errorText}</Text>
                    <HollowTextField 
                        placeholder="Insire o email"
                        value={email}
                        onChange = {valor => setEmail(valor)}
                    />
                    <HollowTextField 
                        placeholder="Senha"
                        value={password}
                        onChange={valor => setPassword(valor)}
                    />
                </View>

                <FilledButton width={170} height={47} textStyle={FormScreensStyle.continueButtonText} text="Cadastrar" onPress={async () => {
                        const error = await signUp({
                            first_name: 'aa', 
                            last_name: 'áa', 
                            username: 'tr', 
                            email: 'h@s.com', 
                            password: 'ddf', 
                        });
                        
                        if (error != null) {
                            setErrorText(error);
                        } else {
                            setErrorText('');
                            navigation.navigate('SocialMedia');
                        }
                    }} 
                />
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreenNext;
