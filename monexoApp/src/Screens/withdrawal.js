import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import {View, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'

const { height, width } = Dimensions.get('window')
export default class Withdrawal extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            showCircleImg:true,
            termsAccepted: false,
            checked: false,
            ButtonStateHolder:true
            
            //modelHeight:Dimensions.get('window').height/2-10,
        }
        //this.onSubmit = this.onSubmit.bind(this);
    }

    renderImage =() => {
        var imgSource = this.state.showCircleImg?circle:check_circle; 
        return(
            <Image style={{height:20, width:20}}
                source={imgSource}
            />
        );
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
                <Text style={{marginTop:0, fontWeight:'bold'}}>
                Withdrawal
                </Text>
                <TouchableOpacity style={{paddingLeft:65}}>
                    <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:100}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
                </TouchableOpacity>
        </View>
            <View style={{height:40, backgroundColor:'rgba(65, 161, 127,0.1)', paddingTop:1,marginBottom:20}}>
        <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10}}>
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:60,marginTop:10}}>
        
        </View>
        <View>
        <Image style={{height:20, width:20}}
                source={require('../../assets/check_circle.png')}
            />
        </View>
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:160,marginTop:10}}>
        
        </View>
        <View>
        <Image style={{height:20, width:20}}
                source={require('../../assets/check_circle.png')}
            />
        </View>
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:60,marginTop:10}}>
        
        </View>
        </View>
        </View>
           {/*} <View style={{alignItems:'center', marginTop:0,}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>
                    Complete the E-NACH
                </Text>
            </View>*/}
            <View style={{alignItems:'center',justifyContent:'center', marginTop:20, flexDirection:'row'}}>
                <Text style={{color:'#111111', fontSize:16, fontFamily:'Nunito', fontWeight:'bold'}}>
                    Marvelous! 
                </Text>
                <Image source={require('../../assets/emoji.png')} style={{height:20,width:20, paddingTop:20,marginLeft:5}} />
            </View>
            <View style={{alignItems:'center', marginTop:30,}}>
            <Image source={require('../../assets/withdraw.png')} style={{height:200,width:200, paddingTop:20,marginLeft:20}} />
            </View>
            <View style={{marginLeft:20, flexDirection:'row'}}>
                <Text style={{marginTop:30, marginBottom:10, marginRight:4}}>
                    Your Personal loan of 
                    </Text>
                    <Text style={{textDecorationLine:'underline',marginTop:30, marginBottom:10, fontWeight:'bold', marginRight:4}}>
                    {'\u20B9'}5,00,000 
                    </Text>
                    <Text style={{marginTop:30, marginBottom:10}}>
                    is set up now.
                </Text>
                </View>
    
                <View style={{ width:'30%',borderRadius:5, marginTop:5, backgroundColor:'#ffffff', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                    //onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                    onPress={() => this.props.navigation.navigate('feepayment')}
                    style={{height:30,width:'100%',alignItems:'center',borderColor:'#2A9134',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                    >
                        <Text style={{color:'#2A9134'}}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
          
        );
    }
}
