import { NativeAppEventEmitter } from "react-native";
import React, {useState} from 'react';
import {View, TextInput, Text,TouchableOpacity, Linking,Image, Dimensions, CheckBox} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import { ScrollView } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';
//import HTMLView from 'react-native-htmlview';

const { height, width } = Dimensions.get('window')
export default class Preoffer extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            showCircleImg:true,
            checked: false,
            name:'',
            ifsc:'',
            accnumber:'',
            bankname:'',
            branch:'',
            showHide:false,
            htmldata:null,
            bank_details_customer:'No',
            appid:'',

        }
        //this.onSubmit = this.onSubmit.bind(this);
    }

    handleOnPress = () => this.setState({checked: false})
    renderImage =() => {
        var imgSource = this.state.showCircleImg?circle:check_circle; 
        return(
            <Image style={{height:20, width:20}}
                source={imgSource}
            />
        );
    }

    insertdata_into_db = async () => {
        console.log('test');
       await fetch('http://10.0.2.2:8000/bankdetails/',
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
            name_as_in_bank_account:this.state.name,
            ifsc_code:this.state.ifsc,
            account_number:this.state.accnumber,
            bank_name:this.state.bankname,
            branch_name:this.state.branch
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

    netbank = async () => {
        console.log('finbit');
        const result = Linking.openURL('https://unifiedtrial.finbit.io/web/?accessToken=1tb67688tbi18kdppglcca89lmoqit7r')
        await this.sleep(800)
        console.log('result:',JSON.stringify(result));
        /*fetch('https://unifiedtrial.finbit.io/web/?accessToken=1tb67688tbi18kdppglcca89lmoqit7r')
            .then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({htmldata:responseJson})
            })
            .catch((error) => {
                console.error(error);
            });*/
    }

    onChanged(text){
        let newText = '';
    
        for (var i=0; i < text.length; i++) {
                newText = newText + text[i];
        }
        this.setState({ ifsc: newText });
       //console.log(text);
    }

    fetchData = (text) => {
        console.log('test');
        console.log(text);

       // ifsccode: 'ANDB0CG7721'  bank name: andhra bank, branch: kavuru

        fetch('http://10.0.2.2:8000/api/ifsccodes/'+text)
            .then((response) => response.json())
            .then((responseJson) => {
             console.log(responseJson);
            //console.log('bank:',responseJson.bankname);
           // console.log('branch:',responseJson.branch);
            this.setState({bankname: responseJson.bankname, branch:responseJson.branch})
            })
            .catch((error) => {
                console.error(error);
            });
    };

    handleCheckBox = () => {this.setState({ termsAccepted: !this.state.termsAccepted })}

        render(){
            const {checked, showHide,htmldata, ifsc,bankname, branch} = this.state;
           // const contentWidth = useWindowDimensions().width;
        return (
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
                <TouchableOpacity> 
                   {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />*/}
                   <Text style={{fontSize: 18,paddingRight:20}}> X </Text>
                </TouchableOpacity>
                <Text style={{fontSize:18, fontWeight:'bold'}}>
                    Bank details
                </Text>
                <TouchableOpacity>
                    <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/3+30}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
                </TouchableOpacity>
            </View>
            <View style={{height:40, backgroundColor:'rgba(65, 161, 127,0.1)',paddingTop:1,marginBottom:20}}>
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
            <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:0,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Your name as in bank records</HelperText>
            <TextInput 
            placeholder=' ' value={this.state.name}
            onChangeText={(name) => {this.setState({name})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-175,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{flexDirection:'row'}}> 
        <View style={{height:48,width:'40%',borderBottomColor:'#000000',borderBottomWidth:0.5, marginLeft:20,marginRight:0,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/ifsc.png')} style={{height:20,width:20,marginTop:10}} />
           <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Bank IFSC code</HelperText>
            <TextInput 
            placeholder=' '  maxLength={11} autoCapitalize = 'words'
            value={this.state.ifsc}
            onChangeText={(text) => {this.onChanged(text); this.fetchData(text);}}
           // onChangeText={(ifsc) => {this.setState({ifsc})}} 
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-100,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,width:'45%',borderBottomColor:'#000000',borderBottomWidth:0.5, marginLeft:10,marginRight:0,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/accnum.png')} style={{height:20,width:20,marginTop:10}} />
           <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Account number</HelperText>
            <TextInput 
            placeholder='' value={this.state.accnumber}
            onChangeText={(accnumber) => {this.setState({accnumber})}} 
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-105,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/bank.png')} style={{height:20,width:20,marginTop:10}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Bank name</HelperText>
            <TextInput 
            placeholder='' importantForAutoFill='yes' value={bankname}
            //onChangeText={(bankname) => {this.setState({bankname})}} 
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-75,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/branch.png')} style={{height:20,width:20,marginTop:10}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Branch name</HelperText>
            <TextInput 
            placeholder=' ' importantForAutoFill='yes' value={branch}
           // onChangeText={(branchname) => {this.setState({branchname})}} 
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-90,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>

        {this.state.showHide == false ? 
          <TouchableOpacity style={{marginTop:10,marginRight:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor: this.state.ButtonStateHolder ? 'rgba(42,145,52,0.5)':'#2A9134', opacity:0.5,marginBottom:20}}
          //disabled={this.state.ButtonStateHolder || !this.state.validPan}
          onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg, showHide:!this.state.showHide,bank_details_customer:'Yes'})}
         // onPress={() => {this.insertdata_into_db();}}
          //onPress={() => this.props.navigation.navigate('employerdetails')}
      >
          <Text style={{textAlign:'center',paddingTop:7}}>
              Submit
          </Text>
      </TouchableOpacity>
        :
        <View style={{marginTop:20,marginBottom:20,flexDirection:'row', borderWidth:0.1, alignItems:'center',justifyContent:'center',width:'90%', marginLeft:20, height:40, borderRadius:2}}>
            <Image source={require('../../assets/tick.png')} style={{height:15,width:15, marginLeft:10, marginRight:10}} />
            <Text style={{color:'#2A9134', fontWeight:'bold'}}>
                Submitted successfully
            </Text>
        </View>
        }

            <View pointerEvents={this.state.showHide == false ? 'none' : 'auto'}>
                <Text style={{marginLeft:20, fontWeight:'bold', fontSize:12, color:this.state.showHide ? '#000000': 'rgba(0,0,0,0.3)'}}>
                    Validate your bank account
                </Text>
                <View style={{borderWidth:0.1,backgroundColor: this.state.showHide ? '#9DFFFE': 'rgba(157,255,254,0.3)', marginTop:10, height:170, margin:20,}}>
                    <View style={{flexDirection:'row', marginRight:20}}>
                    <Image source={require('../../assets/netbanking.png')} blurRadius={1} style={{height:50,width:50,marginTop:15, marginLeft:10}} />
                    <Text style={{marginLeft:10, fontWeight:'bold',fontSize:14,marginTop:15,color:this.state.showHide ? '#000000': 'rgba(0,0,0,0.3)'}}>
                        Use Net Banking
                    </Text>
                    <Text style={{marginTop:40,fontSize:11, marginLeft:-105, marginRight:20,color:this.state.showHide ? '#000000': 'rgba(0,0,0,0.3)'}}>
                        Login to your Net banking to validate your bank 
                    </Text>
                    <Text style={{marginTop:55,fontSize:11, marginLeft:-250, marginRight:20, color:this.state.showHide ? '#000000': 'rgba(0,0,0,0.3)'}}>
                      account details
                    </Text>
                    </View>
                    <TouchableOpacity style={{width:'45%',marginTop:10,marginRight:20,borderWidth:0.5,marginLeft:Dimensions.get('window').width/2-10,height:35,borderRadius:15,backgroundColor:this.state.showHide ? '#000000': 'rgba(0,0,0,0.3)',marginBottom:20}}
                //disabled={this.state.ButtonStateHolder || !this.state.validPan}
                // onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
                // onPress={() => this.props.navigation.navigate('bankdetails')}
                onPress={() => {this.netbank();}}

               onPress={() => Linking.openURL('https://unifiedtrial.finbit.io/web/?accessToken=1tb67688tbi18kdppglcca89lmoqit7r')}
               //onpress={() => Linking.openURL('https://www.google.com')}
            >
            <Text style={{color:'#ffffff',textAlign:'center',paddingTop:7, fontSize:12}}>
                Login to Net banking
            </Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',marginTop:-5, marginLeft:Dimensions.get('window').width/2-10}}>
        <Image source={require('../../assets/timer.png')} blurRadius={0.5} style={{height:15,width:15,}} />
            <Text style={{fontSize:12, color:this.state.showHide ? '#000000': 'rgba(0,0,0,0.3)'}}>
                Takes Just 30 Seconds
            </Text>
        </View>
                </View>
               
            </View>
            </ScrollView>
            </View>
            
        );
    }
}
