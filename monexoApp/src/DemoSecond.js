import React from 'react'
import { View,Text } from 'react-native'

export default class DemoSecond extends React.Component {
    constructor(props){
        super(props)
        console.log("constructer demo 2",props)
        this.state={
            name:'',
            id:1
        }
    }
componentDidMount(){
    console.log("componentDidMount")
    
}


    render(){
        
        return(
            <View style={{width:"100%",height:100,borderWidth:1,flexDirection: 'row',backgroundColor: '#41A17F',paddingTop:10}}>
                <View style={{flexDirection:'row'}}>
                  
                  <Text>
                      hello Demo second {this.props.data}
                  </Text>
                </View>    
            </View>
        )
    }
}

