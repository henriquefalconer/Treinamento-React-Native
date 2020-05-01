import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import Piu from "../../../components/SocialMedia/Feed/Piu";

function FeedTab() {
    return (
        <SafeAreaView style={styles.background}>
            <Piu />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#ddd',
    },
});

export default FeedTab;