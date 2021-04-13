import React, {Component} from 'react';
import {View,StyleSheet, Text,TouchableOpacity, Image, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import Pie from 'react-native-pie'
//import DonutChart from 'react-donut-chart';
//import {BarChart} from 'react-native-charts-wrapper';
//import {BarChart,PieChart,} from "react-native-chart-kit";
import { BASE_URL_PYTHON } from '@env'
import { BASE_URL_PHP } from '@env'

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const chartConfig = {
  backgroundColor: '#ffffff',
  //backgroundGradientFrom: "#1E2923",
  //backgroundGradientFromOpacity: 0,
 // backgroundGradientTo: "#08130D",
 // backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(42,145,52, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get('window').width;

export default class Spendings extends React.Component {
    constructor(props){
        super(props)
        this.state= {
          cardslist:[1,2,3],
          cardselected:'',
          legend: {
            enabled: true,
            textSize: 14,
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            formToTextSpace: 5,
            wordWrapEnabled: true,
            maxSizePercent: 0.5
          },
          data: {
            dataSets: [{
              values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
              label: 'Bar dataSet',
              config: {
                color: processColor('teal'),
                barShadowColor: processColor('lightgrey'),
                highlightAlpha: 90,
                highlightColor: processColor('red'),
              }
            }],
    
            config: {
              barWidth: 0.7,
            }
          },
          highlights: [{x: 3}, {x: 6}],
          xAxis: {
            valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            granularityEnabled: true,
            granularity : 1,
          }
        }
      }


      jwttoken = () => {
        // console.log('jwt');
         var data = new FormData();
         data.append("emailAddress", "praveen.krishnam@monexo.co");
         data.append("password", "L!@Py#Kt7a5MK!Pnw8");
         fetch('https://trial.fin360.in/bank-auth/api/v2/login',
       {
         method:'POST',
         headers:{
             "Cache-control": "no-cache",
             'Content-Type': multipart/form-data,
            },
         body:data,
       }).then((response) =>response.json())
         .then((responseJson) =>{
         console.log('jwt-response:',responseJson)
        // console.log('token:',responseJson.access_token);
         this.setState({jwtokenresponse:responseJson})
         this.setState({jwttoken:responseJson.access_token})
         }).catch((error) =>
         {
           console.error(error);
         });
       }
     

       handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
          this.setState({...this.state, selectedEntry: null})
        } else {
          this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
    
        console.log(event.nativeEvent)
      }





      render(){
        const chart_wh = 250
        const series = [123, 321, 123, 789, 537]
        const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
          return(
            <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
            <View style={{flexDirection:'row',backgroundColor:'#FFFFFF', paddingLeft:15, paddingTop:20,marginBottom:10}}>
            <Image source={require('../../assets/backarrow1.png')} style={{height:10,width:25, paddingTop:30,marginLeft:10}} />
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:15}}>
                Spendings
            </Text>
            <TouchableOpacity>
                <Image source={require('../../assets/NoNotification.png')} style={{height:20,width:20, marginLeft:Dimensions.get('window').width/2-30}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../../assets/threedot.png')} style={{height:10,width:20, paddingTop:20,marginLeft:10}} />
            </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{justifyContent:'center',alignItems:'center', marginTop:Dimensions.get('window').width/6}}>
          <Pie
              radius={100}
              innerRadius={80}
              sections={[
                {
                  percentage: 10,
                  color: '#C70039',
                },
                {
                  percentage: 20,
                  color: '#44CD40',
                },
                {
                  percentage: 30,
                  color: '#404FCD',
                },
                {
                  percentage: 40,
                  color: '#EBD22F',
                },
              ]}
              dividerSize={0}
              strokeCap={'round'}
            />
            </View>  
            <TouchableOpacity
            style={{alignSelf:'center',}}
            >
            <View style={{width:150, height:42,backgroundColor:'#2A9134',borderRadius:8, justifyContent:'center',alignItems:'center', marginTop:40}}>
            <Text style={{color:'#ffffff',fontSize:14}}>View Expenses</Text>
            </View>
            </TouchableOpacity>

            <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center', marginTop:40}}>
                <View style={{width:Dimensions.get('window').width/2-30, height:280,borderColor:'#DDDDDD',borderWidth:1,borderRadius:8}}>
                    <Text style={{fontWeight:'bold',margin:10,fontSize:12}}>
                        Recent Transaction
                    </Text>

                        <Text style={{fontFamily:'Nunito',fontWeight:'bold',marginLeft:10,lineHeight:22}}>Apollo Pharmacy</Text>
                            <Text style={{fontSize:12,color:'#888888', marginLeft:10,lineHeight:17,marginTop:5}}>Today, 11:06 am</Text>
                            <Text style={{fontFamily:'Nunito',fontWeight:'bold',marginLeft:10,fontSize:20,lineHeight:32,marginTop:10}}>{'\u20B9'}340</Text>

                            <Text style={{fontSize:12,color:'#111111', marginLeft:10,lineHeight:17}}>Balance: {'\u20B9'}90,660 </Text>
                    <View style={{alignItems:'center',justifyContent:'center', marginTop:30}}>
                        <TouchableOpacity style={{width:Dimensions.get('window').width/2-60, height:36,borderColor:'#2A9134',borderWidth:1,borderRadius:8,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#2A9134'}}>
                                VIEW ALL
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width:Dimensions.get('window').width/2-30, height:280,borderColor:'#DDDDDD',borderWidth:1,borderRadius:8,marginLeft:10}}>
                    <Text style={{fontWeight:'bold',margin:10,fontSize:12}}>
                        Monthly spendings
                    </Text>
                    <Text style={{fontSize:12,color:'#111111', marginLeft:10,lineHeight:17,marginTop:5}}>Till today</Text>
                        <Text style={{fontFamily:'Nunito',fontWeight:'bold',marginLeft:10,lineHeight:33,fontSize:22}}>{'\u20B9'}42,000</Text>
                            
                            <Text style={{fontFamily:'Nunito',fontWeight:'bold',marginLeft:10,fontSize:16,lineHeight:22,marginTop:10}}>Spent 42% more than last month</Text>
                            <Text style={{fontSize:12,color:'#888888', marginLeft:10,lineHeight:17,marginTop:5}}>Last month</Text>
                            <Text style={{fontFamily:'Nunito',fontWeight:'bold',marginLeft:10,lineHeight:33,fontSize:22}}>{'\u20B9'}22,000</Text>
                        <View style={{alignItems:'center',justifyContent:'center', marginTop:30}}>
                        <TouchableOpacity style={{width:Dimensions.get('window').width/2-60, height:36,borderColor:'#2A9134',borderWidth:1,borderRadius:8,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#2A9134'}}>
                                COMPARE MONTHS
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{marginLeft:20, marginTop:30}}>
                <Text style={{color:'#111111',fontSize:12,fontWeight:'bold', letterSpacing:0.5}}>ANALYSIS</Text>
            </View>

            <View>
           {/* <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: { min: 5, max: 5 }}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
           />*/}
            </View>

        </ScrollView>
        </View>
          );
      }
}