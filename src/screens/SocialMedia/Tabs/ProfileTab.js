import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacityComponent } from "react-native";
import { Image, ImageBackground, Text } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import HollowButton from "../../../components/General/HollowButton";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { onChange } from "react-native-reanimated";
import { baseDeDados, loggedInUser } from "../../../utilities/baseDeDados";
import WidthFillingImage from "../../../components/SocialMedia/Profile/WidthFillingImage";
import BoxesNavigation from "../../../components/SocialMedia/Profile/BoxesNavigation";

//para mudanca de botao
function changeButton() {
    <TouchableOpacity style={{ alignItems: 'center' }}>
        <View style={styles.SeguindoButton}>
            <TouchableOpacity>
                <Text style={styles.SeguindoText}>Seguindo</Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
}



function ProfileTab({ navigation }) {
    const dadosUsuario = baseDeDados.getDadosUsuarioFromUsername(loggedInUser);
    console.log(dadosUsuario);
    const infoUsuario = dadosUsuario != null 
        ? dadosUsuario.infoUsuario 
        : baseDeDados.getDadosUsuarioFromUsername('cleber.cunha').infoUsuario;

    return (
        <SafeAreaView style={styles.background} >
            <SocialMediaHeader navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <ScrollView>
                    <WidthFillingImage 
                        source = {infoUsuario.background}                
                    />
                    <View style={{top: -20}}>
                        <View style={{paddingHorizontal: 20}}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={infoUsuario.avatar}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 200,
                                            marginBottom: 12,
                                        }}
                                    />
                                    <View style={styles.InfoInteraction}>
                                        <View styles={styles.SeguidoresInteraction}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{dadosUsuario.getSeguidores().length}</Text>
                                            <Text style={styles.SeguidoresInteractionText}>Seguidores</Text>
                                        </View>
                                        <View styles={styles.SeguindoInteraction}>
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                {infoUsuario.seguindo.length}
                                            </Text>
                                            <Text style={styles.SeguindoInteractionText}>Seguindo</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        {infoUsuario.nome}
                                    </Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'normal' }}>
                                        @{infoUsuario.username}
                                    </Text>
                                </View>
                                <HollowButton
                                    height={40}
                                    width={110}
                                    textStyle={{
                                        color: '#f21d1d',
                                        fontSize: 17,
                                    }}
                                    text="Seguir"
                                />
                            </View>
                            <View style={styles.Bio}>
                                <Text>
                                    {infoUsuario.descricao}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.BoxesNavigation}>
                            <BoxesNavigation title="Pius" />
                            <BoxesNavigation title="Pius e Respostas" />
                            <BoxesNavigation title="Curtidas" />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <PiarButton navigation={navigation} />
            <View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200,
    },
    Bio: {
        marginTop: 10,
        marginBottom: 15,
    },
    BoxesNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    InfoInteraction: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    SeguidoresInteractionText: {
        textAlign: 'center',
        opacity: 0.5,
    },
    SeguindoInteractionText: {
        textAlign: 'center',
        opacity: 0.5,
    },
});

export default ProfileTab;