import React from "react";
import { View, StyleSheet } from "react-native";
import PiarButton from "../../../components/SocialMedia/General/PiarButton";

function NotificationTab() {
    return (
        <View style={styles.background}>
            <PiarButton />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});

export default NotificationTab;