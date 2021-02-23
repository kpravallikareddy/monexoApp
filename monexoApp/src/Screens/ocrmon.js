import { NativeAppEventEmitter } from "react-native";
//import React from 'react';
//import {View, Modal,Text,TouchableOpacity, Image, Dimensions} from 'react-native';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import click from '../../assets/click.png';
import notclick from '../../assets/notclick.png';
//import {RNCamera}  from 'react-native-camera';
import React, { Component } from 'react';
import { PermissionsAndroid, Image,Alert, TouchableOpacity,TouchableHighlight, Modal,Platform,AppRegistry, View, Text, StyleSheet,Picker, TextInput, Button, NativeModules } from 'react-native';
/*
Wrappers for HyperSnapSDK have been written and bridged to be accessed in React Native Apps. The below import statement is used to import the required Native Modules.
*/

//const {RNHyperSnapSDK, RNHVDocsCapture, RNHVQRScanCapture, RNHVFaceCapture,   RNHyperSnapParams, RNHVNetworkHelper} = NativeModules;

//import { YellowBox } from 'react-native';
/*
The bellow line is used to ignore certain warnings
*/
//YellowBox.ignoreWarnings(['Module RCTImageLoader','Class RCTCxxModule']);

//Please add the appId and appKey received from HyperVerge here.
const appID = "244af5";
const appKey= "3c4bc3d5cba35cbb9176";


var initSuccess=false;

export default class Ocr extends React.Component {
    constructor(){
        super();
        this.state ={
            showCircleImg:true,
            screenVisible:true,
            showClickImg:false,
            isCameraVisible:false,
            result:"",
          documentModalVisible: false,
          faceModalVisible: false,
          QRModalVisible: false,
          liveness: RNHyperSnapParams.LivenessModeNone,
          faceOutput: "",
          docType: RNHyperSnapParams.DocumentTypeCard,
          topText: "",
          bottomText: "",
          documentOutput: "",
          qrOutput: "",
            //clickPressed: false,
        }
        //this.onSubmit = this.onSubmit.bind(this);
        if(Platform.OS==="android"){
            requestCameraPermission();
          }
          //Initializing the SDK
          if(appID=="" || appKey=="")
          {
            this.showAlert();
          }
          else{
            RNHyperSnapSDK.initialize(appID,appKey,RNHyperSnapParams.RegionIndia,RNHyperSnapParams.ProductFaceID);
            initSuccess=true;
          }
    }

    showAlert(){
        Alert.alert(
          'Initialization Error',
          'The appID and appKey given while intializing the SDK are not valid!',
          [
            {text: 'OK!', style: 'cancel'},
          ],
          { cancelable: false }
        )
      }

    setDocumentModalVisible(visible){
        /* This method is used to set the visibility of the Modal for controling the Document Capture */
        this.setState({documentModalVisible: visible, screenVisible:false});
      }
      setFaceModalVisible(visible){
        /* This method is used to set the visibility of the Modal for controling the Face Capture */
        this.setState({faceModalVisible: visible});
      }

      printDictionary(dict,out,isSuccess){
        /* This method is used to print the results (dictonary) or errors (dictonary) after the activity call has been made */
          var result = ""
          if (isSuccess) {
            result = "Results:"
          }
          else{
            result = "Error Received:"
          }
          for (var key in dict) {
            result = result + "\n"+ key + " : " + dict[key]
          }
          if(out=="doc"){
            this.setState({documentOutput:result});
          } else if(out == "qr"){
            this.setState({qrOutput:result});
          }
          else{
            this.setState({faceOutput:result})
          }
      }
  
      /*hvDocs(){
        /* This method sets the document type, topText and bottomText and calls the Document capture activity
         console.log("  HV Docs is fired");
  
        if(this.state.topText.length>1 || this.state.documentOutput.length>1){
          RNHVDocsCapture.setDocCaptureTitle(this.state.topText);
        }
        if(this.state.bottomText.length>1 || this.state.documentOutput.length>1){
          RNHVDocsCapture.setDocCaptureDescription(this.state.bottomText);
        }
  
  
        var closure = (error,result) => {
          this.hvFace();
            if(error != null){
                this.setState({
                    topText: "  ",
                    bottomText: "  ",
                  });
                  this.printDictionary(error,"doc",false); //passing error to printDictonary to print the error
            }
            else{
              this.setState({
                  topText: "  ",
                  bottomText: "  ",
                });
              this.printDictionary(result,"doc",true); //passing error to printDictonary to print the result
              docImageUri = result["imageUri"]
              //Uncomment next block to test OCR:
  
               try{
                 var params = {};
                 var headers = {};
                 var closure = (error,result,headers) => {
                   if (error != null){
                     console.log('error',error);
                     this.printDictionary(error,"doc",true);
                   } else {
                     console.log('result',result);
                     this.printDictionary(result,"doc",true);
                   }
                 }
                 RNHVNetworkHelper.makeOCRCall("https://apac.docs.hyperverge.co/v1.1/readNID",docImageUri,params,headers,closure)
               } catch(error){
                 console.log('error')
               }
  
              // Uncomment next block to test Face Match:
  
               RNHVFaceCapture.start( (error,result,headers) => {
                 if(error != null ){
                   this.printDictionary(error,"face",false); //passing error to printDictonary to print the error
                 }
                 else{
                   this.printDictionary(result,"face",true); //passing error to printDictonary to print the result
                   faceImageUri = result["imageUri"]
              
                   try{
                     var params = {};
                     var headers = {};
                     var closure = (error,result,headers) => {
                       if (error != null){
                         console.log('error',error);
                         this.printDictionary(error,"face",false);
                       } else {
                         console.log('result',result);
                         this.printDictionary(result,"face",true);
                       }
                     }
                     RNHVNetworkHelper.makeFaceMatchCall("https://apac.faceid.hyperverge.co/v1/photo/verifyPair",faceImageUri,docImageUri,params,headers,closure)
                   } catch(error){
                     console.log('error')
                   }
                 }
               });
          }
  
        }
  
        RNHVDocsCapture.setShouldShowReviewScreen(true);      
        RNHVDocsCapture.setDocumentType(this.state.docType);
        RNHVDocsCapture.start(closure)
      }
  
      hvFace(){
        /* This method sets the liveness mode and calls the Face Capture activity 
  
        console.log("  HV Face is fired");
  
        RNHVFaceCapture.start( (error,result,headers) => {
            if(error != null ){
              this.printDictionary(error,"face",false); //passing error to printDictonary to print the error
            }
            else{
              this.printDictionary(result,"face",true); //passing error to printDictonary to print the result
              imageUri = result["imageUri"]
  
              try{
                var params = {};
                var headers = {};
                var closure = (error,result,headers) => {
                  if (error != null){
                    console.log('error',error);
                    this.printDictionary(error,"face",false);
                  } else {
                    console.log('result',result);
                    this.printDictionary(result,"face",true);
                  }
                }
                // RNHVNetworkHelper.makeFaceMatchCall("https://apac.faceid.hyperverge.co/v1/photo/verifyPair",imageUri,"",params,headers,closure)
              } catch(error){
                console.log('error')
              }
            }
        });
  }
  
  qrScan()
  {
    var qrClosure = (error,result) => {
      if(error != null){
  
            this.printDictionary(error,"qr",false); //passing error to printDictonary to print the error
      }
      else{
  
            this.printDictionary(result,"qr",true); //passing error to printDictonary to print the result
      }
  }
      RNHVQRScanCapture.start(qrClosure)
  }
   updateLiveness = (choice) => {
        this.setState({liveness: choice});
     }
      updateDoctype = (doctype) => {
           this.setState({docType: doctype});
        }*/
  
    /*takePicture() {
        this.camera.capture()
          .then((data) => console.log(data))
          .catch(err => console.error(err));
      }*/

      takePicture = async ()  => {
        console.log(this.camera);
        if (this.camera) {
          try {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.current.takePictureAsync(options)
           // camera.current.takePictureAsync(options);
            console.log(data.uri);
            // this.setCameraCaptureVisible(false);
          } catch (e) {
           // This logs the error
            console.log(e)
          }
    
        }
      };
     

    renderClick =() => {
        var imgSource = this.state.showClickImg?click:notclick; 
        return(
            <Image style={{height:60, width:60}}
                source={imgSource}
            />
        );
    }  
    renderImage =() => {
        var imgSource = this.state.showCircleImg?circle:check_circle; 
        return(
            <Image style={{height:20, width:20}}
                source={imgSource}
            />
        );
    }

    onSubmit() {
        this.setState({checked:true})
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
                <TouchableOpacity> 
                   <Text style={{fontSize: 16,paddingRight:20, fontWeight:'bold'}}> X </Text>
                </TouchableOpacity>
                <Text style={{marginLeft:0, fontSize:16, fontWeight:'bold'}}>
                    Adhaar verification
                </Text>
                <TouchableOpacity>
                    <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:100}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
                </TouchableOpacity>
            </View>
            {this.state.screenVisible == true ? (
            <View>
            <View style={{height:40, backgroundColor:'#D1D1D1', paddingTop:1,marginBottom:0}}>
            <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10}}>
            <View>
            <View>
            {this.renderImage()}
            </View>
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:130,marginTop:10}}>
            
            </View>
            <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/circle.png')}
            />
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:130,marginTop:10}}>
            
            </View>
            <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/circle.png')}
            />
            </View>
            </View>
            </View>

            <View style={{margin:20}}>
                <Text style={{fontSize:16,lineHeight:25, fontFamily:'Nunito', color:'#111111'}}>
                If you have your Aadhaar card with you, you can share your details by scanning front and back side of Aadhaar or uploading them.
                </Text>
            </View>
            <View style={{marginRight:20, marginLeft:20}}>
                <Text style={{fontSize:14, lineHeight:20, fontFamily:'Nunito', color:'#888888'}}>
                Preferred method; Keep your Aadhaar card handy to make a faster and easy form filling. You may also need to take a selfie for image verifications
                </Text>
            </View>
            <View style={{ width:'45%',borderRadius:5, marginTop:35, backgroundColor:'#2A9134', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                    //onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                    //onPress={() => this.props.navigation.navigate('feepayment')}
                    onPress={() => {
                        this.setState({documentOutput: "   "});
                        this.setDocumentModalVisible(!this.state.documentModalVisible);
                      }}
                    style={{height:30,width:'100%',alignItems:'center',borderColor:'#2A9134',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Scan Aadhaar now</Text>
                    </TouchableOpacity>
                </View>
                </View>
            ): null}
                <View>
                    <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={this.state.documentModalVisible}
                    style={{backgroundColor:'#ffffff', marginTop:40,}}
                    >
                        <View style={{ flex: 1,height:Dimensions.get('window').height,width:Dimensions.get('window').width, marginTop:90 }}>
                            <Text style= {{fontFamily:'Nunito', marginLeft:20, marginRight:20, color:'#111111', fontSize:16, lineHeight:25}}>
                             Make sure your documents are without any glare and fully inside.
                            </Text>
                            
                            <View style={{height:210, borderWidth: 1, borderColor:'#EEEEEE',width:'90%', marginLeft:20, marginRight:20, marginTop:25, borderRadius:5, alignItems:'center'}}>
                            {this.state.isCameraVisible == true ?
                                <RNCamera
                                ref={(cam) => {
                                    this.camera = cam;
                                  }}
                                  type={RNCamera.Constants.Type.back}
                                  flashMode={RNCamera.Constants.FlashMode.on}
                                  style={{justifyContent:'center', alignItems:'center',height:200, width:150}}
                                  androidCameraPermissionOptions={{
                                    title: 'Permission to use camera',
                                    message: 'We need your permission to use your camera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel'
                                }}
                                >
                                    <TouchableOpacity onPress={this.takePicture.bind(this)} >
                                        <Text> [capture]</Text>
                                    </TouchableOpacity>
                                </RNCamera>
                                : null}
                                <Text style={{marginTop:180,position:'absolute', textAlign:'center',}}>
                                    Aadhaar card front side
                                </Text>
                            </View>
                            <View>
                                <Text style= {{fontFamily:'Nunito', marginLeft:20, marginRight:20, color:'#111111', fontSize:12, marginTop:10,lineHeight:20}}>
                                It will automatically turn your back camera to scan the front side of the Aadhaar card.
                                </Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.setState({isCameraVisible:true, showClickImg:true})}>
                                <View style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
                                    {this.renderClick()}
                                </View>
                                </TouchableOpacity>
                                <Text style={{marginTop:10, textAlign:'center', fontSize:12}}> 
                                    Powered by Hyper Verge
                                </Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
           /* <View style={styles.container}>
              <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
                <TouchableOpacity> 
                   <Text style={{fontSize: 16,paddingRight:20, fontWeight:'bold'}}> X </Text>
                </TouchableOpacity>
                <Text style={{marginLeft:0, fontSize:16, fontWeight:'bold'}}>
                    Adhaar verification
                </Text>
                <TouchableOpacity>
                    <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:100}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
                </TouchableOpacity>
            </View>
            
            <View>
            <View style={{height:40, backgroundColor:'#EEEEEE', paddingTop:1,marginBottom:0}}>
            <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10}}>
            <View>
            <View>
            {this.renderImage()}
            </View>
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:130,marginTop:10}}>
            
            </View>
            <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/circle.png')}
            />
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:130,marginTop:10}}>
            
            </View>
            <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/circle.png')}
            />
            </View>
            </View>
            </View>

            <View style={{margin:20}}>
                <Text style={{fontSize:16,lineHeight:25, fontFamily:'Nunito', color:'#111111'}}>
                If you have your Aadhaar card with you, you can share your details by scanning front and back side of Aadhaar or uploading them.
                </Text>
            </View>
            <View style={{marginRight:20, marginLeft:20}}>
                <Text style={{fontSize:14, lineHeight:20, fontFamily:'Nunito', color:'#888888'}}>
                Preferred method; Keep your Aadhaar card handy to make a faster and easy form filling. You may also need to take a selfie for image verifications
                </Text>
            </View>
            <View style={{ width:'45%',borderRadius:5, marginTop:35, backgroundColor:'#2A9134', alignSelf:'center'}}>
                    <TouchableOpacity 
                    //disabled={this.state.ButtonStateHolder}
                    //onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                    //onPress={() => this.props.navigation.navigate('feepayment')}
                    onPress={() => {
                        this.setState({documentOutput: "   "});
                        //this.setDocumentModalVisible(!this.state.documentModalVisible);
                        //onPress={() => this.hvDocs()}
                        this.takePicture();
                      }}
                    style={{height:30,width:'100%',alignItems:'center',borderColor:'#2A9134',borderRadius:5, borderWidth:0.3,justifyContent:'center',}}
                    >
                        <Text style={{color:'#ffffff'}}>Scan Aadhaar now</Text>
                    </TouchableOpacity>
                </View>
                </View>
            
            <Modal animationType="slide" transparent={true} visible={this.state.documentModalVisible}  onRequestClose={() => null} >
               <View style={styles.container}>
               {/* <Picker style={styles.inputstyle} selectedValue = {this.state.docType} onValueChange = {this.updateDoctype}>
                    <Picker.Item label="CARD" value={RNHyperSnapParams.DocumentTypeCard} />
                    <Picker.Item label="A4" value={RNHyperSnapParams.DocumentTypeA4} />
                    <Picker.Item label="PASSPORT" value={RNHyperSnapParams.DocumentTypePassport} />
                    <Picker.Item label="OTHER" value={RNHyperSnapParams.DocumentTypeOther} />
                </Picker>
                <Text>Top Text:</Text>
                <TextInput style={styles.inputstyle}
                onChangeText={(text)=>this.setState({topText: text,})}>
                </TextInput>
                <Text>Bottom Text:</Text>
                <TextInput style={styles.inputstyle}
                onChangeText={(text)=>this.setState({bottomText: text,})}>
                    </TextInput>*/
               /* <Button style={styles.button} onPress={() => this.hvDocs()} title="Start Document Verification"/>
                <Text style={styles.results}>
                {this.state.documentOutput}
                </Text>
                <TouchableHighlight style={styles.button}
                onPress={() => {
                  this.setState({documentOutput: "   "});
                  this.setDocumentModalVisible(!this.state.documentModalVisible);
                }}>
                <Text>Go Back</Text>
              </TouchableHighlight>
              </View>
              </Modal>
            <Modal animationType="slide" transparent={true} visible={this.state.faceModalVisible} onRequestClose={() => null} >
            <View style={styles.container}>
            <Picker style={styles.inputstyle} selectedValue = {this.state.liveness} onValueChange = {this.updateLiveness}>
                <Picker.Item label="None" value={RNHyperSnapParams.LivenessModeNone} />
                <Picker.Item label="Texture Liveness" value={RNHyperSnapParams.LivenessModeTextureLiveness} />
            </Picker>
              <Button style={styles.button}
                onPress={() => this.hvFace()}
                title="Start Face Verification"
              />
                <Text style={styles.results}>
                {this.state.faceOutput}
                </Text>
                <TouchableHighlight style={styles.button}
                onPress={() => {
                  this.setState({faceOutput: "   "});
                  this.setFaceModalVisible(!this.state.faceModalVisible);
                }}>
                <Text>Go Back</Text>
              </TouchableHighlight>
            </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={this.state.QRModalVisible} onRequestClose={() => null} >
            <View style={styles.container}>

              <Button style={styles.button}
                onPress={() => this.qrScan()}
                title="Start QR Scanner"
              />
                <Text style={styles.results}>
                {this.state.qrOutput}
                </Text>
                <TouchableHighlight style={styles.button}
                onPress={() => {
                  this.setState({qrOutput: "   "});
                  this.setQRModalVisible(!this.state.QRModalVisible);
                }}>
                <Text>Go Back</Text>
              </TouchableHighlight>
            </View>
            </Modal>
            </View>*/
            /*<Text style={styles.intro}>This is a demo application developed using the react native wrappers of HyperSnapSDK </Text>
              <View style={styles.subcontainer}><Button
                style={styles.button}
                onPress={()=>{this.setDocumentModalVisible(true);}}
                title="Document Capture"
              /></View>
              <View style={styles.subcontainer}><Button
                style={styles.button}
                onPress={()=>{this.setFaceModalVisible(true);}}
                title="Face Capture"/></View>

          <View style={styles.subcontainer}><Button
                style={styles.button}
                onPress={()=>{this.setQRModalVisible(true);}}
                title="QR Capture"/></View>
              </View>*/

        );
    }
}

async function requestCameraPermission() {

    try {
        const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
        await PermissionsAndroid.request(permission);
        Promise.resolve();
      } catch (error) {
        Promise.reject(error);
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    intro: {
        margin: 10,
    },
    results: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
    },
    subcontainer: {
      margin: 10,
  },
  inputstyle: {
      width: "50%",
      margin: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
