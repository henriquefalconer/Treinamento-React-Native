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
        return "Erro de conexão";
        console.log(error)
    })
}

function SignUpScreenNext({ route, navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorTexto, setErrorTexto] = useState('')
    const  { first_name, last_name, username } = route.params;

    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
        
                <View>
                    <Text style={FormScreensStyle.title}>{errorTexto}</Text>
                    <HollowTextField 
                        placeholder="Insire o email"
                        value={email}
                        onChange = {NovoEmail => setEmail(NovoEmail)}
                        // onTextSubmit={() => console.log('email enviado')}
                    >
                    </HollowTextField>

                    {/* <HollowTextField placeholder="Data de nascimento"></HollowTextField> */}

                    <HollowTextField 
                        placeholder="Senha"
                        value={password}
                        onChange={NovaSenha => setPassword(NovaSenha)}
                        // onTextSubmit={() => console.log('senha enviada')}
                    >
                    </HollowTextField>
                </View>

                <FilledButton 
                    width={170} 
                    height={47} 
                    textStyle={FormScreensStyle.continueButtonText}
                    text="Cadastrar" 
                    onPress= {
                       async () => {
                            console.log(first_name);
                            console.log(last_name);
                            console.log(username);
                            console.log(password);

                            const error = await signUp(
                        { 
                            first_name: first_name,
                            last_name: last_name, 
                            username: username,
                            email: email,
                            password: password
                        });
                            if (error != null) {
                                setErrorTexto(error);
                            }
                            else {
                                setErrorTexto('');
                                navigation.navigate('SocialMedia');
                            }
                    }
                }
                />
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreenNext;

