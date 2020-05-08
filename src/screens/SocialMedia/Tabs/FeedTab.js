import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { baseDeDados } from "../../../utilities/baseDeDados";
import { TipoDeFeed } from "../../../utilities/constants";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function FeedTab({navigation}) {

    let [piusList, setPiusList] = useState({
        data: null,
        done: false,
    });

    async function reloadPius() {
        // Permitir mudaças instantâneas locais, recarregando piusList:
        if (piusList.done) {
            setPiusList({
                data: baseDeDados.montarPiusList(TipoDeFeed.contatos),
                done: true,
            });
        }

        // Carregar pius do servidor à base de dados local:
        const change = await baseDeDados.carregarPiuServidor();

        // Implementar pius, caso algo tenha sido modificado na base de dados local:
        if (change) {
            setPiusList({
                data: baseDeDados.montarPiusList(TipoDeFeed.contatos),
                done: true,
            });
        }
    }


    function loadPiusArea() {
        if (!piusList.done) {
            reloadPius();
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
                data={piusList.data} 
                renderItem={({ item, index }) => {
                    // Adiciona um novo piu, ou o Component SemPius, à lista:
                    return index + 1 < piusList.data.length 
                        ? <Piu 
                            piuId={item}
                            onPressLike={async () => {
                                baseDeDados.togglePiuLike(item);
                                await reloadPius();
                            }}
                            onPressReply={() => {}}
                            onPressDestaque={async () => {
                                baseDeDados.togglePiuDestaque(item);
                                await reloadPius();
                            }} 
                        /> 
                        : <SemPius />;
                }}
            />
        );
    }

    return (
        <View style={styles.background}>
            <View style={styles.background}>
                {loadPiusArea()}
            </View>
            <PiarButton navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default FeedTab;