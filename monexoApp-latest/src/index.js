import React from 'react';
import {View,Image, AsyncStorage,Platform,Dimensions,Animated} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import personalinfo from '../src/Screens/personalinfo'
import ocr from '../src/Screens/ocr'
import preoffer from './Screens/preoffer'

export const AppNavigator = createStackNavigator(
    {

      ocr:{
        screen:ocr,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      personalinfo:{
        screen:personalinfo,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      preoffer:{
        screen:preoffer,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
    },
    {
        initialRouteName:'ocr',
    },
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;