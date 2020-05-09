import React from "react";
import { View, StatusBar, StyleSheet, Platform } from "react-native";

export default function CustomStatusBar({barStyle, backgroundColor}) {
  return (
    <View style={{...styles.statusBar}}>
      <StatusBar translucent barStyle={barStyle} backgroundColor={backgroundColor || 'transparent'} />
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});