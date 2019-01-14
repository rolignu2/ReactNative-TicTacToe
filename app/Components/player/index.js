import React , {Component}      from 'react';
import styles                   from './styles';
import {View}                   from 'react-native';
import * as Animatable          from 'react-native-animatable';
import { Text, Item, Input, Button } from 'native-base';
import { TicTacButton } from '../buttons';


export default class Player extends Component{

    static getDerivedStateFromProps = (props)=>{

        if (props.selected === null )
            return {visible: props.visible, selected : props.selected };
        
        return {
            visible     : props.visible,
            selected    : props.selected,
            symbol      : props.selected
        }
    }
    
    constructor(props){
        super(props);
        this.state = {
            title           : props.title,
            visible         : props.visible   !== undefined ? props.visible  : true  ,
            callback        : props.callback  !== undefined ? props.callback : ()=>{},
            name            : "",
            symbol          : "",
            numberState     : props.numberState
        }
    }

    _input = () =>{
        return (
            <Item style={{backgroundColor : 'white' }} rounded  >
                <Input 
                    maxLength={10}
                    style={{ textAlign : 'center' , opacity : .8}} 
                    placeholder={'Type your name please '}
                    value={this.state.name}
                    onChangeText={ (text)=>{ this.setState({ name : text }) } }
                  />
            </Item>
        );
    }

    _oldNames = () =>{

    }

    _button  = ()=>{
        const {numberState  , name  , symbol } = this.state;
        let disabled = name === "" ? true : false;
        if (!disabled)
            disabled = symbol === "" ? true : false ;

        return (
            <TicTacButton
                    disabled={disabled}
                    bordered={disabled}
                    title={ numberState  === 1 ? '  NEXT PLAYER  ' : ' PLAY GAME  ' } 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={ ()=> this.state.callback( numberState  , name , symbol) }
            />
        );
    }

    _chooseOne = ()=>{
        const {selected , symbol } = this.state;
        if (selected !== null) return null;
        return (
            <View style={[styles.symbols_view]} >
                 <Animatable.View 
                        animation={ symbol === "X" ? "pulse" : "bounceIn" }  
                        style={{ marginHorizontal : 20   }}
                        iterationCount={symbol === "X" ? 'infinite' : 1 }
                  >
                    <Button 
                        onPress={()=>{ this.setState({ symbol : "X" }) }} 
                        bordered={ symbol === "X" ? false  : true  }
                        light 
                        style={[{ width : 80 , height : 80  }]} 
                    >
                        <Text style={styles.symbols_text} >{ ' X ' }</Text>
                    </Button>
                 </Animatable.View>
                 <Animatable.View
                     animation={ symbol === "0" ? "pulse" : "bounceIn" }  
                     iterationCount={symbol === "0" ? 'infinite' : 1 }
                 >
                    <Button
                        onPress={()=>{ this.setState({ symbol : "0" }) }}
                        bordered={ symbol === "0" ? false  : true  }
                        light
                        style={{ width : 80 , height : 80  }} >
                        <Text style={styles.symbols_text} >{ ' 0  ' }</Text>
                    </Button>
                 </Animatable.View>
            </View>
        );
    }

    render = ()=>{
        const {visible , title  } = this.state;
        if (!visible) return null;
       
        return (
            <Animatable.View duration={2000} animation={'bounceIn'}>
                <View style={{ flexDirection:'column' , alignItems : 'center' , marginVertical : 10 }}>
                    <View>
                        <Text style={styles.player_title}>{ title + " Type your name " }</Text>
                    </View>
                    <View style={styles.input_view}>
                         {this._input()}
                    </View>
                    <View style={{ flex : 1 , width : '100%' }}>
                        <View style={{ marginVertical : 30  }} >
                            <Text style={styles.player_title}>{ "choose a symbol" }</Text>
                        </View>
                         {this._chooseOne()}
                    </View>
                    <View style={{ flex : 1 , width : '100%' , alignItems : 'center' }}>
                         {this._button()}
                    </View>
                </View>
            </Animatable.View>
        )
    }

}