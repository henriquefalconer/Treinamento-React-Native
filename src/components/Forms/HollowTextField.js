import React, {useState} from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import StylizedModal from "../General/StylizedModal";

function HollowTextField({placeholder, helpText, onChange, value, toggleTextVisibility, onSubmitEditing}) {

    let [visibleModal, setModalVisibility] = useState(false);
    let [visiblePassword, setPasswordVisibility] = 
        toggleTextVisibility || false 
            ? useState(false) 
            : [true, null];

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.text} 
                placeholder={placeholder} 
                onChangeText={onChange}
                autoCapitalize='none'
                autoCorrect={false}
                value={value}
                secureTextEntry={!visiblePassword}
                onSubmitEditing={onSubmitEditing}
            />
            <TouchableOpacity 
                style={(toggleTextVisibility || false) && (value.length > 0) ? {} : {display: 'none'}} 
                onPress={() => setPasswordVisibility(!visiblePassword)} 
            >
                <Text
                    style={styles.toggleVisibility}
                >
                    {visiblePassword ? 'Esconder' : 'Ver'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={helpText != null ? styles.helpBox : {display: 'none'}} 
                onPress={() => setModalVisibility(true)} 
            >
                <Image source={require('../../../assets/question-icon.jpg')} style={styles.question}/>
            </TouchableOpacity>

            <StylizedModal 
                isVisible={visibleModal} 
                onRequestClose={() => setModalVisibility(false)}
                text={helpText}
            />
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
    toggleVisibility: {
        fontSize: 16, 
        fontWeight: 'bold',
    },
    helpBox: {
        marginHorizontal: 10,
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
        padding: 20,
        borderRadius: 20,
    }
});

export default HollowTextField;