import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-community/async-storage";
import FullScreenLoading from './components/General/FullScreenLoading';
import ScreensNavigation from './screens/ScreensNavigation';

const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      userToken: null,
      retrievingPossibleToken: true,
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      retrievingPossibleToken: true,
    });

    this.retrieveToken();
  }

  async retrieveToken() {
    const userToken = await AsyncStorage.getItem('token');

    this.setState({
      userToken,
      retrievingPossibleToken: false,
    });
  }

  render() {
    
    return (
      <NavigationContainer>
        <Stack.Navigator 
          headerMode="none"
        > 
          {
            this.state.retrievingPossibleToken
            ? <Stack.Screen name="Loading" component={FullScreenLoading} />
            : (
              <Stack.Screen 
                name="Screens" 
                component={ScreensNavigation} 
                initialParams={{ 
                  userToken: this.state.userToken,
                }}
              />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
}