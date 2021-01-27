import React from 'react';
import {View,Image, AsyncStorage,Platform,Dimensions,Animated} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import personalinfo from '../src/Screens/personalinfo'
import ocr from '../src/Screens/ocr'

class LaunchScreen extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.moveThisLogo();
    
        setTimeout(() => {
          this.redirect();
        },1000);
      }
    
      moveThisLogo() {
        Animated.spring(this.moveAnimation, {
          toValue: {x: Dimensions.get('window').width/2-200, y: Platform.OS=='ios'? (Dimensions.get('window').height <=667 ? 100: 190): 30},
        }).start()
    
      }

    redirect = async ()=>{
        let token = await AsyncStorage.getItem('token');
        if(token && (token !== '')){
          let lastOpenedScreen = await AsyncStorage.getItem('lastScreen');
          this.props.navigation.navigate('Personalinfo'); 
        }
        else{
            this.props.navigation.navigate('Ocr');
        }
      }
      render(){
        this.moveAnimation = new Animated.ValueXY({x: Dimensions.get('window').width/2-200, y : Dimensions.get('window').height-100})
        let anim = this.moveAnimation
        return(
          <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
              <View style={{marginTop: Platform.OS=='ios'? (Dimensions.get('window').height <=667 ? 100: 190): 30 ,
                flex: 1,
                alignItems: 'center',
              }}>
                  <Animated.View style={[this.moveAnimation.getLayout()]}>
                      <Image source={require('../assets/Profile.png')} style={{width:200,height:120, alignSelf:'center'}} resizeMode='contain' />
                  </Animated.View>        
              </View>
          </View>
        );
      }
    
}

export const AppNavigator = createStackNavigator(
    {
     LaunchScreen:{
        screen: LaunchScreen,
        navigationOptions:({navigation})=>({
          headerShown: false,
        }),
      },

      Personalinfo:{
          screen: personalinfo,
          navigationOptions:({navigation})=>({
              headerShown:false,
          }),
      },
      ocr: {
        screen: ocr,
        navigationOptions:({navigation}) =>({
          headerShown:false,
        }),
      },

    },
    {
        initialRouteName:'ocr',
    },
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;