import React, { useState } from "react";
import { View, Image, ImageBackground, Text, Dimensions } from "react-native";
import FilledButton from "../../components/FilledButton";
import HomeScreenStyle from '../../style/HomeScreen/HomeScreenStyle';
import { gyroscope } from "react-native-sensors";

const window = Dimensions.get("window");

const deviceWidth = window.width;
const deviceHeight = window.height;

const scalingFactor = 1.2;

const imageWidth = scalingFactor*deviceWidth;
const imageHeight = scalingFactor*deviceHeight;

function HomeScreen({navigation}) {
  [gyroscopePos, setGyroscopePostion] = useState({
    x: 0,
    y: 0,
    z: 0,
    subscription: null,
  });

  async function subscribeToGyroscope() {

    const subscription = gyroscope
        .subscribe(({x, y, z}) => {
          setGyroscopePostion({
            ...gyroscopePos,
            x: gyroscopePos.x + x,
            y: gyroscopePos.y + y,
            z: gyroscopePos.z + z,
          });
      });

    setGyroscopePostion({
      ...gyroscopePos,
      subscription: subscription,
    })
  };

  function unsubscribeToGyroscope() {
    gyroscopePos.subscription.unsubscribe();
  }

  if (gyroscopePos.subscription == null) subscribeToGyroscope();

  return (
    <ImageBackground 
      style={HomeScreenStyle.backgrondImage} 
      imageStyle={{
        top: gyroscopePos.x / 5,
        right: gyroscopePos.y / 5,
        height: imageHeight,
        width: imageWidth,
        position: 'absolute',
      }}
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

      <View style={{height: 30}} />

      <FilledButton 
        text="Login" 
        onPress={
          () => {
            unsubscribeToGyroscope();
            navigation.navigate('Login');
          }
        } 
      />

      <View style={{height: 30}} />

      <FilledButton 
        text="Cadastro" 
        onPress={
            () => {
              unsubscribeToGyroscope();
              navigation.navigate('Cadastro');
            }
        } 
      />
    </ImageBackground>
  );
};

export default HomeScreen;
