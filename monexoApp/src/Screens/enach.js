import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import {View, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';

const { height, width } = Dimensions.get('window')
export default class Enach extends React.Component {
    
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
    
    //lotuspay api integration

    fetchData = () => {
        console.log('test');
        //fetch('https://api.lotuspay.com/v1/nach_banks?filter=variant_api')
          fetch('https://api-test.lotuspay.com/v1/sources/')
            .then((response) => response.json())
            .then((responseJson) => {
               console.log('response:', responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    fetchSource = () => {
         console.log('source');

         fetch('https://api-test.lotuspay.com/v1/sources/', //+sk_test_GzAdSyss7OZ9dbhvZibmP5TA,
       {
         method:'POST',
         headers:{
            'Authorization': 'Bearer sk_test_GzAdSyss7OZ9dbhvZibmP5TA',
            'Content-Type': 'application/json',
          },
         body:JSON.stringify({"type":"nach_debit",
                                "nach_debit":{"amount_maximum":10000,
                                //"date_first_collection":"2020-01-01",
                                "debtor_agent_code":"ICIC",
                                "debtor_account_name":"AMIT JAIN",
                                "debtor_account_number":"326949",
                                "debtor_account_type":"savings",
                                "frequency":"MNTH"},
                                //"redirect":{"return_url":"https://www.lotuspay.com/"},
                                "reference1":"CU0011AABBCC22"}
                        ),
       }).then((response) =>response)
         .then((responseJson) =>{
         console.log('response:',responseJson)
         
         }).catch((error) =>
         {
           console.error(error);
         });
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
                   
                   <Text style={{fontSize: 18,paddingRight:20}}> X </Text>
                </TouchableOpacity>
                <Text style={{marginTop:0, fontWeight:'bold'}}>
                E-NACH
                </Text>
                <TouchableOpacity style={{paddingLeft:Dimensions.get('window').width/3-30}}>
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
        <View>
            {this.renderImage()}
        </View>
        </View>
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:Dimensions.get('window').width/2,marginTop:10}}>
        
        </View>
        <View>
        <Image style={{height:20, width:20}}
                source={require('../../assets/circle.png')}
            />
        </View>
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:60,marginTop:10}}>
        
        </View>
        </View>
        </View>
            <View style={{alignItems:'center', marginTop:0,}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>
                    Complete the E-NACH
                </Text>
            </View>
            <View style={{alignItems:'center', marginTop:30,}}>
            <Image source={require('../../assets/enach.png')} style={{height:200,width:200, paddingTop:0,marginLeft:20}} />
            </View>
            <View style={{marginLeft:20,}}>
                <Text style={{marginTop:30, marginBottom:10}}>
                    Select your EMI date of a month
                </Text>
                <View style={{flexDirection:'row'}}>
                <View style={{ width:'20%',marginRight:15, alignItems:'center'}}>
                            <TouchableOpacity style={{height:30,width:'100%',alignItems:'center',backgroundColor:this.state.selectedButton === '1' ? '#2A9134':'#ffffff',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                            onPress={() => this.setState({selectedButton:'1', ButtonStateHolder : false,})}
                            >
                            <Text>
                                1
                            </Text>
                </TouchableOpacity>
                </View>
                <View style={{ width:'20%',marginRight:15, alignItems:'center'}}>
                            <TouchableOpacity style={{height:30,width:'100%',alignItems:'center',backgroundColor:this.state.selectedButton === '3' ? '#2A9134':'#ffffff',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                            onPress={() => this.setState({selectedButton:'3', ButtonStateHolder : false,})}
                            >
                            <Text>
                                3
                            </Text>
                </TouchableOpacity>
                </View>
                <View style={{ width:'20%', marginRight:15,alignItems:'center'}}>
                            <TouchableOpacity style={{height:30,width:'100%',alignItems:'center',backgroundColor:this.state.selectedButton === '5' ? '#2A9134':'#ffffff',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                            onPress={() => this.setState({selectedButton:'5', ButtonStateHolder : false,})}
                            >
                            <Text>
                                5
                            </Text>
                </TouchableOpacity>
                </View>
                <View style={{ width:'20%', alignItems:'center'}}>
                            <TouchableOpacity style={{height:30,width:'100%',alignItems:'center',backgroundColor:this.state.selectedButton === '7' ? '#2A9134':'#ffffff',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                            onPress={() => this.setState({selectedButton:'7', ButtonStateHolder : false,})}
                            >
                            <Text>
                                7
                            </Text>
                </TouchableOpacity>
                </View>
                </View>
                <View style={{ width:'95%',borderRadius:5, alignItems:'center', marginTop:30, backgroundColor: this.state.ButtonStateHolder ? 'rgba(42,145,52,0.5)':'#2A9134'}}>
                    <TouchableOpacity 
                    disabled={this.state.ButtonStateHolder}
                    onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                   // onPress={() => this.props.navigation.navigate('vkyc')}
                   onPress ={() => this.fetchSource()}
                    style={{height:30,width:'100%',alignItems:'center',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Proceed to E-NACH</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            </View>
        );
    }
}
