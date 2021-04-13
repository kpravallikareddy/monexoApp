import React, {Component} from 'react';
import {View,StyleSheet, Text,TouchableOpacity, Image, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'

export default class Creditscore extends React.Component {
    constructor(props){
        super(props)
        this.state= {
          showhome:true,
          showbudgeting:true,
          showcreditscore:true,
          showmenu:true
        }
      }

      render(){
          return(
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <Image source={require('../../assets/logo.png')} style={{height:25,width:35, paddingTop:30,marginLeft:10}} />
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:15}}>
                Credit score
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/2-20}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{height:24,width:24}}>
                <Image source={require('../../assets/logo.png')} style={{height:15,width:15, paddingTop:30,marginLeft:10}} />
                </View>
            </TouchableOpacity>
        </View>
        <ScrollView>

        </ScrollView>
        </View>
          );
      }
}