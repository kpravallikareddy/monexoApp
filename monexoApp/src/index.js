import React from 'react';
import {View,Image, AsyncStorage,Platform,Dimensions,Animated} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import personalinfo from '../src/Screens/personalinfo'
import ocr from '../src/Screens/ocr'
import preoffer from './Screens/preoffer'
import dc from './Screens/dc'
import pl from './Screens/pl'
import rejected from './Screens/rejected'
import refer from './Screens/refer'
import bankdetails from './Screens/bankdetails'
import employerdetails from './Screens/employerdetails'
import enach from './Screens/enach'
import vkyc from './Screens/vkyc'
import withdrawal from './Screens/withdrawal'
import feepayment from './Screens/feepayment'
import cameraexample from './Screens/cameraexample'
import ocrmon from './Screens/ocrmon'
import home from './Screens/home'
import collegedetails from './Screens/collegedetails'
import creditscore from './Screens/creditscore'
//import './Screens/intro';


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
      dc:{
        screen:dc,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      pl:{
        screen:pl,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      rejected:{
        screen:rejected,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      refer:{
        screen:refer,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      bankdetails:{
        screen:bankdetails,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      employerdetails:{
        screen:employerdetails,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      enach:{
        screen:enach,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      vkyc:{
        screen:vkyc,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      withdrawal:{
        screen:withdrawal,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      feepayment:{
        screen:feepayment,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      cameraexample:{
        screen:cameraexample,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      ocrmon:{
        screen:ocrmon,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      home:{
        screen:home,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      collegedetails:{
        screen:collegedetails,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
      creditscore:{
        screen:creditscore,
        navigationOptions: ({navigation}) => ({
          headerShown:false
        }),
      },
    },
    {
        initialRouteName:'home',
    },
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;