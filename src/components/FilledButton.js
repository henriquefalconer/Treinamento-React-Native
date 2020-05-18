import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const FilledButton = ({text, onPress, textStyle, width, height, disabled=false}) => {
    let styles = StyleSheet.create({
    filledButton: {
        backgroundColor: "#F21D1D",
        width: width || 250,
        height: height || 49,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1.0,
      },
    text: {
        color: '#FFFFFF',
        fontSize: 23,
        fontWeight: 'normal'
    }
    });

    return (
        <TouchableOpacity
          style={styles.filledButton}
          onPress={disabled ? null : onPress}
        >
          <Text style={textStyle || styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default FilledButton;