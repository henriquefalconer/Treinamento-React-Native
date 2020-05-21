import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home/HomeScreen';
import LoginScreen from './Forms/LoginScreen';
import SignUpScreen from './Forms/SignUpScreen';
import SignUpScreenNext from './Forms/SignUpScreenNext';
import SocialMediaScreen from './SocialMedia/SocialMediaScreen';
import PiarScreen from './SocialMedia/PiarScreen';

const Stack = createStackNavigator();

export default function ScreensNavigation({ route }) {
  return (
    <Stack.Navigator 
      initialRouteName={
        route.params?.userToken
            ? "SocialMedia"
            : "Home"
      } 
      headerMode="none"
    > 
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={SignUpScreen} />
      <Stack.Screen name="CadastroNext" component={SignUpScreenNext} />
      <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
      <Stack.Screen name="Piar" component={PiarScreen} />
    </Stack.Navigator>
  );
}