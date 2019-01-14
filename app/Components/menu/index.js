import React , {Component }         from 'react';
import {
    View,
    BackHandler,
    Alert
}                                   from 'react-native';
import  styles                      from './styles';
import { TicTacButton }             from '../buttons';
import * as Animatable              from 'react-native-animatable';
import { Toast, Text }              from 'native-base';
import GameOptions                  from './gameOptions';
import { StaticMemory }             from '../../Libraries/staticMemory';


export default class TicTacMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible : false 
        };

        BackHandler.addEventListener('hardwareBackPress', this._callExit);
        this.game = StaticMemory.getCurrentGame();
    }

    _beforeNewGame = ()=>{

        const {navigation} = this.props;
        if (this.game.existGame){
            Alert.alert('Start a new game ', 'Do you want to delete the current game?',
            [
                  {text: 'No', onPress: ()  =>  Toast.show({ text : "Continue Game" , buttonText : 'Yeah' }), style: 'cancel'},
                  {text: 'Yes', onPress: () => navigation.navigate('NewGameScreen') },
            ],
            { cancelable: false });
        }else{
            navigation.navigate('NewGameScreen') 
        }
       
    }


    _new2PlayerGameButton = ()=>{
        return (
            <Animatable.View animation={'slideInRight'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={' TWO PLAYER GAME '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={this._beforeNewGame}
                />
            </Animatable.View>
        );
    }

    _currentGameButton = ()=>{
        const {navigation} = this.props;
        return (
            <Animatable.View animation={'slideInRight'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={'   CONTINUE GAME   '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={ () => navigation.navigate('CurrentGameScreen') }
                />
            </Animatable.View>
        );
    }

    _optionsButton = ()=>{
        return (
            <Animatable.View animation={'slideInLeft'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={'   GAME OPTIONS    '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={ () => this.setState({ modalVisible : true  }) }
                />
            </Animatable.View>
        );
    }

    _historyButton = ()=>{
        const {navigation} = this.props;
        return (
            <Animatable.View animation={'slideInLeft'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={'   GAME HISTORY    '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={ () => navigation.navigate('HistoryScreen') }
                />
            </Animatable.View>
        );
    }

    _exitButton = ()=>{
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

    _modalOptions = ()=>{
         return <GameOptions 
            isVisible={this.state.modalVisible} 
            callback={ ()=> this.setState({ modalVisible : false  }) } 
         />
    }



    componentWillUnmount = ()=>{
        BackHandler.removeEventListener('hardwareBackPress',  this._callExit);
    }

    render = ()=>{
        return (
            <View style={styles.container}>
                {this._currentGameButton()}
                {this._new2PlayerGameButton()}
                {this._optionsButton()}
                {this._historyButton()}
                {this._exitButton()}
                {this._modalOptions()}
            </View>
        )
    }

}