import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function SearchTab({navigation}) {
    return (
        <View style={styles.background}>
            <View style={styles.background}></View>
            <PiarButton navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default SearchTab;