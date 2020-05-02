import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const FilledButton = ({text, onPress, textStyle, width, height}) => {
    let styles = StyleSheet.create({
    filledButton: {
        backgroundColor: "#F21D1D",
        width: width || 280,
        height: height || 55,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
    text: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'normal'
    }
    });

    return (
        <TouchableOpacity
          style={styles.filledButton}
          onPress={onPress}
        >
          <Text style={textStyle || styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default FilledButton;