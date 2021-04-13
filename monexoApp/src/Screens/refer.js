import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import {View, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'

const { height, width } = Dimensions.get('window')
export default class Refer extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            showCircleImg:true,
            termsAccepted: false,
            checked: false,
            
            //modelHeight:Dimensions.get('window').height/2-10,
        }
        //this.onSubmit = this.onSubmit.bind(this);
    }

    handleOnPress = () => this.setState({checked: false})

   
      onChange = checkedValues => {
        this.setState(() => {
          return { countchecked: checkedValues };
        });
      };

    handleCheckBox = () => {this.setState({ termsAccepted: !this.state.termsAccepted })}
    
        render(){
            const thumbImage = require('../../assets/Slider.png');
            const {checked, modalVisible, countchecked} = this.state;
        return (
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
                <View style={{flex:1}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
                <TouchableOpacity> 
                   
                   <Text style={{fontSize: 16,paddingRight:20}}> X </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{paddingLeft:140}}>
                    <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:100}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center', marginTop:50,}}>
                <Text style={{fontWeight:'bold'}}>
                    We are unable to take decision now
                </Text>
            </View>
            <View style={{alignItems:'center', marginTop:30,}}>
            <Image source={require('../../assets/refer.png')} style={{height:150,width:150, paddingTop:20,marginLeft:20}} />
            </View>
            <View style={{margin:20, alignItems:'center'}}>
                <Text style={{marginBottom:10, fontWeight:'bold'}}>
                    Your application is sent to Credit Manager
                </Text>
                <Text style={{fontSize:12}}>
                    We try to give you a decision withing 24 hours
                </Text>
            </View>
    
            <View style={{ borderRadius:5, borderWidth:0.1, marginTop:20, margin:5}}>
                <View>
                    <Text style={{margin:10,lineHeight:25, fontSize:12}}>
                        We are also offering various services like Monthly credit score, Bill payments, Spend analysis for free.
                    </Text>
                </View>
                <View >
                    <TouchableOpacity style={{borderRadius:20, borderColor:'#2A9134', justifyContent:'center',borderWidth:1, height:36, width:100, marginBottom:15, marginLeft:Dimensions.get('window').width/2+65, marginTop:-5}}>
                        <Text style={{textAlign:'center', fontWeight:'bold', color:'#2A9134', fontSize:12}}>
                            Visit home
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            </View>
        );
    }
}
