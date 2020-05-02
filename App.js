import * as React from 'react';
import { Provider as AuthProvider } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/Forms/LoginScreen';
import SignUpScreen from './src/screens/Forms/SignUpScreen';
import SignUpScreenNext from './src/screens/Forms/SignUpScreenNext';
import SocialMediaScreen from './src/screens/SocialMedia/SocialMediaScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          header: () => {},
        }}
      > 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={SignUpScreen} />
        <Stack.Screen name="CadastroNext" component={SignUpScreenNext} />
        <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};