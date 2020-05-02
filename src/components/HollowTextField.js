import React, {useState} from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import FilledButton from "./FilledButton";

function HollowTextField({placeholder, showHelp, helpText, onChange, value, secureTextEntry}) {

    let [visibleModal, setModalVisibility] = useState(false);

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.text} 
                placeholder={placeholder} 
                onChangeText={onChange}
                autoCapitalize='none'
                autoCorrect={false}
                value={value}
                secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity 
                style={showHelp || true ? styles.helpBox : {display: 'none'}} 
                onPress={() => setModalVisibility(true)} 
            >
                <Image source={require('../../assets/question-icon.jpg')} style={styles.question}/>
            </TouchableOpacity>
            
            <Modal 
                isVisible={visibleModal} 
                onRequestClose={() => setModalVisibility(false)}>
                <View style={styles.popupHelp}>
                    <Text 
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                    }}>
                        {
                        helpText || "Este é um texto de ajuda. Caso não consiga sair, aperte o botão de voltar do sistema ou reinicie o app."
                        }
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisibility(false)} >
                        <FilledButton 
                            text="OK" 
                            textStyle={{fontSize: 17, color: "#fff"}} 
                            width={180}
                            height={50} />
                    </TouchableOpacity>
                </View> 
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "#aaa",
        borderWidth: 2,
        borderRadius: 30,
        paddingLeft: 15,
        height: 45,
        width: 310,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
        flex: 1,
    },
    helpBox: {
        marginHorizontal: 10,
        backgroundColor: "#000",
        height: 25,
        width: 25,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        height: 30,
        width: 30,
        flex: 1, 
    },
    popupHelp: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 30,
    }
});

export default HollowTextField;