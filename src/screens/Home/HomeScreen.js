import React from "react";
import { View, Image, ImageBackground, Text } from "react-native";
import FilledButton from "../../components/FilledButton";
import HomeScreenStyle from '../../style/HomeScreen/HomeScreenStyle';
import CustomStatusBar from "../../components/General/CustomStatusBar";

function HomeScreen({navigation}) {

  return (
    <ImageBackground 
      style={HomeScreenStyle.backgrondImage} 
      source={require('../../../assets/fundo.jpg')} 
    >
      <CustomStatusBar barStyle='light-content' />
      <Image 
        style={HomeScreenStyle.logo} 
        source={require('../../../assets/logo.jpg')} 
      />

      <View style={{
        marginVertical: 15
      }}>
        <Text style={HomeScreenStyle.title}>
          Bem-vindo(a) ao
        </Text>
        <Text style={HomeScreenStyle.title}>
          PiuPiuwer,
        </Text>
      </View>

      <View style={{height: 25}} />

      <FilledButton 
        text="Login" 
        onPress={
          () => {
            navigation.navigate('Login');
          }
        } 
      />

      <View style={{height: 25}} />

      <FilledButton 
        text="Cadastro" 
        onPress={
            () => {
              navigation.navigate('Cadastro');
            }
        } 
      />
    </ImageBackground>
  );
};

export default HomeScreen;
