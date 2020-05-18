import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FilledButton({text, onPress, textStyle, width=250, height=49, disabled=false, onDisabledPress}) {
  
  let styles = StyleSheet.create({
    filledButton: {
      backgroundColor: "#F21D1D",
      width: width,
      height: height,
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

  const filledButton = (
      <TouchableOpacity
        style={styles.filledButton}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={textStyle || styles.text}>{text}</Text>
      </TouchableOpacity>
    );

  return (
    onDisabledPress && disabled
      ? (
        <TouchableOpacity
          onPress={onDisabledPress}
        >
          {filledButton}
        </TouchableOpacity>
      )
      : filledButton
  );
};