import React from 'react';
import {View, Text, Image, TouchableOpacity, TouchableHighlight, ScrollView, Dimensions, Alert} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {TextInput, HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
//import {oauth, network, smartstore, mobilesync} from 'react-native-force';

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
            dob:'',
            fathername:'',
            pincode:'',
            locality:'',
            sublocality:'',
            selectedButton:'',
            address:'',
            showCircleImg:true,
            state: ' ',
            city:' ',
            ButtonStateHolder:true,
            pannumber:null,
            email:'',
            validPan: false,
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

    /*onChangePan = (text) => {  
        let pannumber = this.state.pannumber;
       // event.preventDefault();
        if(pancardValidation(text)) {
            pannumber = pancardValidation.test(text) ? '': 'Pan is not valid';
        }
        this.setState({pannumber:text});
    } */
    
    /*onChangePan(text) {
        console.log(text);
       let newtext: '';
       var regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/
     
      if(text != '') {  
            // if(!/^[0-9]+$/.test(text)){
            if(regex.test(text)){
                // newtext = text;
                alert('valid');
                this.setState({isDisabled:true})
             } 
             //else {
                 //console.log('success');
               //  alert('not valid');
             //}
            //alert('valid pan number');  
        }
        this.setState({ pannumber: newtext });
    }*/

    onChangePan(pannumber){
        const regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/
        this.setState({pannumber});

        if(regex.test(pannumber)) {
            console.log('Pan number is valid');
            this.setState({validPan: true});
        }
        else if (!regex.test(pannumber)) {
            console.log('Pan is not valid');
            this.setState({validPan: false});
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
                    this.setState({state:records[Object.keys(records)[0]].statename, city:records[Object.keys(records)[0]].regionname})
                
               }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render(){
        const {city,state} = this.state;
        const {validPan,pannumber} = this.state;
    return (
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <TouchableOpacity> 
               {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />*/}
               <Text style={{fontSize: 16,paddingRight:20}}> X </Text>
            </TouchableOpacity>
            <Text style={styles.title}>
                Personal information 
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:100}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:20}} />
            </TouchableOpacity>
        </View>
        <View style={{height:40, backgroundColor:'#D1D1D1', paddingTop:1,marginBottom:20}}>
        <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10}}>
        <View>
        <Image style={{height:20, width:20}}
                source={require('../../assets/check_circle.png')}
            />
        </View>
        <View style={{height:1,borderWidth:0.5,borderColor:'green',width:130,marginTop:10}}>
        
        </View>
        <View>
            {this.renderImage()}
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
        
        <ScrollView>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>Fullname</HelperText>
            <TextInput placeholder=' ' value={this.state.fullname}
            onChangeText={(fullname) => {this.setState({fullname})}} 
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black', fontFamily:'Nunito', fontWeight:'400'}}
            />
            </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5, width:'40%'}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Birthday.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#111111'}}>Date of Birth</HelperText>
            <TextInput placeholder=' ' value={this.state.dob}
            onChangeText={(dob) => {this.setState({dob})}} 
            placeholderTextColor = "black" style={{marginLeft:-92, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>Father's / Spouse name</HelperText>
            <TextInput placeholder=' ' value={this.state.fathername}
            onChangeText={(fathername) => {this.setState({fathername})}} 
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <Text style={{marginLeft:20, fontSize:12, paddingTop:10,paddingBottom:5,color:'#444444'}}>
            Gender
        </Text>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={() => this.setState({ selectedButton:'male'})} style={{marginRight:20,borderWidth:1,marginLeft:20,height:30,borderRadius:5,backgroundColor:this.state.selectedButton === 'male' ? '#2A9134':'#D1D1D1',opacity:0.5,width:'25%'}}>
            <View style={{flexDirection:'row',padding:5,justifyContent:'center'}}>
            <Image source={require('../../assets/maleiconselected.png')} resizeMode='contain' style={{height:15,width:15,flex:.3}} />
            <Text style={{flex:.7}}>
                Male
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ selectedButton:'female'})} style={{marginRight:20,borderWidth:1,marginLeft:20,height:30,borderRadius:5,backgroundColor:this.state.selectedButton === 'female' ? '#2A9134':'#D1D1D1',opacity:0.5,width:'30%'}}>
            <View style={{flexDirection:'row', padding:5,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../assets/womaniconselected.png')} style={{height:15,width:15}} />
            <Text>
                Female
            </Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:20,marginBottom:0, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>Personal Email-ID</HelperText>
            <TextInput placeholder=' ' value={this.state.email}
            onChangeText={(email) => {this.setState({email})}} 
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <Text style={{marginLeft:20, fontSize:12, paddingTop:20,paddingBottom:0,color:'#444444'}}>
            Current Address
        </Text>
        <View style={{flexDirection:'row'}}> 
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5, width:'30%'}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Pincode.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#111111', paddingLeft:10}}>Pin code</HelperText>
            <TextInput placeholder=' ' value={this.state.pincode}
            keyboardType='numeric' maxLength={6}
            onChangeText={(text) => {this.onChanged(text); this.fetchData(text);}}
            placeholderTextColor = "black" style={{marginLeft:-70, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, marginLeft:10, marginRight:10,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5, width:'50%'}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Cityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#111111'}}>City</HelperText>
            <TextInput placeholder=' ' importantForAutoFill='yes' value={city}
            placeholderTextColor = "black" style={{marginLeft:-45, width:'90%', color:'black',fontFamily:'Nunito'}}
            />
            
            </View>
        </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Stateicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>State</HelperText>
            <TextInput placeholder=' ' importantForAutoFill='yes' value={state}
            placeholderTextColor = "black" style={{marginLeft:-55, width:'90%', color:'black'}}
            />
            
            </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Localityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>Locality</HelperText>
            <TextInput placeholder=' ' value={this.state.locality}
            onChangeText={(locality) => {this.setState({locality})}} 
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Sublocalityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>Sublocality</HelperText>
            <TextInput placeholder=' ' value={this.state.sublocality}
            onChangeText={(sublocality) => {this.setState({sublocality})}} 
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Currentaddressicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000',fontSize:8}}>Door/Flat No. & Block NO. Flat/Building name, Street No. Street name</HelperText>
            <TextInput placeholder=' ' value={this.state.address}
            onChangeText={(address) => {this.setState({address})}} 
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <View style={{marginLeft:20,marginTop:15}}>
            <Text >Profession</Text>
            <View style={{flexDirection:'row', marginTop:10}}>
                <View style={{paddingRight:10, width:'50%'}}>
        <TouchableOpacity style={{borderWidth:1,height:35,borderRadius:5,backgroundColor:this.state.selectedButton === 'salaried-pvt ltd' ? '#2A9134':'#D1D1D1',opacity:0.5,marginBottom:20}}
            //onPress={() => this.setState({ selectedButton:'salaried-pvt ltd'})}
            // onPress={() => this.setState({ButtonStateHolder : false})}
            onPress={() => this.setState({selectedButton:'salaried-pvt ltd', ButtonStateHolder : false})}
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
            onPress={() => this.setState({selectedButton:'salaried-public ltd', ButtonStateHolder : false})}
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
            onPress={() => this.setState({selectedButton:'salaried-central govt', ButtonStateHolder : false})}
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
            onPress={() => this.setState({selectedButton:'salaried-state govt', ButtonStateHolder : false})}
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
            onPress={() => this.setState({selectedButton:'salaried-llp', ButtonStateHolder : false})}
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
        </View>
        </View>

        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:0,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Profile.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>Pan number</HelperText>
            <TextInput placeholder=' ' value={pannumber}
            //onChangeText={text => this.onChangePan(text)}
            //onChange={this.handleChange}
            onChangeText={this.onChangePan.bind(this)}
            placeholderTextColor = "black" maxLength={10} style={{marginLeft:-85, width:'90%', color:'black', fontFamily:'Nunito', fontWeight:'400'}}
            />
            </View>
        </View>

        <TouchableOpacity style={{marginRight:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor: this.state.ButtonStateHolder ? '#2A9134':'#2A9134', opacity:0.5,marginBottom:20}}
            disabled={this.state.ButtonStateHolder || !this.state.validPan}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
            onPress={() => this.props.navigation.navigate('preoffer')}
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

