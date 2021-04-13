import { NativeAppEventEmitter } from "react-native";
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, CheckBox } from 'react-native';
import styles from '../Styles/personalinfostyles';
import { TextInput, HelperText } from 'react-native-paper';
import circle from '../../assets/circle.png';
import check_circle from '../../assets/check_circle.png';
import LottieView from 'lottie-react-native';
//import {Slider} from 'react-native';
import SliderText from 'react-native-slider-text';
//import Slider from "react-native-slider";
import Slider from '@react-native-community/slider';
import { ScrollView } from "react-native-gesture-handler";
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'


//const maximumValueamount=500000;
//const maximumValueduration = 36;
const { height, width } = Dimensions.get('window')
export default class Pl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCircleImg: true,
            termsAccepted: false,
            checked: false,
            sliderValueamount: 0,
            sliderValueduration:0,
            //sliderValueduration:maximumValueduration/2,
            value: 0.2,
            appid: '',
            customerid: '',
            pl_amount: 0,
            pl_tenure: 0,
            min_amt: 10000,
            max_amt: 15000,
            min_tenure: 3,
            max_tenure: 36,
            final_amt: 0,
            final_tenure: 0,
            interest_rate: 0,
            terms_accepted: false,
            selected_pl_amt: 0,
            selected_pl_tenure: 0,
            plan: '',
            showCircleImg: true,
            emi_amount:0,
            userselecttenure:false,
            userselectamount:false,
            tenor:0,
            loan_amount:0,
        }
        //this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.anim.play();
        setTimeout(() => {

        }, 9000);

        this.emiCaluclation();
    }

    handleOnPress = () => this.setState({ checked: false })

    renderImage = () => {
        var imgSource = this.state.showCircleImg ? circle : check_circle;
        return (
            <Image style={{ height: 20, width: 20 }}
                source={imgSource}
            />
        );
    }

    insertdata_into_db = async () => {
        console.log('test');
        await fetch(BASE_URL_PYTHON+'/offer_details_pl',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify(
                        {
                            "appid": this.state.appid,
                            "customerid": this.state.customerid,
                            "pl_amount": this.state.pl_amount,
                            "pl_tenure": this.state.pl_tenure,
                            "min_amt": this.state.min_amt,
                            "max_amt": this.state.max_amt,
                            "min_tenure": this.state.min_tenure,
                            "max_tenure": this.state.max_tenure,
                            "final_amt": this.state.sliderValueamount,
                            "final_tenure": this.state.sliderValueduration,
                            "interest_rate": this.state.interest_rate,
                            "terms_accepted": this.state.terms_accepted,
                        }
                    )
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            }).catch((error) => {
                console.error(error);
            });
    }

    insert_cust_selectdata_into_db = async () => {
        console.log('test');
        await fetch(BASE_URL_PYTHON+'/offer_details_pl_cust_selects',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify(
                        {
                            "appid": this.state.appid,
                            "customerid": this.state.customerid,
                            "selected_pl_amt": this.state.sliderValueamount,
                            "selected_pl_tenure": this.state.sliderValueduration,
                        }
                    )
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            }).catch((error) => {
                console.error(error);
            });
    }



    getProfessiontype = () => {
        console.log('profession');
        fetch(BASE_URL_PYTHON+'/personalinformation' + this.state.appid)    //this.state.appid
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.profession_type == 'Student') {
                    this.props.navigation.navigate('ocr')
                } else {
                    this.props.navigation.navigate('vkyc')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    tenorforEmi = () => {
        if(this.state.userselecttenure) {
            this.setState({tenor:this.state.sliderValueduration})
        } else{
            this.setState({tenor:this.state.max_tenure})
        }
    }

    amountforEmi = () => {
        if(this.state.userselectamount) {
            this.setState({loan_amount:this.state.sliderValueamount})
        } else {
            this.setState({loan_amount:this.state.max_amt})
        }
    }


    // EMI calculation

    emiCaluclation = () => {
        // await delay(10000);
        console.log('emi');
        fetch(BASE_URL_PHP+'/calculate_emi',
            {
                method: 'POST',
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify(
                        {
                            "tenor": this.tenorforEmi(),
                            "loan_amount": this.amountforEmi(),
                            "roi":this.state.interest_rate
                        }
                    )
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log('response:', responseJson)
                if(responseJson.status == 200) {
                    this.setState({emi_amount: responseJson.emi_amount})
                }
                
            }).catch((error) => {
                console.error(error);
            });
    }



    // decision
    creditDecision = () => {
        // await delay(10000);
        console.log('decision');
        fetch(BASE_URL_PHP+'/creditDecision',
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
                            interest_rate:responseJson.Responsedata.roi
                        })

                    }
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    // dynamic plan value getting from api
    renderSwitch(plan) {
        switch (this.state.plan) {
            case 'Freedom':
                return (
                    <View style={{ width: 70, height: 16, backgroundColor: '#C7E4FF', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 0.1 }}>
                        <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#001931' }}>Freedom</Text>
                    </View>)
            case 'Smart':
                return (
                    <View style={{ width: 50, height: 16, backgroundColor: '#FFD4C7', alignItems: 'center', justifyContent: 'center', borderRadius: 3, borderWidth: 0.1 }}>
                        <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#320C00' }}>Smart</Text>
                    </View>)
            case 'Grand':
                return (
                    <View style={{ width: 50, height: 16, backgroundColor: '#E8E266', alignItems: 'center', justifyContent: 'center', borderRadius: 3, borderWidth: 0.1 }}>
                        <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#323000' }}>Grand</Text>
                    </View>)
            case 'Elite':
                return (
                    <View style={{ width: 40, height: 16, backgroundColor: '#00B488', alignItems: 'center', justifyContent: 'center', borderRadius: 3, borderWidth: 0.1 }}>
                        <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#E8FFF9' }}>Elite</Text>
                    </View>)
            case 'Diamond':
                return (
                    <View style={{ width: 65, height: 16, backgroundColor: '#262626', alignItems: 'center', justifyContent: 'center', borderRadius: 3, borderWidth: 0.1 }}>
                        <Text style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 'bold', color: '#E2E2E2' }}>Diamond</Text>
                    </View>)
            default: return null

        }
    }



    handleCheckBox = () => { this.setState({ termsAccepted: !this.state.termsAccepted }) }

    render() {
        
        console.log("Minimum vale", this.state.min_amt)
        const thumbImage = require('../../assets/Slider.png');
        const { checked } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', paddingLeft: 15, paddingTop: 20, marginBottom: 10 }}>
                    {/*<TouchableOpacity> 
                   {/* <Image source={require('../../assets/cancel1.png')} style={styles.cancel} />
                   <Text style={{fontSize: 16,paddingRight:20}}> X </Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Preliminary offer
                </Text>*/}
                    <TouchableOpacity style={{ paddingLeft: Dimensions.get('window').width / 2 }}>
                        <Image source={require('../../assets/NoNotification.png')} style={{ height: 20, width: 20, marginLeft: 100 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../assets/threedot.png')} style={{ height: 10, width: 20, paddingTop: 20, marginLeft: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 40, backgroundColor: 'rgba(65, 161, 127, 0.1)', paddingTop: 1, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingTop: 10 }}>
                        <View>
                            <Image style={{ height: 20, width: 20 }}
                                source={require('../../assets/check_circle.png')}
                            />
                        </View>
                        <View style={{ height: 1, borderWidth: 0.5, borderColor: 'green', width: 95, marginTop: 10 }}>

                        </View>
                        <View>
                            <Image style={{ height: 20, width: 20 }}
                                source={require('../../assets/check_circle.png')}
                            />
                        </View>
                        <View style={{ height: 1, borderWidth: 0.5, borderColor: 'green', width: 95, marginTop: 10 }}>

                        </View>
                        <View>
                            <Image style={{ height: 20, width: 20 }}
                                source={require('../../assets/check_circle.png')}
                            />
                        </View>
                        <View style={{ height: 1, borderWidth: 0.5, borderColor: 'green', width: 95, marginTop: 10 }}>

                        </View>
                        <View>
                            <View>
                                {this.renderImage()}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 0, alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <LottieView
                            source={require('../../json/confetti-cannons.json')}
                            //style={{ justifyContent: "center", alignSelf: "center", height: "60%", width: "60%" }}
                            style={{
                                //width: width + 10,
                                height: height,
                                //marginLeft: - 5,
                                //width:300,
                                aspectRatio: 300 / 600,
                                flexGrow: 1,
                            }}
                            resizeMode='cover'
                            autoPlay={true}
                            loop={false}
                            speed={1}
                            ref={animation => { this.anim = animation; }}
                        />
                    </View>

                    <Text style={{ fontSize: 20, }}>
                        Congratulations
            </Text>
                </View>
                {/*<ScrollView>*/}
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
                <View style={{ marginTop: 20, alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#D1D1D1', margin: 30, paddingBottom: 20 }}>
                    <Text style={{ paddingBottom: 5, fontFamily: 'Nunito', fontWeight: 'bold', marginTop: 10 }}>
                        You are Qualified for a
                </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Nunito', fontWeight: 'bold' }}>
                            Personal loan upto {'\u20B9'}{this.state.max_amt} under{' '}
                        </Text>
                        <View style={{ marginTop: 2 }}>
                            <Text>{this.renderSwitch()}</Text>
                        </View>
                        <Text style={{ fontFamily: 'Nunito', fontWeight: 'bold' }}>{' '}plan</Text>
                    </View>
                </View>
                {/*<View style={{alignItems:'center', marginTop:-20}}>
                <Text>
                    You will pay for what you use nothing extra.
                </Text>
        </View>*/}
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

                <View style={{ marginLeft: 20, marginTop: 10, marginBottom: -20 }}>
                    <Text>
                        Loan amount
                </Text>
                </View>

                <SliderText
                    maximumValue={this.state.max_amt}
                    minimumValue={this.state.min_amt}
                    stepValue={1000}
                    minimumValueLabel={this.state.min_amt}
                    //minimumValueLabel="1000"
                    maximumValueLabel={this.state.max_amt}
                    sliderValue={this.state.max_amt}  // {this.setState({selected_pl_amt:sliderValueamount})},
                    onValueChange={async (amount) => {
                        await this.setState({ sliderValueamount: amount, userselectamount:true });
                        this.emiCaluclation();
                        console.log(this.state.sliderValueamount)
                    }
                    }
                    minimumTrackTintColor="#006202"
                    maximumTrackTintColor="#61C261"
                    thumbTintColor='#61C261'
                    customLabelStyle={{ marginTop: -20, fontSize: 12, marginLeft: 10 }}
                    customCountStyle={{ marginBottom: -20, fontSize: 9, marginLeft: 10, marginRight: 20 }}
                />

                <View style={{ marginLeft: 20, marginTop: -15, marginBottom: -20 }}>
                    <Text>
                        Loan duration
                </Text>
                </View>

                <SliderText
                    maximumValue={this.state.max_tenure}
                    minimumValue={this.state.min_tenure}
                    stepValue={3}
                    minimumValueLabel={this.state.min_tenure + " months"}
                    maximumValueLabel={this.state.max_tenure + " months"}
                    //onValueChange={(duration) => { this.setState({ sliderValueduration: duration }); console.log(this.state.sliderValueduration) }}
                    sliderValue={this.state.max_tenure}
                    onValueChange={async (duration) => {
                        await this.setState({ sliderValueduration: duration, userselecttenure:true });
                        this.emiCaluclation();
                        console.log(this.state.sliderValueduration)
                    }
                    }
                    minimumTrackTintColor="#006202"
                    maximumTrackTintColor="#61C261"
                    thumbTintColor='#61C261'
                    customLabelStyle={{ marginTop: -20, fontSize: 12, marginLeft: 10 }}
                    customCountStyle={{ marginBottom: -20, fontSize: 9, marginLeft: 10, marginRight: 20 }}
                />


                <View style={{ alignItems: 'center', paddingTop: 0, marginTop: -5 }}>
                    <Text style={{ paddingBottom: 5, color: '#111111', fontWeight: 'bold' }}>
                        You will payback total {'\u20B9'}{this.state.tenor * this.state.emi_amount}
                </Text>
                    <Text style={{ paddingBottom: 5, color: '#111111', fontWeight: 'bold' }}>
                        in {this.state.tenor} EMI's of {'\u20B9'}{this.state.emi_amount}
                </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <CheckBox
                        onChange={() => this.setState({ checked: !checked })}
                    />
                    <Text style={{ marginTop: 5 }}> I agree with the </Text>
                    <Text style={{ marginTop: 5, fontWeight: 'bold', color: '#61C261', textDecorationLine: 'underline' }}>Legal agreements</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={{ marginRight: 20, width: '30%', height: 35, borderRadius: 5, backgroundColor: !this.state.checked ? 'rgba(42,145,52,0.3)' : '#2A9134', marginBottom: 20 }}
                        disabled={!this.state.checked}
                        onPress={() => this.setState({ showCircleImg: !this.state.showCircleImg })}
                        onPress={() => { this.insertdata_into_db(); this.getProfessiontype(); }}
                    // onPress={() => this.props.navigation.navigate('rejected')}
                    >
                        <Text style={{ textAlign: 'center', paddingTop: 7, color: '#ffffff' }}>
                            Get now
            </Text>
                    </TouchableOpacity>
                </View>
                {/*</ScrollView>*/}
            </View>
        );
    }
}
