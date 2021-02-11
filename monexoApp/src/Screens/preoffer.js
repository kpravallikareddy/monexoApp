import { NativeAppEventEmitter } from "react-native";
import React, {useState} from 'react';
import {View, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {TextInput, HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import LottieView from 'lottie-react-native';
//import {Slider} from 'react-native';
import SliderText from 'react-native-slider-text';
//import Slider from "react-native-slider";
import Slider from '@react-native-community/slider';


const maximumValue=50000;
const { height, width } = Dimensions.get('window')
export default class Preoffer extends React.Component {
    
    constructor(props){
        super(props);
        this.state ={
            showCircleImg:true,
            termsAccepted: false,
            checked: false,
            sliderValue:maximumValue/2,
            value:0.2,
            
        }
        //this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() { 
        this.anim.play();
        setTimeout(() => {

        },9000);
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

    handleCheckBox = () => {this.setState({ termsAccepted: !this.state.termsAccepted })}

        render(){
            const thumbImage = require('../../assets/Slider.png');
            const {checked} = this.state;
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
            <View style={{flex:1}}>
                <LottieView 
                source={require('../../json/confetti-cannons.json')}
                //style={{ justifyContent: "center", alignSelf: "center", height: "60%", width: "60%" }}
                style={{
                    //width: width + 10,
                    height: height,
                    //marginLeft: - 5,
                    //width:300,
                    aspectRatio: 300/600,
                    flexGrow:1,
                  }}
                  resizeMode='cover'
                autoPlay={true}
                loop={false}
                speed={1}
                ref={animation => { this.anim = animation; }} 
                />
            </View>
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
                <Text style={{fontFamily:'Nunito',fontWeight:'bold'}}>
                for Credit line upto {'\u20B9'}50,000
                </Text>
            </View>
            <View style={{alignItems:'center', marginTop:-8}}>
                <Text>
                    You will pay for what you use nothing extra.
                </Text>
            </View>
            {/*<Slider
            style={{width: 360, height: 40,paddingLeft:20}}
            minimumValue={1000}
            maximumValue={50000}
            step={1000}
            minimumTrackTintColor="#006202"
            maximumTrackTintColor="#61C261"
            thumbTintColor='#61C261'
            //style={{thumb:{width:10, height:30,borderRadius:5, backgroundColor:'#61C261'},track:{height:10, borderRadius:5, backgroundColor:'#006202', opacity:0.1}}}
            
            />
            <View style={{flexDirection:'row'}}>
            <Text style={{paddingLeft:10, marginTop:-10}}>
               1000
            </Text>

            <Text style={{paddingRight:10, marginTop:-10,marginLeft:Dimensions.get('window').width/2+80}}>
               50000
            </Text>
            </View>*/}


            {/*<Slider
            trackStyle={{height:10, borderRadius:5, marginLeft:10,marginRight:20,width:'90%'}}
            thumbStyle={{width:10,height:30,borderRadius:5,backgroundColor:'#61C261'}}
            minimumTrackTintColor='#006202'
            maximumTrackTintColor="#F5FCEF"
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
            />*/}

           {/*} <Slider
            style={{width: 350, height: 40, marginLeft:10}}
            minimumValue={1000}
            maximumValue={50000}
            step={1000}
            minimumValueLabel="1000" 
            maximumValueLabel="50000" 
            minimumTrackTintColor="#006202"
            maximumTrackTintColor=  "#61C261"//"#F5FCEF"
            onValueChange={(sliderValue) => this.setState({sliderValue})}
            sliderValue={this.state.sliderValue} 
            thumbTintColor='#61C261'
            thumbImage={require('../../assets/Slider.png')}
            
        />*/}

            <SliderText 
            maximumValue={50000} 
            stepValue={1000} 
            minimumValueLabel="1000" 
            maximumValueLabel="50000" 
            onValueChange={(sliderValue) => this.setState({sliderValue})}
            sliderValue={this.state.sliderValue} 
            minimumTrackTintColor="#006202"
            maximumTrackTintColor="#61C261"
            thumbTintColor='#61C261'
            customLabelStyle={{marginTop:-20, fontSize:12}}
            customCountStyle={{marginBottom:-20, fontSize:9, marginLeft:10, marginRight:20}}
            />

            <View style={{alignItems:'center'}}>  
                <Text style={{paddingBottom:5}}>
                    You have selected a credit line at 
                </Text>
                <Text>
                    an interest rate of {'\u20B9'}5 for a thousand per day.(APR 2.5%)
                </Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
            <CheckBox
                onChange={() => this.setState({checked:!checked})}
            />
            <Text style={{marginTop: 5}}> I agree with the </Text>
            <Text style={{marginTop:5, fontWeight:'bold', color:'#61C261',textDecorationLine: 'underline'}}>Legal agreements</Text>
            </View>
            <View style={{alignItems:'center', marginTop:20}}>
            <TouchableOpacity style={{marginRight:20,width:'30%',borderWidth:1,height:35,borderRadius:5,backgroundColor:'#2A9134',opacity:0.5,marginBottom:20}}
            disabled={!checked}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
            onPress={() => this.props.navigation.navigate('dc')}
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
