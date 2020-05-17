import React, { useState } from "react";
import { Text, View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import FilledButton from "../../components/General/FilledButton";
import HollowTextField from "../../components/Forms/HollowTextField";
import BlandHeader from "../../components/General/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import CustomStatusBar from "../../components/General/CustomStatusBar";

function SignUpScreen({navigation}) {
    const [first_name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');

    return (
        <KeyboardAvoidingView 
            behavior={'padding'}
            style={{flex: 1, backgroundColor: '#fff'}}
        >
            <CustomStatusBar barStyle='dark-content' backgroundColor="#eee" />
            <SafeAreaView style={FormScreensStyle.background}>
                <BlandHeader navigation={navigation} />
                <View style={FormScreensStyle.content}>
                    <Text style={FormScreensStyle.title}>Cadastro</Text>
                    <View>
                        <HollowTextField 
                            value={first_name} 
                            placeholder="Insira seu primeiro nome"
                            onChange={NovoNome => setName(NovoNome)}
                            // onTextSubmit={() => console.log('nome enviado')}
                            
                        >
                        </HollowTextField>

                        <HollowTextField 
                            value={last_name} 
                            placeholder="Insira seu último nome"
                            onChange={NovoSobrenome => setLastName(NovoSobrenome)}
                            // onTextSubmit={() => console.log('sobrenome enviado')}

                        >
                        </HollowTextField>

                        <HollowTextField 
                            value={username} 
                            placeholder="Insira o nome de usuário"
                            onChange={NovoUsuario => setUsername(NovoUsuario)}
                            // onTextSubmit={() => console.log('username enviado')}
                            
                        >
                        </HollowTextField>
                    </View>

                    <FilledButton 
                        width={170} 
                        height={47} 
                        textStyle={FormScreensStyle.continueButtonText} 
                        text="Próximo" 
                        onPress=
                        { 
                            () => navigation.navigate('CadastroNext', {
                                first_name:  first_name, 
                                last_name: last_name, 
                                username: username 
                            }) 
                        }
                    />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default SignUpScreen;