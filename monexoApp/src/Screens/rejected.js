import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import {View,Modal, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {TextInput, HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import LottieView from 'lottie-react-native';
//import {Slider} from 'react-native';
import SliderText from 'react-native-slider-text';
//import Slider from "react-native-slider";
import Slider from '@react-native-community/slider';
import { ScrollView } from "react-native-gesture-handler";

const { height, width } = Dimensions.get('window')
export default class Rejected extends React.Component {
    
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
            <View style={{alignItems:'center', marginTop:20,}}>
                <Text style={{fontWeight:'bold'}}>
                    Unable to give you an offer
                </Text>
            </View>
            <View style={{alignItems:'center', marginTop:10,}}>
            <Image source={require('../../assets/rejected.png')} style={{height:100,width:100, paddingTop:20,marginLeft:20}} />
            </View>
            <View style={{margin:20}}>
                <Text style={{marginBottom:10}}>
                    We are unable to approve your application at this instant.
                </Text>
                <Text>
                    One or more would be the reason.
                </Text>
            </View>
            <View style={{ borderWidth:0.1, borderRadius:5, marginLeft:5, marginRight:5,}}>
            <View style={{flexDirection:'row', marginTop:10}}>
                <View style={{flexDirection:'row', marginLeft:5, marginBottom:10}} >
                <Image style={{height:15, width:15, margin:5}}
                source={require('../../assets/notservice.png')}
                />
                <Text style={{fontSize:12, marginTop:5, fontWeight:'bold'}}>
                    City not serviceable
                </Text>
                </View>
                <View style={{flexDirection:'row', marginLeft:15}} >
                <Image style={{height:15, width:15, margin:5, marginLeft:20}}
                source={require('../../assets/lowerincome.png')}
                />
                <Text style={{fontSize:12, marginTop:5, fontWeight:'bold'}}>
                    Income lower than minimum 
                </Text>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row', marginLeft:5, marginBottom:10}} >
                <Image style={{height:15, width:15, margin:5}}
                source={require('../../assets/lowcredit.png')}
                />
                <Text style={{fontSize:12, marginTop:5, fontWeight:'bold'}}>
                    Low Credit score
                </Text>
                </View>
                <View style={{flexDirection:'row', marginLeft:15}} >
                <Image style={{height:15, width:15, margin:5, marginLeft:35}}
                source={require('../../assets/kyc.png')}
                />
                <Text style={{fontSize:12, marginTop:5, fontWeight:'bold'}}>
                    KYC check negative 
                </Text>
                </View>
            </View>
            <View style={{flexDirection:'row', paddingBottom:0}}>
                <View style={{flexDirection:'row', marginLeft:5}} >
                <Image style={{height:15, width:15, margin:5}}
                source={require('../../assets/liabilities.png')}
                />
                <Text style={{fontSize:12, marginTop:5, fontWeight:'bold'}}>
                    High current liabilities
                </Text>
                </View>
                <View style={{flexDirection:'row', marginLeft:15, marginBottom:10}} >
                <Image style={{height:15, width:15, margin:5}}
                source={require('../../assets/pannegative.png')}
                />
                <Text style={{fontSize:12, marginTop:5, fontWeight:'bold'}}>
                    PAN number check negative
                </Text>
                </View>
            </View>
            </View>
            <View style={{ borderRadius:5, borderWidth:0.1, marginTop:20, margin:5}}>
                <View>
                    <Text style={{margin:10,lineHeight:25, fontSize:12}}>
                        We are also offering various services like Monthly credit score, Bill payments, Spend analysis for free.
                    </Text>
                </View>
                <View >
                    <TouchableOpacity style={{borderRadius:20, borderColor:'#2A9134', justifyContent:'center',borderWidth:1, height:36, width:100, marginBottom:15, marginLeft:Dimensions.get('window').width/2+65, marginTop:-5}}
                    onPress={() => this.props.navigation.navigate('refer')}
                    >
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
