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

function LoginScreen({navigation}) {
    const { authState, signIn } = useContext(AuthContext);
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
                        helpText='Caso tenha problemas, a senha é "polijunior"'
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
                            navigation.navigate('SocialMedia');
                        }
                    } 
                />
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;
