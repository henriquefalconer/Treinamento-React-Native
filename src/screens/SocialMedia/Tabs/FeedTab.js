import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import Piu from "../../../components/SocialMedia/Feed/Piu";
import { ScrollView } from "react-native-gesture-handler";
import { baseDeDados } from "../../../utilities/baseDeDados";

function FeedTab() {
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Piu 
                    piuId={"fulano.beltrano:" + Date.parse("15 Apr 2020 11:38:00")}
                />
                <Piu 
                    piuId={"richar.lison:" + Date.parse("15 Apr 2020 8:30:00")}
                />
                <Piu 
                    piuId={"cleber.cunha:" + Date.parse("15 Apr 2020 11:00:00")}
                />
                <Piu 
                    piuId={"cleber.cunha:" + Date.parse("15 Apr 2020 8:00:00")}
                    />
                <View style={{height: 120, paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{height: 50, width: 50}} source={require('../../../../assets/semPius.png')}></Image>
                    <Text style={{color: "#888", fontSize: 16}}>Sem mais pius...</Text>
                </View>
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