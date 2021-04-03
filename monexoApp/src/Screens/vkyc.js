import { NativeAppEventEmitter } from "react-native";
import React, { Component } from 'react';
import {View, ScrollView,Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import moment from "moment";
import { WebView } from 'react-native-webview'
import { Linking } from "react-native";

const { height, width } = Dimensions.get('window')

const appID = "fbb52c";
const appKey= "11702cb61ef2e40af4d3";

const delay = ms => new Promise(res => setTimeout(res, ms));

export default class Vkyc extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            appid:'',
            showCircleImg:true,
            termsAccepted: false,
            checked: false,
            ButtonStateHolder:true,
            currenttime: new Date(),
            url:'',
            webviewvisible:false,
            appid:'',
            customerid:'',
            pannumber:'',
            dob:'',
            name:'',
            finalurl:'',
            //modelHeight:Dimensions.get('window').height/2-10,
        }
        //this.onSubmit = this.onSubmit.bind(this);
    }

    

    // hyperverge vkyc customer link api

    customerlinkGenerate = () => {
        console.log('linkgeneration')
        
        fetch('https://india-vcip-prequal-demo.hyperverge.co/api/user/getPrequalificationURL',
      {
        method:'POST',
        headers:{
          'appID':'fbb52c',
          'appKey':'11702cb61ef2e40af4d3',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(
          {
            "userId":"123456789",
            "panNumber":"DUHPK1756B",
            "panDOB":"20/10/1989",
            "panName":"PRAVALLIKA KARIDI"
        })
      }).then((response) =>response.json())
        .then((responseJson) =>{
        console.log(responseJson)
       // console.log('url:',responseJson.url)
        this.setState({url:responseJson.url,})
        this.setState({finalurl:'https://india-vcip-prequal-demo.hyperverge.co/'+this.state.url})
        console.log('finalurl:',this.state.finalurl)
        }).catch((error) =>
        {
          console.error(error);
        });
    };


    getdataSalesforce = () => {
        console.log('salesforce');
        fetch('http://uat-newapioth.monexo.co/api/getRecordSingleDetail',{
            "ID":"0011e000008lTxIAAU"
        })
        .then((response) =>response.text())
        .then((responseJson) =>{
        console.log(responseJson)
        //console.log(responseJson.customer_account_info.recods[0].peer__Date_of_Birth__c)
       // console.log(responseJson.customer_account_info.recods[0].peer__First_Name__c + responseJson.recods[0].peer__Last_Name__c)
       // console.log(responseJson.customer_account_info.recods[0].Customer_ID__c)
       // console.log(responseJson.customer_account_info.recods[0].PAN__c)
        }).catch((error) =>
        {
          console.error(error);
        });
    }

    // hyperverge vkyc link 

    vkyclink = () =>{

     'https://india-vcip-prequal-demo.hyperverge.co/'+this.state.url
      
    }

    // salesforce update

    updateSalesforce = () => {
    console.log('salesforce');
    fetch('http://uat-newapioth.monexo.co/api/saleForceUpdateRecords',
    {
        method:'POST',
        headers:{
         // Accept: 'application/json',
          'Content-Type': 'application/json'
        },
       body:
       {"data":[
        {"Account":
            {"0011e000008lTxIAAU":
                {
                Video_KYC_URL__c:this.state.finalurl
                }
            },
        },
        {"data":[
            {"kyc":
                {"":
                {
                    "Account__c":this.state.appid,
                    "KYC_Userid__c":this.state.customerid,
                    "Video_KYC_URL_Link__c":this.state.finalurl,
                }
                }
            }
        ]

        }
        ]
        } 
    })
    .then((response) =>response.text())
    .then((responseJson) =>{
    console.log(responseJson)
    }).catch((error) =>
    {
      console.error(error);
    });
}


    renderImage =() => {
        var imgSource = this.state.showCircleImg?circle:check_circle; 
        return(
            <Image style={{height:20, width:20}}
                source={imgSource}
            />
        );
    }

    compareTime = () => {
        console.log('test')
        var date, hour, minutes;
        date = new Date();
        console.log('date:',date)
        hour = date.getHours();
        console.log('hour',hour)
        minutes = date.getMinutes();
        console.log('min:',minutes)
        if (hour >=9 || hour <= 19){
            
            if(hour > 10 &&  hour < 18){
                //console.log('vkyc can be done')
                //if(minutes >30 ) {
                    console.log('vkyc can be done')
                // } 
            }
            else {
                console.log('vkyc cannot be done')
            }
        }

    }

    vkyc = () => {
         console.log('test');
         this.setState({webviewvisible:true});
     }

    onClickUrl = async () => {
        await delay(1000);
        Linking.openURL(this.state.finalurl)
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
            const {checked, modalVisible, countchecked, webviewvisible} = this.state;
        return (
            
           // webviewvisible == true ?(
                
                //CustomTabs.openURL('https://www.google.com').then((launched: {boolean}) => {
                 //   console.log(`Launched custom tabs: ${launched}`);
                 // }).catch(err => {
                 //   console.error(err)
                 // });

           // <WebView
            // originWhitelist={['intent://']}
          //   source={{ uri:this.state.finalurl  }}    //'https://india-vcip-prequal-demo.hyperverge.co/'+this.state.url    this.state.finalurl
            //style={{ flex: 1, height:Dimensions.get('window').height, width:Dimensions.get('window').width }}
            /*onShouldStartLoadWithRequest={request=>{
                let url= request.url;
                if(url.includes("http://maps.google.com/")){
                    Linking.openURL(url);
                    return false
                } else {
                    return true
                }
            }}*/
            
         //   />)
          
         //   :
            
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
                <View style={{flex:1}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
                <TouchableOpacity> 
                   
                   <Text style={{fontSize: 16,paddingRight:20,fontWeight:'bold'}}> X </Text>
                </TouchableOpacity>
                <Text style={{marginTop:0, fontWeight:'bold'}}>
                Video KYC
                </Text>
                <TouchableOpacity style={{paddingLeft:80}}>
                    <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/3-10}} />
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
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:Dimensions.get('window').width/2,marginTop:10}}>
        
        </View>
        <View>
        <View>
            {this.renderImage()}
        </View>
        </View>
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:60,marginTop:10}}>
        
        </View>
        </View>
        </View>

        {/*<View style={{marginLeft:20, marginRight:15, marginTop:10}}>
            <Text style={{fontSize:12, marginBottom:10, lineHeight:20, color:'#888888'}}>
            Click the button below to open your selfie camera
            </Text>
            <Text style={{fontSize:18, lineHeight:30, color:'#111111', fontWeight:'bold'}} >
            A video will be captured and you will also be 
            </Text>
            <Text style={{fontSize:18, lineHeight:30, color:'#111111',fontWeight:'bold'}} >
            requested to show your PAN card for 
            </Text>
            <Text style={{fontSize:18, lineHeight:30, color:'#111111',fontWeight:'bold'}} >
            verification
            </Text>
        </View>
        <View style={{marginLeft:20, marginRight:15, marginTop:10}}>
            <Text style={{fontSize:12, color:'#888888',lineHeight:20}}>Note; Please have your original PAN card handy and you will be requested to show your PAN card.</Text>
        </View>
        <View style={{ width:'45%',borderRadius:5, marginTop:50, backgroundColor:'#ffffff', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                    onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg, webviewvisible:!this.state.webviewvisible})}
                    //  onPress={() => this.props.navigation.navigate('withdrawal')}
                    onPress = {() => { this.customerlinkGenerate();this.onClickUrl()}} 
                    // onPress = {() => this.getdataSalesforce()}
                    style={{height:30,width:'100%',alignItems:'center',backgroundColor:'#2A9134',borderRadius:5,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Proceed to Video KYC</Text>
                    </TouchableOpacity>
                </View>
            <View style={{marginTop:20, alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,color:'#111111',fontWeight:'bold'}}>
                    Video KYC is only available from 10.00 AM to 6.00 PM
                </Text>
        </View>*/}

        <View style={{width:Dimensions.get('window').width, margin:20,}}>
            <Text style={{fontFamily:'Nunito', fontWeight:'bold',fontSize:18,lineHeight:30}}>A video will be captured for verification {"\n"}purpose.</Text>
        </View>

        <View style={{width:Dimensions.get('window').width, margin:20,marginTop:5, marginBottom:5}}>
            <Text style={{fontFamily:'Nunito', fontWeight:'bold',fontSize:14,lineHeight:28}}>Make sure you</Text>
        </View>
        <View style={{marginLeft:20}}>
            <Text style={{fontFamily:'Nunito', fontSize:14,lineHeight:28}}>
                1. Have your original PAN card handy.{"\n"}
                2. Stand/sit in front of a white/light-colored background.{"\n"}
                3. Use a stable internet connection.{"\n"}
                4. Enable microphone.{"\n"}
                5. Enable front / selfie camera.
            </Text>
        </View>
        <View style={{ width:'45%',borderRadius:5, marginTop:20, backgroundColor:'#ffffff', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                    
                    //  onPress={() => this.props.navigation.navigate('withdrawal')}
                    onPress = {() => { this.customerlinkGenerate(); this.onClickUrl();}}  //this.onClickUrl()  this.vkyc()
                    // onPress = {() => this.getdataSalesforce()}
                    //onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                    style={{height:30,width:'100%',alignItems:'center',backgroundColor:'#2A9134',borderRadius:5,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Schedule Video-KYC</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        
        );
    }
}
