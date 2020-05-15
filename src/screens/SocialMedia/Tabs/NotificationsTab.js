import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import SocialMediaHeader from "../../../components/SocialMedia/General/SocialMediaHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function NotificationTab({navigation}) {
    return (
        <SafeAreaView style={styles.background}>
            <SocialMediaHeader navigation={navigation} />
            <View style={styles.background}></View>
            <PiarButton navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default NotificationTab;