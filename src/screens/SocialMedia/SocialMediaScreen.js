import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import BlandHeader from '../../components/BlandHeader';

function FeedScreen({navigation}) {
    return (
        <SafeAreaView style={styles.background}>
            <BlandHeader navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export default FeedScreen;