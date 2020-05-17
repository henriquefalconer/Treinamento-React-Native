import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, Platform } from "react-native";
import FilledButton from "../../components/General/FilledButton";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { baseDeDados, loggedInUser } from "../../utilities/baseDeDados";
import PiuReply from '../../components/SocialMedia/Feed/PiuReply';
import ExpandingTextInput from "../../components/General/AutoExpandingTextInput";
import CustomStatusBar from "../../components/General/CustomStatusBar";
import sendPiuToApi from "../../utilities/sendPiuToApi";
import Modal from 'react-native-modal';
import FullScreenLoading from "../../components/General/FullScreenLoading";

function PiarScreen({navigation, route}) {
    let [piuText, changePiuText] = useState("");
    let [sendingPiu, setSendingPiu] = useState(false);
    let { piuReplyId } = route.params != undefined ? route.params : { piuReplyId: null };
    let [visibleModal, setModalVisibility] = useState(false);

    async function criarPiu() {
        setSendingPiu(true);

        await sendPiuToApi({
            mensagem: piuText,
            piuReplyId: piuReplyId,
        });
        
        navigation.goBack();
        
        setSendingPiu(false);
    }

    return (
        <SafeAreaView style={styles.background}>
            {Platform.OS == 'ios' ? null : <CustomStatusBar barStyle='dark-content' backgroundColor="#fff" />}
            
            <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 8,
                flexDirection: 'row',
                paddingHorizontal: 20,
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
            }} 
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text
                        style={{
                            fontWeight: '500',
                            fontSize: 16,
                            paddingVertical: 10,
                            paddingRight: 20,
                        }}
                    >
                        Cancelar
                    </Text>
                </TouchableOpacity>
                <FilledButton 
                    text="Piar"
                    onPress={criarPiu}
                    disabled={piuText.length > 140 || piuText.length == 0}
                    textStyle={{fontSize: 17, color: "#fff"}}
                    width={100}
                    height={38}
                />
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                }}>
                    <Image  
                        source={
                            baseDeDados
                                .getDadosUsuarioFromUsername(loggedInUser) == null 
                                    ? null 
                                    : baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.avatar
                        } 
                        style={{
                            height: 50,
                            width: 50,
                            right: 4,
                            borderRadius: 25,
                            margin: 3,
                            backgroundColor: "#ddd"
                        }}
                    />
                    <View style={{ flex: 1 }} >
                        {piuText.length > 140 ? <Text style={styles.piuAviso}>A mensagem não pode conter mais de 140 caracteres.</Text> : null}
                        {piuText.length > 140 ?  
                            <Modal 
                                isVisible={visibleModal} 
                                onRequestClose={() => setModalVisibility(false)}
                            >
                                <View style={styles.popupHelp}>
                                        <Text 
                                            style={{ 
                                                textAlign: 'center',
                                                fontSize: 16,
                                                //marginTop: 200,
                                                //marginHorizontal: 8,
                                                //marginBottom: 20,
                                            }}
                                        >
                                            O texto não pode ultrapassar 140 caracteres.
                                        </Text>
                                        <FilledButton 
                                            text="OK" 
                                            onPress={() => setModalVisibility(false)}
                                            textStyle={{fontSize: 17, color: "#fff"}} 
                                            width={150}
                                            height={47} 
                                        />
                                    </View>
                            </Modal>
                        : null}
                        <ExpandingTextInput 
                            placeholder="Em que você está pensando?"
                            value={piuText}
                            onChangeText={(newValue) => changePiuText(newValue)}
                            style={{
                                flex: 1,
                                fontSize: 18,
                                textAlignVertical: 'top',
                                marginLeft: 5,
                                padding: 0,
                                paddingTop: 15,
                                paddingBottom: 5
                            }}
                            autoCapitalize='none'
                        />
                        <View style={styles.ContadorBox}>
                            {piuText.length > 140 ? <Text style={{color: 'red'}}>{piuText.length}</Text> : <Text style={{color: 'black'}}>{piuText.length}</Text>}
                            <Text style={styles.LimiteDeCaracteres}>/140</Text>
                        </View>
                        {
                            piuReplyId != null
                                ? <PiuReply piuReplyId={piuReplyId} />
                                : null
                        }
                    </View>
                </View>
            </ScrollView>
            <FullScreenLoading 
                isLoading={sendingPiu}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    piuAviso: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        opacity: 0.4,
        marginTop: 30,
    },
    ContadorBox: {
        flexDirection: "row",
        marginLeft: -55,
        marginTop: 20,
    },  
    LimiteDeCaracteres: {
        opacity: 0.6,
    },
    Warning: {
        color: 'red',
    },
    Classic: {
        color: 'black',
    },
    popupHelp: {
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 80,
        marginTop: 200,
        borderRadius: 20,
    },
});

export default PiarScreen;