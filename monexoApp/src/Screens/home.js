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
import bluecircle from '../../assets/bluecircle.png';
import checkbluecircle from '../../assets/checkbluecircle.png';
//import ViewPager from '@react-native-community/viewpager';
//import Carousel from 'react-native-carousel-view';
//import Carousel from 'react-native-snap-carousel';



const CARD_WIDTH = 300;
export default class Home extends React.Component {
  
  constructor(props){
    super(props)
    this.state= {
      showhome:true,
      showbudgeting:true,
      showcreditscore:true,
      showmenu:true,
      showbluecircle:true,
      personalinfocompletedflag:false,
      employerdetailsflag:false,
      bankdetailsflag:false,
      bankdetailsverified:false,
      plcompletedflag:false,
      dccompletedflag:false,
      vkyccompletedflag:false,
      ocrcompletedflag:false,
      enachcompletedflag:false,
      appid:'1234567',
      customerid:'',
    }
  }

  fetchPersonalinfocompletedflag = () => {
    console.log('test');
   // console.log(text);
    fetch('http://10.0.2.2:8000/screencompletionflags/'+this.state.appid)
        .then((response) => response.json())
        .then((responseJson) => {
         console.log(responseJson);
        this.setState({personalinfocompletedflag:true})
        })
        .catch((error) => {
            console.error(error);
        });
    };

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

renderBluecircle =() => {
  var imgSource = this.state.showbluecircle?bluecircle:checkbluecircle; 
  return(
      <Image style={{height:15, width:15}}
          source={imgSource}
      />
  );
}

getprimaryIdSalesforce = () =>{
  console.log('salesforce');
  fetch('http://uat-newapioth.monexo.co/api/saleForceCreateNewAccount',
  {
    method:'POST',
    headers:{
     // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:
      JSON.stringify(
        {"mobile":this.state.mobileno}
      )
  })
  .then((response) =>response.text())
  .then((responseJson) =>{
  console.log(responseJson)
  //console.log(responseJson.customer_account_info.recods[0].peer__Date_of_Birth__c)
 // console.log(responseJson.customer_account_info.recods[0].peer__First_Name__c + responseJson.recods[0].peer__Last_Name__c)
 // console.log(responseJson.customer_account_info.recods[0].Customer_ID__c)
 // console.log(responseJson.customer_account_info.recods[0].PAN__c)
  }).catch((error) =>
  {
    console.error(error);
  });
}


getdataSalesforce = () => {
  console.log('salesforce');
  fetch('http://uat-newapioth.monexo.co/api/getRecordSingleDetail',{
      "ID":"0011e000008lTxIAAU"
  })
  .then((response) =>response.text())
  .then((responseJson) =>{
  console.log(responseJson)
  //console.log(responseJson.customer_account_info.recods[0].peer__Date_of_Birth__c)
 // console.log(responseJson.customer_account_info.recods[0].peer__First_Name__c + responseJson.recods[0].peer__Last_Name__c)
 // console.log(responseJson.customer_account_info.recods[0].Customer_ID__c)
 // console.log(responseJson.customer_account_info.recods[0].PAN__c)
  }).catch((error) =>
  {
    console.error(error);
  });
}




    render(){
        return (
        <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <Image source={require('../../assets/logo.png')} style={{height:25,width:35, paddingTop:30,marginLeft:10}} />
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:15}}>
                Welcome to Monexo
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
       <ScrollView >
        
        <View style={{marginTop:40, marginLeft:20, flexDirection:'row'}}>
       {/*<Carousel 
       width={CARD_WIDTH}
       height={300}
       delay={9000}
       indicatorAtBottom={true}
       indicatorSize={20}
       >*/}
       {/*<Carousel
        sliderWidth={250}
        itemWidth={300}
        layout={'default'}
       >*/}
      {/* {this.state.personalinfocompletedflag == false ?
        <View elevation={5} style={{borderRadius:8,height:200,width:CARD_WIDTH, backgroundColor:'#ffffff',marginRight:20,}}>
          <View style={{ marginLeft:CARD_WIDTH-100,width:100, alignItems:'center',justifyContent:'center', height:20, borderRadius:15,backgroundColor:'#FFC700'}}>
          <View style={{flexDirection:'row'}}>
            <Image style={{height:10, width:10}}
              source={require('../../assets/clock.png')}
            />
            <Text style={{fontSize:8,fontWeight:'bold'}}> {' '}Money in 24 hrs</Text>
          </View>
          </View>
          <View style= {{marginLeft:20, marginTop:-10}}>
            <Text style={{fontFamily:'Nunito',fontSize:14,fontWeight:'bold',color:'#2A9134'}}>Get money</Text>
            <View style={{flexDirection:'row'}}> 
              <View>
                <Text style={{fontWeight:'bold', lineHeight:35}}>Personal loan</Text>
                <Text style={{fontWeight:'bold'}}>/ Debt consolidation</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{lineHeight:50}}>Get upto {' '}</Text>
                  <View style={{width:80, height:24,alignItems:'center',justifyContent:'center', borderRadius:15,marginTop:16, backgroundColor:'rgba(26,106,225,0.1)'}}>
                    <Text style={{color:'#1A6AE1',fontWeight:'bold'}}>{'\u20B9'}2,00,000</Text>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize:8, fontWeight:'bold'}}>GET APPROVED INSTANTLY</Text>
                </View>
                <View>
                  <TouchableOpacity style={{width:160, height:36,marginTop:10, backgroundColor:'#000000', borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#ffffff'}}>Apply for a loan {' '}</Text>
                  <Image style={{height:18, width:18}}
                  source={require('../../assets/edit.png')}
                  />
                  </View>
                  </TouchableOpacity>
                </View> 
              </View>
              <View style={{marginTop:30, marginLeft:20}}>
              <Image style={{height:100, width:80}}
                source={require('../../assets/saly1.png')}
                />
              </View>
          </View>
        </View>
      </View>
      :
        <View elevation={5} style={{borderRadius:8,height:200,width:CARD_WIDTH, backgroundColor:'#ffffff',marginRight:20,}}>
          <View style= {{marginLeft:20, marginTop:-10}}>
            <Text style={{fontFamily:'Nunito',fontSize:14,fontWeight:'bold',color:'#DA1717',marginTop:20}}>Remaining information to be provided</Text>
            <View style={{flexDirection:'row'}}> 
              <View>
              <View style={{flexDirection:'row'}}>
                <View style={{marginRight:5,marginTop:10}}>
                  {this.renderBluecircle()}
               </View>
                <Text style={{lineHeight:35, fontWeight:'bold'}}>Activate link sent to your mail-id</Text>
                </View>
                
                <View style={{flexDirection:'row'}}>
                <View style={{marginRight:5, marginTop:2}}>
                  {this.renderBluecircle()}
               </View>
                <Text style={{fontWeight:'bold'}}>Employer details</Text>
                </View>
                <View style={{flexDirection:'row', marginTop:10}}> 
                <View style={{marginRight:5, marginTop:3}}>
                  {this.renderBluecircle()}
               </View>
                <Text style={{fontWeight:'bold'}}>Bank details</Text>
                </View>
                <View>
                  <TouchableOpacity 
                  onPress={()=> this.setState({showbluecircle:false})}
                 // onPress={() => {this.fetchPersonalinfocompletedflag();}}
                  style={{width:140, height:36,marginTop:10, backgroundColor:'#000000', borderRadius:20,alignItems:'center',justifyContent:'center'}}
                  >
                  <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#ffffff'}}>Complete now</Text>
                  </View>
                  </TouchableOpacity>
                </View> 
              </View>
              <View style={{marginTop:0, marginLeft:-85}}>
              <Image style={{height:130, width:130}}
                source={require('../../assets/saly.png')}
                />
              </View>
          </View>
        </View>
        </View>
        }*/}


          <View elevation={5} style={{borderRadius:8,height:200,width:CARD_WIDTH, backgroundColor:'#ffffff',marginRight:20,}}>
          <View style= {{marginLeft:20, marginTop:-10}}>
            <Text style={{fontFamily:'Nunito',fontSize:14,fontWeight:'bold',color:'#DA1717',marginTop:20}}>Remaining information to be provided</Text>
            <View style={{flexDirection:'row'}}> 
              <View>
              <View style={{flexDirection:'row'}}>
                <View style={{marginRight:5,marginTop:10}}>
                  {this.renderBluecircle()}
               </View>
                <Text style={{lineHeight:35, fontWeight:'bold'}}>Activate link sent to your mail-id</Text>
                </View>
                
                <View style={{flexDirection:'row'}}>
                <View style={{marginRight:5, marginTop:2}}>
                  {this.renderBluecircle()}
               </View>
                <Text style={{fontWeight:'bold'}}>Bank details</Text>
                </View>
                <View style={{flexDirection:'row', marginTop:10}}> 
                <View style={{marginRight:5, marginTop:3}}>
                  {this.renderBluecircle()}
               </View>
                <Text style={{fontWeight:'bold'}}>Validate your Bank details</Text>
                </View>
                <View>
                  <TouchableOpacity 
                  onPress={()=> this.setState({showbluecircle:false})}
                 // onPress={() => {this.fetchPersonalinfocompletedflag();}}
                  style={{width:140, height:36,marginTop:10, backgroundColor:'#000000', borderRadius:20,alignItems:'center',justifyContent:'center'}}
                  >
                  <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#ffffff'}}>Complete now</Text>
                  </View>
                  </TouchableOpacity>
                </View> 
              </View>
              <View style={{marginTop:20, marginLeft:-85}}>
              <Image style={{height:130, width:130}}
                source={require('../../assets/saly.png')}
                />
              </View>
          </View>
        </View>
        </View>

        {/*<View elevation={5} style={{borderRadius:8,height:200,width:CARD_WIDTH, backgroundColor:'#ffffff',marginRight:20,}}>
          <View style= {{marginLeft:20, marginTop:10}}>
            <Text style={{fontFamily:'Nunito',fontSize:14,fontWeight:'bold',color:'#2A9134'}}>Manage your finance</Text>
            <View style={{flexDirection:'row'}}> 
              <View style={{marginTop:20}}>
                <Text style={{fontWeight:'bold', lineHeight:35}}>Hunt your expenses and </Text>
                <Text style={{fontWeight:'bold'}}>secure a strong financial</Text>
                <Text style={{fontWeight:'bold',lineHeight:35}}>status</Text>
                <View>
                  <TouchableOpacity style={{width:170, height:36,marginTop:10, backgroundColor:'#000000', borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#ffffff',fontSize:12}}>Track your spendings{' '}</Text>
                  <Image style={{height:18, width:18}}
                  source={require('../../assets/pfm_white.png')}
                  />
                  </View>
                  </TouchableOpacity>
                </View> 
              </View>
              <View style={{marginTop:10, marginLeft:0}}>
              <Image style={{height:130, width:130}}
                source={require('../../assets/perspaleta1.png')}
                />
              </View>
          </View>
        </View>
      </View>


         <View elevation={5} style={{borderRadius:8,height:200,width:CARD_WIDTH, backgroundColor:'#ffffff',marginRight:20,}}>
          <View style= {{marginLeft:20, marginTop:10}}>
            <Text style={{fontFamily:'Nunito',fontSize:14,fontWeight:'bold',color:'#2A9134'}}>Credit score</Text>
            <View style={{flexDirection:'row'}}> 
              <View style={{marginTop:20}}>
                <Text style={{fontWeight:'bold', lineHeight:35}}>Check your monthly credit </Text>
                <Text style={{fontWeight:'bold'}}>score and see where you</Text>
                <Text style={{fontWeight:'bold',lineHeight:35}}>wanna improve</Text>
                <View>
                  <TouchableOpacity style={{width:170, height:36,marginTop:10, backgroundColor:'#000000', borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#ffffff',fontSize:12}}>Check credit score{' '}</Text>
                  <Image style={{height:20, width:20}}
                  source={require('../../assets/creditscorewhite.png')}
                  />
                  </View>
                  </TouchableOpacity>
                </View> 
              </View>
              <View style={{marginTop:10, marginLeft:0}}>
              <Image style={{height:130, width:130}}
                source={require('../../assets/perspaleta1_0018.png')}
                />
              </View>
          </View>
        </View>
      </View>*/}
        </View>
        
      
        <Text style={{margin:20}}>
            PAY YOU BILLS
        </Text>
        <View style={{flexDirection:'row'}}>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:20,marginRight:15, alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/dth.png')}
            />
            <Text style={{fontSize:12, marginTop:5}}>DTH </Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/broadband.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>Broad Band</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/electricity.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>Electricity</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/recharge.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>Recharge</Text>
          </TouchableOpacity>
      </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/recharge.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>Recharge</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/gas.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>Gas stations</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/lpg.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>LPG</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/tap.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>Water</Text>
          </TouchableOpacity>
        </View>
        <View elevation={5} style={{borderRadius:8,height:100,width:100,backgroundColor:'#ffffff', marginLeft:0, alignItems:'center',justifyContent:'center', marginRight:15}}>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}}>
        <Image style={{height:50, width:50,}}
                source={require('../../assets/cable.png')}
            />
            <Text style={{fontSize:12,marginTop:5}}>Cable TV</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={{width:110, height:36,marginTop:10,marginBottom:20,borderRadius:20,borderWidth:1,borderColor:'#DDDDDD',marginLeft:Dimensions.get('window').width-125,justifyContent:'center',alignItems:'center' }}>
          <TouchableOpacity>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>View all{' '}</Text>
            <Image style={{height:18, width:18,}}
                source={require('../../assets/arrow1.png')}
            />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',marginBottom:20}}>
        <View elevation={5} style={{borderRadius:8,height:150,width:200,backgroundColor:'#ffffff', marginLeft:20,marginRight:15, alignItems:'center',justifyContent:'center'}}>
          <View style={{flexDirection:'row',}}>
            <View style={{marginLeft:-30,marginBottom:-20}}>
            <Image style={{height:130, width:100,}}
                source={require('../../assets/hands-classy.png')}
            />
            </View>
            <View>
            <Text style={{fontWeight:'bold', fontSize:10}}>EARN UPTO</Text>
            <View style= {{marginBottom:10,width:60,height:24,marginTop:8, borderRadius:20,backgroundColor:'#74F34D',alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontWeight:'bold'}}>{'\u20B9'}2000</Text>
            </View>
            <Text style={{fontFamily:'Roboto', fontSize:10,color:'#888888'}}>*Refer and Earn</Text>
            <TouchableOpacity style={{marginLeft:10, marginTop:5}}>
            <Image style={{height:30, width:30,}}
                source={require('../../assets/arrow1.png')}
            />
            </TouchableOpacity>
            </View>
            </View>
        </View>

        
        <View elevation={5} style={{borderRadius:8,height:150,width:200,backgroundColor:'#ffffff', marginLeft:20,marginRight:15, alignItems:'center',justifyContent:'center'}}>
          <View style={{flexDirection:'row',}}>
            <View style={{marginLeft:-30,marginBottom:-20}}>
            <Image style={{height:130, width:100,}}
                source={require('../../assets/hands-classy1.png')}
            />
            </View>
            <View>
            <Text style={{fontWeight:'bold', fontSize:10}}>CASH BACK</Text>
            <View style= {{marginBottom:10,width:44,height:24,marginTop:8, borderRadius:20,backgroundColor:'#FFDC4A',alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontWeight:'bold'}}>20%</Text>
            </View>
            <Text style={{fontFamily:'Roboto', fontSize:10,color:'#888888'}}>*Pay your bills</Text>
            <TouchableOpacity style={{marginLeft:10, marginTop:5}}>
            <Image style={{height:30, width:30,}}
                source={require('../../assets/arrow1.png')}
            />
            </TouchableOpacity>
            </View>
            </View>
      </View>


        <View elevation={5} style={{borderRadius:8,height:150,width:200,backgroundColor:'#ffffff', marginLeft:20,marginRight:15, alignItems:'center',justifyContent:'center'}}>
          <View style={{flexDirection:'row',}}>
            <View style={{marginLeft:-30,marginBottom:-20}}>
            <Image style={{height:130, width:100,}}
                source={require('../../assets/hands-classy2.png')}
            />
            </View>
            <View>
            <Text style={{fontWeight:'bold', fontSize:10}}>PLAY & WIN</Text>
            <View style= {{marginBottom:10,width:50,height:24,marginTop:8, borderRadius:20,backgroundColor:'#FFDC4A',alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontWeight:'bold'}} >{'\u20B9'}500</Text>
            </View>
            <Text style={{fontFamily:'Roboto', fontSize:10,color:'#888888'}}>*Play Quiz</Text>
            <TouchableOpacity style={{marginLeft:10, marginTop:5}}>
            <Image style={{height:30, width:30,}}
                source={require('../../assets/arrow1.png')}
            />
            </TouchableOpacity>
            </View>
            </View>
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

