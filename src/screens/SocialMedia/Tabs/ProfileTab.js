import React, {useState} from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacityComponent } from "react-native";
import { Image, ImageBackground, Text } from "react-native";
import { TouchableOpacity, FlatList, ScrollView } from "react-native-gesture-handler";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import HollowButton from "../../../components/General/HollowButton";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { baseDeDados, loggedInUser } from "../../../utilities/baseDeDados";
import * as GeneralFunctions from "../../../utilities/GeneralFunctions";
import WidthFillingImage from "../../../components/SocialMedia/Profile/WidthFillingImage";
import BoxesNavigation from "../../../components/SocialMedia/Profile/BoxesNavigation";
import Piu from "../../../components/SocialMedia/Feed/Piu";

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

function ProfileTop() {
    const [abaSelecionada, setabaSelecionada] = useState('Pius');
    const dadosUsuario = baseDeDados.getDadosUsuarioFromUsername(loggedInUser) == null
        ? baseDeDados.getDadosUsuarioFromUsername('cleber.cunha')
        : baseDeDados.getDadosUsuarioFromUsername(loggedInUser);
    
        const infoUsuario = dadosUsuario.infoUsuario;
    
    return (

    <View>
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
                                backgroundColor: '#ddd',
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
        </View>
        <View style={styles.BoxesNavigation}>
                <BoxesNavigation title="Pius" active={abaSelecionada == 'Pius'} onPress={() => setabaSelecionada('Pius')} />
                <BoxesNavigation title="Pius e Respostas" active={abaSelecionada == 'Pius e Respostas'} onPress={() => setabaSelecionada('Pius e Respostas')} />
                <BoxesNavigation title="Curtidas" active={abaSelecionada == 'Curtidas'}  onPress={() => setabaSelecionada('Curtidas')}/>    
        </View>
    </View>
    );
}


function ProfileTab({ navigation }) {
    return (
        <SafeAreaView style={styles.background} >
            <SocialMediaHeader navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <FlatList
                    keyExtractor={(key) => {return (key)}} 
                    ListHeaderComponent={<ProfileTop />}
                    data={[
                        GeneralFunctions.createPiuId({
                            username: "fulano.beltrano",
                            time: Date.parse("15 Apr 2020 11:38:00"),
                        }),
                        GeneralFunctions.createPiuId({
                            username: "fulano.beltrano",
                            time: Date.parse("15 Apr 2020 11:38:00"),
                        }),
                        GeneralFunctions.createPiuId({
                            username: "fulano.beltrano",
                            time: Date.parse("15 Apr 2020 11:38:00"),
                        }),
                        GeneralFunctions.createPiuId({
                            username: "fulano.beltrano",
                            time: Date.parse("15 Apr 2020 11:38:00"),
                        }),
                        GeneralFunctions.createPiuId({
                            username: "fulano.beltrano",
                            time: Date.parse("15 Apr 2020 11:38:00"),
                        }),
                    ]}
                    renderItem={({item}) => {
                    return (
                        <Piu piuId={item} />
                    );
                }}
                />
            </View>
            <PiarButton navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    Bio: {
        marginTop: 10,
    },
    BoxesNavigation: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
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