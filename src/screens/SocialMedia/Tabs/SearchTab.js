import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import FeedHeader from "../../../components/SocialMedia/General/FeedHeader";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function SearchTab({navigation}) {
    return (
        <SafeAreaView style={styles.background}>
            <FeedHeader navigation={navigation} />
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

export default SearchTab;