import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import { useState } from 'react';

// import { signUp } from '../../api/Users'; 

// function hasError(data) {
//     return !Object.keys(data).includes('token');
// }

// async function signUp({ first_name, last_name, username }) {
//     try {
//         // Realiza o pedido do tip 'POST' para a API:
//         let response = await fetch(
//             'http://piupiuwer.polijr.com.br/usuarios/', 
//             {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     'first_name': first_name,
//                     'last_name': last_name,
//                     'username': username,
//                 }),
//             },
//         );

//         // Decodifica os dados para o formato json:
//         let data = await response.json();

//         // Imprime os dados obtidos:
//         console.log(data);

//         if (!hasError(data)) {
//             // Retorna os dados:
//             return data;
//         }
//         else {
//             // Retorna null:
//             return null;
//         }
        
//     } catch (error) {
//         // Caso haja algum erro, imprima-o e retorne null:
//         console.error(error);
//         return null;
//     }
// } 
import CustomStatusBar from "../../components/General/CustomStatusBar";

function SignUpScreen({navigation}) {
    const [first_name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');

    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Cadastro</Text>
                <View>
                    <HollowTextField 
                        value={first_name} 
                        placeholder="Insire seu primeiro nome"
                        onChange={NovoNome => setName(NovoNome)}
                        // onTextSubmit={() => console.log('nome enviado')}
                        
                    >
                    </HollowTextField>

                    <HollowTextField 
                        value={last_name} 
                        placeholder="Insire seu último nome"
                        onChange={NovoSobrenome => setLastName(NovoSobrenome)}
                        // onTextSubmit={() => console.log('sobrenome enviado')}

                    >
                    </HollowTextField>

                    <HollowTextField 
                        value={username} 
                        placeholder="Insire o nome de usuário"
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
    );
}

export default SignUpScreen;