import React from 'react'
import { View,Text } from 'react-native'
import DemoSecond from './DemoSecond'

export default class Demo extends React.Component {
    constructor(props){
        super(props)
        console.log("constructer")
        this.state={
            name:'sharvan choudhary sdfdsfdsfsd',
            id:1
        }
    }
componentDidMount(){
    console.log("componentDidMount")
    setInterval(() => {
        this.setState({
            id:this.state.id+1
        })
    }, 2000);
    
}


    render(){
        console.log("render",this.state.id)
        return(
            <View style={{width:"100%",height:140,flexDirection: 'row',backgroundColor: '#41A17F',paddingTop:10}}>
                <View style={{flexDirection:'row'}}>
                    
                  <Text>
                      hello {this.state.id}
                  </Text>
                  <Text>sdfdsf</Text>
                </View>   
                <DemoSecond data={this.state.name}></DemoSecond> 
            </View>
        )
    }
}

