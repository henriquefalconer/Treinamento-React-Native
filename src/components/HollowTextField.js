import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import FilledButton from "./FilledButton";

const placeholder = 'Insira dados';
const showHelp = null;
const onPressHelp = null;
export default class LoginScreen extends React.Component {
    state = {
        visibleModal: false,
    };

    openModal = () => {
        this.setState({
            visibleModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            visibleModal: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.text} placeholder={placeholder}></TextInput>
                <TouchableOpacity 
                    style={showHelp || true ? styles.helpBox : {display: 'none'}} 
                    onPress={()=>this.openModal()} 
                >
                    <Icon name="question-circle" style={styles.question}/>
                </TouchableOpacity>
    
                <TouchableWithoutFeedback onPress={()=>this.closeModal()} >
                    <Modal 
                        isVisible={this.state.visibleModal} 
                        onRequestClose={() => { this.visibleModal(false); } }>
                        <View style={styles.popupHelp}>
                            <Text style={{textAlign: 'center'}}>Este é um texto de ajuda. 
                            Este é um texto de ajuda. Este é um texto de ajuda. Este é um texto de ajuda. 
                            Este é um texto de ajuda. Este é um texto de ajuda. Este é um texto de ajuda. 
                            Caso não consiga sair, reinicie o app.</Text>
                            <TouchableOpacity onPress={() => {this.setState({isModalVisible: false})}} >
                                <FilledButton text="OK" textStyle={{fontSize: 20, color: "#fff"}} />
                            </TouchableOpacity>
                        </View> 
                    </Modal>
                </TouchableWithoutFeedback>
            </View>
        );
    }
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
        color: "#fff",
        fontSize: 15,
    },
    popupHelp: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 30,
    }
});