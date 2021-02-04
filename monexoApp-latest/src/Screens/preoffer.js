import { NativeAppEventEmitter } from "react-native";
import React, {useState} from 'react';
import {View, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {TextInput, HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import LottieView from 'lottie-react-native';
import {Slider} from 'react-native';
//import Slider from "react-native-smooth-slider";
import SliderText from 'react-native-slider-text';

export default class Preoffer extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            showCircleImg:true,
            amount:1000,
            termsAccepted: true,
            checked: this.props.checked
        }
        //this.onSubmit = this.onSubmit.bind(this);
    }

    /*componentDidMount() { 
        this.anim.play();
        setTimeout(() => {

        },9000);
    }*/

    handleOnPress = () => this.setState({checked: !this.state.checked})
    renderImage =() => {
        var imgSource = this.state.showCircleImg?circle:check_circle; 
        return(
            <Image style={{height:20, width:20}}
                source={imgSource}
            />
        );
    }

    handleCheckBox = () => {this.setState({ termsAccepted: !this.state.termsAccepted })}
    
    render(){
        
        return (
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
                <TouchableOpacity> 
                   {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />*/}
                   <Text style={{fontSize: 16,paddingRight:20}}> X </Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Preliminary offer
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
            <Image style={{height:20, width:20}}
                source={require('../../assets/check_circle.png')}
            />
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:130,marginTop:10}}>
            
            </View>
            <View>
            {this.renderImage()}
            </View>
            </View>
            </View>
            
            <View style={{marginTop:0, alignItems:'center'}}>
            <Text style={{fontSize:20}}>
                Congratulations
            </Text>
            </View>
            {/*<View style={{marginBottom:0, marginTop:-30}}>
                <LottieView 
                source={require('../../json/confetti-cannons.json')}
                style={{ justifyContent: "center", alignSelf: "center", height: "60%", width: "60%" }}
                autoPlay={false}
                loop={false}
                speed={1}
                ref={animation => { this.anim = animation; }} 
                />
            </View>*/}
            <View style={{marginTop:20, alignItems:'center', borderBottomWidth:0.5, borderBottomColor:'#D1D1D1', margin:30,paddingBottom:20}}> 
                <Text style={{paddingBottom:5, fontFamily:'Nunito',fontWeight:'bold'}}>
                You are pre-qualified 
                </Text>
                <Text>
                for Credit line upto Rs50,000
                </Text>
            </View>
            <View style={{alignItems:'center', marginTop:-8}}>
                <Text>
                    You will pay for what you use nothing extra.
                </Text>
            </View>
            <Slider
            style={{width: '100%', height: 40,paddingLeft:20}}
            minimumValue={1000}
            maximumValue={50000}
            step={1000}
            minimumTrackTintColor="#006202"
            maximumTrackTintColor="#61C261"
            thumbTintColor='#61C261'
            
            />
            <View style={{flexDirection:'row'}}>
            <Text style={{paddingLeft:10, marginTop:-10}}>
               1000
            </Text>
            <Text style={{paddingRight:10, marginTop:-10,marginLeft:Dimensions.get('window').width/2+80}}>
               50000
            </Text>
            </View>
            <View style={{alignItems:'center'}}>  
                <Text style={{paddingBottom:5}}>
                    You have selected a credit line at 
                </Text>
                <Text>
                    an interest rate of Rs5 for a thousand per day.(APR 2.5%)
                </Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <CheckBox
                //selected={this.state.termsAccepted} 
                //onPress={this.handleCheckBox}
                //onPress={() => this.setState({termsAccepted:!this.state.termsAccepted})}
                checked={this.state.checked} 
                onPress={this.handleOnPress}
            />
            <Text style={{marginTop: 5}}> I agree with the Terms and Conditions</Text>
            </View>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{marginRight:20,width:'30%',borderWidth:1,height:35,borderRadius:5,backgroundColor:'#2A9134',opacity:0.5,marginBottom:20}}
            disabled={this.state.checked}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
            //onPress={() => this.props.navigation.navigate('preoffer')}
        >
            <Text style={{textAlign:'center',paddingTop:7}}>
                Get now
            </Text>
        </TouchableOpacity>
            </View>
            </View>
        );
    }
}
