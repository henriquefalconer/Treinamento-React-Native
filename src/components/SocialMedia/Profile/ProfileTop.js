import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image, Text } from "react-native";
import FilledButton from "../../General/FilledButton";
import HollowButton from "../../General/HollowButton";
import { loggedInUser, baseDeDados } from "../../../utilities/baseDeDados";
import WidthFillingImage from "../Profile/WidthFillingImage";
import BoxesNavigation from "../Profile/BoxesNavigation";
import { TipoDeFeed } from "../../../utilities/constants";
import followUser from "../../../utilities/follow";

export default function ProfileTop({ tipoDeFeed, setTipoDeFeed, dadosUsuario }) {
    const infoUsuario = dadosUsuario.infoUsuario;

    const [doesLoggedUserFollow, setDoesLoggedUserFollow] = useState(false);

    async function changeButton() {
        setDoesLoggedUserFollow(!doesLoggedUserFollow);
        await followUser({ 
            usuario_id: infoUsuario.apiId, 
            logado_id: baseDeDados.getDadosUsuarioFromUsername(loggedInUser).infoUsuario.apiId,
         });
    }

    const NewButton = () => (
        doesLoggedUserFollow 
            ? <HollowButton
                height={40}
                width={110}
                textStyle={{
                    color: '#f21d1d',
                    fontSize: 16,
                }}
                onPress={changeButton}
                text="Seguir"
            />
            : <FilledButton
                height={40}
                width={110}
                textStyle={{
                    color: '#fff',
                    fontSize: 16,
                    textAlign:'center',
                }}
                onPress={changeButton}
                text="Seguindo"
            />
    )
    
    return (
        <View style={{backgroundColor: '#fff'}} >
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                {infoUsuario.nome}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>
                                @{infoUsuario.username}
                            </Text>
                        </View>
                        {
                            infoUsuario.username == loggedInUser 
                            ? null
                            : <NewButton /> 
                        }
                    </View>
                    <View style={styles.Bio}>
                        <Text>
                            {infoUsuario.descricao}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.BoxesNavigation}>
                    <BoxesNavigation 
                        title="Pius" 
                        active={tipoDeFeed == TipoDeFeed.apenasPiusDoUsuario} 
                        onPress={
                            async () => await setTipoDeFeed(TipoDeFeed.apenasPiusDoUsuario)
                        } 
                    />
                    <BoxesNavigation 
                        title="Pius e Respostas" 
                        active={tipoDeFeed == TipoDeFeed.piusERespostasDoUsuario} 
                        onPress={
                            async () => await setTipoDeFeed(TipoDeFeed.piusERespostasDoUsuario)
                        } 
                    />
                    <BoxesNavigation 
                        title="Curtidas" 
                        active={tipoDeFeed == TipoDeFeed.curtidasDoUsuario} 
                        onPress={
                            async () => await setTipoDeFeed(TipoDeFeed.curtidasDoUsuario)
                        }
                    />    
            </View>
        </View>
    );
}

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