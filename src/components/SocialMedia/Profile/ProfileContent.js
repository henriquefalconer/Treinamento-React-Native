import React, { Component } from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { baseDeDados, signOut, loggedInUser } from "../../../utilities/baseDeDados";
import ProfileTop from "../../../components/SocialMedia/Profile/ProfileTop";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";
import { TipoDeFeed } from "../../../utilities/constants";

export default class ProfileContent extends Component {

    constructor({ route, navigation }) {
        super();

        this.navigation = navigation;
        this.selectedUsername = route.params?.selectedUsername;
        this.canGoBack = route.params?.canGoBack;

        this._isMounted = true;

        this.state = {
            piusList: [],
            tipoDeFeed: TipoDeFeed.piusERespostasDoUsuario,
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
            piusList: await baseDeDados.montarPiusList(tipoDeFeed, this.selectedUsername),
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
    
    ProfileInsideContent() {
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
                        Carregando usu??rio...
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
                        loggedUserDadosUsuario={
                            baseDeDados.getDadosUsuarioFromUsername(loggedInUser)
                        }
                        tipoDeFeed={this.state.tipoDeFeed} 
                        setTipoDeFeed={async (tipoDeFeed) => {
                            await this.refreshLocalPius(tipoDeFeed);
                        }} 
                    />
                }
                ListFooterComponent={
                    <SemPius 
                        footerMode={this.state.piusList.length > 0} 
                    />
                }
                data={this.state.piusList}
                renderItem={({item}) => {
                    return (
                        <Piu 
                            piuId={item}
                            navigation={this.navigation}
                            onChange={async () => {
                                await this.refreshLocalPius(this.state.tipoDeFeed);
                            }}
                            onPressUser={(selectedUsername) => {
                                this.navigation.push(
                                    'Profile', 
                                    {
                                        selectedUsername,
                                        canGoBack: true,
                                    },
                                );
                            }}
                        />
                    );
                }}
            />
        );
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <SocialMediaHeader 
                    navigation={this.navigation} 
                    showBackButton={this.canGoBack}
                />
                <View style={{ flex: 1 }}>
                    {this.ProfileInsideContent()}
                </View>
                <PiarButton navigation={this.navigation} />
            </SafeAreaView>
        );
    }
};