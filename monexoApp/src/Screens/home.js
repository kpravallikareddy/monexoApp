import React, {Component} from 'react';
import {View,StyleSheet, Text,TouchableOpacity, Image, Dimensions, CheckBox} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import home from '../../assets/home.png';
import homeactive from '../../assets/homeactive.png';
import creditscore from '../../assets/creditscore.png';
import creditscoreinactive from '../../assets/creditscoreinactive.png';
import menu from '../../assets/menu.png';
import menuinactive from '../../assets/menuinactive.png';
import pfm from '../../assets/pfm.png';
import pfmactive from '../../assets/pfmactive.png';


export default class Home extends React.Component {
  
  constructor(props){
    super(props)
    this.state= {
      showhome:true,
      showbudgeting:true,
      showcreditscore:true,
      showmenu:true
    }
  }


  renderHome =() => {
    var imgSource = this.state.showhome?home:homeactive; 
    return(
        <Image style={{height:30, width:30}}
            source={imgSource}
        />
    );
}

renderPfm =() => {
  var imgSource = this.state.showbudgeting?pfm:pfmactive; 
  return(
      <Image style={{height:30, width:30}}
          source={imgSource}
      />
  );
}

renderCreditscore =() => {
  var imgSource = this.state.showcreditscore?creditscoreinactive:creditscore; 
  return(
      <Image style={{height:30, width:30}}
          source={imgSource}
      />
  );
}

renderMenu =() => {
  var imgSource = this.state.showmenu?menuinactive:menu; 
  return(
      <Image style={{height:30, width:30}}
          source={imgSource}
      />
  );
}

    render(){
        return (
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <Image source={require('../../assets/logo.png')} style={{height:25,width:35, paddingTop:30,marginLeft:10}} />
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:15}}>
                Home
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/2-20}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{height:24,width:24}}>
                <Image source={require('../../assets/logo.png')} style={{height:15,width:15, paddingTop:30,marginLeft:10}} />
                </View>
            </TouchableOpacity>

        </View>
       <ScrollView>
        <View style={{marginTop:40, marginLeft:20, flexDirection:'row'}}>
       
        <View elevation={5} style={{borderRadius:8,height:200,width:300, backgroundColor:'#ffffff',marginRight:20,}}>
          <View style= {{marginLeft:20, marginTop:20}}>
        <Text style={{fontFamily:'Nunito',fontSize:14,fontWeight:'bold',color:'#111111'}}>Credit line</Text>
          <View style={{flexDirection:'row'}}>
          <View>
            <Text style={{lineHeight:40}}>Your Credit line amount</Text>
          <View style={{flexDirection:'row'}}>
            <Text>of {' '} </Text>
          <View style={{width:80,height:22, borderRadius:15,backgroundColor:'#2A9134'}}>
            <Text style={{alignSelf:'center'}}>{'\u20B9'}50,000</Text>
          </View>
          </View>
            <Text style={{lineHeight:40}}>is ready.</Text>
            <View>
            <View>
              <Text>Activate email ID</Text>
            </View>
            <View>
              <Text>Activate Official email ID</Text>
            </View>
          </View>
          </View>
          <View>
          <Image style={{height:120, width:120}}
                source={require('../../assets/perspaleta1.png')}
            />
          </View>
          </View>
          </View>
        </View>
        <View elevation={2} style={{height:200,width:300, marginRight:20, borderRadius:1}}>
          <Text>card 2</Text>
          </View>
          <View elevation={2} style={{height:200,width:300, marginRight:20, borderRadius:1}}>
          <Text >card 3</Text>
        </View>
    
        </View>
        
      
        <Text style={{margin:20}}>
            PAY YOU BILLS
        </Text>
        <View style={{flexDirection:'row'}}>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:20,marginRight:15, alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity >
        <Image style={{height:50, width:50,}}
                source={require('../../assets/dth.png')}
            />
            <Text>DTH Bill</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity >
        <Image style={{height:50, width:50,}}
                source={require('../../assets/lpg.png')}
            />
            <Text>Gas Bill</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/lpg.png')}
            />
            <Text>Landline Bill</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/broadband.png')}
            />
            <Text>Broadband Bill</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/electricity.png')}
            />
            <Text>Electricity Bill</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{width:80, height:36,marginTop:10,marginBottom:20,backgroundColor:'rgba(42,145,52,0.1)',marginLeft:Dimensions.get('window').width-90,justifyContent:'center',alignItems:'center' }}>
          <TouchableOpacity>
            <Text style={{color:'#2A9134'}}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',marginBottom:20}}>
        <View elevation={5} style={{borderRadius:8,height:150,width:150,backgroundColor:'#ffffff', marginLeft:20,marginRight:15, alignItems:'center',justifyContent:'center'}}>
         <Text>REFER & EARN </Text>
          <TouchableOpacity >
        <Image style={{height:80, width:80,}}
                source={require('../../assets/refer.png')}
            />
            <Text>Earn up to {'\u20B9'}2000</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:150,width:150,backgroundColor:'#ffffff', marginLeft:0,marginRight:15, alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity >
        <Image style={{height:50, width:50,}}
                source={require('../../assets/lpg.png')}
            />
            <Text>Gas Bill</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:150,width:150, backgroundColor:'#ffffff',marginLeft:0,marginRight:15, alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity >
        <Image style={{height:50, width:50,}}
                source={require('../../assets/lpg.png')}
            />
            <Text>Landline Bill</Text>
          </TouchableOpacity>
        </View>
        
        </View>
        </ScrollView>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={()=> this.setState({showhome:!this.state.showhome})}>
              {this.renderHome()}
            <Text>HOME</Text>
            </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity style={{alignItems:'center'}} 
              onPress={()=> this.setState({showbudgeting:!this.state.showbudgeting})}
              >
              {this.renderPfm()}
            <Text>BUDGETING</Text>
            </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{alignItems:'center'}} 
              onPress={()=> this.setState({showcreditscore:!this.state.showcreditscore})}
              >
              {this.renderCreditscore()}
            <Text>CREDIT SCORE</Text>
            </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{alignItems:'center'}} 
              onPress={()=> this.setState({showmenu:!this.state.showmenu})}
              >
              {this.renderMenu()}
            <Text>MENU</Text>
            </TouchableOpacity>
            </View>
          </View>

        </View>
        );
    }
}

