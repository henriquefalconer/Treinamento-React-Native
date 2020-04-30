import React from "react";
import { Image, ImageBackground, Text } from "react-native";
import FilledButton from "../../components/FilledButton";
import HomeScreenStyle from '../../style/HomeScreen/HomeScreenStyle';

function HomeScreen({navigation}) {
  return (
    <ImageBackground 
      style={HomeScreenStyle.backgrondImage} 
      source={require('../../../assets/fundo.jpg')} 
    >
      <Image 
        style={HomeScreenStyle.logo} 
        source={require('../../../assets/logo.jpg')} 
      />

      <Text style={HomeScreenStyle.title}>
        Bem-vindo(a) ao
      </Text>
      <Text style={HomeScreenStyle.title}>
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
            () => navigation.navigate('Cadastro')
        } 
      />

    </ImageBackground>
  );
};

export default HomeScreen;
