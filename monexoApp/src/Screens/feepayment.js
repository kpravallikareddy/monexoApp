import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import {View, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import { Linking } from "react-native";
import uuid from 'react-native-uuid';
//import { v1 as uuidv1 } from 'uuid';
import date from 'date-and-time';

//var jwt = require('jwt-simple');

const jwt = require('jwt-encode');
const delay = ms => new Promise(res => setTimeout(res, ms)); 

//const SetuUPIDeepLink = require("@setu/upi-deep-links")

//let setu = new SetuUPIDeepLink({
//    schemeId: "505055f4-03ca-4cf2-b10d-6e22e3cb6d2b",       // "YOUR SCHEME ID",
//    jwtSecret: "8acb4c13-95ba-44bc-854c-bfeff33b0b6b",      //"YOUR JWT SECRET",
//    setuProductInstanceId: "568763479763191615",            // "YOUR PRODUCT INSTANCE ID",
//    mode: "PRODUCTION | SANDBOX"                            // default SANDBOX
//});


//const instanceid = 568763479763191615;
//const schemeid = "505055f4-03ca-4cf2-b10d-6e22e3cb6d2b";
//const secretkey = "8acb4c13-95ba-44bc-854c-bfeff33b0b6b";


const { height, width } = Dimensions.get('window')
export default class Feepayment extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            showCircleImg:true,
            termsAccepted: false,
            checked: false,
            ButtonStateHolder:true,
            showupiapps:false,
            upilink:'',
            appid:'',
            customerid:'',
            status:'',
            success:'',
            platformBillID:0,
            paymentlinkresponse:'',
            paymentstatusresponse:'',
            name:'',
            receiptdate:new Date(),
            receiptid:'',
            creditstatus:'',
            checkstatus:false,
            jwttoken:'',
            
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

    async componentDidMount(){
        await this.checkpaymentstatus();
        this.timer = setInterval(()=> {
        this.checkpaymentstatus();
         }, 60000*60*4)
       }

  // callback url format:https://uat.monexo.co/in/perfios-mobile/perfios-return

  // jwt token generation

     jwtgenerator = async () => {
      const now = new Date();
      const scheme_id = "505055f4-03ca-4cf2-b10d-6e22e3cb6d2b"
      const secret    = "8acb4c13-95ba-44bc-854c-bfeff33b0b6b"
      const payload   = {
            "aud" : scheme_id,
            "iat" : Math.floor(Date.now() / 1000),                           //date.format(now, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),   //datetime.datetime.utcnow(),
            "jti" : uuid()                    //str(uuid.uuid1())
        }
        console.log('iat:',date.format(now, 'YYYY-MM-DD HH:mm:ss.SSSSSS'));

       var token = jwt(payload, secret,)
        console.log('token:', token)
       // await delay(15000)
        this.setState({jwttoken:token});
       
     }


    //setu api setup

    paynow = async () => {
        await delay(20000)
       console.log('paynow')
        fetch("https://uat.setu.co/api/payment-links",           // "https://sandbox.setu.co/api/payment-links",
        {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: "Bearer" + " "+ this.state.jwttoken,                      //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDUwNTVmNC0wM2NhLTRjZjItYjEwZC02ZTIyZTNjYjZkMmIiLCJpYXQiOjE2MTQ5MjcyNDEsImp0aSI6IjkxMzA4ODU4LTdkN2YtMTFlYi1hYTE4LTc4MzFjMWM1OWIzZSJ9.yeGW9uSWiPo9rYI82kfR1z7OhoGFdnWBozS9QmcHt0I",
              "X-Setu-Product-Instance-ID" : '568763479763191615',
            },
            body:
             JSON.stringify(
                {
                    "amount": {
                        "currencyCode": "INR",
                        "value": 1000
                        },
                        "amountExactness": "EXACT",
                        "billerBillID": "EB-1123-345324",
                        "dueDate": "2021-05-15T12:23:50Z",
                        "expiryDate": "2021-05-15T12:23:50Z",
                        "name": "W3H325-ElectricBill",
              }
              )
          }).then((response) =>response.json())
            .then((responseJson) =>{
            console.log(responseJson);
            //console.log(responseJson.data.paymentLink.shortURL);
            this.setState({status:responseJson.status, success:responseJson.success,platformBillID:responseJson.platformBillID, paymentlinkresponse:responseJson})
            if(responseJson.status == '200'){
                this.setState({showupiapps:true, upilink:responseJson.data.paymentLink.shortURL})
            }

            }).catch((error) =>
            {
              console.error(error);
            });
    }


    paymentlinkdata_into_db = async () => {
        console.log('test');
       await fetch('http://10.0.2.2:8000/paymentlink_response_setu/',
      {
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(
              {
            appid: '12345',
            customerid:'',
            status:this.state.status,
            success:this.state.success,
            platformBillID:this.state.platformBillID,
            jsonresponse:this.state.paymentlinkresponse,
            status:this.state.status,
            success:this.state.success
          }
          )
      }).then((response) =>response.json())
        .then((responseJson) =>{
        console.log(responseJson)
        }).catch((error) =>
        {
          console.error(error);
        });
    }

    refreshPage() {
        window.location.reload(false);
    }

    checkpaymentstatus = async () => {
        //console.log('test');
        //console.log(text);
     await  fetch("https://uat.setu.co/api/payment-links/"+this.state.platformBillID)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('paymentstatus:',responseJson);
                this.setState({paymentstatusresponse:responseJson})
               // if(responseJson.data.status == CREDIT_RECEIVED){
                //    this.props.navigation.navigate('withdrawal')
              //  } else {
               //     this.refreshPage();
              //  }
            })
            .catch((error) => {
                console.error(error);
            });
    };



    paymentstatusdata_into_db = async () => {
        console.log('test');
       await fetch('http://10.0.2.2:8000/paymentstatus_response_setu/',
      {
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(
              {
            appid: '12345',
            customerid:'',
            name:this.state.name,
            platformBillID:this.state.platformBillID,
            receiptdate:this.state.receiptdate,
            receiptid:this.state.receiptid,
            jsonresponse:this.state.paymentstatusresponse,
            creditstatus:this.state.creditstatus,
            status:this.state.status,
            success:this.state.success
          }
          )
      }).then((response) =>response.json())
        .then((responseJson) =>{
        console.log(responseJson)
        }).catch((error) =>
        {
          console.error(error);
        });
    }


    goto_upi_link = () => {
        console.log('test')
        Linking.openURL(this.state.upilink)
        .then((response) => {console.log(response)})
        .catch((error) => {
            console.error(error);
        })
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
                <Text style={{marginTop:0, fontSize: 18,fontWeight:'bold'}}>
                Monexo fees payment
                </Text>
                <TouchableOpacity style={{paddingLeft:0}}>
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
        <View style={{height:1,borderWidth:0.5,borderColor:'#2A9134',width:200,marginTop:10}}>
        
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
           {/*} <View style={{alignItems:'center', marginTop:0,}}>
                <Text style={{fontWeight:'bold', fontSize:18}}>
                    Complete the E-NACH
                </Text>
            </View>*/}
            <View style={{alignItems:'center', marginTop:20}}>
                <Text style={{color:'#111111', fontSize:16, fontFamily:'Nunito', fontWeight:'bold'}}>
                    Monexo Annual Fees
                </Text>
            </View>
            <View style={{alignItems:'center', marginTop:30,}}>
            <Image source={require('../../assets/feepay.png')} style={{height:200,width:200, paddingTop:20,marginLeft:20}} />
            </View>
            <View style={{alignContent:'center', justifyContent:'center', flexDirection:'row'}}>
                <Text style={{marginTop:30, marginBottom:10, marginRight:4}}>
                    Activate your account by paying
                    </Text>
                    <Text style={{textDecorationLine:'underline',marginTop:30, marginBottom:10, fontWeight:'bold', marginRight:4}}>
                    {'\u20B9'}1000 
                    </Text>
                    {/*<Text style={{marginTop:30, marginBottom:10}}>
                    is set up now.
                    </Text>*/}
                </View>
                {this.state.showupiapps == false ?
                <View style={{ width:'30%',borderRadius:5, marginTop:5, backgroundColor:'#2A9134', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                    onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                    //onPress={() => this.props.navigation.navigate('feepayment')}
                    onPress = {() => { this.jwtgenerator(); this.paynow()}}  //this.jwtgenerator();
                    style={{height:30,width:'100%',alignItems:'center',borderColor:'#2A9134',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Pay now</Text>
                    </TouchableOpacity>
                </View>
                    : this.state.checkstatus == false?
                <View style={{ width:'30%',borderRadius:5, marginTop:45, backgroundColor:'#2A9134', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                    onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                    //onPress={() => this.props.navigation.navigate('feepayment')}
                    onPress = {() => this.goto_upi_link()}
                    style={{height:30,width:'100%',alignItems:'center',borderColor:'#2A9134',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Go to UPI apps</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ width:'30%',borderRadius:5, marginTop:45, backgroundColor:'#2A9134', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                  //  onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                    //onPress={() => this.props.navigation.navigate('feepayment')}
                    onPress = {() => this.checkpaymentstatus()}
                    style={{height:30,width:'100%',alignItems:'center',borderColor:'#2A9134',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Latest Status</Text>
                    </TouchableOpacity>
                </View>
                }   
            </View>
            </View>
          
        );
    }
}
