import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import { useState } from 'react';
import { signUp } from '../../api/Users'; 

function SignUpScreen({navigation}) {
    const [first_name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('')

    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
                <View>
                    <HollowTextField 
                        value={first_name} 
                        placeholder="Insire seu primeiro nome"
                        onChange={valor => setName(valor)}
                        onTextSubmit={() => console.log('nome enviado')}
                        
                        onChange={(NovoNome) => setName(NovoNome)}
                    >
                    </HollowTextField>

                    <HollowTextField 
                        value={last_name} 
                        placeholder="Insire seu último nome"
                        onChange={valor => setLastName(valor)}
                        onTextSubmit={() => console.log('sobrenome enviado')}
                        
                        onChange={(NovoSobrenome) => setLastName(NovoSobrenome)}
                    >
                    </HollowTextField>

                    <HollowTextField 
                        value={username} 
                        placeholder="Insire o nome de usuário"
                        onChange={valor => setUsername(valor)}
                        onTextSubmit={() => console.log('username enviado')}
                        
                        onChange={(NovoUsername) => setUsername(NovoUsername)}
                    >
                    </HollowTextField>
                </View>

                <FilledButton 
                    width={170} 
                    height={47} 
                    textStyle={FormScreensStyle.continueButtonText} 
                    text="Próximo" 
                    onPress={
                        () => {navigation.navigate('CadastroNext');}
                    }
                />
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreen;