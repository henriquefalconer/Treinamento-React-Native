import React, { Component } from "react";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";
import { baseDeDados, loggedInUser, signOut } from "../../../utilities/baseDeDados";
import ProfileTop from "../../../components/SocialMedia/Profile/ProfileTop";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";
import { TipoDeFeed } from "../../../utilities/constants";

class ProfileTab extends Component {

    constructor({ selectedUsername=loggedInUser, onReturnFromSearch }) {
        super();

        this.selectedUsername = selectedUsername;
        this.onReturnFromSearch = onReturnFromSearch;

        this._isMounted = true;

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
            <SafeAreaView style={{ flex: 1 }} >
                {
                    this.onReturnFromSearch == null
                    ? <SocialMediaHeader navigation={this.props.navigation} />
                    : <SocialMediaHeader 
                        navigation={this.props.navigation} 
                        showBackButton 
                        backButtonOnPress={this.onReturnFromSearch}
                    />
                }
                <View style={{ flex: 1 }}>
                    {this.ProfileContent()}
                </View>
                <PiarButton navigation={this.props.navigation} />
            </SafeAreaView>
        );
    }
};

export default ProfileTab;