import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import { useState } from 'react';
import FullScreenLoading from "../../components/General/FullScreenLoading";

function hasError(data) {
    return !Object.keys(data).includes('id');
}

function SignUpScreenNext({ route, navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorTexto, setErrorTexto] = useState('')
    const [loading, setLoading] = useState(false);
    const  { first_name, last_name, username } = route.params;

    async function signUp({first_name, last_name, username, email, password}) {
        setLoading(true);

        var errorText = null;
    
        try {

            const response = await fetch(
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
    
            const data = await response.json();

            console.log(data);
    
            if (hasError(data)) errorText = 'Insira os dados corretamente.';

        } catch (e) {
            console.log(e);
            errorText = "Erro de conexão";
        }

        setLoading(false);

        return errorText;
    }

    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
        
                <View>
                    <HollowTextField 
                        placeholder="Insira seu email"
                        value={email}
                        onChange = {NovoEmail => setEmail(NovoEmail)}
                        // onTextSubmit={() => console.log('email enviado')}
                    >
                    </HollowTextField>

                    {/* <HollowTextField placeholder="Data de nascimento"></HollowTextField> */}

                    <HollowTextField 
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={NovaSenha => setPassword(NovaSenha)}
                        // onTextSubmit={() => console.log('senha enviada')}
                    >
                    </HollowTextField>

                    <Text style={{
                        color: "#f21d1d",
                        fontSize: 15,
                        marginTop: 2,
                    }}>
                        {errorTexto}
                    </Text>
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
            <FullScreenLoading
                isLoading={loading}    
            />
        </SafeAreaView>
    );
}

export default SignUpScreenNext;

