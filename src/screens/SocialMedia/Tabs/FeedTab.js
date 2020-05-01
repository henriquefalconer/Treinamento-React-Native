import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import { ScrollView } from "react-native-gesture-handler";
import PiuData from "../../../utilities/piuData";

function FeedTab() {
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Piu 
                    piuData={new PiuData(
                        // Avatar:
                        require("../../../../assets/avatars/Fulano.jpg"), 
                        // Nome:
                        "Fulano Beltrano",
                        // Username:
                        "fulano.beltrano",
                        // Tempo desde que o piu foi enviado:
                        "20 s",
                        // Mensagem:
                        "E pensar que tem caras por aí que só piam a quantidade de pius que eles já postaram... Eles parecem mal saber de todo o potencial que a plataforma PiuPiuwer tem!",
                        // Quantidade de likes:
                        60,
                        // Quantidade de respostas ao piu:
                        10,
                        // Usuário logado deu like no piu:
                        true,
                        // Usuário logado respondeu ao piu:
                        false,
                        // Usuário logado destacou o piu:
                        false,
                    )}
                    piuReplyData={new PiuData(
                        require("../../../../assets/avatars/Cleber.jpg"), 
                        "Cleber Cunha",
                        "cleber.cunha",
                        "2.5 h",
                        "Este é meu 100º piu! Esperei bastante por este momento!",
                    )}
                    />
                <Piu 
                    piuData={new PiuData(
                        require("../../../../assets/avatars/Richarlison.jpg"), 
                        "Richarlison",
                        "richar.lison",
                        "3 h",
                        "Sim! Sem dúvidas, é a melhor rede social que existe.",
                        55,
                        20,
                        true,
                        false,
                        true,
                    )}
                    piuReplyData={new PiuData(
                        require("../../../../assets/avatars/Rosimary.jpg"), 
                        "Rosimary",
                        "rosi.plat",
                        "4 h",
                        "Comecei a usar hoje! Parece ser bom esse PiuPiwer.",
                    )}
                    />
                <Piu 
                    piuData={new PiuData(
                        require("../../../../assets/avatars/Cleber.jpg"), 
                        "Cleber Cunha",
                        "cleber.cunha",
                        "2.5 h",
                        "Este é meu 100º piu! Esperei bastante por este momento!",
                        25,
                        2,
                        false,
                        true,
                        false,
                    )}
                    />
                <Piu 
                    piuData={new PiuData(
                        require("../../../../assets/avatars/Cleber.jpg"), 
                        "Cleber Cunha",
                        "cleber.cunha",
                        "2.5 h",
                        "Este é meu 99º piu! Isso é 1 a menos que 100!",
                        2,
                        0,
                        false,
                        false,
                        false,
                    )}
                    />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default FeedTab;