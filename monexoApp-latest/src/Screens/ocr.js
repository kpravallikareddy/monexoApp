import { NativeAppEventEmitter } from "react-native";
import React from 'react';
import {View, Text,TouchableOpacity, Image, Dimensions} from 'react-native';
import styles from '../Styles/personalinfostyles';
import {TextInput, HelperText} from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';

export default class Ocr extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            showCircleImg:true
        }
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

    render(){
        return (
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
                <TouchableOpacity> 
                   {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />*/}
                   <Text style={{fontSize: 16,paddingRight:20}}> X </Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Adhaar verification
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
            <View>
            {this.renderImage()}
            </View>
            </View>
            <View style={{height:1,borderWidth:0.5,borderColor:'green',width:130,marginTop:10}}>
            
            </View>
            <View>
            <Image style={{height:20, width:20}}
                source={require('../../assets/circle.png')}
            />
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
            <TouchableOpacity style={{marginRight:20,borderWidth:1,marginLeft:Dimensions.get('window').width/2+40,height:35,borderRadius:5,backgroundColor:'#2A9134',opacity:0.5,marginBottom:20}}
            onPress={()=> this.setState({showCircleImg:!this.state.showCircleImg})}
            onPress={() => this.props.navigation.navigate('personalinfo')}
        >
            <Text style={{textAlign:'center',paddingTop:7}}>
                Submit
            </Text>
        </TouchableOpacity>
            </View>
        );
    }
}