import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { baseDeDados } from "../../../utilities/baseDeDados";
import AsyncStorage from '@react-native-community/async-storage';
import FeedHeader from "../../../components/SocialMedia/General/FeedHeader";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function FeedTab({navigation}) {

    let [piusList, setPiusList] = useState({
        data: null,
        loaded: false,
    });

    function changePiusList(newPiusList) {
        AsyncStorage.setItem('piusList', JSON.stringify(piusList));
        setPiusList(newPiusList);
    }

    async function reloadPius() {
        // Permitir mudaças instantâneas locais, recarregando piusList:
        if (piusList.data != null) {
            changePiusList({
                ...piusList,
                data: await baseDeDados.montarPiusList(),
            });
        }

        // Carregar pius do servidor à base de dados local:
        const change = await baseDeDados.carregarAllDataFromApi();

        // Implementar pius, caso algo tenha sido modificado na base de dados local:
        if (change) {
            changePiusList({
                ...piusList,
                data: await baseDeDados.montarPiusList(),
            });
        }
    }

    function loadPiusArea() {
        if (piusList.data == null || !baseDeDados.allPiuIdsExist(piusList.data)) {
            if (!piusList.loaded) reloadPius();
            return (
                <View style={{
                        flex: 1,
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}
                >
                    <Text style={{
                            fontSize: 20,
                            color: '#777',
                        }}
                    >
                        Carregando pius...
                    </Text>
                </View>
            );
        }

        return (
            <FlatList
                keyExtractor={(element) => {return element}}
                data={[...piusList.data, 'semPius']} 
                renderItem={({ item }) => {
                    // Adiciona um novo piu, ou o Component SemPius, à lista:
                    return item !== 'semPius' 
                        ? <Piu 
                            piuId={item}
                            onPressLike={async () => {
                                baseDeDados.togglePiuLike({ piuId: item });
                                await reloadPius();
                            }}
                            onPressReply={() => {
                                baseDeDados.replyPiu({ piuReplyId: item, navigation: navigation });
                            }}
                            onPressDestaque={async () => {
                                baseDeDados.togglePiuDestaque({ piuId: item });
                                await reloadPius();
                            }} 
                        /> 
                        : <SemPius />;
                }}
            />
        );
    }

    return (
        <SafeAreaView style={styles.background}>
            <FeedHeader navigation={navigation} />
            <View style={styles.background}>
                {loadPiusArea()}
            </View>
            <PiarButton navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default FeedTab;