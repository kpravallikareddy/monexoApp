import React, {Component} from 'react';
import {View,StyleSheet, Text,TouchableOpacity, Image, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'




export default class Transactions extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            backgroundcolor:'#ffffff',
            bordercolor:'#DDDDDD'

          }
         
      }

      changebackgroundColor = () => {
          this.setState({backgroundcolor:'rgba(54, 191, 12, 0.1)',bordercolor:'#36BF0C'})
      }
    


      render(){
       
          return(
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <Image source={require('../../assets/backarrow1.png')} style={{height:10,width:25, paddingTop:30,marginLeft:10}} />
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:15}}>
                Transactions
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/2-30}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:10}} />
            </TouchableOpacity>
        </View>
        <ScrollView>
         <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
             <Text style={{fontSize:14, fontWeight:'bold'}}>₹16,000 Personal loan transaction details for the last</Text>
         </View>

         <View style={{flexDirection:'row', justifyContent:'space-between', margin:20,}}>
             <TouchableOpacity 
             style={{width:80,height:36,borderWidth:1,borderColor:this.state.bordercolor,borderRadius:20,backgroundColor:this.state.backgroundcolor, alignItems:'center',justifyContent:'center'}}
             onPress = {() => this.changebackgroundColor()}
             >
                 <Text style={{fontSize:14,fontWeight:'bold'}}>10 days</Text>

             </TouchableOpacity>

             <TouchableOpacity 
             style={{width:80,height:36,borderWidth:1,borderColor:this.state.bordercolor,borderRadius:20,backgroundColor:this.state.backgroundcolor, alignItems:'center',justifyContent:'center'}}
             onPress = {() => this.changebackgroundColor()}
             >
                 <Text style={{fontSize:14,fontWeight:'bold'}}>30 days</Text>

             </TouchableOpacity>

             <TouchableOpacity 
             style={{width:80,height:36,borderWidth:1,borderColor:this.state.bordercolor,borderRadius:20,backgroundColor:this.state.backgroundcolor, alignItems:'center',justifyContent:'center'}}
             onPress = {() => this.changebackgroundColor()}
             >
                 <Text style={{fontSize:14,fontWeight:'bold'}}>60 days</Text>

             </TouchableOpacity>

             <TouchableOpacity 
             style={{width:80,height:36,borderWidth:1,borderColor:this.state.bordercolor,borderRadius:20,backgroundColor:this.state.backgroundcolor, alignItems:'center',justifyContent:'center'}}
             onPress = {() => this.changebackgroundColor()}
             >
                 <Text style={{fontSize:14,fontWeight:'bold'}}>90 days</Text>

             </TouchableOpacity>

         </View>
           
           <View style={{justifyContent:'center',alignItems:'center',borderBottomColor:'#DDDDDD', borderBottomWidth:1,paddingBottom:20}}>
               <TouchableOpacity style={{borderWidth:1,borderRadius:20,width:Dimensions.get('window').width-60,height:36,borderColor:'#DDDDDD',justifyContent:'center',alignItems:'center'}}>
                   <Text>Select custom date</Text>
               </TouchableOpacity>
           </View>

           <View style={{marginLeft:20,marginTop:20}}>
            <Text style={{fontSize:12,color:'#888888'}}>TODAY</Text>
           </View>
        </ScrollView>
        </View>
          );
      }
}