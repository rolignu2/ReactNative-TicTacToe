import React , { Component } from 'react';
import {View}                from 'react-native';
import { Text }              from 'native-base';
import styles                from './styles';

export default class PlayerScore extends Component {


    static getDerivedStateFromProps = (props) =>{
        return {
             data   : props.data        !== undefined ? props.data : null 
        }
    }

    constructor(props){
        super(props);
        this.state = {
            data        : props.data        !== undefined ? props.data : null ,
            direction   : props.direction   !== undefined ? props.direction : 'row-reverse',
            color       : props.color       !== undefined ? props.color  : 'white'
        }
    }


    render = ()=>{
        
        const {data , direction , color } = this.state;
        console.log("player state " , this.state);
        if (data == null ) return null;
        return (
            <View style={{ flexDirection : direction }} >
                <View style={{ marginHorizontal : 20}}>
                    <Text style={[styles.player_txt_name_score ,{ color : color } ]}>{'Name : Rolando'}</Text>
                    <Text style={[styles.player_txt_score ,{ color : color } ]} >{'Score : 0' }</Text>
                    <Text style={[styles.player_txt_score ,{ color : color } ]} >{'Symbol : X' }</Text>
                </View>
            </View>
        )
    }

}