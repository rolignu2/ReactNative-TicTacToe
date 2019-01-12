import React , {Component }         from 'react';
import {
    View,
    BackHandler,
    Platform,
    Alert
}                                   from 'react-native';
import  styles                      from './styles';
import { TicTacButton }             from '../buttons';
import * as Animatable              from 'react-native-animatable';
import { Toast } from 'native-base';


export default class TicTacMenu extends Component {

    constructor(props){
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this._callExit);
    }


    _new2PlayerGame = ()=>{
        return (
            <Animatable.View animation={'slideInRight'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={' TWO PLAYER GAME '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={()=>{ alert() }}
                />
            </Animatable.View>
        );
    }

    _currentGame = ()=>{
        return (
            <Animatable.View animation={'slideInRight'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={'   CONTINUE GAME   '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={()=>{ alert() }}
                />
            </Animatable.View>
        );
    }

    _options = ()=>{
        return (
            <Animatable.View animation={'slideInLeft'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={'   GAME OPTIONS    '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={()=>{ alert() }}
                />
            </Animatable.View>
        );
    }

    _exit = ()=>{
        return (
            <Animatable.View animation={'slideInLeft'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={' EXIT  '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={this._callExit }
                />
            </Animatable.View>
        );
    }

    _callExit = ()=>{
        Alert.alert('Exit Game', 'Do you want to exit TIC TAC TOE ?',
        [
              {text: 'No', onPress: () =>  Toast.show({ text : "let's continue" , buttonText : 'Yeah' }), style: 'cancel'},
              {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false });
        return true;
    }

    componentWillUnmount = ()=>{
        BackHandler.removeEventListener('hardwareBackPress',  this._callExit);
    }

    render = ()=>{
        return (
            <View style={styles.container}>
                {this._currentGame()}
                {this._new2PlayerGame()}
                {this._options()}
                {this._exit()}
            </View>
        )
    }

}