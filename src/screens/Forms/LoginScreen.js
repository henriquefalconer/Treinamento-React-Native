import React, { useReducer, useContext } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import { Context as AuthContext } from '../../context/authContext';
// import ReturnArrow from '../../assets/return.svg';

const reducer = (state, action) => {
    switch (action.textInputChange) {
        case 'username':
            return { ...state, username: action.newValue};
        case 'password':
            return { ...state, password: action.newValue};
        default:
            return;
    }
};

async function signIn({ username, password }) {
    try {
        // Realiza o pedido do tip 'POST' para a API:
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/login/', 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password,
                }),
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();

        // Imprime os dados obtidos:
        console.log(data);

        // Retorna os dados:
        return data;
        
    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne null:
        console.error(error);
        return null;
    }
}

function LoginScreen({navigation}) {
    const [state, dispatch] = useReducer(reducer, {username: '', password: ''});
    
    return (
        <SafeAreaView style={FormScreensStyle.background}>
            <BlandHeader navigation={navigation} />
            <View style={FormScreensStyle.content}>
                <Text style={FormScreensStyle.title}>Login</Text>
        
                <View>
                    <HollowTextField 
                        placeholder="Nome de usuário"
                        helpText='Você pode logar como "polijr"'
                        value={state.username}
                        onChange={(newValue) => 
                            dispatch({textInputChange: 'username', newValue: newValue})
                        }
                    />
                    <HollowTextField 
                        placeholder="Senha"
                        helpText='Caso tenha problemas, a senha secreta é "polijunior"'
                        value={state.password}
                        onChange={(newValue) => 
                            dispatch({textInputChange: 'password', newValue: newValue})
                        }
                        secureTextEntry={true}
                    />
                </View>

                <FilledButton 
                    width={170} 
                    height={47} 
                    textStyle={FormScreensStyle.continueButtonText} 
                    text="Entrar" 
                    onPress={
                        () => {
                            signIn({ 
                                username: state.username, 
                                password: state.password,
                            });
                        }
                    } 
                />
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;
