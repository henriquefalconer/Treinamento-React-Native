import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { baseDeDados, signOut } from "../../../utilities/baseDeDados";
import FeedHeader from "../../../components/SocialMedia/General/FeedHeader";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import SemPius from "../../../components/SocialMedia/Feed/SemPius";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

export default class FeedTab extends Component {

    constructor() {
        super();

        this._isMounted = true;

        this.state = {
            piusList: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.setPiusApiListener();
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

    async refreshLocalPius() {
        this._isMounted && this.setState({
            piusList: await baseDeDados.montarPiusList(),
        });
    }

    async setPiusApiListener() {
        do {
            // Carregar pius do servidor à base de dados local:
            const change = await baseDeDados.carregarAllDataFromApi();
    
            // Implementar pius, caso algo tenha sido modificado na base de dados local:
            if (change) this.refreshLocalPius();

            await this.wait(1000);

            console.log("reloaded");
        } while (this._isMounted)
    }

    loadPiusArea() {
        if (this.state.piusList == null) {
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
                </View>
            );
        }

        return (
            <FlatList
                keyExtractor={(element) => {return element}}
                data={[...this.state.piusList, 'semPius']} 
                renderItem={({ item }) => {
                    // Adiciona um novo piu, ou o Component SemPius, à lista:
                    return item !== 'semPius' 
                        ? <Piu 
                            piuId={item}
                            onPressLike={async () => {
                                baseDeDados.togglePiuLike({ piuId: item });
                                await this.refreshLocalPius();
                            }}
                            onPressReply={() => {
                                baseDeDados.replyPiu({ 
                                    piuReplyId: item, 
                                    navigation: this.props.navigation,
                                 });
                            }}
                            onPressDestaque={async () => {
                                baseDeDados.togglePiuDestaque({ piuId: item });
                                await this.refreshLocalPius();
                            }} 
                            onPressDelete={async () => {
                                baseDeDados.togglePiuDelete({ piuId: item });
                                await this.refreshLocalPius();
                            }} 
                        /> 
                        : <SemPius />;
                }}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.background}>
                <FeedHeader navigation={this.props.navigation} />
                <View style={styles.background}>
                    {this.loadPiusArea()}
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
});