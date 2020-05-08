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
        loaded: false,
    });

    let [loadingProgress, setLoadingProcess] = useState(0.0);

    async function reloadPius() {
        setPiusList({
            loaded: true,
        });

        // Permitir mudaças instantâneas locais, recarregando piusList:
        if (piusList.data != null) {
            setPiusList({
                ...piusList,
                data: baseDeDados.montarPiusList(TipoDeFeed.contatos),
            });
        }

        // Carregar pius do servidor à base de dados local:
        const change = await baseDeDados.carregarPiuServidor({
            onChangeLoadingProgress: 
                (newValue) => setLoadingProcess(newValue),
        });

        // Implementar pius, caso algo tenha sido modificado na base de dados local:
        if (change) {
            setPiusList({
                ...piusList,
                data: baseDeDados.montarPiusList(TipoDeFeed.contatos),
            });
        }
    }

    function loadPiusArea() {
        if (piusList.data == null) {
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
                    <Text style={{
                            fontSize: 22,
                            color: '#777',
                        }}
                    >
                        {(loadingProgress*100).toFixed(1)}%
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