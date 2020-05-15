import React, { useReducer } from "react";
import { Text, View, SafeAreaView, StyleSheet, Modal, ActivityIndicator } from "react-native";
import FilledButton from "../../components/FilledButton";
import HollowTextField from "../../components/HollowTextField";
import BlandHeader from "../../components/BlandHeader";
import FormScreensStyle from '../../style/FormScreens/FormScreensStyle';
import AsyncStorage from '@react-native-community/async-storage';
import CustomStatusBar from "../../components/General/CustomStatusBar";
import { setLoggedInUser } from "../../utilities/baseDeDados";
import FullScreenLoading from "../../components/General/FullScreenLoading";
// import ReturnArrow from '../../assets/return.svg';

const reducer = (state, action) => {
    switch (action.change) {
        case 'username':
            return { ...state, username: action.newValue};
        case 'password':
            return { ...state, password: action.newValue};
        case 'errorText':
            return { ...state, errorText: action.newValue};
        case 'loading':
            return { ...state, loading: action.newValue};
        default:
            return;
    }
};

function hasError(data) {
    return !Object.keys(data).includes('token');
}

async function signIn({ username, password }) {
    try {
        // Realiza o pedido do tipo 'POST' para a API:
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

        if (!hasError(data)) {
            // Retorna os dados:
            return [data.token, null];
        }
        else {
            // Retorna o erro:
            return [null, 'Insira os dados corretamente.'];
        }
        
    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return [null, 'Erro de conexão.'];
    }
}

function LoginScreen({navigation}) {
    const [state, dispatch] = useReducer(
        reducer, 
        {
            username: '', 
            password: '', 
            errorText: '',
            loading: false,
        }
    );

    async function onLogin() {
        dispatch({change: 'loading', newValue: true});
        
        const [token, error] = await signIn({ 
            username: state.username, 
            password: state.password, 
        });

        if (token != null) {
            dispatch({change: 'errorText', newValue: ''});
            dispatch({change: 'username', newValue: ''});
            dispatch({change: 'password', newValue: ''});
            AsyncStorage.setItem('token', token);
            setLoggedInUser(state.username);
            navigation.navigate('SocialMedia');
        }
        else {
            dispatch({change: 'errorText', newValue: error});
        }

        dispatch({change: 'loading', newValue: false});
    }
    
    return (
        <View style={FormScreensStyle.background}>
            <CustomStatusBar barStyle='dark-content' backgroundColor="#eee" />
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
                                dispatch({change: 'username', newValue: newValue})
                            }
                        />
                        <HollowTextField 
                            placeholder="Senha"
                            helpText='Caso tenha problemas, a senha secreta é "polijunior"'
                            value={state.password}
                            onChange={(newValue) => 
                                dispatch({change: 'password', newValue: newValue})
                            }
                            toggleTextVisibility={true}
                            onSubmitEditing={onLogin}
                        />
                        <Text style={{
                                ...styles.errorText, 
                                ...(state.errorText.length > 0 ? {} : styles.invisible)
                            }}
                        >
                            {state.errorText}
                        </Text>
                    </View>

                    <FilledButton 
                        width={170} 
                        height={47} 
                        textStyle={FormScreensStyle.continueButtonText} 
                        text="Entrar" 
                        onPress={onLogin} 
                    />
                </View>
                <FullScreenLoading
                    isLoading={state.loading}    
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: "#f21d1d",
        fontSize: 15,
        marginTop: 2,
    },
    invisible: {
        display: 'none',
    }
});

export default LoginScreen;
