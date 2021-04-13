import React, {Component} from 'react';
import {View,StyleSheet, Text,TouchableOpacity, Image, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP, TOKEN_EMAIL,TOKEN_PW,FINBIT_JWTTOKEN } from '@env'

export default class Pfm extends React.Component {
    constructor(props){
        super(props)
        this.state= {
          cardslist:[1,2,3],
          cardselected:false,
          selectedvalue:1,
        }
      }


      jwttoken = () => {
        // console.log('jwt');
         var data = new FormData();
         data.append("emailAddress", TOKEN_EMAIL);
         data.append("password", TOKEN_PW);
         fetch(FINBIT_JWTTOKEN,
       {
         method:'POST',
         headers:{
             "Cache-control": "no-cache",
             'Content-Type': multipart/form-data,
            },
         body:data,
       }).then((response) =>response.json())
         .then((responseJson) =>{
         console.log('jwt-response:',responseJson)
        // console.log('token:',responseJson.access_token);
         this.setState({jwtokenresponse:responseJson})
         this.setState({jwttoken:responseJson.access_token})
         }).catch((error) =>
         {
           console.error(error);
         });
       }
     

       handleChange = (key) => {
           this.setState({selectedvalue:key})
       }


      renderCards() {
       
          console.log('length:',this.state.cardslist.length)
            for (var i=0; i < this.state.cardslist.length; i++) {
          //  console.log('i value:',i)
            return(
                this.state.cardslist.map((list) => {
                return (
                
                <View  style={{alignItems:'center',}}>
                
                    {this.state.cardselected == false ?
                <TouchableOpacity 
                    style={{width:Dimensions.get('window').width-50,height:70,borderColor:'#DDDDDD',borderWidth:1,borderRadius:8,marginTop:20}}
                    onPress={() => this.setState({cardselected:true})}
                   // onPress = {this.handleChange, console.log('value:',this.state.selectedvalue)}
                >
                    <View style={{flexDirection:'row', marginTop:10,}}>
                        <View style={{marginTop:17}}>
                        <Image source={require('../../assets/logo.png')} style={{height:10,width:25,marginLeft:10, marginRight:10}} />
                        </View>
                    <View>
                    <Text style={{fontFamily:'Nunito', fontWeight:'bold',fontSize:16,}}>
                        ICIC Bank Account
                    </Text>
                    <Text style={{fontFamily:'Nunito',fontSize:12, color:'#888888',marginTop:8}}>
                        Account No. 1223343655476
                    </Text>
                    </View>
                    <View style={{alignSelf:'center'}}>
                        <Image source={require('../../assets/notselected.png')} style={{height:20,width:20,marginLeft:Dimensions.get('window').width/4 }} />
                    </View>
                    </View>
                </TouchableOpacity>
                :
                
                <TouchableOpacity style={{width:Dimensions.get('window').width-50,height:70,borderColor:'#2A9154',borderWidth:1,borderRadius:8,marginTop:20}}>
                    <View style={{flexDirection:'row', marginTop:10,}}>
                        <View style={{marginTop:17}}>
                        <Image source={require('../../assets/logo.png')} style={{height:10,width:25,marginLeft:10, marginRight:10}} />
                        </View>
                    <View>
                    <Text style={{fontFamily:'Nunito', fontWeight:'bold',fontSize:16,}}>
                        ICIC Bank Account
                    </Text>
                    <Text style={{fontFamily:'Nunito',fontSize:12, color:'#888888',marginTop:8}}>
                        Account No. 1223343655476
                    </Text>
                    </View>
                    <View style={{alignSelf:'center'}}>
                        <Image source={require('../../assets/selected.png')} style={{height:20,width:20,marginLeft:Dimensions.get('window').width/4 }} />
                    </View>
                    </View>
                </TouchableOpacity>
                }
                </View>
                
                )
            })
            )
         }
    }








      render(){
          return(
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <TouchableOpacity 
             onPress= {() => this.props.navigation.navigate('home')}
            >
            <Image source={require('../../assets/arrow_back.png')} style={{height:10,width:25, paddingTop:30,marginLeft:10}} />
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:15}}>
                Selecting account
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/2-90}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:10}} />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View style={{justifyContent:'center',alignItems:'center', marginTop:30}}>
                <Text style={{fontFamily:'Nunito',fontWeight:'bold',fontSize:20,lineHeight:33}}>
                    Please select a bank account
                </Text>
            </View>

            <View>
                {this.renderCards()}
            </View>
            <TouchableOpacity
            style={{alignSelf:'center',}}
            onPress={() => this.props.navigation.navigate('spendings')}
            >
            <View style={{width:150, height:42,backgroundColor:'#2A9134',borderRadius:8, justifyContent:'center',alignItems:'center', marginTop:40}}>
            <Text style={{color:'#ffffff'}}>Continue</Text>
            </View>
            </TouchableOpacity>
        </ScrollView>
        </View>
          );
      }
}