import React, {Component} from 'react';
import {View, Modal,StyleSheet, TextInput,Text, Image, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, Alert} from 'react-native';
//import styles from '../Styles/personalinfostyles';
import {HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import DocumentPicker from 'react-native-document-picker';
import { Platform } from 'react-native';
import PdfThumbnail from 'react-native-pdf-thumbnail';

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


export default class Employerdetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            employername:'',
            pincode:'',
            locality:'',
            sublocality:'',
            selectedButton:'',
            address:'',
            showCircleImg:true,
            state: ' ',
            city:' ',
            ButtonStateHolder:true,
            email:null,
            buttonPress:false,
            visible: false,
            errorStatus: true,
            validEmail:false,
            takingPic: false,
            noemail:false,
            modalVisible:false,
            password:'',
            isCameraVisible: false,
            path:null,
            img: '',
            show:false,
            payslip:false,
            id_card:false,
            cameraClicked:false,
            idfrontclicked:false,
            idbackclicked:false,
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
            appid:'123456789',
            pdf:null,
            thumbnail:'',
            filename:'',
            array:['employeeid_front', 'employeeid_back','payslip1']
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.deletefrontImage = this.deletefrontImage.bind(this);
        this.deletebackImage = this.deletebackImage.bind(this);
        //this.handleChange = this.handleChange.bind(this)
    }

   /* showCameraView = () => {
        this.setState({isCameraVisible:true})
    }*/

   // camera function and gallery

   /*chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }; 

    ImagePicker.showImagePicker(options, (response) => {
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
  
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          // alert(JSON.stringify(response));s
          console.log('response', JSON.stringify(response));
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.uri
          });
        }
      });
    }*/

  
  // Pick a single file
  
  selectFile = async () => {
    try {
      const {results} = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
     // const result = PdfThumbnail.generate(results, 0);
      this.setState({thumbnail:results});
      console.log("uri:",results);
      //setError(undefined);
     // this.setState({singleFileOBJ:results});
     // this.setState({fileUri:thumbnail.uri});
     // console.log('response:',this.state.singleFileOBJ)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

 /* thumbnailResult = thumbnail ? (
    <>
      <Image
        source={thumbnail}
        resizeMode="contain"
        style={styles.thumbnailImage}
      />
      <Text style={styles.thumbnailInfo}>uri: {thumbnail.uri}</Text>
      <Text style={styles.thumbnailInfo}>width: {thumbnail.width}</Text>
      <Text style={styles.thumbnailInfo}>height: {thumbnail.height}</Text>
    </>
  ) : null;
  */




   launchCamera = () => {
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
        console.log('photo', JSON.stringify(response));
        //console.log('filename:',response.fileName)

        this.setState({
          photo:response,
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          type:response.type,
         // imagename:'payslip.jpg',
          cameraClicked:true,
          modalVisible:false
        });

        if(this.state.cameraClicked == true){
          this.setState({filename:'payslip1'})
           delay(3000)
          this.handleUploadPhoto();
        }
      }
    });
  }



  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri};
        console.log('response', JSON.stringify(response));
       // console.log('filename:',response.fileName)
       // console.log('fileName ext:',response.type)
        //console.log(source);
        this.setState({
          photo:response,
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          type:response.type,
         // imagename:'payslip.jpg',
          cameraClicked:true,
          modalVisible:false
        });
        if(this.state.cameraClicked == true){
          this.setState({filename:'payslip1'})
           delay(3000)
          this.handleUploadPhoto();
        }
      }
    });
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
      //    imagename:'employeeid_front',
         // cameraClicked:true,
          idfrontclicked:true,
          modalVisible:false
        });
        if(this.state.idfrontclicked == true){
          this.setState({filename:'employeeid_front'})
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
       //   imagename:'employeeid_back.jpg',
          //cameraClicked:true,
          idbackclicked:true,
          modalVisible:false
        });
        if(this.state.idfrontclicked == true){
          this.setState({filename:'employeeback_front'})
           delay(3000)
          this.handleUploadPhoto();
        }
      }
    });
  }


// dynamic filename value getting from api
//renderSwitch(key) {
//  switch(this.state.array.map((key))) {
//      case 'employeeid_front':                    //this.state.idfrontclicked == true:
//          return 'employeeid_front'                //this.setState({fileName:'employeeid_front'})
//      case 'employeeid_back':                                //this.state.idbackclicked == true:
//          return 'employeeid_back'                                  //this.setState({fileName:'employeeid_back'})
//      case 'payslip1':                                    //this.state.cameraClicked == true:
//          return 'payslip1'                           //this.setState({fileName:'payslip1'})
//  }
//}




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

  renderPayslip() {
    if(this.state.type != '.pdf') {
      if (this.state.fileUri) {
      return <View style={{flexDirection:'row'}}>
        <Image
        source={{ uri: this.state.fileUri }}
        style={{width:150, height:150,borderRadius:5, borderColor:'#000000', borderWidth:0.5, marginHorizontal:0}}
      />
      <View style={{marginLeft:Dimensions.get('window').width/7-80}}>
      <TouchableOpacity onPress={this.removeImage} >
      <Image source={require('../../assets/add_circle.png')} style={{height:20,width:20,}} />
      </TouchableOpacity>
     </View>
     </View>
     } 
    } else if (this.state.type == '.pdf') {
      <View style={{flexDirection:'row'}}>
        <View style={{width:150, height:150,borderRadius:5, borderColor:'#000000', borderWidth:0.5, marginHorizontal:0}}>
        <Image
        source={thumbnail}
        resizeMode="contain"
        style={{width:150,height:150, marginBottom:0}}
      />
      </View>
        <View style={{marginLeft:Dimensions.get('window').width/7-80}}>
      <TouchableOpacity onPress={this.removeImage} >
      <Image source={require('../../assets/add_circle.png')} style={{height:20,width:20,}} />
      </TouchableOpacity>
     </View>
      </View>
    }

  }

  /*renderPayslip() {
    
  // if (this.state.type == '.pdf') {
      <View style={{flexDirection:'row'}}>
        <View style={{width:150, height:150,borderRadius:5, borderColor:'#000000', borderWidth:0.5, marginHorizontal:0}}>
        <Image
        source={thumbnail}
        resizeMode="contain"
        style={{width:150,height:150, marginBottom:0}}
      />
      </View>
        <View style={{marginLeft:Dimensions.get('window').width/7-80}}>
      <TouchableOpacity onPress={this.removeImage} >
      <Image source={require('../../assets/add_circle.png')} style={{height:20,width:20,}} />
      </TouchableOpacity>
     </View>
      </View>
   // }
  }*/

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


   /* takePicture() {
        this.camera
          .capture()
          .then(data => {
            //data is an object with the file path
            //save the file to app  folder
           // this.saveImage(data.path);
           console.log(data.path);
          })
          .catch(err => {
            console.error('capture picture error', err);
          });
      }*/
   
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

    insertdata_into_db = async () => {
        console.log('test');
       await fetch('http://10.0.2.2:8000/employerdetails/',
      {
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(
              {
            appid: '778906',
            employer_name:this.state.employername,
            official_email:!this.state.noemail,
            official_email_id:this.state.email,
            pincode:this.state.pincode,
            city:this.state.city,
            state:this.state.state,
            locality:this.state.locality,
            sublocality:this.state.sublocality,
            address:this.state.address,
            employee_id_card:this.state.noemail,
            payslip:this.state.payslip,
            confirmation_for_id_card:this.state.noemail,
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



    onChangeEmail(email) {
        this.setState({email});
        //const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const pattern= /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|yahoo|rediffmail)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/
        if(pattern.test(email)) {
           console.log('email valid');
           this.setState({validEmail:true,errorStatus:true});
       }
       else if(!pattern.test(email)) {
           console.log('email invalid');
           this.setState({validEmail:false,errorStatus:false});
       }
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

  // body = new FormData();
//body.append('photo', {uri: imagePath,name: 'photo.png',filename :'imageName.png',type: 'image/png'});
//    body.append('Content-Type', 'image/png');

/*var formdata = new FormData();
formdata.append("application_id", "12345");
formdata.append("add_circle", fileInput.files[0], "add_circle.png");
formdata.append("document_name", "add_circle");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("uat-newapioth.monexo.co/api/uploadDocument", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

*/


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

/*uploadtoS3 = () => {
  const form = new FormData();
  form.append('image',{
   "application_id":this.state.appid,
   "document_name":this.state.imagename,
   uri: Platform.OS === 'android'? fileUri : fileUri.replace('file://','')
   
  })
fetch('http://uat-newapioth.monexo.co/api/uploadDocument',
  {
   method: 'POST',
   headers:{  
     "Content-Type": "multipart/form-data",
     } , 
     body : form,
    })
    .then((response) =>response.json())
        .then((responseJson) =>{
        console.log(responseJson)
        }).catch((error) =>
        {
          console.error(error);
        });
  }*/

    render(){
        const {city,state,locality,sublocality} = this.state;
        const {validEmail,showCameraView, isCameraVisible,buttonPress,email, noemail, modalVisible} = this.state;
    return (
        <View pointerEvents={this.state.showHide == false ? 'none' : 'auto'} style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <TouchableOpacity> 
               {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />*/}
               <Text style={{fontSize: 18,paddingRight:20}}> X </Text>
            </TouchableOpacity>
            <Text style={{fontSize:18, fontWeight:'bold'}}>
                Employer details
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
            <Image style={{height:20, width:20}}
                source={require('../../assets/check_circle.png')}
            />
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:95,marginTop:10}}>
            
            </View>
            <View>
            {this.renderImage()}
            </View>
            </View>
        </View>
        
        <ScrollView>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:0,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Currentaddressicon.png')} style={{height:20,width:20,marginTop:15}} />
                <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Employer name</HelperText>
            <TextInput placeholder=' ' value={this.state.employername}
            onChangeText={(employername) => {this.setState({employername})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop:10,height:48,marginLeft:-100, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>

        <View>
            <View style={{flexDirection:'row', margin:20,marginTop:10 }}>
            <Image source={require('../../assets/email.png')} style={{height:20,width:20,marginTop:5}} /> 
            <Text style={{marginTop:5, marginLeft:5}}>
                Official Email-id
            </Text>
            <View style={{borderRadius:5, width:'15%',borderWidth:0.5, marginLeft:10, alignItems:'center'}}>
                <TouchableOpacity style={{height:30,width:'100%',alignItems:'center',borderRadius:5,justifyContent:'center', backgroundColor: this.state.selectedButton === 'yes' ? '#2A9134':'#FFFFFF'}}
                onPress={()=> this.setState({selectedButton:'yes', buttonPress:true,noemail:false})}
                >
                    <Text>
                        Yes
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={{borderRadius:5, width:'15%',borderWidth:0.5, marginLeft:10, alignItems:'center', backgroundColor: this.state.selectedButton === 'no' ? '#2A9134':'#FFFFFF'}}>
                <TouchableOpacity style={{height:30,borderRadius:5,justifyContent:'center', }}
                onPress={()=> this.setState({selectedButton:'no',noemail:true,buttonPress:false, validEmail:false,modalVisible:false})}
                >
                    <Text>
                        No
                    </Text>
                </TouchableOpacity>
                </View>
            <View>

            </View>
            </View>
        </View>
        {this.state.buttonPress == true ? 
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:-5,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/email.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Official email-ID</HelperText>
            <TextInput 
            placeholder=' ' value={this.state.email}
            onChangeText={this.onChangeEmail.bind(this)}
            placeholderTextColor = "#000000" style={{flex:1,marginTop:10,marginLeft:-105,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            <Image source={require('../../assets/info.png')} style={{height:20,width:20,marginTop:15, marginRight:10}} />
            </View>
        </View>
        :
        null
        }
            {this.state.errorStatus == false ? (
            <Text style={{color:'red', fontSize:12, marginLeft:20, marginTop:-10}}> Email is not valid</Text>
            ) : null}

            {this.state.validEmail == true ? (
                <Text style={{color:'#000000',opacity:0.5, fontSize:10, marginLeft:20, marginTop:-10}}> An activation link will be sent please click it and authorize</Text>
            ):null}

            {this.state.noemail == true ? (
            /*RNCamera*/
            
            <View>
            <View style={{flexDirection:'row', marginLeft:20, marginTop:-5,}}>
            {this.state.idfrontclicked == false ?
                <View style={{ width:150,height:150,borderRadius:5, borderWidth:0.1}}>
                   {/* {this.state.isCameraVisible == false ?*/}
                    <TouchableOpacity style={{alignItems:'center',marginTop:60}}
                    //onPress = {this.showCameraView}
                   // onPress={() => this.setState({isCameraVisible:true})}
                   onPress={this.launchIdfrontCamera}
                    >
                        <Image source={require('../../assets/camera.png')} style={{height:20,width:20,}} />
                    </TouchableOpacity>
                    {/*: null }*/}
                     
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Employee ID card front side
                    </Text>
                    </View>
                </View>
                :
                <View style={{ width:150,height:150,borderRadius:5, borderWidth:0.1}}>
                     {this.renderIdfront()} 
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Employee ID card front side
                    </Text>
                    </View>
                </View>
                }
  
                {this.state.idbackclicked == false ?
                <View style={{ width:'45%',height:150,borderRadius:5, borderWidth:0.1, marginLeft:10}}>
                    
                    <TouchableOpacity style={{alignItems:'center',marginTop:60}}
                    //onPress = {this.showCameraView}
                   // onPress={() => this.setState({isCameraVisible:true})}
                   onPress={this.launchIdbackCamera}
                    >
                      <Image source={require('../../assets/camera.png')} style={{height:20,width:20,}} />
                    </TouchableOpacity> 
                    
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Employee ID card back side
                    </Text>
                    </View>
                </View>
                :
                <View style={{ width:150,height:150,borderRadius:5, borderWidth:0.1, marginLeft:10}}>
                    {/*{this.renderIdback()} */}
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Employee ID card back side
                    </Text>
                    </View>
                </View>
                  }
                
            </View>
            <View style={{borderRadius:5, height:36, width:'40%', borderWidth:0.2, backgroundColor:'rgba(204,12,12, 0.1)', marginTop:20, marginLeft:20}}>
                <View style={{flexDirection:'row', marginLeft:10 }}>
                <Image source={require('../../assets/assignment_late.png')} style={{height:20,width:20,marginTop:8}} />
                    <TouchableOpacity style={{marginLeft:10,alignContent:'center',justifyContent:'center'}}
                    onPress={() => {this.setModalVisible(!modalVisible);}}
                    >
                <Text style={{fontSize:10,fontWeight:'bold', color:'#cc0c0c', marginLeft:-5, marginTop:5}}>
                    No employee ID card
                </Text>
                </TouchableOpacity>
                </View>
                <View>
                    <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    
                    >
                     <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                        <View style={{width:'70%', height:130, backgroundColor:'#ffffff',borderWidth:0.5}}>
                            
                            <Text style={{fontWeight:'bold', marginLeft:10, marginTop:10}}>
                                Confirmation needed !
                            </Text>
                            <Text style={{marginLeft:10, marginTop:10}}>
                                You don't have an employee ID card
                            </Text>
                            <View style={{flexDirection:'row', marginTop: 20, marginLeft:100}}>
                            <View style={{ width:'35%', marginLeft:10, alignItems:'center'}}>
                            <TouchableOpacity style={{height:30,width:'100%',alignItems:'center',borderRadius:5,justifyContent:'center', backgroundColor:'rgba(42,145,52,0.1)',}}
                            onPress={() => {this.setModalVisible(!modalVisible);}}
                            onPress={()=> this.setState({id_card:true})}
                            >
                            <Text style={{color:'#2A9134'}}>
                                No
                            </Text>
                </TouchableOpacity>
                </View>
                <View style={{ width:'35%', marginLeft:10, alignItems:'center', backgroundColor:'rgba(204,12,12, 0.1)'}}>
                <TouchableOpacity style={{height:30,borderRadius:5,justifyContent:'center', }}
                onPress={() => {this.setModalVisible(!modalVisible)}}
                onPress={()=> this.setState({noemail:false, id_card:false})}
                >
                    <Text style={{color:'#cc0c0c'}}>
                        Yes
                    </Text>
                </TouchableOpacity>
                </View>
                            </View>
                        </View>
                        </View>
                    </Modal>
                </View>
            </View>
            </View>
            ):null}

        <Text style={{marginLeft:20, fontSize:12, paddingTop:5,paddingBottom:0,color:'#444444'}}>
            Office Address
        </Text>
        <View style={{flexDirection:'row'}}> 
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5, width:'30%'}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Pincode.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Pin code</HelperText>
            <TextInput placeholder=' ' value={this.state.pincode}
            keyboardType='numeric' maxLength={6}
            onChangeText={(text) => {this.onChanged(text); this.fetchData(text);this.fetchCity(text);this.fetchLocality();this.fetchSubLocality();}}
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,height:48,marginLeft:-65, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, marginLeft:10, marginRight:10,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5, width:'50%'}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Cityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>City</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={city}
            placeholderTextColor = "#000000" style={{flex:1, marginTop:10,height:48,marginLeft:-35, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            
            </View>
        </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Stateicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>State</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={state}  //importantForAutoFill='yes' value={state}
            placeholderTextColor = "#000000" style={{flex:1, marginTop:10,height:48,marginLeft:-35, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.3, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Localityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Locality</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={locality} //value={this.state.locality}
            //onChangeText={(locality) => {this.setState({locality})}} 
            placeholderTextColor = "#000000" style={{flex:1, marginTop:10,height:48,marginLeft:-60, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Sublocalityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Sublocality</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={sublocality}    //value={this.state.sublocality}
           // onChangeText={(sublocality) => {this.setState({sublocality})}} 
            placeholderTextColor = "#000000" style={{flex:1, marginTop:10,height:48,marginLeft:-75, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Currentaddressicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0, fontSize:8}}>Door/Flat No. & Block NO. Flat/Building name, Street No. Street name</HelperText>
            <TextInput placeholder=' ' value={this.state.address}
            onChangeText={(address) => {this.setState({address})}} 
            placeholderTextColor = "#000000" style={{flex:1, marginTop:10,height:48,marginLeft:-265, width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{marginLeft:20}}>
            <Text style={{marginTop:10, marginBottom:15}}>
                Upload your payslip
            </Text>
            {this.state.cameraClicked == false ?
            <View style={{ width:'45%',height:150,borderRadius:5, borderWidth:0.1, }}>
              
                    <TouchableOpacity 
                    onPress={() => {this.setModalVisible(!modalVisible);}}
                    style={{alignItems:'center',marginTop:60}}>
                        <Image source={require('../../assets/note_add.png')} style={{height:20,width:20,}} />
                    </TouchableOpacity>
                    <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Payslip of Dec 2020
                    </Text>
                    </View>
                </View>
                :
                <View style={{ width:150,height:150,borderRadius:5, borderWidth:0.1, }}>
                {this.renderPayslip()}
                <View style={{width:'100%', position:'absolute',height:24, backgroundColor:'#888888',borderBottomLeftRadius:5,borderBottomRightRadius:5, marginTop:130,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10, color:'#ffffff'}}>
                        Payslip of Dec 2020
                    </Text>
                    </View>
                </View>
                  }
                  
                <View>
                <TextInput placeholder='Password to open the file ' value={this.state.password}
              onChangeText={(password) => {this.setState({password})}} 
            placeholderTextColor = "#000000" style={{flex:1, borderBottomColor:'#000000',borderBottomWidth:0.5,marginTop:5,height:40,marginLeft:0, width:'50%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        
        
          {/* <View style={{display:'flex', flexDirection:'row',paddingHorizontal:8, paddingVertical:8, justifyContent:'center'}}>
              <View>
                {this.renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
                </View>*/}
                
        <TouchableOpacity style={{marginRight:20,marginTop:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor: this.state.ButtonStateHolder ? 'rgba(42,145,52,0.5)':'#2A9134',marginBottom:20}}
            disabled={!this.state.address}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
           // onPress={() => {this.handleUploadPhoto()}}     //this.uploadtoS3();this.insertdata_into_db(); 
           // onPress={() => this.props.navigation.navigate('preoffer')}
        >
            <Text style={{textAlign:'center',paddingTop:7}}>
                Submit
            </Text>
        </TouchableOpacity>
        </ScrollView>
        <View>
                <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                <View style={styles.btnParentSection}>
              {/*<TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
                </TouchableOpacity>*/}
              <View style={{borderRadius:5,borderWidth:0.5,backgroundColor: '#FFFFFF', width:300}}>
              <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>Take a photo</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection, {margin:20,}}  >  
                <Text style={styles.btnText}>Choose from the device folders</Text>
              </TouchableOpacity>
              </View>
            </View>

                </Modal>
            </View>

        </View>
        
    );
    }
   /* takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        //this.props.navigation.navigate("Library")
        console.log(data.uri);
        //this.DocumentUpload()
      };*/
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