import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import { FlatList } from "react-native-gesture-handler";
import { baseDeDados } from "../../../utilities/baseDeDados";
import { TipoDeFeed } from "../../../utilities/constants";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";

function FeedTab() {

    let [piusList, setPiusList] = useState(
            baseDeDados.montarPiusList(TipoDeFeed.contatos)
        );

    function reloadPius() {
        setPiusList(baseDeDados.montarPiusList(TipoDeFeed.contatos));
    }

    return (
        <SafeAreaView style={styles.background}>
            <FlatList
                keyExtractor={(element) => {return element}}
                data={piusList} 
                renderItem={({ item, index }) => {
                    // Adiciona um novo piu, ou o Component SemPius, à lista:
                    return index + 1 < piusList.length 
                        ? <Piu 
                            piuId={item}
                            onPressLike={() => {
                                baseDeDados.togglePiuLike(item);
                                reloadPius();
                            }}
                            onPressReply={() => {}}
                            onPressDestaque={() => {
                                baseDeDados.togglePiuDestaque(item);
                                reloadPius();
                            }} /> 
                        : <SemPius />;
                }}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default FeedTab;