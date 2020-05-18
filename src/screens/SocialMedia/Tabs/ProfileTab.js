import React, { Component, useState } from "react";
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { Image, Text } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import FilledButton from "../../../components/General/FilledButton";
import HollowButton from "../../../components/General/HollowButton";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { baseDeDados, loggedInUser, signOut } from "../../../utilities/baseDeDados";
import WidthFillingImage from "../../../components/SocialMedia/Profile/WidthFillingImage";
import BoxesNavigation from "../../../components/SocialMedia/Profile/BoxesNavigation";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";
import { TipoDeFeed } from "../../../utilities/constants";

function ProfileTop({ tipoDeFeed, setTipoDeFeed, dadosUsuario }) {
    const infoUsuario = dadosUsuario.infoUsuario;

    const changeButton = () => click(!buttonClick);

    const NewButton = () => (
        buttonClick 
            ? <HollowButton
            height={40}
            width={110}
            textStyle={{
                color: '#f21d1d',
                fontSize: 16,
            }}
            onPress={changeButton}
            text="Seguir"/>
            : <FilledButton
            height={40}
            width={110}
            textStyle={{
                color: '#fff',
                fontSize: 16,
                textAlign:'center',
            }}
            onPress={changeButton}
            text="Seguindo"/>
    )
    const [buttonClick, click] = useState(false);
    
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
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

class ProfileTab extends Component {

    constructor({ selectedUsername=loggedInUser }) {
        super();

        this._isMounted = true;

        this.selectedUsername = selectedUsername;

        this.state = {
            piusList: [],
            tipoDeFeed: TipoDeFeed.apenasPiusDoUsuario,
            dadosUsuario: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.refreshLocalPius(this.state.tipoDeFeed);
        this._isMounted && this.usuarioDataLoader();
    }

    componentWillUnmount() {
        signOut();
        this._isMounted = false;
    }

    async wait(milliseconds) {
      return new Promise((resolve) =>
        setTimeout(
          () => { resolve('result') },
          milliseconds
        )
      );
    }

    async refreshLocalPius(tipoDeFeed) {
        this._isMounted && this.setState({
            ...this.state,
            tipoDeFeed,
            piusList: await baseDeDados.montarPiusList(tipoDeFeed),
        });
    }

    async usuarioDataLoader() {
        do {
            const dadosUsuario = baseDeDados.getDadosUsuarioFromUsername(this.selectedUsername);

            if (dadosUsuario != null) {
                this._isMounted && this.setState({
                    ...this.state,
                    dadosUsuario,
                });
            }

            // Esperar 1 segundo entre ciclos:
            await this.wait(1000);

        } while (this.state.dadosUsuario == null)
    }

    ProfileContent() {
        if (this.state.dadosUsuario == null) {
            return (
                <View style={{
                        flex: 1,
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator 
                        size='large'
                        color='#888'
                    />
                    <Text style={{
                            fontSize: 20,
                            marginTop: 10,
                            color: '#777',
                        }}
                    >
                        Carregando usuário...
                    </Text>
                </View>
            );
        }

        return (
            <FlatList
                keyExtractor={(key) => {return (key)}} 
                ListHeaderComponent={
                    <ProfileTop 
                        dadosUsuario={this.state.dadosUsuario}
                        tipoDeFeed={this.state.tipoDeFeed} 
                        setTipoDeFeed={async (tipoDeFeed) => {
                            await this.refreshLocalPius(tipoDeFeed);
                        }} 
                    />
                }
                ListFooterComponent={<SemPius />}
                data={this.state.piusList}
                renderItem={({item}) => {
                    return (
                        <Piu 
                            piuId={item}
                            navigation={this.props.navigation}
                            onChange={async () => {
                                await this.refreshLocalPius(this.state.tipoDeFeed);
                            }}
                        />
                    );
                }}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.background} >
                <SocialMediaHeader navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    {this.ProfileContent()}
                </View>
                <PiarButton navigation={this.props.navigation} />
            </SafeAreaView>
        );
    }
};

export default ProfileTab;

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