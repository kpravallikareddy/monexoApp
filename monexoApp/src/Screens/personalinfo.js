import React, {Component} from 'react';
import {View, Text,TextInput, CheckBox, Image, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, Alert} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {HelperText} from 'react-native-paper';
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


const regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

export default class personalinfo extends React.Component{

    constructor(props){
        super(props)
        this.state={
            fullname:'',
         //   dob:(new Date()).toLocaleString(),
            date:new Date(),
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
            profession:false,
            data : ['Self-Employed','Student'],
            salariedselected:null,
            dropdownvisible:false,
            isDatePickerVisible:false,
            //gender:null,
            salarieddata:['Pvt Ltd', 'LLP', 'Public Ltd','Central Govt', 'State Govt']
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        //this.handleChange = this.handleChange.bind(this)
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
    
    //onPress= () => {
    //    this.setState({selectedButton:'Pvt Ltd'})
    //}

    onPress= () => {
        this.setState({selectedGender:'male'})
    }

    onDateChange = (event, selectedDate) => {
        console.log(selectedDate)
        const currentDate = selectedDate || date;
        this.setState({date: currentDate})
      }

      showDatePicker = () => {
        this.setState({isDatePickerVisible:true});
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


   insertdata_into_db = async () => {
    console.log('test');
   await fetch('http://10.0.2.2:8000/personalinformation/',
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
        fullname:this.state.fullname,
        dob:this.state.date,
        father:this.state.fathername,
        gender:this.state.selectedGender,
        personal_email_id:this.state.email,
        pincode:this.state.pincode,
        city:this.state.city,
        state:this.state.state,
        locality:this.state.locality,
        sublocality:this.state.sublocality,
        address:this.state.address,
        profession_type:this.state.salariedselected,
        pannumber:this.state.pannumber,
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
                    this.setState({state:records[Object.keys(records)[0]].statename, city:records[Object.keys(records)[0]].regionname})
                
               }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render(){
        const {city,state} = this.state;
        const {validPan,pannumber, validEmail, email,date} = this.state;
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
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:0,marginBottom:0, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Fullname</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.fullname}
            onChangeText={(fullname) => {this.setState({fullname})}} 
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
        {/*<View style={{flex: 1, alignSelf: 'stretch'}}>
        <ModalDatePicker 
            button={<Text> Open </Text>} 
            locale="tr" 
            onSelect={(date) => console.log(date) }
            isHideOnSelect={true}
            initialDate={new Date()}
            //language={require('./locales/en.json')}. # Your localization file
            />             
            </View>*/}
            
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
        <TouchableOpacity onPress={() => this.setState({ selectedGender:'male'})} style={{marginRight:20,borderWidth:1,marginLeft:20,height:30,borderRadius:5,backgroundColor:this.state.selectedGender === 'male' ? '#2A9134':'#D1D1D1',opacity:0.5,width:'25%'}}>
            <View style={{flexDirection:'row',padding:5,justifyContent:'center'}}>
            <Image source={require('../../assets/maleiconselected.png')} resizeMode='contain' style={{height:15,width:15,flex:.3}} />
            <Text style={{flex:.7}}>
                Male
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ selectedGender:'female'})} style={{marginRight:20,borderWidth:1,marginLeft:20,height:30,borderRadius:5,backgroundColor:this.state.selectedGender === 'female' ? '#2A9134':'#D1D1D1',opacity:0.5,width:'30%'}}>
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/womaniconselected.png')} style={{height:15,width:15}} />
            <Text>
                Female
            </Text>
            </View>
        </TouchableOpacity>
        </View>

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
            onChangeText={(text) => {this.onChanged(text); this.fetchData(text);}}
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
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:5,marginBottom:20, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Localityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Locality</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.locality}
            onChangeText={(locality) => {this.setState({locality})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-60,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:5,marginBottom:20, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Sublocalityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0}}>Sublocality</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.sublocality}
            onChangeText={(sublocality) => {this.setState({sublocality})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-75,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
        </View>
        <View style={{height:48,borderBottomColor:'#000000',borderBottomWidth:0.5, margin:20,backgroundColor:'#EEEEEE',marginTop:5,marginBottom:10, borderRadiusTopLeft:10,borderRadiusTopRight:10}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Currentaddressicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',opacity:0.3,marginLeft:0,fontSize:8}}>Door/Flat No. & Block NO. Flat/Building name, Street No. Street name</HelperText>
            <TextInput placeholder=' ' autoCapitalize = 'words' value={this.state.address}
            onChangeText={(address) => {this.setState({address})}} 
            placeholderTextColor = "#000000" style={{flex:1,marginTop: 10,marginLeft:-265,height:48,width:'95%', color:'#000000', fontFamily:'Nunito',}}
            />
            </View>
            
        </View>
        <View style={{marginLeft:20,marginTop:15, marginRight:20, borderColor:'#2A9154'}}>
            <Text >Profession</Text> 
                {this.state.profession == false ?

                <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
                <TouchableOpacity 
                onPress={() =>{this.setState({profession:true})}}
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    <Text style={{marginLeft:10, }}>Salaried</Text>
                    <Image style={{marginLeft:190, height:30, width:30}}source={require("../../assets/downarrow.png")}/>
                </TouchableOpacity>
                </View> :
            <View style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
            <TouchableOpacity onPress={() =>{this.setState({dropdownvisible:true})}}
            style={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:0.5, borderColor:'#2A9154', height:56, width:'100%', marginLeft:0, borderRadius:5}}>
                    <Image style={{ height:20, width:20,marginTop:15, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    <Text style={{marginLeft:10,marginTop:15}}>Salaried</Text>
                    <Image style={{marginLeft:190, height:30, width:30, marginTop:15}}source={require("../../assets/downarrow.png")}/>
            </TouchableOpacity>
            </View>}
            {this.state.dropdownvisible == true ?
            this.state.salarieddata.map((salarieddata, key) => {
        return (
            <View key={key} style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
            {this.state.salariedselected == key ?
            <View >
                <TouchableOpacity style={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:0.5, borderColor:'#2A9154', height:56, width:'100%', marginLeft:0, borderRadius:5}}>
                    <Image style={{ height:20, width:20,marginTop:15, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    <Text style={{marginLeft:10,marginTop:15}}>{salarieddata}</Text>
                    
                </TouchableOpacity>
                </View>
                :
                <View>
                <TouchableOpacity onPress={()=>{this.setState({salariedselected: key,ButtonStateHolder : false, visible:true})}} 
                //onPress={() => alert('This product coming soon...')}
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    <Text style={{marginLeft:10, }}>{salarieddata}</Text>
                    {/*<Image style={{marginLeft:190, height:30, width:30}}source={require("../../assets/downarrow.png")}/>*/}
                </TouchableOpacity>
                </View>
            }
            </View>
        )
        }) :null}

        {this.state.data.map((data, key) => {
        return (
            <View key={key} style={{marginLeft:0,marginTop:15, marginRight:0,height:56, backgroundColor:'#EEEEEE',width:'100%', borderRadius:5}}>
            {this.state.checked == key ?
            <View >
                <TouchableOpacity style={{flexDirection:'row', marginLeft:10,marginTop:0,borderWidth:0.5, borderColor:'#2A9154', height:56, width:'100%', marginLeft:0, borderRadius:5}}>
                    <Image style={{ height:20, width:20,marginTop:15, marginLeft:10}}source={require("../../assets/selected.png")}/>
                    <Text style={{marginLeft:10,marginTop:15}}>{data}</Text>
                    
                </TouchableOpacity>
                </View>
                :
                <View>
                <TouchableOpacity onPress={()=>{this.setState({checked: key})}} 
                onPress={() => alert('This product coming soon...')}
                style={{flexDirection:'row', marginLeft:10,marginTop:15,}}>
                    <Image style={{height:20,width:20, }} source={require("../../assets/notselected.png")} />
                    <Text style={{marginLeft:10, }}>{data}</Text>
                    {/*<Image style={{marginLeft:190, height:30, width:30}}source={require("../../assets/downarrow.png")}/>*/}
                </TouchableOpacity>
                </View>
            }
            </View>
        )
        })}


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
        {this.state.visible == true ?
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

        <TouchableOpacity style={{marginRight:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor: this.state.ButtonStateHolder || !this.state.validPan ? 'rgba(42,145,52,0.3)':'#2A9134',marginBottom:20,}}
            disabled={this.state.ButtonStateHolder || !this.state.validPan}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
            //onPress={() => this.props.navigation.navigate('bankdetails')}
            onPress={() => {this.insertdata_into_db();}}
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

