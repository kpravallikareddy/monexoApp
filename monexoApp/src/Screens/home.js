import React, { Component } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image, Dimensions, CheckBox, Animated } from 'react-native';
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
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'
import { BlurView } from "@react-native-community/blur";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
//import ViewPager from '@react-native-community/viewpager';
//import Carousel from 'react-native-carousel-view';
//import Carousel from 'react-native-snap-carousel';



const CARD_WIDTH = 300;
export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showhome: true,
      showbudgeting: true,
      showcreditscore: true,
      showmenu: true,
      showbluecircle: true,
      personalinfocompletedflag: false,
      employerdetailsflag: false,
      collegedetailsflag: false,
      bankdetailsflag: false,
      bankdetailsverified: false,
      plcompletedflag: false,
      dccompletedflag: false,
      vkyccompletedflag: false,
      ocrcompletedflag: false,
      enachcompletedflag: false,
      appid: '',
      customerid: '',
      offer: 'Personal Loan',
      plan: '',
      min_amt: 0,
      max_amt: 0,
      min_tenure: 0,
      max_tenure: 0,
      interest_rate: 0,
      modalVisible: false,
      productname: '',
      ocrvkyc: 'OCR',
      progressBarvalue: 0,
      progress: 20,
      progressWithOnComplete: 0,
      progressCustomized: 0,
      stage: '',
      percentagefunding: 0,
      daysleft: 0,
      amountinfunding: 0,
      contractnumber: '',
      approvedloanamount: 0,
      approvedtenor: 0,
      lendingproduct: '',
      principalremaining: 0,
      duedate: '',
      balancetenure: 0,
      totaltenure: 0,
      emiamount: 0,

    }
  }

  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  animation = new Animated.Value(0);

  componentDidMount() {

    this.creditDecision();
    this.renderProductname();
    this.getProfessiontype();

  }



  fetchScreencompletedflag = () => {
    console.log('test');
    // console.log(text);
    fetch(BASE_URL_PYTHON + 'screencompletionflags' + this.state.appid)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          personalinfocompletedflag: responseJson.personalinfocompletedflag,
          employerdetailsflag: responseJson.employerdetailsflag,
          bankdetailsflag: responseJson.bankdetailsflag,
          bankdetailsverified: bankdetailsverified,
          collegedetailsflag: responseJson.collegedetailsflag,
          plcompletedflag: responseJson.plcompletedflag,
          dccompletedflag: responseJson.dccompletedflag,
          vkyccompletedflag: vkyccompletedflag,
          enachcompletedflag: enachcompletedflag
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderHome = () => {
    var imgSource = this.state.showhome ? home : homeactive;
    return (
      <Image style={{ height: 30, width: 30 }}
        source={imgSource}
      />
    );
  }

  renderPfm = () => {
    var imgSource = this.state.showbudgeting ? pfm : pfmactive;
    return (
      <Image style={{ height: 30, width: 30 }}
        source={imgSource}
      />
    );
  }

  renderCreditscore = () => {
    var imgSource = this.state.showcreditscore ? creditscoreinactive : creditscore;
    return (
      <Image style={{ height: 30, width: 30 }}
        source={imgSource}
      />
    );
  }

  renderMenu = () => {
    var imgSource = this.state.showmenu ? menuinactive : menu;
    return (
      <Image style={{ height: 30, width: 30 }}
        source={imgSource}
      />
    );
  }

  renderBluecircle = () => {
    var imgSource = this.state.showbluecircle ? bluecircle : checkbluecircle;
    return (
      <Image style={{ height: 15, width: 15 }}
        source={imgSource}
      />
    );
  }

  getprimaryIdSalesforce = () => {
    console.log('salesforce');
    fetch(BASE_URL_PHP + '/saleForceCreateNewAccount',
      {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(
            { "mobile": this.state.mobileno }
          )
      })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson)
        //console.log(responseJson.customer_account_info.recods[0].peer__Date_of_Birth__c)
        // console.log(responseJson.customer_account_info.recods[0].peer__First_Name__c + responseJson.recods[0].peer__Last_Name__c)
        // console.log(responseJson.customer_account_info.recods[0].Customer_ID__c)
        // console.log(responseJson.customer_account_info.recods[0].PAN__c)
      }).catch((error) => {
        console.error(error);
      });
  }


  getdataSalesforce = () => {
    console.log('salesforce');
    fetch(BASE_URL_PHP + '/getRecordSingleDetail', {
      "ID": "0011e000008lTxIAAU"
    })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson)
        //console.log(responseJson.customer_account_info.recods[0].peer__Date_of_Birth__c)
        // console.log(responseJson.customer_account_info.recods[0].peer__First_Name__c + responseJson.recods[0].peer__Last_Name__c)
        // console.log(responseJson.customer_account_info.recods[0].Customer_ID__c)
        // console.log(responseJson.customer_account_info.recods[0].PAN__c)
      }).catch((error) => {
        console.error(error);
      });
  }


  getProfessiontype = () => {
    // console.log('profession');
    fetch(BASE_URL_PYTHON + '/personalinformation' + this.state.appid)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.profession_type == 'Student') {
          // this.props.navigation.navigate('ocr')
          this.setState({ ocrvkyc: 'OCR' })
        } else {
          // this.props.navigation.navigate('vkyc')
          this.setState({ ocrvkyc: 'Video KYC' })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }




  // decision
  creditDecision = () => {
    // await delay(10000);
    console.log('decision');
    fetch(BASE_URL_PHP + '/creditDecision',
      {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify(
            {
              "application_id": this.state.appid,
              "cust_id": this.state.customerid,
            }
          )
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log('response:', responseJson)
        if (responseJson.Responsedata.status == "APP") {     //REF   //REJ
          if (responseJson.Responsedata.product == "PL") {
            this.setState({
              plan: responseJson.Responsedata.plan,
              min_amt: responseJson.Responsedata.min_loan_amount,
              max_amt: responseJson.Responsedata.max_loan_amount,
              min_tenure: responseJson.Responsedata.min_tenor,
              max_tenure: responseJson.Responsedata.max_tenor,
              interest_rate: responseJson.Responsedata.roi,
              offer: 'Personal Loan'
            })

          } else if (responseJson.Responsedata.product == "DC") {
            this.setState({
              plan: responseJson.Responsedata.plan,
              min_amt: responseJson.Responsedata.min_loan_amount,
              max_amt: responseJson.Responsedata.max_loan_amount,
              min_tenure: responseJson.Responsedata.min_tenor,
              max_tenure: responseJson.Responsedata.max_tenor,
              interest_rate: responseJson.Responsedata.roi,
              offer: 'Debt Consolidation'
            })
          }
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  // dynamic plan value getting from api
  renderSwitch(offer) {
    switch (this.state.offer) {
      case 'Personal Loan':
        return (
          <View>
            <Text style={{ lineHeight: 22 }}> Your personal loan </Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text>amount of </Text>
              <View style={{ width: 62, height: 20, backgroundColor: '#FFE99C', borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}{this.state.max_amt}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>is ready for withdrawal</Text>
            </View>
          </View>
        )
      case 'Debt Consolidation':
        return (
          <View>
            <Text style={{ lineHeight: 22 }}> Your personal loan </Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text>amount of </Text>
              <View style={{ width: 62, height: 20, backgroundColor: '#FFE99C', borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}{this.state.max_amt}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>is ready for withdrawal</Text>
            </View>
          </View>
        )

      default: return null

    }
  }




  // dynamic plan value getting from api
  renderActions(offer) {
    switch (this.state.offer) {
      case 'Personal Loan':
        return (
          <View>
            <Text style={{ lineHeight: 22 }}> Your personal loan </Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text>amount of </Text>
              <View style={{ width: 62, height: 20, backgroundColor: '#FFE99C', borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}{this.state.max_amt}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text>is ready for disbursal</Text>
              {/*<Text style={{ marginTop: 10 }}>place</Text>*/}
            </View>
            {/*<Text style={{color:'#0075CB',fontSize:20,marginBottom:-20,marginLeft:5}}>.</Text>
            <Text style={{color:'#0075CB',fontSize:20,marginBottom:-5,marginLeft:5}}>.</Text>*/}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 5, marginTop: 2 }}>
                {this.renderBluecircle()}
              </View>
              <Text style={{ fontWeight: 'bold' }}>Listed in market place</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ marginRight: 5, marginTop: 3 }}>
                {this.renderBluecircle()}
              </View>
              <Text style={{ fontWeight: 'bold' }}>Transfering to your bank account</Text>
            </View>
          </View>
        )
      case 'Debt Consolidation':
        return (
          <View>
            <Text style={{ lineHeight: 22 }}> Your debt consolidation </Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text>amount of </Text>
              <View style={{ width: 62, height: 20, backgroundColor: '#FFE99C', borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}{this.state.max_amt}</Text>
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text>is ready for disbursal</Text>
              {/*<Text style={{ marginTop: 10 }}>place</Text>*/}
            </View>
            {/*<Text style={{color:'#0075CB',fontSize:20,marginBottom:-20,marginLeft:5}}>.</Text>
            <Text style={{color:'#0075CB',fontSize:20,marginBottom:-5,marginLeft:5}}>.</Text>*/}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 5, marginTop: 2 }}>
                {this.renderBluecircle()}
              </View>
              <Text style={{ fontWeight: 'bold' }}>Listed in market place</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ marginRight: 5, marginTop: 3 }}>
                {this.renderBluecircle()}
              </View>
              <Text style={{ fontWeight: 'bold' }}>Transfering to your bank account</Text>
            </View>
          </View>
        )

      default: return null

    }
  }

  renderProductname = () => {
    if (this.state.offer == 'Personal Loan') {
      this.setState({ productname: 'personal loan' })
    } else if (this.state.offer == 'Debt Consolidation') {
      this.setState({ productname: 'debt consolidation' })
    }
  }

  // loan details from salesforce
  getdataSalesforce = () => {
    console.log('salesforce');
    fetch(BASE_URL_PHP + '/getRecordSingleDetail', {
      "ID": "0011e000008lTxIAAU"
    })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson)

        this.setState({
          principalremaining: responseJson.customer_account_info.recods[0].Principal / Advance,
          duedate: responseJson.customer_account_info.recods[0].OldestUnpaidDueDate,
          balancetenure: responseJson.customer_account_info.recods[0].RemainingEMI,
          totaltenure: responseJson.customer_account_info.recods[0].Term,
          emiamount: responseJson.customer_account_info.recods[0].AmounttoCurrent,

        })
      }).catch((error) => {
        console.error(error);
      });
  }





  // funding details from salesforce
  getdataSalesforce = () => {
    console.log('salesforce');
    fetch(BASE_URL_PHP + '/getRecordSingleDetail', {
      "ID": "0011e000008lTxIAAU"
    })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson)

        this.setState({
          stage: responseJson.customer_account_info.recods[0].Stage,
          percentagefunding: responseJson.customer_account_info.recods[0].Percent_Funded,
          daysleft: responseJson.customer_account_info.recods[0].Days,
          amountinfunding: responseJson.customer_account_info.recods[0].Amount_In_Funding,
          contractnumber: responseJson.customer_account_info.recods[0].Loan,
          approvedloanamount: responseJson.customer_account_info.recods[0].Approved_Loan_Amount,
          approvedtenor: responseJson.customer_account_info.recods[0].Approved_Tenor,
          lendingproduct: responseJson.customer_account_info.recods[0].peer__Lending_Product
        })
      }).catch((error) => {
        console.error(error);
      });
  }


  render() {
    const { modalVisible } = this.state;
    const size = 80;
    const width = 5;
    const cropDegree = 90;
    const textOffset = width;
    const textWidth = size - (textOffset * 2);
    const textHeight = size * (1 - cropDegree / 360) - (textOffset * 2);
    const barWidth = Dimensions.get('screen').width - 40;
    const barHeight = 10;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', paddingLeft: 15, paddingTop: 20, marginBottom: 10 }}>
          <Image source={require('../../assets/logo.png')} style={{ height: 25, width: 35, paddingTop: 30, marginLeft: 10 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>
            Home
            </Text>
          <TouchableOpacity>
            <Image source={require('../../assets/NoNotification.png')} style={{ height: 20, width: 20, marginLeft: Dimensions.get('window').width / 2 - 20 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ height: 24, width: 24 }}>
              <Image source={require('../../assets/logo.png')} style={{ height: 15, width: 15, paddingTop: 30, marginLeft: 10 }} />
            </View>
          </TouchableOpacity>

        </View>
        <ScrollView >

          <View style={{ marginTop: 40, marginLeft: 20, flexDirection: 'row' }}>
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
            {/*{this.state.personalinfocompletedflag == false ?
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
                  <TouchableOpacity style={{width:160, height:36,marginTop:10, backgroundColor:'#000000', borderRadius:20,alignItems:'center',justifyContent:'center'}}
                  onPress={() => this.props.navigation.navigate('personalinfo')}
                  >
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
                 // onPress={() => {this.fetchScreencompletedflag();}}
                 onPress={() => this.props.navigation.navigate('personalinfo')}
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
        }

            {(this.state.employerdetailsflag && !this.state.personalinfocompletedflag) ?
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
                  onPress={() => this.props.navigation.navigate('bankdetails')}
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
        : null} */}

            {/*{this.state.personalinfocompletedflag && (this.state.employerdetailsflag || this.state.collegedetailsflag) && this.state.bankdetailsflag && this.state.bankdetailsverified ?
              <View elevation={5} style={{ borderRadius: 8, height: 200, width: CARD_WIDTH, backgroundColor: '#ffffff', marginRight: 20, }}>
                <View style={{ marginLeft: 20, marginTop: -10 }}>
                  <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#2A9134', marginTop: 20, lineHeight: 18 }}>{this.state.offer}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View>
                      {this.renderSwitch()}
                      <View>
                        <TouchableOpacity
                          onPress={() => this.setState({ showbluecircle: false })}
                          // onPress={() => {this.fetchPersonalinfocompletedflag();}}
                          onPress={() => { this.state.offer == 'Personal Loan' ? this.props.navigation.navigate('pl') : this.props.navigation.navigate('dc') }}
                          style={{ width: 140, height: 36, marginTop: 20, backgroundColor: '#2A9134', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#ffffff' }}>Withdraw now</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 0 }}>
                      <Image style={{ height: 130, width: 130 }}
                        source={require('../../assets/saly2.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
              :
              <View elevation={5} style={{ borderRadius: 8, height: 200, width: CARD_WIDTH, backgroundColor: '#ffffff', marginRight: 20, }}>
                <View style={{ marginLeft: 20, marginTop: -10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#000000', marginTop: 20, lineHeight: 18 }}>{this.state.offer} | </Text>
                    <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#DA1717', marginTop: 20, lineHeight: 18 }}>Actions required</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View>
                      {this.renderActions()}
                      <View>
                        <TouchableOpacity
                          onPress={() => this.setState({ showbluecircle: false })}
                          // onPress={() => {this.fetchPersonalinfocompletedflag();}}
                          // onPress={() => { this.state.offer == 'Personal Loan' ? this.props.navigation.navigate('pl') : this.props.navigation.navigate('dc') }}
                          onPress={() => { this.setModalVisible(!modalVisible); }}
                          style={{ width: 140, height: 36, marginTop: 10, backgroundColor: '#000000', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
                        >
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#ffffff' }}>Required actions</Text>
                          </View>
                        </TouchableOpacity>

                        <Modal
                          animationType='slide'
                          transparent={true}
                          visible={modalVisible} 
                        >

                          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                            <BlurView blurType='dark'>
                              <View elevation={15} style={{ width:Dimensions.get('window').width , height: Dimensions.get('window').height / 2 +50, backgroundColor: "#FFFFFF", borderRadius: 10, paddingTop: 20, paddingLeft: 20 }}>
                                <View style={{ marginLeft: Dimensions.get('window').width / 2 + 150, marginTop: 0 }}>
                                  <TouchableOpacity onPress={() => { this.setModalVisible(!modalVisible); }}>
                                    <Text>X</Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={{ marginBottom: 5, fontSize: 18 }}>Just couple of steps to </Text>
                                <View style={{flexDirection:'row'}}> 
                                <Text style={{ marginBottom: 10, fontSize: 18 }}>get your {this.state.productname} </Text>
                                <Text style={{ marginBottom: 20, fontSize: 18, fontWeight:'bold' }}>{'\u20B9'}{this.state.max_amt}</Text>
                                </View>
                                </View>

                                <View style={{borderWidth:1,borderColor:'#DDDDDD', height:70,width:Dimensions.get('window').width-40,borderRadius:8,justifyContent:'center',marginBottom:15}}>
                                    <View style={{flexDirection:'row',}}>
                                    <Image source={require('../../assets/emailac.png')} style={{ height: 40, width: 40, marginLeft:10, marginRight:15 }}/>
                                    <Text style={{fontSize:18, fontFamily:'Nunito',alignSelf:'center'}}>Activate Mail ID</Text>
                                    <View>
                                    <TouchableOpacity  // onPress={() => alert('activate')}
                                    style={{width:90,height:42,borderRadius:4,backgroundColor:'#2A9134',justifyContent:'center',alignItems:'center', marginLeft:70 }}
                                    >
                                      <Text style={{color:'#ffffff'}}>ACTIVATE</Text>
                                      </TouchableOpacity>
                                      </View>
                                    </View>
                                </View>

                                <View style={{borderWidth:1,borderColor:'#DDDDDD', height:70,width:Dimensions.get('window').width-40,borderRadius:8,justifyContent:'center', marginBottom:15}}>
                                    <View style={{flexDirection:'row',}}>
                                    <Image source={require('../../assets/vkyc.png')} style={{ height: 40, width: 40, marginLeft:10, marginRight:15 }}/>
                                    <Text style={{fontSize:18, fontFamily:'Nunito',alignSelf:'center'}}>{this.state.ocrvkyc}</Text>
                                    <View>
                                    <TouchableOpacity  // onPress={() => alert('activate')}
                                    onPress={() => { this.setModalVisible(!modalVisible), this.state.ocrvkyc == 'OCR' ?this.props.navigation.navigate('ocr'):this.props.navigation.navigate('vkyc')}}
                                    //onPress={() =>this.props.navigation.navigate('vkyc')}
                                    style={{width:90,height:42,borderRadius:4,backgroundColor:'#2A9134',justifyContent:'center',alignItems:'center', marginLeft:this.state.ocrvkyc == 'OCR' ? 160 :110 }}
                                    >
                                      <Text style={{color:'#ffffff'}}>COMPLETE</Text>
                                      </TouchableOpacity>
                                      </View>
                                    </View>
                                </View>

                                <View style={{borderWidth:1,borderColor:'#DDDDDD', height:70,width:Dimensions.get('window').width-40,borderRadius:8,justifyContent:'center',marginBottom:15}}>
                                    <View style={{flexDirection:'row',}}>
                                    <Image source={require('../../assets/group.png')} style={{ height: 40, width: 40, marginLeft:10, marginRight:15 }}/>
                                    <Text style={{fontSize:18, fontFamily:'Nunito',alignSelf:'center'}}>E-NACH</Text>
                                    <View>
                                    <TouchableOpacity  // onPress={() => alert('activate')}
                                    onPress={() => {this.setModalVisible(!modalVisible), this.props.navigation.navigate('enach')}}
                                   // onPress={() =>this.props.navigation.navigate('enach')}
                                    style={{width:90,height:42,borderRadius:4,backgroundColor:'#2A9134',justifyContent:'center',alignItems:'center', marginLeft:130 }}
                                    >
                                      <Text style={{color:'#ffffff'}}>COMPLETE</Text>
                                      </TouchableOpacity>
                                      </View>
                                    </View>
                                </View>

                  
                              </View>
                            </BlurView>
                          </View>

                        </Modal>

                      </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 0 }}>
                      <Image style={{ height: 130, width: 130 }}
                        source={require('../../assets/saly.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            }*/}

            {/*{(this.state.plcompletedflag || this.state.dccompletedflag) && this.state.vkyccompletedflag && this.state.enachcompletedflag ? (this.state.stage == "In Funding"?
<View elevation={5} style={{ borderRadius: 8, height: 200, width: CARD_WIDTH, backgroundColor: '#ffffff', marginRight: 20, }}>
                <View style={{ marginLeft: 20, marginTop: -10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#000000', marginTop: 20, lineHeight: 18 }}>{this.state.offer} | </Text>
                    <TouchableOpacity  onPress={() => { this.setModalVisible(!modalVisible); }}>
                    <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#0075CB', marginTop: 20, lineHeight: 18 }}>Check status</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View>
                      {this.renderActions()}
                      <View>
                       

                        <Modal
                          animationType='slide'
                          transparent={true}
                          visible={modalVisible} 
                        >

                          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                            <BlurView blurType='dark'>
                              <View elevation={15} style={{ width:Dimensions.get('window').width , height: Dimensions.get('window').height / 2 +50, backgroundColor: "#FFFFFF", borderRadius: 10, paddingTop: 20, paddingLeft: 20 }}>
                                <View style={{ marginLeft: Dimensions.get('window').width / 2 + 150, marginTop: 0 }}>
                                  <TouchableOpacity onPress={() => { this.setModalVisible(!modalVisible); }}>
                                    <Text>X</Text>
                                  </TouchableOpacity>
                                </View>
                                

                                <Text style={{marginLeft:0, fontWeight:'bold',fontSize:18, lineHeight:25}}> In Funding</Text>

                                <View>
                                  <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20,marginTop:20,marginBottom:20}}>
                                    <View style={{width:130,height:36,borderRadius:20,backgroundColor:'rgba(42, 145, 52, 0.1)',justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{fontSize:14,fontFamily:'Nunito'}}>{this.state.stage}</Text>
                                    </View>
                                    <View style={{width:98,height:36,borderRadius:20,backgroundColor:'rgba(42, 145, 52, 0.1)',justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{fontSize:14,fontFamily:'Nunito'}}>{'\u20B9'}{this.state.approvedloanamount}</Text>
                                    </View>
                                    <View style={{width:98,height:36,borderRadius:20,backgroundColor:'rgba(42, 145, 52, 0.1)',justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{fontSize:14,fontFamily:'Nunito'}}>{this.state.approvedtenor} months</Text>
                                    </View>
                                  </View>
                                  <View style={{width:130,height:36,borderRadius:20,backgroundColor:'rgba(42, 145, 52, 0.1)',justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{fontSize:14,fontFamily:'Nunito'}}>{this.state.lendingproduct}</Text>
                                    </View>
                                </View>

                                <View style={{flexDirection:'row',marginTop:20,marginBottom:10}}> 
                                  <Text style={{fontSize:14,fontFamily:'Nunito',lineHeight:25}}> Loan Already Committed</Text>
                                  <Text style={{fontSize:14,fontFamily:'Nunito',lineHeight:25,marginLeft:Dimensions.get('window').width/3}}>{this.state.daysleft} Days left</Text>
                                </View>
                               
                                <View>
                                <ProgressBarAnimated
                                width={barWidth}
                                height={barHeight}
                                value={this.state.percentagefunding}
                                backgroundColor="#36BF0C"
                                />
                                </View>
                                
                                <View style={{flexDirection:'row',marginTop:10,marginBottom:20}}> 
                                  <Text style={{fontSize:14,fontFamily:'Nunito',lineHeight:25}}>{'\u20B9'}{this.state.amountinfunding}</Text>
                                  <Text style={{fontSize:14,fontFamily:'Nunito',lineHeight:25,marginLeft:Dimensions.get('window').width-90}}>{this.state.percentagefunding}%</Text>
                                </View>
                                
                                <View style={{width:Dimensions.get('window').width-40,height:45,backgroundColor:'rgba(91, 91, 91, 0.1)',alignItems:'center'}}>
                                  <Text style={{fontSize:12,color:'#5B5B5B',lineHeight:18,marginLeft:10}}>If your loan amount does not get funded within the limited days your application will be expired automatically.</Text>
                                </View>
                              </View>
                            </BlurView>
                          </View>

                        </Modal>

                      </View>
                    </View>
                    <View style={{ marginTop: 0, marginLeft: -90 }}>
                      <Image style={{ height: 130, width: 130 }}
                        source={require('../../assets/doodle.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
              : this.state.stage == "Funded"?*/}

            <View>
              <View elevation={5} style={{ borderRadius: 8, height: 200, width: Dimensions.get('window').width - 40, backgroundColor: '#ffffff', marginRight: 20, }}>
                <View style={{ marginLeft: 20, marginTop: -10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#000000', marginTop: 20, lineHeight: 18 }}>{this.state.offer} | {'\u20B9'}10,000</Text>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('transactions') }}>
                      <Text style={{ marginLeft: 30, fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#0075CB', marginTop: 20, lineHeight: 18 }}>View Transaction</Text>
                    </TouchableOpacity>
                  </View>
                  <View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                      <View>
                        {/*<AnimatedGaugeProgress
                          size={80}
                          width={5}
                          fill={100}
                          rotation={90}
                          cropDegree={90}
                          tintColor="#DA1717"
                          delay={0}
                          backgroundColor="#DDDDDD"
                          stroke={[2, 2]} //For a equaly dashed line
                          strokeCap="circle"

                        />*/}

                        <GaugeProgress
                          size={80}
                          width={5}
                          fill={100}
                          cropDegree={cropDegree}
                          tintColor="#DA1717"
                        >
                          <View style={{ position: 'absolute', top: textOffset + 5, left: textOffset, width: textWidth, height: textHeight, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12 }}>{'\u20B9'}{this.state.principalremaining}</Text>
                          </View>
                        </GaugeProgress>
                        <View style={{ position: 'absolute', marginLeft: 20, marginTop: 70 }}>
                          <Text style={{ fontSize: 8 }}>
                            LOAN DUE
                          </Text>
                        </View>

                      </View>


                      <View>
                        <GaugeProgress
                          size={80}
                          width={5}
                          fill={100}
                          cropDegree={cropDegree}
                        >
                          <View style={{ position: 'absolute', top: textOffset + 5, left: textOffset, width: textWidth, height: textHeight, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12 }}>{this.state.duedate}</Text>
                          </View>
                        </GaugeProgress>
                        <View style={{ position: 'absolute', marginLeft: 0, marginTop: 70, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                          <Text style={{ fontSize: 8 }}>
                            NEXT PAYMENT{' '}
                          </Text>
                          <Text style={{ fontSize: 8 }}>DUE</Text>
                        </View>
                      </View>
                      <View>
                        <GaugeProgress
                          size={80}
                          width={5}
                          fill={100}
                          cropDegree={cropDegree}
                        >
                          <View style={{ position: 'absolute', top: textOffset + 5, left: textOffset, width: textWidth, height: textHeight, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12 }}>{this.state.balancetenure} months</Text>
                            <Text style={{ fontSize: 6 }}>Left in {this.state.totaltenure} months</Text>
                          </View>
                        </GaugeProgress>
                        <View style={{ position: 'absolute', marginLeft: 15, marginTop: 70 }}>
                          <Text style={{ fontSize: 8 }}>
                            LOAN TENURE
                          </Text>
                        </View>
                      </View>

                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ width: 140, height: 36, borderWidth: 1, borderRadius: 20, borderColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Pay Full amount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 140, height: 36, borderWidth: 1, borderRadius: 20, borderColor: '#000000', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ffffff' }}>Pay EMI amount</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>


            </View>
            {/*: null)
              :
              null}*/}








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


          <Text style={{ margin: 20 }}>
            PAY YOU BILLS
        </Text>
          <View style={{ flexDirection: 'row' }}>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 20, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/dth.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>DTH </Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/broadband.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>Broad Band</Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/electricity.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>Electricity</Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/recharge.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>Recharge</Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/recharge.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>Recharge</Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/gas.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>Gas stations</Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/lpg.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>LPG</Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/tap.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>Water</Text>
              </TouchableOpacity>
            </View>
            <View elevation={5} style={{ borderRadius: 8, height: 100, width: 100, backgroundColor: '#ffffff', marginLeft: 0, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{ height: 50, width: 50, }}
                  source={require('../../assets/cable.png')}
                />
                <Text style={{ fontSize: 12, marginTop: 5 }}>Cable TV</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: 110, height: 36, marginTop: 10, marginBottom: 20, borderRadius: 20, borderWidth: 1, borderColor: '#DDDDDD', marginLeft: Dimensions.get('window').width - 125, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>View all{' '}</Text>
                <Image style={{ height: 18, width: 18, }}
                  source={require('../../assets/arrow1.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <View elevation={5} style={{ borderRadius: 8, height: 150, width: 200, backgroundColor: '#ffffff', marginLeft: 20, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ marginLeft: -30, marginBottom: -20 }}>
                  <Image style={{ height: 130, width: 100, }}
                    source={require('../../assets/hands-classy.png')}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 10 }}>EARN UPTO</Text>
                  <View style={{ marginBottom: 10, width: 60, height: 24, marginTop: 8, borderRadius: 20, backgroundColor: '#74F34D', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontWeight: 'bold' }}>{'\u20B9'}2000</Text>
                  </View>
                  <Text style={{ fontFamily: 'Roboto', fontSize: 10, color: '#888888' }}>*Refer and Earn</Text>
                  <TouchableOpacity style={{ marginLeft: 10, marginTop: 5 }}>
                    <Image style={{ height: 30, width: 30, }}
                      source={require('../../assets/arrow1.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>


            <View elevation={5} style={{ borderRadius: 8, height: 150, width: 200, backgroundColor: '#ffffff', marginLeft: 20, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ marginLeft: -30, marginBottom: -20 }}>
                  <Image style={{ height: 130, width: 100, }}
                    source={require('../../assets/hands-classy1.png')}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 10 }}>CASH BACK</Text>
                  <View style={{ marginBottom: 10, width: 44, height: 24, marginTop: 8, borderRadius: 20, backgroundColor: '#FFDC4A', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontWeight: 'bold' }}>20%</Text>
                  </View>
                  <Text style={{ fontFamily: 'Roboto', fontSize: 10, color: '#888888' }}>*Pay your bills</Text>
                  <TouchableOpacity style={{ marginLeft: 10, marginTop: 5 }}>
                    <Image style={{ height: 30, width: 30, }}
                      source={require('../../assets/arrow1.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>


            <View elevation={5} style={{ borderRadius: 8, height: 150, width: 200, backgroundColor: '#ffffff', marginLeft: 20, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ marginLeft: -30, marginBottom: -20 }}>
                  <Image style={{ height: 130, width: 100, }}
                    source={require('../../assets/hands-classy2.png')}
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 10 }}>PLAY & WIN</Text>
                  <View style={{ marginBottom: 10, width: 50, height: 24, marginTop: 8, borderRadius: 20, backgroundColor: '#FFDC4A', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontWeight: 'bold' }} >{'\u20B9'}500</Text>
                  </View>
                  <Text style={{ fontFamily: 'Roboto', fontSize: 10, color: '#888888' }}>*Play Quiz</Text>
                  <TouchableOpacity style={{ marginLeft: 10, marginTop: 5 }}>
                    <Image style={{ height: 30, width: 30, }}
                      source={require('../../assets/arrow1.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.setState({ showhome: !this.state.showhome })}>
              {this.renderHome()}
              <Text>HOME</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => this.setState({ showbudgeting: !this.state.showbudgeting })}
              onPress={() => this.props.navigation.navigate('pfm')}
            >
              {this.renderPfm()}
              <Text>BUDGETING</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => this.setState({ showcreditscore: !this.state.showcreditscore })}
            >
              {this.renderCreditscore()}
              <Text>CREDIT SCORE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => this.setState({ showmenu: !this.state.showmenu })}
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

