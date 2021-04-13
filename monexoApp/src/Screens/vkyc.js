import { NativeAppEventEmitter } from "react-native";
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Dimensions, CheckBox } from 'react-native';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import moment from "moment";
import { WebView } from 'react-native-webview'
import { Linking } from "react-native";
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP,VKYC_APPID,VKYC_APPKEY,PREQUAL_API,VKYC_LINK } from '@env'

const { height, width } = Dimensions.get('window')

const appID = VKYC_APPID;
const appKey = VKYC_APPKEY;

const delay = ms => new Promise(res => setTimeout(res, ms));

export default class Vkyc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCircleImg: true,
            termsAccepted: false,
            checked: false,
            ButtonStateHolder: true,
            currenttime: new Date(),
            url: '',
            webviewvisible: false,
            appid: '',
            customerid: '',
            pannumber: '',
            dob: '',
            name: '',
            finalurl: '',
            agentId:'',
            prequal_location:'',
            prequal_latitude:0,
            prequal_longitude:0,
            prequal_address:'',
            aadhaar_address:'',
            aadhaar_name:'',
            aadhaar_dob:new Date(),
            aadhaar_gender:'',
            aadhaar_number:'',
            vcip_location_captured:'',
            vcip_latitude:0,
            vcip_longitude:0,
            pan_name:'',
            pan_fathername:'',
            pan_dob:'',
            pan_number:'',
            pan_agent_decision:'',
            vcip_facematch_status:'',
            vcip_facematch_score:0,
            vcip_aadhaar_facematch_status:'',
            vcip_aadhaar_facematch_score:0,
            vcip_liveness:'',
            vcip_liveness_score:0,
            vcip_face_verified:'',
            vcip_kyc_status:'',
            vcip_video_url:'',
            jsonresponse:'',
            panPhoto:'',
            aadhaarPhoto:'',
            selfie:'',
            video:'',
            fileUri:'',
            imagename:['pan_card','aadhaar_face','selfie','vkyc_recording']   //aadhaar_face or aadhaar_card -- need to check in salesforce
            //modelHeight:Dimensions.get('window').height/2-10,
        }
        //this.onSubmit = this.onSubmit.bind(this);
    }


    // hyperverge vkyc customer link api

    customerlinkGenerate = () => {
        console.log('linkgeneration')

        fetch(PREQUAL_API,
            {
                method: 'POST',
                headers: {
                    'appID': VKYC_APPID,
                    'appKey': VKYC_APPKEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "userId": this.state.customerid,    // "123456789",
                        "panNumber": this.state.pannumber,   // "DUHPK1756B",
                        "panDOB": this.state.dob,            // "20/10/1989",
                        "panName": this.state.name           // "PRAVALLIKA KARIDI"
                    })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                // console.log('url:',responseJson.url)
                this.setState({ url: responseJson.url, })
                this.setState({ finalurl: VKYC_LINK + this.state.url })
                console.log('finalurl:', this.state.finalurl)
            }).catch((error) => {
                console.error(error);
            });
    };

    // pan details from salesforce
    getdataSalesforce = () => {
        console.log('salesforce');
        fetch(BASE_URL_PHP+'/getRecordSingleDetail', {
            "ID": "0011e000008lTxIAAU"
        })
            .then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson)
                //console.log(responseJson.customer_account_info.recods[0].peer__Date_of_Birth__c)
                // console.log(responseJson.customer_account_info.recods[0].peer__First_Name__c + responseJson.recods[0].peer__Last_Name__c)
                // console.log(responseJson.customer_account_info.recods[0].Customer_ID__c)
                // console.log(responseJson.customer_account_info.recods[0].PAN__c)

                this.setState({
                    customerid: responseJson.customer_account_info.recods[0].Customer_ID__c,
                    pannumber: responseJson.customer_account_info.recods[0].PAN__c,
                    dob: responseJson.customer_account_info.recods[0].peer__Date_of_Birth__c,
                    name: responseJson.customer_account_info.recods[0].peer__First_Name__c + responseJson.recods[0].peer__Last_Name__c
                })
            }).catch((error) => {
                console.error(error);
            });
    }

    // hyperverge vkyc link 

    vkyclink = () => {

        VKYC_LINK + this.state.url

    }

    // salesforce update

    updateSalesforce = () => {
        console.log('salesforce');
        fetch(BASE_URL_PHP+'/saleForceUpdateRecords',
            {
                method: 'POST',
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:
                {
                    "data": [
                        {
                            "Account":
                            {
                                "0011e000008lTxIAAU":
                                {
                                    Video_KYC_URL__c: this.state.finalurl
                                }
                            },
                        },
                        {
                            "data": [
                                {
                                    "kyc":
                                    {
                                        "":
                                        {
                                            "Account__c": this.state.appid,
                                            "KYC_Userid__c": this.state.customerid,
                                            "Video_KYC_URL_Link__c": this.state.finalurl,
                                        }
                                    }
                                }
                            ]

                        }
                    ]
                }
            })
            .then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson)
            }).catch((error) => {
                console.error(error);
            });
    }

    //webhook response

    getVkycwebhookresponse = () => {
        console.log('vkyc');
        fetch(BASE_URL_PYTHON+'/vkyc_webhook')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    customerid: responseJson.user_id,    // customerid
                    agentId: responseJson.agentId,                          //"praveen@tachyloans.com",
                    prequal_location: responseJson.prequalification_location,
                    prequal_latitude: responseJson.prequalification_location.event_details.originalLatitude,
                    prequal_longitude: responseJson.prequalification_location.event_details.originalLongitude,
                    prequal_address: responseJson.prequalification_location.event_details.googleMapsResult.formatted_address,
                    aadhaar_address: responseJson.prequalification_aadhaar_xml.event_details.result.details.address,
                    aadhaar_name: responseJson.prequalification_aadhaar_xml.event_details.result.details.name,
                    aadhaar_dob: responseJson.prequalification_aadhaar_xml.event_details.result.details.dob,
                    aadhaar_gender: responseJson.prequalification_aadhaar_xml.event_details.result.details.gender,
                    aadhaar_number: responseJson.prequalification_aadhaar_xml.event_details.result.details.maskedAadhaarNumber,
                    aadhaarPhoto:responseJson.prequalification_aadhaar_xml.event_details.result.details.photo.value, 
                    vcip_location_captured: responseJson.prequalification_aadhaar_xml.event_details.vcip_location_captured,
                    vcip_latitude: responseJson.prequalification_aadhaar_xml.event_details.vcip_location_captured.event_details.originalLatitude,
                    vcip_longitude: responseJson.prequalification_aadhaar_xml.event_details.vcip_location_captured.event_details.originalLongitude,
                    pan_name: responseJson.vcip_panocr_result.event_details.panOcrResult.result[0].detils.name.value,
                    pan_fathername: responseJson.vcip_panocr_result.event_details.panOcrResult.result[0].detils.father.value,
                    pan_dob: responseJson.vcip_panocr_result.event_details.panOcrResult.result[0].detils.date.value,
                    pan_number: responseJson.vcip_panocr_result.event_details.panOcrResult.result[0].detils.pan_no.value,
                    panPhoto: responseJson.vcip_panocr_result.event_details.panOcrResult.result[0].detils.vcip_pan_captured.event_details.image,
                    pan_agent_decision: responseJson.vcip_pan_ocr_verification.event_details.agentDecision,
                    selfie:responseJson.vcip_image_captured.event_details.image,
                    vcip_facematch_status: responseJson.vcip_facematch_result.event_details.faceMatchResult.result.match,
                    vcip_facematch_score: responseJson.vcip_facematch_result.event_details.faceMatchResult.result.match - score,
                    vcip_aadhaar_facematch_status: responseJson.vcip_aadhaar_facematch_result.event_details.faceMatchResult.result.match,
                    vcip_aadhaar_facematch_score: responseJson.vcip_aadhaar_facematch_result.event_details.faceMatchResult.result.match - score,
                    vcip_liveness: responseJson.vcip_liveness_result.event_details.faceLivenessResult.result.live,
                    vcip_liveness_score: responseJson.vcip_liveness_result.event_details.faceLivenessResult.result.liveness - score,
                    vcip_face_verified: responseJson.vcip_face_verification.event_details.agentDecision,
                    vcip_kyc_status: responseJson.vcip_kyc_status.event_details.status,
                    vcip_video_url: responseJson.vcip_video_recording.event_details.url,
                    jsonresponse: responseJson
                })

                if(this.state.vcip_kyc_status) {
                    this.base64toPanImage();
                    this.base64toaadhaarImage();
                    this.base64toSelfieImage();
                    this.creditDecision();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    //Post webhook response to database

    insertdata_into_mysql = () => {
        // await delay(3000)
        console.log('geospoc-locality');
        fetch(BASE_URL_PYTHON+'/vkyc_webhook',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify({
                        "appid": this.state.appid,
                        "customerid": this.state.customerid,
                        "agentId": this.state.agentId,
                        "prequal_location": this.state.prequal_location,
                        "prequal_latitude": this.state.prequal_latitude,
                        "prequal_longitude": this.state.prequal_longitude,
                        "prequal_address": this.state.prequal_address,
                        "aadhaar_address": this.state.aadhaar_address,
                        "aadhaar_name": this.state.aadhaar_name,
                        "aadhaar_dob": this.state.aadhaar_dob,
                        "aadhaar_gender": this.state.aadhaar_gender,
                        "aadhaar_number":this.state.aadhaar_number,
                        "vcip_location_captured": this.state.vcip_location_captured,
                        "vcip_latitude": this.state.vcip_latitude,
                        "vcip_longitude": this.state.vcip_longitude,
                        "pan_name": this.state.pan_name,
                        "pan_fathername": this.state.pan_fathername,
                        "pan_dob": this.state.pan_dob,
                        "pan_number": this.state.pan_number,
                        "pan_agent_decision": this.state.pan_agent_decision,
                        "vcip_facematch_status": this.state.vcip_facematch_status,
                        "vcip_facematch_score": this.state.vcip_facematch_score,
                        "vcip_aadhaar_facematch_status": this.state.vcip_aadhaar_facematch_status,
                        "vcip_aadhaar_facematch_score": this.state.vcip_aadhaar_facematch_score,
                        "vcip_liveness": this.state.vcip_liveness,
                        "vcip_liveness_score": this.state.vcip_liveness_score,
                        "vcip_face_verified": this.state.vcip_face_verified,
                        "vcip_kyc_status": this.state.vcip_kyc_status,
                        "vcip_video_url": this.state.vcip_video_url,
                        "jsonresponse": this.state.jsonresponse
                    })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            }).catch((error) => {
                console.error(error);
            });
    };


    // convert base64 to image file

    base64toaadhaarImage = () => {
        this.setState({fileUri:'data:image/png;base64,'+this.state.aadhaarPhoto})
        this.handleUploadPhoto();
    }

    base64toPanImage = () => {
        this.setState({fileUri:'data:image/png;base64,'+this.state.panPhoto})
        this.handleUploadPhoto();
    }

    base64toSelfieImage = () => {
        this.setState({fileUri:'data:image/png;base64,'+this.state.selfie})
        this.handleUploadPhoto();
    }

   // upload to AWS s3

    createFormData = (photo, body) => {
        console.log('formdata')
        const data = new FormData();
        data.append('image',{                 //this.renderSwitch()   //photo.fileName.replace('.', ''), {
          name:photo.fileName,
          type:photo.type, 
          uri:Platform.OS === 'android'? this.state.fileUri : this.state.fileUri.replace('file://','')
        });
        Object.keys(body).forEach((key) => {
          data.append(key,body[key]);
        });
        return data;
      };
      
      handleUploadPhoto = () => {
        console.log(this.state.photo.fileName);
        fetch(BASE_URL_PHP+'/uploadDocument',
        {
          method:'POST',
          headers:{  
            "Content-Type": "multipart/form-data",
            }, 
          body: this.createFormData(this.state.photo,
            {application_id:this.state.appid,
            document_name: 'payslip'}),     //this.renderSwitch()    //this.state.photo.fileName.replace('.', '')}),
        })
        .then((response) => response)
        .then((response) => {
          console.log('response',response)
        })
        .catch((error) => {
          console.log('error:',error)
        });
      };





    renderImage = () => {
        var imgSource = this.state.showCircleImg ? circle : check_circle;
        return (
            <Image style={{ height: 20, width: 20 }}
                source={imgSource}
            />
        );
    }

    compareTime = () => {
        console.log('test')
        var date, hour, minutes;
        date = new Date();
        console.log('date:', date)
        hour = date.getHours();
        console.log('hour', hour)
        minutes = date.getMinutes();
        console.log('min:', minutes)
        if (hour >= 9 || hour <= 19) {

            if (hour > 10 && hour < 18) {
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
        this.setState({ webviewvisible: true });
    }

    onClickUrl = async () => {
        await delay(1000);
        Linking.openURL(this.state.finalurl)
    }

    handleOnPress = () => this.setState({ checked: false })


    onChange = checkedValues => {
        this.setState(() => {
            return { countchecked: checkedValues };
        });
    };


    // decision
    creditDecision = () => {
        // await delay(10000);
        console.log('decision');
        fetch(BASE_URL_PHP+'/FinalCreditDecisionResponse',
            {
                method: 'POST',
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify(
                        {
                            "application_id": this.state.appid,
                            "cust_id": this.state.customerid,
                        }
                    )
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log('response:', responseJson)
                if (responseJson.status == "APP") {     //REF   //REJ

                    this.props.navigation.navigate('enach')
                }
                else if (responseJson.status == "REF") {
                    this.props.navigation.navigate('refer')
                } else {
                    this.props.navigation.navigate('rejected')
                }

            }).catch((error) => {
                console.error(error);
            });
    }








    handleCheckBox = () => { this.setState({ termsAccepted: !this.state.termsAccepted }) }

    render() {
        const thumbImage = require('../../assets/Slider.png');
        const { checked, modalVisible, countchecked, webviewvisible } = this.state;
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

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', paddingLeft: 15, paddingTop: 20, marginBottom: 10 }}>
                        <TouchableOpacity>

                            <Text style={{ fontSize: 16, paddingRight: 20, fontWeight: 'bold' }}> X </Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 0, fontWeight: 'bold' }}>
                            Video KYC
                </Text>
                        <TouchableOpacity style={{ paddingLeft: 80 }}>
                            <Image source={require('../../assets/NoNotification.png')} style={{ height: 20, width: 20, marginLeft: Dimensions.get('window').width / 3 - 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../assets/threedot.png')} style={{ height: 10, width: 20, paddingTop: 20, marginLeft: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 40, backgroundColor: 'rgba(65, 161, 127,0.1)', paddingTop: 1, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', paddingLeft: 20, paddingTop: 10 }}>
                            <View style={{ height: 1, borderWidth: 0.5, borderColor: '#2A9134', width: 60, marginTop: 10 }}>

                            </View>
                            <View>
                                <Image style={{ height: 20, width: 20 }}
                                    source={require('../../assets/check_circle.png')}
                                />
                            </View>
                            <View style={{ height: 1, borderWidth: 0.5, borderColor: '#2A9134', width: Dimensions.get('window').width / 2, marginTop: 10 }}>

                            </View>
                            <View>
                                <View>
                                    {this.renderImage()}
                                </View>
                            </View>
                            <View style={{ height: 1, borderWidth: 0.5, borderColor: '#2A9134', width: 60, marginTop: 10 }}>

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

                    <View style={{ width: Dimensions.get('window').width, margin: 20, }}>
                        <Text style={{ fontFamily: 'Nunito', fontWeight: 'bold', fontSize: 18, lineHeight: 30 }}>A video will be captured for verification {"\n"}purpose.</Text>
                    </View>

                    <View style={{ width: Dimensions.get('window').width, margin: 20, marginTop: 5, marginBottom: 5 }}>
                        <Text style={{ fontFamily: 'Nunito', fontWeight: 'bold', fontSize: 14, lineHeight: 28 }}>Make sure you</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontFamily: 'Nunito', fontSize: 14, lineHeight: 28 }}>
                            1. Have your original PAN card handy.{"\n"}
                2. Stand/sit in front of a white/light-colored background.{"\n"}
                3. Use a stable internet connection.{"\n"}
                4. Enable microphone.{"\n"}
                5. Enable front / selfie camera.
            </Text>
                    </View>
                    <View style={{ width: '45%', borderRadius: 5, marginTop: 20, backgroundColor: '#ffffff', alignSelf: 'center' }}>
                        <TouchableOpacity
                            //disabled={this.state.ButtonStateHolder}

                            //  onPress={() => this.props.navigation.navigate('withdrawal')}
                            onPress={() => { this.customerlinkGenerate(); this.onClickUrl(); }}  //this.onClickUrl()  this.vkyc()
                            // onPress = {() => this.getdataSalesforce()}
                            //onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                            style={{ height: 30, width: '100%', alignItems: 'center', backgroundColor: '#2A9134', borderRadius: 5, justifyContent: 'center', }}
                        >
                            <Text style={{ color: '#ffffff' }}>Schedule Video-KYC</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}
