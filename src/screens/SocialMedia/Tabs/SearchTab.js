import React from "react";
import { View, StyleSheet } from "react-native";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function SearchTab({navigation}) {
    return (
        <View style={styles.background}>
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