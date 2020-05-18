import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { Image, Text } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import HollowButton from "../../../components/General/HollowButton";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { baseDeDados, loggedInUser, signOut } from "../../../utilities/baseDeDados";
import WidthFillingImage from "../../../components/SocialMedia/Profile/WidthFillingImage";
import BoxesNavigation from "../../../components/SocialMedia/Profile/BoxesNavigation";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";
import { TipoDeFeed } from "../../../utilities/constants";

function ProfileTop({ tipoDeFeed, setTipoDeFeed }) {
    const dadosUsuario = baseDeDados.getDadosUsuarioFromUsername(loggedInUser) == null
        ? baseDeDados.getDadosUsuarioFromUsername('cleber.cunha')
        : baseDeDados.getDadosUsuarioFromUsername(loggedInUser);
    
    const infoUsuario = dadosUsuario.infoUsuario;
    
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

    constructor() {
        super();

        this._isMounted = true;

        this.state = {
            piusList: [],
            tipoDeFeed: TipoDeFeed.apenasPiusDoUsuario,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.refreshLocalPius(this.state.tipoDeFeed);
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
            tipoDeFeed,
            piusList: await baseDeDados.montarPiusList(tipoDeFeed),
        });
    }

    ProfileContent() {
        /*
        if (this.state.piusList == null) {
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
                        Carregando pius...
                    </Text>
                </View>
            );
        }
        */

        return (
            <FlatList
                keyExtractor={(key) => {return (key)}} 
                ListHeaderComponent={
                    <ProfileTop 
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