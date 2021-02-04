import React from 'react'
import { View,Text } from 'react-native'

export default class Header extends React.Component {
    render(){
        return(
            <View style={{width:"100%",height40,flexDirection: 'row',backgroundColor: '#41A17F',paddingTop:10}}>
                <View style={{flexDirection:row}}>
                    <Image style={{height:14, width:14, Top:8,Left:330, color:'#A7FFE0'}}source={require('../../assets/square.png')} />
                    <Image style={{height:14, width:14, Top:8,Left:330, color:'#A7FFE0'}}source={require('../../assets/circle.png')} />
                    <Image style={{height:14, width:14, Top:8,Left:330, color:'#A7FFE0'}}source={require('../../assets/triangle.png')} />
                </View>    
            </View>
        )
    }
}

