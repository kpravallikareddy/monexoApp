import React, {Component} from 'react';
import {View, Modal,StyleSheet, TextInput,Text, Image, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, Alert} from 'react-native';
//import styles from '../Styles/personalinfostyles';
import {HelperText} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import DocumentPicker from 'react-native-document-picker';
import { Platform } from 'react-native';
import DropDownPicker from "react-native-custom-dropdown";
import moment from 'moment';


var ImagePicker = require('react-native-image-picker');

const delay = ms => new Promise(res => setTimeout(res, ms));

const BUTTON_SIZE = 20
const BORDER_WIDTH = 1

//const regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/
const regex= /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|yahoo|rediffmail)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
  );

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


export default class Collegedetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            collegename:'',
            rollno:'',
            course:'',
            major:'',
            startdate:new Date(),
            enddate:new Date(),
            parentmobileno:0,
            pincode:'',
            locality:'',
            sublocality:'',
            selectedButton:'',
            address:'',
            showCircleImg:true,
            state: ' ',
            city:' ',
            ButtonStateHolder:true,
            buttonPress:false,
            visible: false,
            errorStatus: true,
            takingPic: false,
            modalVisible:false,
            password:'',
            isCameraVisible: false,
            path:null,
            img: '',
            show:false,
            payslip:false,
            student_id_card:false,
            cameraClicked:false,
            idfrontclicked:false,
            idbackclicked:false,
            hidelocalitysublocality:false,
            showHide:true,
            filepath:{
                data:'',
                uri:''
            },
            fileData:'',
            fileUri:'',
            imagename:'',
            type:'',
            singleFileOBJ:'',
            photo:null,
            appid:'',
            filename:'',
            phoneState:'',
            collegename_edited:false,
            array:['studentid_front', 'studentid_back']
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.deletefrontImage = this.deletefrontImage.bind(this);
        this.deletebackImage = this.deletebackImage.bind(this);
        //this.handleChange = this.handleChange.bind(this)
    }

  
  
  // Pick a single file
  
  selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if(res) {
        let uri = res.uri;
        if(Platform.OS === 'ios') {
          uri = res.uri.replace('file://','');
        }
        console.log('URI : ' + uri);
        FileViewer.open(uri)
          .then(() => {
            // Do whatever you want
            console.log('Success');
          })
          .catch(_err => {
            // Do whatever you want
            console.log(_err);
          });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  fetchData = (text) => {
    //console.log('test');
    //console.log(text);
    fetch('https://api.data.gov.in/resource/0a076478-3fd3-4e2c-b2d2-581876f56d77?format=json&api-key=579b464db66ec23bdd000001be9925f848ef448249d6231c74b87637&filters[pincode]='+text)
        .then((response) => response.json())
        .then((responseJson) => {
           // console.log("response:", responseJson.records);
            // console.log(responseJson.records[0]);
            let records = responseJson.records;
            //console.log(records[Object.keys(records)[0]].regionname);
            //console.log(records[Object.keys(records)[0]].statename);
            if(responseJson.status=='ok'){
                this.setState({state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
           }
        })
        .catch((error) => {
            console.error(error);
        });
};

fetchCitygovt = (text) => {
    //console.log('test');
    //console.log(text);
    fetch('https://api.data.gov.in/resource/0a076478-3fd3-4e2c-b2d2-581876f56d77?format=json&api-key=579b464db66ec23bdd000001be9925f848ef448249d6231c74b87637&filters[pincode]='+text)
        .then((response) => response.json())
        .then((responseJson) => {
           // console.log("response:", responseJson.records);
            // console.log(responseJson.records[0]);
            let records = responseJson.records;
            //console.log(records[Object.keys(records)[0]].regionname);
            //console.log(records[Object.keys(records)[0]].statename);
            if(responseJson.status=='ok'){
                this.setState({city:records[Object.keys(records)[0]].regionname, state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
           }
        })
        .catch((error) => {
            console.error(error);
        });
};


fetchCity = (text) => {
    console.log('geospoc-city');
    fetch('http://127.0.0.1:8000/addressAutofill/getCity/'+text)
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
            if(responseJson.message =='Data Fetched Successfully'){
                this.setState({city:responseJson.data.city})   //city:records[Object.keys(records)[0]].regionname
           } else {
               this.fetchCitygovt(text);
               this.setState({hidelocalitysublocality:true})
           }
        })
        .catch((error) => {
            console.error(error);
        });
};

fetchLocality = async () => {
    await delay(3000)
    console.log('geospoc-locality');
    fetch('http://127.0.0.1:8000/addressAutofill/getLocalities/'+this.state.city+this.state.pincode)
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
            //if(responseJson.status=='ok'){
            //    this.setState({state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
           //}
        })
        .catch((error) => {
            console.error(error);
        });
};

fetchSubLocality = async () => {
    await delay(5000)
    console.log('geospoc-sublocality');
    fetch('http://127.0.0.1:8000/addressAutofill/getSubLocalities/'+this.state.city+this.state.pincode+this.state.locality)
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
            //if(responseJson.status=='ok'){
            //    this.setState({state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
           //}
        })
        .catch((error) => {
            console.error(error);
        });
};


onChangeAddress(address){
    //this.setState({firstname});
    const pattern = /^([a-zA-Z0-9\-#,/\s]*)+$/;   // allow only numbers letters and space
    const regex = /^[a-zA-Z ]\s+|\s+$/g; // remove extra spaces
    if(pattern.test(address)){
            //   /[$&+,:;=?[\]@#|{}'<>.^*()%!-/]/
        var ads = address.replace(/[$&+:;=?[\]@|{}'<>.^*()%!]/,"")          //replace(/^[`~!@$%^&*()_+\=?;:'".<>\{\}\[\]\\\/]/gi, '')
        console.log('enter only letters')
        var adds = ads.trimLeft()
        var result =adds.replace(/[,]+/g, ",").trim();
        var rest =result.replace(/[#]+/g, "#").trim();
        var res =rest.replace(/[-]+/g, "-").trim();
        this.setState({address:res}) 
        console.log('address after replacing special:',this.state.address) 
   }  
   if(regex.test(address)){
        var text=address.replace(/^\s+|\s+/g, " ");
        this.setState({address:text}) 
        console.log('address after replacing space:',this.state.address)
   }
}

   restrict = (event) => {
    const regex = new RegExp("/^[^!-\\/:-@\\[-`{-~]+$/;");
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
    event.preventDefault(); return false;
    }
 }

  launchIdfrontCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
       // console.log("image:",response.uri);
     //  console.log('filename:',response.fileName)
        this.setState({
          photo:response,
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          type:response.type,
          idfrontclicked:true,
          modalVisible:false
        });
        if(this.state.idfrontclicked == true){
          this.setState({filename:'studentid_front'})
           delay(3000)
          this.handleUploadPhoto();
        }
      }
    });
  }

  launchIdbackCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
       // console.log("image:",response.uri);
     //  console.log('filename:',response.fileName)
        this.setState({
          photo:response,
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          type:response.type,
          idbackclicked:true,
          modalVisible:false
        });
        if(this.state.idfrontclicked == true){
          this.setState({filename:'studentid_back'})
           delay(3000)
          this.handleUploadPhoto();
        }
      }
    });
  }




  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={{width:150, height:150, borderColor:'#000000', borderWidth:0.5, marginHorizontal:0, borderRadius:5}}
      />
    } else {
      return <Image source={require('../../assets/camera.png')} style={{height:20,width:20,}} />
    }
  }

  renderIdfront() {
    if (this.state.fileUri) {

      return <View style={{flexDirection:'row'}}><Image
      source={{ uri: this.state.fileUri }}
      style={{width:150, height:150,borderRadius:5, borderColor:'#000000', borderWidth:0.5, marginHorizontal:0}}
    />
    <View style={{marginLeft:Dimensions.get('window').width/7-80}}>
    <TouchableOpacity onPress={this.deletefrontImage}>
    <Image source={require('../../assets/add_circle.png')} style={{height:20,width:20,}} />
    </TouchableOpacity>
   </View>
   </View>
    } /*else {
      return <Image source={require('../../assets/camera.png')} style={{height:20,width:20,}} />
    }*/
  }

  renderIdback() {
    if (this.state.fileUri) {
      return <View style={{flexDirection:'row'}}>
    <Image
      source={{ uri: this.state.fileUri }}
      style={{width:150, height:150,borderRadius:5, borderColor:'#000000', borderWidth:0.5, marginHorizontal:0}}
    />
    <View style={{marginLeft:Dimensions.get('window').width/7-80}}>
    <TouchableOpacity onPress={this.deletebackImage}>
    <Image source={require('../../assets/add_circle.png')} style={{height:20,width:20,}} />
    </TouchableOpacity>
   </View>
   </View>
    } /*else {
      return <Image source={require('../../assets/camera.png')} style={{height:20,width:20,}} />
    }*/
  }

  

  removeImage(e) {
    e.preventDefault();
   return this.setState({fileUri:'',cameraClicked:false});
  }

  deletefrontImage(e) {
    e.preventDefault();
   return this.setState({fileUri:'',idfrontclicked:false});
  }

  deletebackImage(e) {
    e.preventDefault();
   return this.setState({fileUri:'',idbackclicked:false});
  }


   
    EnableButtonFunction =()=>{
        this.setState({
          ButtonStateHolder : false,
          //ButtonTitle : 'Button Disabled'
        })
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
    
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    onPress= () => {
        this.setState({selectedButton:'male'})
    }

    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only"); 
            }
        }
        this.setState({ pincode: newText });
       //console.log(text);
    }

    onChangePhone(text){
      let newText = '';
      let numbers = '0123456789';
      
      for (var i=0; i < text.length; i++) {
          if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
              if(newText == '0'){
                alert('enter valid number')
              }
          }
          else {
              // your call back function
              alert("please enter numbers only"); 
          }
      }
      this.setState({ parentmobileno: newText });
     //console.log(text);
  }



    insertdata_into_db = async () => {
        console.log('test');
       await fetch('http://10.0.2.2:8000/studentdetails/',
      {
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(
              {
            "appid": this.state.appid,
            "customerid":this.state.customerid,
            "college_name":this.state.collegename,
            "rollno":this.state.rollno,
            "course":this.state.course,
            "major":this.state.major,
            "course_startdate":this.state.startdate,
            "course_enddate":this.state.enddate,
            "parent_mobileno":this.state.parentmobileno,
            "pincode":this.state.pincode,
            "city":this.state.city,
            "state":this.state.state,
            "locality":this.state.locality,
            "sublocality":this.state.sublocality,
            "address":this.state.address,
            "student_id_card":this.state.student_id_card,
            "collegename_edited":this.state.collegename_edited
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
          {"genesis__Applications__c":
              {"":
                  {
                  "genesis__Company__c":this.state.collegename,
                  "Office_Email_Id":this.state.email
                  }
              },
          },
          {"Account":
            {"":
                {
                "Employee_student_id":this.state.student_id_card,
                "Role__c":this.state.course+' '+this.state.major,
                "Course_end_date":this.state.course_enddate,
                }
            },
          },
          {"Address":
            {"":
                {
                "Phone1":this.state.parentmobileno,
                }
            },
          },
          {"loan__Address__c":
              {"":
                  {"Customer__c":this.state.customerid, 
                  "Room_Flat__c":this.state.address,
                  "Floor__c":this.state.address,
                  "Block__c":this.state.address,
                  "Building_name__c":this.state.address,
                  "Door_No_Street_name__c":this.state.address,
                  "Locality__c":this.state.locality+' '+this.state.sublocality,
                  "PinCode__c":this.state.pincode,
                  "City__c":this.state.city,
                  "State__c":this.state.state,
                  }
              }
          },
          {"Application":
            {"":
                {"Status":"FORM INCOMPLETE"
                }
            }
        },
          
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
  



    
    fetchData = (text) => {
        //console.log('test');
        //console.log(text);
        fetch('https://api.data.gov.in/resource/0a076478-3fd3-4e2c-b2d2-581876f56d77?format=json&api-key=579b464db66ec23bdd000001be9925f848ef448249d6231c74b87637&filters[pincode]='+text)
            .then((response) => response.json())
            .then((responseJson) => {
               // console.log("response:", responseJson.records);
                // console.log(responseJson.records[0]);
                let records = responseJson.records;
                //console.log(records[Object.keys(records)[0]].regionname);
                //console.log(records[Object.keys(records)[0]].statename);
                if(responseJson.status=='ok'){
                    this.setState({state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
               }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    fetchCity = (text) => {
      console.log('geospoc-city');
      fetch('http://127.0.0.1:8000/addressAutofill/getCity/'+text)
          .then((response) => response.json())
          .then((responseJson) => {
             console.log(responseJson);
              //if(responseJson.status=='ok'){
              //    this.setState({state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
             //}
          })
          .catch((error) => {
              console.error(error);
          });
  };

  fetchLocality = async () => {
      await delay(3000)
      console.log('geospoc-locality');
      fetch('http://127.0.0.1:8000/addressAutofill/getLocalities/'+this.state.city+this.state.pincode)
          .then((response) => response.json())
          .then((responseJson) => {
             console.log(responseJson);
              //if(responseJson.status=='ok'){
              //    this.setState({state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
             //}
          })
          .catch((error) => {
              console.error(error);
          });
  };

  fetchSubLocality = async () => {
      await delay(5000)
      console.log('geospoc-sublocality');
      fetch('http://127.0.0.1:8000/addressAutofill/getSubLocalities/'+this.state.city+this.state.pincode+this.state.locality)
          .then((response) => response.json())
          .then((responseJson) => {
             console.log(responseJson);
              //if(responseJson.status=='ok'){
              //    this.setState({state:records[Object.keys(records)[0]].statename})   //city:records[Object.keys(records)[0]].regionname
             //}
          })
          .catch((error) => {
              console.error(error);
          });
  };



createFormData = (photo, body) => {
  console.log('formdata')
  const data = new FormData();
  data.append('payslip',{                 //this.renderSwitch()   //photo.fileName.replace('.', ''), {
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
  fetch('http://uat-newapioth.monexo.co/api/uploadDocument',
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


    render(){
        const {city,state,locality,sublocality,parentmobileno} = this.state;
        const {showCameraView, isCameraVisible,buttonPress} = this.state;
        const today = new Date();
        
        return (
        <View pointerEvents={this.state.showHide == false ? 'none' : 'auto'} style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <TouchableOpacity> 
               {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />*/}
               <Text style={{fontSize: 18,paddingRight:20}}> X </Text>
            </TouchableOpacity>
            <Text style={{fontSize:18, fontWeight:'bold'}}>
                College details
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/3}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
            </TouchableOpacity>
        </View>
        <View style={{height:40, backgroundColor:'rgba(65, 161, 127,0.1)', paddingTop:1,marginBottom:20}}>
        <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10}}>
        <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/check_circle.png')}
            />
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:95,marginTop:10}}>
            
            </View>
            <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/check_circle.png')}
            />
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:95,marginTop:10}}>
            
            </View>
            <View>
            {this.renderImage()}
            
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:95,marginTop:10}}>
            
            </View>
            <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/circle.png')}
            />
            </View>
            </View>
        </View>
        
        <ScrollView>
            <View style={{margin:20,marginTop:10}}>
                <Text>College ID card</Text>
            </View>
            
            <View style={{flexDirection:'row', marginLeft:20, marginTop:-5,}}>
            {this.state.idfrontclicked == false ?
                <View style={{ width:180,height:150,borderRadius:5, borderWidth:0.1}}>
                    <TouchableOpacity style={{alignItems:'center',marginTop:60}}
                    //onPress = {this.showCameraView}
                   // onPress={() => this.setState({isCameraVisible:true})}
                   onPress={this.launchIdfrontCamera}
                    >
                        <Image source={require('../../assets/camera.png')} style={{height:20,width:20,}} />
                    </TouchableOpacity>
                     
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Student ID card front side
                    </Text>
                    </View>
                </View>
                :
                <View style={{ width:180,height:150,borderRadius:5, borderWidth:0.1}}>
                     {this.renderIdfront()} 
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Student ID card front side
                    </Text>
                    </View>
                </View>
                }
  
                {this.state.idbackclicked == false ?
                <View style={{ width:180,height:150,borderRadius:5, borderWidth:0.1, marginLeft:10}}>
                    
                    <TouchableOpacity style={{alignItems:'center',marginTop:60}}
                    //onPress = {this.showCameraView}
                   // onPress={() => this.setState({isCameraVisible:true})}
                   onPress={this.launchIdbackCamera}
                    >
                      <Image source={require('../../assets/camera.png')} style={{height:20,width:20,}} />
                    </TouchableOpacity> 
                    
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Student ID card back side
                    </Text>
                    </View>
                </View>
                :
                <View style={{ width:180,height:150,borderRadius:5, borderWidth:0.1, marginLeft:10}}>
                    
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Student ID card back side
                    </Text>
                    </View>
                    </View>}
               </View>

               <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:20,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/school.png')} style={{height:20,width:20,marginTop:15}} />
                <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>College name</HelperText>
            <TextInput placeholder=' ' value={this.state.collegename}
            onChangeText={(collegename) => {this.setState({collegename})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop:10,height:48,marginLeft:-100, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>

        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:20,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/roll.png')} style={{height:20,width:20,marginTop:15}} />
                <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Reg./Roll No</HelperText>
            <TextInput placeholder=' ' value={this.state.rollno}
            onChangeText={(rollno) => {this.setState({rollno})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop:10,height:48,marginLeft:-100, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>

        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:20,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/course.png')} style={{height:20,width:20,marginTop:15}} />
                <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Select a Course</HelperText>
            <TextInput placeholder=' ' value={this.state.course}
            onChangeText={(course) => {this.setState({course})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop:10,height:48,marginLeft:-100, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>

        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:20,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/major.png')} style={{height:20,width:20,marginTop:15}} />
                <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Branch / Major</HelperText>
            <TextInput placeholder=' ' value={this.state.branch}
            onChangeText={(branch) => {this.setState({branch})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop:10,height:48,marginLeft:-100, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
            
            <View style={{flexDirection:'row', marginTop:20,marginLeft:20,marginBottom:-10}}>
                <Text> Course start date</Text>
                <Text style={{marginLeft:Dimensions.get('window').width/3-70}}> Course end date</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            
            <DatePicker
          style={{width: 160, 
            marginTop: 20,marginBottom: 20,backgroundColor:'#EEEEEE', marginLeft:20, borderBottomWidth:0.5,borderBottomColor:'#000000'}}
          date={this.state.startdate} // Initial date from state
          mode={"date"} // The enum of date, datetime and time
          format="DD-MM-YYYY"
          //hintText="Course start date"
          maxDate={today}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 5,
            },
            dateInput: {
              marginLeft: 20,
              borderWidth:0,
              borderBottomColor:'#000000', opacity:0.2,
              borderBottomWidth:1,
            },
            dateText: {
                color: '#000000',
                fontFamily:'Roboto',
                fontWeight:'bold'
              }
          }}
          //onDateChange={this.setState(date)}
          onDateChange={(startdate) => {this.setState({startdate})}} 
          //onChangeText={this.onChangeEmail.bind(this)}
        />    
        
        <DatePicker
          style={{width: 160, 
            marginTop: 20,marginBottom: 20,backgroundColor:'#EEEEEE', marginLeft:20, borderBottomWidth:0.5,borderBottomColor:'#000000'}}
          date={this.state.startdate} // Initial date from state
          mode={"date"} // The enum of date, datetime and time
          format="DD-MM-YYYY"
          //hintText="Course end date"
          minDate={today}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 5,
            },
            dateInput: {
              marginLeft: 20,
              borderWidth:0,
              borderBottomColor:'#000000', opacity:0.2,
              borderBottomWidth:1,
            },
            dateText: {
                color: '#000000',
                fontFamily:'Roboto',
                fontWeight:'bold'
              }
          }}
          //onDateChange={this.setState(date)}
          onDateChange={(startdate) => {this.setState({startdate})}} 
          //onChangeText={this.onChangeEmail.bind(this)}
        />    
        </View>    

        <Text style={{marginLeft:20, fontSize:12, paddingTop:0,paddingBottom:0,color:'#444444'}}>
            Parent Phone no
        </Text>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/phone.png')} style={{height:20,width:20,marginTop:15}} />
                <Text style={{marginLeft:10, marginTop:15}}>+91</Text>
                {/*<HelperText style={{color:'#000000',opacity:0.3,marginLeft:-30}}>Parent phone no.</HelperText>*/}
            <TextInput placeholder=' ' value={this.state.parentmobileno}
            keyboardType='numeric' maxLength={10}
            onChangeText={(text) => {this.onChangePhone(text)}} 
            
            placeholderTextColor = "#000000" style={{flex:1,marginTop:2,height:48,marginLeft:Dimensions.get('window').width/4-100, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        
        <Text style={{marginLeft:20, fontSize:12, paddingTop:0,paddingBottom:5,color:'#444444'}}>
            College Address
        </Text>
        <View style={{flexDirection:'row'}}> 
        <View style={{height:48,width:'30%',borderBottomColor:'#000000',borderBottomWidth:0.5, marginLeft:20,marginRight:0,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Pincode.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Pin code</HelperText>
            <TextInput placeholder=' ' value={this.state.pincode}
            keyboardType='numeric' maxLength={6}
            onChangeText={(text) => {this.onChanged(text); this.fetchData(text); this.fetchCity(text);this.fetchLocality();this.fetchSubLocality();}}
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-65,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,width:'55%',borderBottomColor:'#000000',borderBottomWidth:0.5, marginLeft:15,marginRight:0,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Cityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>City</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={city}
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-40,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        </View>

        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:15,marginBottom:20, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Stateicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>State</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={state}
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-50,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>

        {this.state.hidelocalitysublocality == false?
        <View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:5,marginBottom:20, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Localityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Locality</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={locality}//autoCapitalize = 'words' value={this.state.locality}
           // onChangeText={(locality) => {this.setState({locality})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-60,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:5,marginBottom:20, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Sublocalityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Sublocality</HelperText>
            <TextInput placeholder=' '  autoCapitalize = 'words' importantForAutoFill='yes' value={sublocality}  //autoCapitalize = 'words' value={this.state.sublocality}
           // onChangeText={(sublocality) => {this.setState({sublocality})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-75,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:5,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Currentaddressicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0,fontSize:8}}>Door/Flat No. & Block NO. Flat/Building name, Street No. Street name</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.address}
            //onChangeText={(address) => {this.setState({address})}} 
            onChangeText={this.onChangeAddress.bind(this)}
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-265,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
            
        </View>
        </View>
        : null }

            <TouchableOpacity style={{marginRight:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor: this.state.ButtonStateHolder || !this.state.validPan ? 'rgba(42,145,52,0.3)':'#2A9134',marginBottom:20,}}
           // disabled={this.state.ButtonStateHolder || 
            //    this.state.collegename == '' || 
             //   this.state.startdate == '' || this.state.enddate == '' ||
              //  this.state.pincode=='' || this.state.city=='' || this.state.state ||
               // this.state.locality=='' || this.state.address==''}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
            onPress={() => {this.insertdata_into_db();}}
            onPress={() => this.props.navigation.navigate('bankdetails')}
            >
            <Text style={{textAlign:'center',paddingTop:7}}>
                Submit
            </Text>
        </TouchableOpacity>

        </ScrollView>
        
        </View>
        
    );
    }
   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height:150,
      width:120,
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      marginTop: 190,
    },
    btnParentSection: {
        
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
        
      },
    btnSection: {
       // width:Dimensions.get('window').width,
       // height: 40,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 3,
      //  marginBottom:20,
        marginTop:20, 
        marginLeft:20
      },
      btnText: {
        textAlign: 'left',
        color: '#111111',
        fontSize: 18,
        
      },
      thumbnailPreview: {
        padding: 20,
        alignItems: 'center',
      },
      thumbnailImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
      },
      thumbnailInfo: {
        color: 'darkblue',
      },
      thumbnailError: {
        color: 'crimson',
      }

  });