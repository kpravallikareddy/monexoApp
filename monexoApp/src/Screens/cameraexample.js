import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View,AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';
//import ImagePicker from 'react-native-image-picker';
//import DocumentUpload from '../Networks/Documentuploadcalls'

const PendingView = () => (
  <View
    style={{
     // flex: 1,
     height:30,
     width:'70%',
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);
export default class Cameraexample  extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
        file:'',
        user_id : '',
        show: false,
        img: require('../../assets/email.png')
    }
    //this.DocumentUpload = this.DocumentUpload.bind(this)
}
async capture(){
  const img = await this.refs.cam.takePictureAsync({ quality: 0.5})
  this.setState({ img, show: false })
}

/*DocumentUpload = async () => {
  DocumentUpload(this.state.file).then((response) => {
      console.log("V",response)
      console.log("Y",response.data)
      if(response.status == 200){
          this.props.navigate.navigation("Library")
      }
  })
  .catch((error) => {
    let status = error.response.status;
            
    if(status == 400){
        AsyncStorage.setItem('token','');
        this.props.navigation.navigate('Login');
    }
      console.log("error message",error.message)
  })
}*/

// DocumentUpload ()  {
//     const data = new FormData();
//             //data.append('name', res.name);
//             data.append( 'file', 'user_id');
//             //data.append('type',res.type);
//             console.log("data res",JSON.stringify(data))
//             //Please change file upload URL
    
//            DocumentUpload(JSON.stringify(data)).then((response) => {
//                         console.log("response upload",response)
//                     })
//                     .catch((error) => {
//                         console.log("error message",error.message)
//                     })
//                     this.setState({
//                       singleFile:JSON.stringify(response)
//                   },() => {console.log("response data",this.state.singleFile)}) 

// }


    // DocumentUpload(file , user_id){
    // const body = new FormData();
    // body.append('img', {name: 'file', type: 'image/jpg',});
    // fetch('https://tzkeacc5f7.execute-api.ap-south-1.amazonaws.com/dev/file_upload' ,{
    // method:'POST',
    // headers: {
    //   'Accept': 'multipart/form-data',
    //   "content-type": "application/json",
    // },
    // body: JSON.stringify({
    //   file: file,
    //   user_id : 10
    // })
    //   })
    //   .then((response) => response.json())  
    //   //  .then((response) => {
    //   //    console.log("Y",response)
    //   //    console.log("VY",response.data)
    //   //    if(response.status == 200){
    //   //      this.props.navigate.navigation('Library')
    //   //    }
    //   //  })
    
    //   // console.log("Z",response.data)
    //   .then((responseJson) => {

    //       console.log("V",JSON.stringify(responseJson));
    //       this.setState({
    //         // showLoader:false,
    //         //  getAllNotificaitons:responseJson.getAllNotificaitons,
    //       },() =>{
    //         if(responseJson.status == 200){
    //           this.props.navigate.navigation("Library")
    //         }
    //       })
    //       //console.log(this.state.data)
    //   })
    //   .catch((error) => {
    //     console.error(error);
    // });
    // }
  
  render() {
    return (
      <View style={styles.container}>
        {/* <RNCamera */}
        <RNCamera ref='cam' style={StyleSheet.absoluteFill}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 10 }}> SNAP </Text>
                </TouchableOpacity>
                {/*<Text style={{color:'white'}} onPress={() => this.DocumentUpload()}>upload photo </Text>*/}
              </View>
            );
          }}
        </RNCamera>
        <TouchableOpacity style={styles.capture} onPress={() => this.capture()}/>
      </View>
    );
  }

  takePicture = async function (camera) {
      console.log("captute");
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    //this.props.navigation.navigate("Library")
    console.log(data.uri);
   // this.DocumentUpload()
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
   //flex: 1,
    height:120,
    width:140,
    marginTop:150,

    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    //paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 120,
    width:60,
    height:28,
  },
});