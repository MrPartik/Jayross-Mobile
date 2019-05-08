import React from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Icon,
  Image,
  Text,
} from 'react-native';

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ScreenLogin from './pages/screenLogin';
import ScreenStocks from './pages/screenStocks';
import ScreenHome from './pages/screenHome';
import ScreenProfile from './pages/screenProfile';
import ScreenRequests from './pages/screenProfile';
import SplashScreen from './pages/splashScreen'; 
import * as appConfig from './appConfig';
import ScreenRequestBatch from './pages/screenRequestBatch';
import ScreenRequestSetQty from './pages/screenRequestSetQty';

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return <ScreenLogin/> ;
  }

}


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();  
  } 

  _bootstrapAsync = async () => {

    
    const userToken = await AsyncStorage.getItem('username');
    console.log(userToken)
    setTimeout(() => {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    }, 5000); 
  };

  render() {
    return <SplashScreen/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const stockRequests = createStackNavigator({
    RequestBatch: ScreenRequestBatch,
    RequestSetQty: ScreenRequestSetQty
});
const AuthStack = createStackNavigator({
  SignIn: SignInScreen
});
const TabNav = createBottomTabNavigator({
  Home: ScreenHome,
  Stocks: ScreenStocks,
  Request: stockRequests,
  Profile: ScreenProfile,
}, {
  defaultNavigationOptions: ({
    navigation
  }) => ({
    tabBarIcon: ({
      focused,
      horizontal,
      tintColor
    }) => {
      const {
        routeName
      } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Stocks') {
        iconName = `ios-cube`; 
      } else if (routeName === 'Profile') {
        iconName = `ios-contact`;
      } else if (routeName === 'Request') {
        iconName = `ios-clipboard`;
      } else if (routeName === 'Home') {
        iconName = `ios-home`;
      }
 
      return <IconComponent name = {
        iconName
      }
      size = {
        25
      }
      color = {
        tintColor
      }
      />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    // style: { 
    //     height: 70,
    // },
    //   labelStyle: {
    //     fontSize: 14, 
    //     fontWeight:'bolder'
    //   },
  },
});

export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: TabNav
}, {
  initialRouteName: 'AuthLoading',
}));