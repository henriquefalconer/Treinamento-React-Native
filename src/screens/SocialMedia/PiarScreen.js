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
import StylizedModal from "../../components/General/StylizedModal";

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
                    onDisabledPress={() => setModalVisibility(true)}
                    textStyle={{fontSize: 17, color: "#fff"}}
                    width={100}
                    height={38}
                />
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    flexDirection: 'row',
                }}>
                    <View style={{marginRight: 8}} >
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
                                borderRadius: 25,
                                margin: 3,
                                backgroundColor: "#ddd"
                            }}
                        />
                        <View style={styles.ContadorBox}>
                            {piuText.length > 140 ? <Text style={{color: 'red'}}>{piuText.length}</Text> : <Text style={{color: 'black'}}>{piuText.length}</Text>}
                            <Text style={styles.LimiteDeCaracteres}>/140</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
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
                                paddingBottom: 5,
                                color: piuText.length > 140 ? '#f21d1d' : '#000',
                            }}
                            autoCapitalize='none'
                        />
                        {
                            piuReplyId != null
                                ? <PiuReply piuReplyId={piuReplyId} />
                                : null
                        }
                    </View>
                </View>
            </ScrollView>

            <StylizedModal 
                text="O piu deve possuir um número de caracteres entre 0 e 140."
                isVisible={visibleModal} 
                onRequestClose={() => setModalVisibility(false)}
            />

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
        justifyContent: 'center',
        marginTop: 5,
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