import React from "react";
import { View, Image, ImageBackground, Text, StyleSheet } from "react-native";
import FilledButton from "../components/FilledButton";

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.backgrondImage} 
        source={require('../../assets/fundo.jpg')} 
      >
        <Image 
          style={styles.logo} 
          source={require('../../assets/logo.jpg')} 
        />
        <Text 
          style={styles.title}
        >
          Bem-vindo(a) ao
        </Text>
        <Text 
          style={styles.title}
        >
          PiuPiuwer,
        </Text>
        <FilledButton 
          text="Login" 
          onPress={
            () => navigation.navigate('Login')
          } 
        />
        <FilledButton 
          text="Cadastro" 
          onPress={
              () => {}
          } 
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  backgrondImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  title: {
    fontSize: 30,
    color: '#F21D1D',
    textAlign: 'center',
  },
});

export default HomeScreen;
