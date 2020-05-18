import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { baseDeDados, signOut } from "../../../utilities/baseDeDados";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
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

            console.log("reloaded feed");
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

        return (
            <FlatList
                keyExtractor={(element) => {return element}}
                data={this.state.piusList} 
                renderItem={({ item }) => {
                    return (
                        <Piu 
                            piuId={item}
                            navigation={this.props.navigation}
                            onChange={async () => await this.refreshLocalPius()}
                        />
                    );
                }}
                ListFooterComponent={<SemPius />}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.background}>
                <SocialMediaHeader navigation={this.props.navigation} />
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