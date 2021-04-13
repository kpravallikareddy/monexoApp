import React, {Component} from 'react';
import {View, Text,TextInput, CheckBox,Button, Image, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, Alert, StyleSheet} from 'react-native';
//import styles from '../Styles/personalinfostyles';
import {HelperText, RadioButton} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import notselected from '../../assets/notselected.png';
import selected from '../../assets/selected.png';
import DropDownPicker from "react-native-custom-dropdown";
import moment from 'moment';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { SelectMultipleButton, SelectMultipleGroupButton } from 'react-native-selectmultiple-button'
import AdgydeSdk from 'react-native-adgyde-sdk';
//import {TextField} from '@material-ui/TextField';
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'

const delay = ms => new Promise(res => setTimeout(res, ms));

const regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  const genders = [ { id: 1, label: 'Male', value: 'M', }, {
    id: 2, label: 'Female', value: 'F', },]



export default class personalinfo extends React.Component{

    constructor(props){
        super(props)
        this.state={
            appid:'',
            customerid:'',
            fullname:'',
         //   dob:(new Date()).toLocaleString(),
            date:new Date(),
           // gender:['Male','Female'],
            gender:'',
            fathername:'',
            pincode:'',
            locality:'',
            sublocality:'',
            selectedButton:'',
            selectedGender:'',
            address:'',
            showCircleImg:true,
            state: ' ',
            city:' ',
            ButtonStateHolder:true,
            pannumber:null,
            email:null,
           // mode:'date',
            validPan: false,
            visible: false,
            errorStatus: false,
            validEmail:false,
            checked:null,
            salariedselected:'',
            dropdownvisible:false,
            selection:null,
            isDatePickerVisible:false,
            salarieddata:['Pvt Ltd', 'LLP', 'Public Ltd','Central Govt', 'State Govt'],
            firstname:'',
            lastname:'',
            namestatus:false,
            adhaarnumber:0,
            firstnameStatus:false,
            hidelocalitysublocality:false,
           // studentnotselected:false,
            latitude:0,
            longitude:0,
            profession_type:'',
            utmsource:'',
            campaignname:'',
            campaignid:0,
            channelname:'',
            channelid:0,
            isStudentSelected:false,
            isSalariedSelected:false,
            isSubSalariedItem:''

        };
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        //this.handleChange = this.handleChange.bind(this)
    }

    //Adgyde test

    //AdGyde.getUserId = AdgydeSdk.getUserId;
    //AdGyde.getchannelId = AdgydeSdk.getchannelId;
    //AdGyde.getChannelName = AdgydeSdk.getChannelName;
    //AdGyde.getCampaignName = AdgydeSdk.getCampaignName;
    getutmdetails = () =>{
    this.setState({
        utmsource:AdGyde.getUtmSource,
        campaignname:AdGyde.getCampaignName,
        campaignid:AdGyde.getCampaignId,
        channelname:AdGyde.getChannelName,
        channelid:AdGyde.getChannelId
    });
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
    
    onPressMale= () => {
        this.setState({Male:this.state.Male,selectedGender:'male'})
        console.log("gender:",this.state.Male);
    }

    onPressFemale= () => {
        this.setState({Female:this.state.Female,selectedGender:'female'})
        console.log("gender:",this.state.Female);
    }

    //onPress= () => {
    //    this.setState({selectedGender:'male'})
    //}

    onDateChange = (event, selectedDate) => {
        console.log(selectedDate)
        const currentDate = selectedDate || date;
        this.setState({date: currentDate})
      }

      showDatePicker = () => {
        this.setState({isDatePickerVisible:true});
      }

      setGender=(props) => {
          this.setState({gender:props})
          console.log("gender:",props);
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

    onChangePan(pannumber){
        const regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/
        this.setState({pannumber});

        if(regex.test(pannumber)) {
            console.log('Pan number is valid');
            this.setState({validPan: true, errorStatus:false});
        }
        else if (!regex.test(pannumber)) {
            console.log('Pan is not valid');
            this.setState({validPan: false, errorStatus:true});
        }
    }



    onChangeEmail(email) {
        this.setState({email});
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       if(pattern.test(email)) {
           console.log('email valid');
           this.setState({validEmail:true,errorStatus:false});
       }
       else if(!pattern.test(email)) {
           console.log('email invalid');
           this.setState({validEmail:false,errorStatus:true});
       }
   }

   getFullName() {
    this.setState({fullname:this.state.firstName + " " + this.state.lastName}) ;
  }

   onChangeFirstname(firstname){
       //this.setState({firstname});
       const pattern = /^[a-zA-Z ]*$/;   // allow only letters and space
       const regex = /^[a-zA-Z ]\s+|\s+$/g; // remove extra spaces
       if(firstname.length<=2) {
           console.log('first name should be atleast 3 letters');
           this.setState({firstnameStatus:true});
       } else if(pattern.test(firstname)){
           var fname = firstname.replace(/^[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
           console.log('enter only letters')
           var frstname = fname.trimLeft()
           this.setState({firstnameStatus:false, firstname:frstname}) 
           console.log('firstname after replacing special:',this.state.firstname) 
      }  
      if(regex.test(firstname)){
           var text=firstname.replace(/^\s+|\s+/g, " ");
           this.setState({firstnameStatus:false, firstname:text}) 
           console.log('firstname after replacing space:',this.state.firstname)
      }
      
     // this.setState({firstname})
      
       //restrict = text => text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
       
       //else if(pattern.test(text)) {
         //  console.log('enter only letters');
       //} 
       //else if(regex.test(text)){
        //   text=text.replace(/^\s+|\s+/g, "");     //(/\s+/g, " ");
       //    console.log('text:',text);
      // }
      // console.log('firstaftervalidate:',text)
      // this.setState({firstname:text});
   }

   onChangeFirstName(text){
    let newText = '';
    for (var i=0; i < text.length; i++) {
       newText = newText + text[i];
    }
    const pattern = /^[a-zA-Z ]*$/;   // allow only letters and space
    const regex = /^[a-zA-Z ]\s+|\s+$/g; // remove extra spaces
    if(newText.length<=2) {
        console.log('first name should be atleast 3 letters');
        this.setState({firstnameStatus:true});
    } else if(pattern.test(newText)){
        var fname = newText.replace(/^[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        console.log('fname:',fname)
        var frstname = fname.trimLeft()
        console.log('frstname:',frstname)
        this.setState({firstnameStatus:false, newText:frstname, firstname:newText}) 
       // console.log('firstname after replacing special:',this.state.firstname) 
   } 
   //this.setState({firstname:newText})
   console.log('firstname after replacing special:',this.state.firstname)
   /*  if(regex.test(firstname)){
     var fstname=firstname.replace(/^\s+|\s+/g, " ");
     var frstname = fstname.trimLeft()
     //console.log(this.state.firstname)
     console.log('removing exta spaces')
     this.setState({firstnameStatus:false, firstname:frstname})
     console.log('firstname:',this.state.firstname)  
   } else */
    
  }

  onChangeLastname(lastname){
    //this.setState({firstname});
    const pattern = /^[a-zA-Z ]*$/;   // allow only letters and space
    const regex = /^[a-zA-Z ]\s+|\s+$/g; // remove extra spaces
    if(pattern.test(lastname)){
        var lname = lastname.replace(/^[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        console.log('enter only letters')
        var lstname = lname.trimLeft()
        this.setState({lastname:lstname}) 
        console.log('lastname after replacing special:',this.state.lastname) 
   }  
   if(regex.test(lastname)){
        var text=lastname.replace(/^\s+|\s+/g, " ");
        this.setState({lastname:text}) 
        console.log('lastname after replacing space:',this.state.lastname)
   }
   
  // this.setState({firstname})
   
    //restrict = text => text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    
    //else if(pattern.test(text)) {
      //  console.log('enter only letters');
    //} 
    //else if(regex.test(text)){
     //   text=text.replace(/^\s+|\s+/g, "");     //(/\s+/g, " ");
    //    console.log('text:',text);
   // }
   // console.log('firstaftervalidate:',text)
   // this.setState({firstname:text});
}


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

   insertdata_into_db = async () => {
    console.log('test');
   await fetch(BASE_URL_PYTHON+'/personalinformation',
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
       // fullname:this.state.fullname,
        "firstname":this.state.firstname,
        "lastname":this.state.lastname,
        "dob":this.state.date,
        "father":this.state.fathername,
        "gender_type":this.state.gender,
        "personal_email_id":this.state.email,
        "pincode":this.state.pincode,
        "city":this.state.city,
        "state":this.state.state,
        "locality":this.state.locality,
        "sublocality":this.state.sublocality,
        "address":this.state.address,
        "profession_type":this.state.salariedselected || this.state.profession_type,
        "pannumber":this.state.pannumber,
        "adhaarnumber":this.state.adhaarnumber,
        "current_address_latitude":this.state.latitude,
        "current_address_longitude":this.state.longitude,
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

/*var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"data":[{"Account":{"0011e000008B8X8AAK":{"peer__First_Name__c":"cherry","peer__Last_Name__c":"test15"}}}]});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("uat-newapioth.monexo.co/api/saleForceUpdateRecords", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); */


// splitting

/*splitmethod = () => {
    let username = this.state.fullname;
    let tmp = username.split(' ');
    console.log('temp:',tmp);
    this.setState({firstname:tmp[0]});
    //this.setState({firstname:this.state.fullname.split(' ')})
    console.log('firstname:',this.state.firstname);
    this.setState({lastname:tmp[tmp.length-1]});
    //this.setState({lastname: this.state.fullname.split(' ')})
    console.log('lastname:',this.state.lastname);

}*/


// salesforce update

updateSalesforce = () => {
    console.log('salesforce');
    fetch(BASE_URL_PHP+'/saleForceUpdateRecords',
    {
        method:'POST',
        headers:{
         // Accept: 'application/json',
          'Content-Type': 'application/json'
        },
       body:
       {"data":[
        {"Account":
            {"":
                {
                "peer__First_Name__c":this.state.firstname,
                "peer__Last_Name__c":this.state.lastname,
                "peer__Email__c":this.state.email,
                "peer__Gender__c":this.state.gender,
                "Father_s_Name__c":this.state.fathername,
                "peer__Date_of_Birth__c":this.state.date,
                "PAN__c":this.state.pannumber,
                "Aadhar_Number__c":this.state.adhaarnumber,
                "Employment_status__c":this.state.profession_type,
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
                "Locality__c":this.state.locality +' '+this.state.sublocality,
                "PinCode__c":this.state.pincode,
                "loan__City__c":this.state.city,
                "loan__State__c":this.state.state,
                "loan__Address_Type__c":"Residential"
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

// autofilling from kyc

    aufilldata_from_kyc = (appid) => {
        console.log('kyc');
        fetch(BASE_URL_PYTHON+'/kyc'+this.state.appid)
            .then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson);
            })
            .catch((error) => {
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
                    this.setState({city:records[Object.keys(records)[0]].regionname})   //city:records[Object.keys(records)[0]].regionname
               }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    fetchCity = () => {
       // console.log(this.state.pincode);
        fetch(BASE_URL_PYTHON+'/addressAutofill/getCity',
        {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:
              JSON.stringify({
                "pincode":this.state.pincode
              })
          }).then((response) =>response.json())
            .then((responseJson) =>{
           // console.log(responseJson)
          //  console.log("city",responseJson.data.city)
            this.setState({city:responseJson.data.city})
            }).catch((error) =>
            {
              console.error(error);
            });
    };

    fetchLocality = async () => {
        await delay(3000)
        console.log('geospoc-locality');
        fetch(BASE_URL_PYTHON+'/addressAutofill/getLocalities',
        {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:
              JSON.stringify({
                "city":this.state.city,
                "pincode":this.state.pincode,
              })
          }).then((response) =>response.json())
            .then((responseJson) =>{
            //console.log(responseJson)
           // console.log(responseJson.data.localities[0])
            this.setState({locality:responseJson.data.localities[0]})
            }).catch((error) =>
            {
              console.error(error);
            });
    };

    fetchSubLocality = async () => {
        await delay(5000)
      //  console.log('geospoc-sublocality');
        fetch(BASE_URL_PYTHON+'/addressAutofill/getSubLocalities',
        {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:
              JSON.stringify({
                "city":this.state.city,
                "pincode":this.state.pincode,
                "locality":this.state.locality,
              })
          }).then((response) =>response.json())
            .then((responseJson) =>{
           // console.log(responseJson)
           // console.log(responseJson.data.subLocalities[0])
            this.setState({sublocality:responseJson.data.subLocalities[0]})
            }).catch((error) =>
            {
              console.error(error);
            });
    };

    fetchLatLong = async () => {
        await delay(5000)
        console.log('geospoc-latlong');
        fetch(BASE_URL_PYTHON+'/geocode',
        {
            method:'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:
              JSON.stringify({
                "address":this.state.address,
                "city":this.state.city,
                "pincode":this.state.pincode,
              })
          }).then((response) =>response.json())
            .then((responseJson) =>{
            console.log(responseJson)
            console.log(responseJson.message.data.latitude)
            console.log(responseJson.message.data.longitude)
          //  this.setState({latitude:responseJson.message.data.latitude, 
          //      longitude:responseJson.message.data.longitude})
            }).catch((error) =>
            {
              console.error(error);
            });
    };


    isStu_Sal=(value) => {
        console.log('value',value)
        if(value==="Sal"){
            this.setState({
                isSalariedSelected:true,
                isStudentSelected:false
            })
        }else{
            this.setState({
                isSalariedSelected:false,
                isStudentSelected:true,
                profession_type:"Student"
            })
        }

    } 


    
    render(){
        const {city,state,locality,sublocality} = this.state;
        const {validPan,pannumber,validEmail, email,date} = this.state;
    return (
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <TouchableOpacity> 
               {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />*/}
               <Text style={{fontSize: 18,paddingRight:20}}> X </Text>
            </TouchableOpacity>
            <Text style={{fontSize:18, fontWeight:'bold'}}>
                Personal information 
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/3-30}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
            </TouchableOpacity>
        </View>
        <View style={{height:40, backgroundColor:'rgba(65, 161, 127, 0.1)', paddingTop:1,marginBottom:20}}>
        <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10}}>
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
       {/* <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:0,marginBottom:0, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Fullname</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.fullname}
            onChangeText={(fullname) => {this.setState({fullname}); this.splitmethod();}} //this.updateSalesforce()
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-70,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
            </View>*/}


            



        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:0,marginBottom:0, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Firstname</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.firstname}
            style={{textTransform:'capitalize'}}
           // onChangeText={(firstname) => {this.setState({firstname}); console.log('first:',this.state.firstname)}} //this.updateSalesforce()  // this.splitmethod();
           // onChangeText={(text) => {this.onChangeFirstName(text)}}
            //  onChangeText={(firstname) => this.onChangeFirstname(firstname)}
           onChangeText={this.onChangeFirstname.bind(this)}
           
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-70,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
            {this.state.firstnameStatus == true ? (
            <Text style={{color:'red', fontSize:12, marginLeft:0, marginTop:-5, marginBottom:20}}> First name should be atleast 3 letters</Text>
            ) : null}
        </View>

        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:20,marginBottom:0, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Lastname</HelperText>
            <TextInput placeholder=' '  value={this.state.lastname}
            style={{textTransform:'uppercase'}}
            //onChangeText={(lastname) => {this.setState({lastname}); console.log('last:',this.state.lastname);this.updateSalesforce()}} //this.updateSalesforce()
            onChangeText={this.onChangeLastname.bind(this)}
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-70,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        
        {/*<View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5, width:'40%'}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Birthday.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#111111'}}>Date of Birth</HelperText>
            <TextInput placeholder=' ' value={this.state.dob}
            onChangeText={(dob) => {this.setState({dob})}} 
            placeholderTextColor = "black" style={{marginLeft:-92, width:'90%', color:'black'}}
            />
            </View>
    </View>*/}




    {/*<DateTimePicker 
    style={{width: 160,
        marginTop: 20,marginBottom: 20,backgroundColor:'#EEEEEE', marginLeft:20, borderBottomWidth:0.5,borderBottomColor:'#000000'}}
    testID="dateTimePicker"
    value={date}
    mode={'date'}
    is24Hour={false}
    display="default"
    onChange={this.onDateChange}
    />*/}

    
        
        <DatePicker
          style={{width: 160, 
            marginTop: 20,marginBottom: 20,backgroundColor:'#EEEEEE', marginLeft:20, borderBottomWidth:0.5,borderBottomColor:'#000000'}}
          date={date} // Initial date from state
          mode={"date"} // The enum of date, datetime and time
         //value={date}
        // mode={'date'}
        // placeholder="Date of Birth"
          format="DD-MM-YYYY"
        //  minDate="01-01-2016"
        //  maxDate="01-31-2100"
         // confirmBtnText="Confirm"
         // cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
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
          onDateChange={(date) => {this.setState({date})}} 
          //onChangeText={this.onChangeEmail.bind(this)}
        />
        
            
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:0,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Father's / Spouse name</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.fathername}
            onChangeText={(fathername) => {this.setState({fathername})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-145,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <Text style={{marginLeft:20, fontSize:12, paddingTop:10,paddingBottom:5,color:'#444444'}}>
            Gender
        </Text>
        <View style={{flexDirection:'row', marginBottom:20}}>
        <TouchableOpacity 
       // onPress={() => this.setState({ selectedGender:'male'})} 
        onPress={()=>this.setGender("Male")}
        style={{marginRight:20,borderWidth:1,marginLeft:20,height:30,borderRadius:5,backgroundColor:this.state.gender === 'Male' ? '#2A9134':'#D1D1D1',opacity:0.5,width:'25%'}}>
            <View style={{flexDirection:'row',padding:5,justifyContent:'center'}}>
            <Image source={require('../../assets/maleiconselected.png')} resizeMode='contain' style={{height:15,width:15,flex:.3}} />
            <Text style={{flex:.7}}>
                Male
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
        //onPress={() => this.setState({ selectedGender:'female'})} 
        onPress={()=>this.setGender("Female")}
        style={{marginRight:20,borderWidth:1,marginLeft:20,height:30,borderRadius:5,backgroundColor:this.state.gender === 'Female' ? '#2A9134':'#D1D1D1',opacity:0.5,width:'30%'}}>
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/womaniconselected.png')} style={{height:15,width:15}} />
            <Text>
                Female
            </Text>
            </View>
        </TouchableOpacity>
        </View>

          {/*<View>
              <SelectMultipleButton 
              buttonViewStyle={{borderRadius:5, height:36, width:'30%'}}
              textStyle={{fontSize:16}}
              highLightStyle={{backgroundColor:'#2A9134', textColor:'#000000', borderColor:'#000000'}}
              multiple={false}
              />
          </View>*/}


        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:0,marginBottom:-5, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Personal Email-ID</HelperText>
            <TextInput placeholder=' '  autoCapitalize='none'
            autoCorrect={false} value={email}
            //onChangeText={(email) => {this.setState({email})}} 
            onChangeText={this.onChangeEmail.bind(this)}
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-110,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
            {this.state.errorStatus == true ? (
            <Text style={{color:'red', fontSize:12, marginLeft:0, marginTop:-5}}> Email is not valid</Text>
            ) : null}
        </View>

        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:20,marginBottom:0, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/aadhaar.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Adhaar number</HelperText>
            <TextInput placeholder=' ' value={this.state.adhaarnumber} 
            onChangeText={(adhaarnumber) => {this.setState({adhaarnumber})}}
            keyboardType='numeric'
            placeholderTextColor = "#000000" maxLength={12} style={{flex:1,marginTop: 10,marginLeft:-100,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
            </View>
        <Text style={{marginLeft:20, fontSize:12, paddingTop:25,paddingBottom:5,color:'#444444'}}>
            Current Address
        </Text>
        <View style={{flexDirection:'row'}}> 
        <View style={{height:48,width:'30%',borderBottomColor:'#000000',borderBottomWidth:0.5, marginLeft:20,marginRight:0,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Pincode.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Pin code</HelperText>
            <TextInput placeholder=' ' value={this.state.pincode}
            keyboardType='numeric' maxLength={6}
            onChangeText={(text) => {this.onChanged(text); this.fetchData(text); this.fetchCity();this.fetchLocality();this.fetchSubLocality();}} //this.fetchLocality();this.fetchSubLocality();
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-65,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,width:'55%',borderBottomColor:'#000000',borderBottomWidth:0.5, marginLeft:15,marginRight:0,backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Cityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>City</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={this.state.city}
            placeholderTextColor = "rgba(0,0,0,0.3)" style={{flex:1,marginTop: 10,marginLeft:-40,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            
            </View>
        </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:15,marginBottom:20, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Stateicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>State</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={this.state.state}
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
            <TextInput placeholder=' ' autoCapitalize = 'words' importantForAutoFill='yes' value={this.state.locality}//autoCapitalize = 'words' value={this.state.locality}
           // onChangeText={(locality) => {this.setState({locality})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-60,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:5,marginBottom:20, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Sublocalityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Sublocality</HelperText>
            <TextInput placeholder=' '  autoCapitalize = 'words' importantForAutoFill='yes' value={this.state.sublocality}  //autoCapitalize = 'words' value={this.state.sublocality}
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
        <View style={{marginLeft:20,marginTop:15, marginRight:20, borderColor:'#2A9154'}}>
            <Text >Profession</Text> 
                {/*{this.state.profession == false ?*/}

                <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5,borderColor:this.state.isSalariedSelected ?'#2A9154':null,borderWidth:this.state.isSalariedSelected ?0.5:null}}>
               
                <TouchableOpacity 
                onPress={() =>this.isStu_Sal("Sal")}
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                {!this.state.isSalariedSelected?
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    :
                    <Image style={{ height:20, width:20, marginLeft:10}}source={require("../../assets/selected.png")}/>
                }

                    <Text style={{marginLeft:10, }}>Salaried</Text>
                    <Image style={{marginLeft:Dimensions.get('window').width/2+20, height:30, width:30}}source={require("../../assets/downarrow.png")}/>
                </TouchableOpacity>
                </View> 
                {/*:
            <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
            <TouchableOpacity onPress={() =>{this.setState({dropdownvisible:true})}}
            styl}e={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:0.5, borderColor:'#2A9154', height:56, width:'100%', marginLeft:0, borderRadius:5}}>
                    <Image style={{ height:20, width:20,marginTop:15, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    <Text style={{marginLeft:10,marginTop:15}}>Salaried</Text>
                    <Image style={{marginLeft:Dimensions.get('window').width/2+20, height:30, width:30, marginTop:15}}source={require("../../assets/downarrow.png")}/>
            </TouchableOpacity>
                </View>}*/}
      
            {this.state.isSalariedSelected ==true?
            this.state.salarieddata.map((item,index) => {
            return (
            <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
            {/*{this.state.salariedselected ?*/}
            <View >
                <TouchableOpacity style={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:this.state.isSubSalariedItem==index ?0.5:null, 
                borderColor:this.state.isSubSalariedItem==index ?'#2A9154':null, height:56, width:'100%', marginLeft:0, borderRadius:5}}
                
                onPress={()=>{this.setState({isSubSalariedItem:index,profession_type:item})}}>
                    {(this.state.isSubSalariedItem==index) ?
                    <Image style={{ height:20, width:20, marginLeft:10, marginTop:15}}source={require("../../assets/selected.png")}/>
                    :
                    <Image style={{height:20,width:20,marginLeft:10, marginTop:15 }} source={require("../../assets/notselected.png")} />
                    }
                    <Text style={{marginLeft:10,marginTop:15}}>{item}</Text>
                    
                </TouchableOpacity>
                </View>
                {/*:
                <View>  
                <TouchableOpacity 
                //onPress={()=>{this.setState({ButtonStateHolder : false, visible:true})}} 
                //onPress={()=>this.setProfession(value)}     // salarieddata.get(key) salari[key]
               //onPress={()=>console.log("profession:",this.state.salariedselected)}
                
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    <Text style={{marginLeft:10, }}>{salarieddata}</Text>
                    {/*<Image style={{marginLeft:190, height:30, width:30}}source={require("../../assets/downarrow.png")}/>
                </TouchableOpacity>
                </View>*/}
            
        </View>
        )
        }) :null}

        <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
                <TouchableOpacity //onPress={()=>{this.setState({checked: key})}} 
                //onPress={() => {this.state.data == 'Self-Employed' ? alert('This product coming soon...') : null}}
                onPress={() => alert('This product coming soon...')}
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    <Text style={{marginLeft:10, }}>Self-Employed</Text>
                    
                </TouchableOpacity>
                </View>


                <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5,borderWidth:this.state.isStudentSelected?0.5:null,borderColor:this.state.isStudentSelected?'#2A9134':null}}>
                {/*{this.state.studentnotselected == false?*/}
                 <TouchableOpacity onPress={()=>this.isStu_Sal("Stu")}
                 //onPress={()=>{this.setState({ButtonStateHolder : false, visible:false,studentnotselected:true, profession_type:'student'})}}
                 style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                     {!this.state.isStudentSelected ?
                     <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                     :
                     <Image style={{ height:20, width:20, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    }
                     <Text style={{marginLeft:10, }}>Student</Text> 
                 </TouchableOpacity>
                {/*:
                <TouchableOpacity style={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:0.5, borderColor:'#2A9154', height:56, width:'100%', marginLeft:0, borderRadius:5}}>
                    <Image style={{ height:20, width:20,marginTop:15, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    <Text style={{marginLeft:10,marginTop:15}}>Student</Text>
                </TouchableOpacity>
                }*/}
                </View>


                {/*<View style={{marginLeft:20,marginTop:15, marginRight:20, borderColor:'#2A9154'}}>
            <Text >Profession</Text> 
                {this.state.profession == false ?

                <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
                <TouchableOpacity 
                onPress={() =>{this.setState({profession:true})}}
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    <Text style={{marginLeft:10, }}>Salaried</Text>
                    <Image style={{marginLeft:Dimensions.get('window').width/2+20, height:30, width:30}}source={require("../../assets/downarrow.png")}/>
                </TouchableOpacity>
                </View> :
            <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
            <TouchableOpacity onPress={() =>{this.setState({dropdownvisible:true})}}
            style={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:0.5, borderColor:'#2A9154', height:56, width:'100%', marginLeft:0, borderRadius:5}}>
                    <Image style={{ height:20, width:20,marginTop:15, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    <Text style={{marginLeft:10,marginTop:15}}>Salaried</Text>
                    <Image style={{marginLeft:Dimensions.get('window').width/2+20, height:30, width:30, marginTop:15}}source={require("../../assets/downarrow.png")}/>
            </TouchableOpacity>
            </View>}

            {this.state.dropdownvisible == true ?
                <View style={{ flex: 1, padding: 20, backgroundColor: "#f2f2f2" }}>
                {professiontype.map((object, d) =>
          <View key={d} style={{ justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>{object.title}</Text>
            {object.data.map((professionkey, i) =>
              <View key={i} style={styles.drinkCard}>
                <RadioButton value={professionkey.label} status={professionkey.isChecked} onPress={() => this.checkDrink(professionkey, object.data)} />
                <Text style={{ fontSize: 20, paddingLeft: 10 }}>{professionkey.label}</Text>
              </View>
            )}
          </View>
            )}
            </View>
            :null}
            </View>*/}


        {/*{this.state.data.map((data, value) => {
        return (
            <View value={value} style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
            {this.state.checked == value ? 
            <View >
                <TouchableOpacity style={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:0.5, borderColor:'#2A9154', height:56, width:'100%', marginLeft:0, borderRadius:5}}>
                    <Image style={{ height:20, width:20,marginTop:15, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    <Text style={{marginLeft:10,marginTop:15}}>{data}</Text>
                    
                </TouchableOpacity>
                </View>
                :
                
                <View>
                <TouchableOpacity onPress={()=>{this.setState({checked: key})}} 
                //onPress={() => {this.state.data == 'Self-Employed' ? alert('This product coming soon...') : null}}
                onPress={() => alert('This product coming soon...')}
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    <Text style={{marginLeft:10, }}>{data}</Text>
                    
                </TouchableOpacity>
                </View>
            }
            </View>
        )
        })}*/}


      {/*  <DropDownPicker 
            items={[
            {label:'Pvt Ltd', value:'pvt ltd'},
            {label:'LLP', value:'llp'},
            {label:'Public Ltd', value:'public ltd'}, 
            {label:'Central Govt', value:'central govt'},
            {label:'State Govt', value:'state govt'} 
            ]}
            defaultValue={this.state.profession}
            containerStyle={{height:48}}
            style={{backgroundColor:'#EEEEEE'}}
            itemStyle={{justifyContent:'flex-start'}}
            //dropDownStyle={{backgroundColor:'#fafafa'}}
            onChangeItem={item => this.setState({profession:item.value})}
        />*/}


        {/*
            <View style={{flexDirection:'row', marginTop:10}}>
                <View style={{paddingRight:10, width:'50%'}}>
        <TouchableOpacity style={{borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'salaried-pvt ltd' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            //onPress={() => this.setState({ selectedButton:'salaried-pvt ltd'})}
            // onPress={() => this.setState({ButtonStateHolder : false})}
            onPress={() => this.setState({selectedButton:'salaried-pvt ltd', ButtonStateHolder : false, visible:true})}
        >
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/Salaried.png')} style={{height:15,width:15}} />
            <Text>
                Salaried-Pvt Ltd
            </Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={{paddingRight:10, width:'50%'}}>
        <TouchableOpacity style={{borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'salaried-public ltd' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            //onPress={() => this.setState({ selectedButton:'salaried-public ltd'})}
            //onPress={() => this.setState({ButtonStateHolder : false})}
            onPress={() => this.setState({selectedButton:'salaried-public ltd', ButtonStateHolder : false,visible:true})}
        >
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/Salaried.png')} style={{height:15,width:15}} />
            <Text>
                Salaried-Public Ltd
            </Text>
            </View>
        </TouchableOpacity>
        </View>
        </View>
        <View style={{flexDirection:'row', marginTop:0}}>
                <View style={{paddingRight:10, width:'50%'}}>
        <TouchableOpacity style={{borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'salaried-central govt' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            //onPress={() => this.setState({ selectedButton:'salaried-central govt'})}
            //onPress={this.EnableButtonFunction}
            //onPress={() => this.setState({ButtonStateHolder : false})}
            onPress={() => this.setState({selectedButton:'salaried-central govt', ButtonStateHolder : false,visible:true})}
        >
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/central_gov.png')} style={{height:15,width:15}} />
            <Text>
                Salaried-Central Govt
            </Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={{paddingRight:10, width:'50%'}}>
        <TouchableOpacity style={{borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'salaried-state govt' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            //onPress={() => this.setState({ selectedButton:'salaried-state govt'})}
            //onPress={this.EnableButtonFunction}
            //onPress={() => this.setState({ButtonStateHolder : false})}
            onPress={() => this.setState({selectedButton:'salaried-state govt', ButtonStateHolder : false,visible:true})}
        >
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/State_gov.png')} style={{height:15,width:15}} />
            <Text>
                Salaried-State Govt
            </Text>
            </View>
        </TouchableOpacity>
        </View>
        </View>
        <View style={{flexDirection:'row', marginTop:0}}>
        <View style={{paddingRight:10, width:'32%'}}>
        <TouchableOpacity style={{borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'salaried-llp' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            //onPress={() => this.setState({ selectedButton:'salaried-llp'})}
            //onPress={this.EnableButtonFunction}
            onPress={() => this.setState({selectedButton:'salaried-llp', ButtonStateHolder : false,visible:true})}
        >
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/Salaried.png')} style={{height:15,width:15}} />
            <Text>
                Salaried-LLP
            </Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={{paddingRight:10, width:'40%'}}>
        <TouchableOpacity style={{borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'self_employed' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            onPress={() => this.setState({ selectedButton:'self_employed'})}
            onPress={() => alert('Coming soon...')}
        >
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/Self_employed.png')} style={{height:15,width:15}} />
            <Text>
                Self-employed
            </Text>
            </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{width:'25%',borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'student' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            onPress={() => this.setState({ selectedButton:'student'})}
            onPress={() => alert('Coming soon...')}
        >
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/Student.png')} style={{height:15,width:15}} />
            <Text>
                Student
            </Text>
            </View>
        </TouchableOpacity>
        </View>*/}
        </View>
        {this.state.isSalariedSelected ?
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:15,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/pan.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Pan number</HelperText>
            <TextInput placeholder=' ' value={pannumber} autoCapitalize = 'characters'
            onChangeText={this.onChangePan.bind(this)}
            placeholderTextColor = "#000000" maxLength={10} style={{flex:1,marginTop: 10,marginLeft:-80,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
            {this.state.errorStatus == true ? (
            <Text style={{color:'red', fontSize:12, marginLeft:0, marginTop:-5}}> PAN number is not valid</Text>
            ) : null}
            
    </View>
    :
    <Text></Text>
        }

        <TouchableOpacity style={{marginRight:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor: this.state.ButtonStateHolder  ? 'rgba(42,145,52,0.3)':'#2A9134',marginBottom:20,}}
            disabled={this.state.ButtonStateHolder || 
                this.state.firstname == '' || 
                this.state.lastname || this.state.date == '' || this.state.fathername=='' || 
                this.state.gender =='' || this.state.email=='' || this.state.adhaarnumber =='' || 
                this.state.pincode=='' || this.state.city=='' || this.state.state ||
                this.state.locality=='' || this.state.address==''
            }
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
            onPress={() => {this.insertdata_into_db(); this.getFullName()}}
            //onPress={() => this.props.navigation.navigate('bankdetails',{accountholdername:this.state.fullname})}
            onPress={() => {this.state.isSalariedSelected? this.props.navigation.navigate('employerdetails'): this.props.navigation.navigate('collegedetails')}}
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
    drinkCard: {
      paddingLeft: 6,
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: 'white',
      height: 55,
      elevation: 1,
      borderRadius: 4,
    }
  })