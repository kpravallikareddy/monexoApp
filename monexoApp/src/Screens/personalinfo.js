import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {TextInput, HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';

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
            showCircleImg:true
        };
        this.onSubmit = this.onSubmit.bind(this);
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
    }

    render(){
    return (
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20}}>
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
        <View style={{height:40, backgroundColor:'#D1D1D1'}}>
        <View style={{flexDirection:'row',paddingLeft:20,paddingTop:10}}>
        <View >
            {this.renderImage()}
        </View>
        <View >
            {this.renderImage()}
        </View>
        <View >
            {this.renderImage()}
        </View>
        <View >
            {this.renderImage()}
        </View>
        <View >
            {this.renderImage()}
        </View>
        <View >
            {this.renderImage()}
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
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black'}}
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
            onChangeText={(text) => this.onChanged(text)}
            placeholderTextColor = "black" style={{marginLeft:-70, width:'90%', color:'black'}}
            />
            </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5, width:'40%'}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Cityicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#111111'}}>City</HelperText>
            <TextInput placeholder=' ' value={this.state.dob}
            onChangeText={(dob) => {this.setState({dob})}} 
            placeholderTextColor = "black" style={{marginLeft:-92, width:'90%', color:'black'}}
            />
            </View>
        </View>
        </View>
        <View style={{height:40,borderBottomColor:'#000000',borderBottomWidth:1, margin:20,backgroundColor:'gray',opacity:0.1,marginTop:10,marginBottom:10, borderRadiusTopLeft:5,borderRadiusTopRight:5}}>
            <View style={{flexDirection:'row',paddingLeft:5}}>
                <Image source={require('../../assets/Stateicon.png')} style={{height:20,width:20,marginTop:15}} />
            <HelperText style={{color:'#000000'}}>State</HelperText>
            <TextInput placeholder=' ' value={this.state.fullname}
            onChangeText={(fullname) => {this.setState({fullname})}} 
            placeholderTextColor = "black" style={{marginLeft:-75, width:'90%', color:'black'}}
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
        <TouchableOpacity style={{marginRight:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor:'#2A9134',opacity:0.5}}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
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

