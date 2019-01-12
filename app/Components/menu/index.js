import React , {Component }         from 'react';
import {
    View,
    BackHandler,
    Alert
}                                   from 'react-native';
import  styles                      from './styles';
import { TicTacButton }             from '../buttons';
import * as Animatable              from 'react-native-animatable';
import { Toast, Text }                    from 'native-base';
import TicModal from '../commons/TicModal';


export default class TicTacMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible : false 
        };

        BackHandler.addEventListener('hardwareBackPress', this._callExit);
    }


    _new2PlayerGameButton = ()=>{
        const {navigation} = this.props;
        return (
            <Animatable.View animation={'slideInRight'} duration={500} delay={100} >
                <TicTacButton
                    disabled={false}
                    title={' TWO PLAYER GAME '} 
                    style={{ opacity : .8 , backgroundColor : 'white' }} 
                    action={ () => navigation.navigate('NewGameScreen') }
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
        return (
            <TicModal
                isVisible={this.state.modalVisible}
                backCallback={()=> this.setState({ modalVisible : false  }) }
            >
                
               <View style={{ alignItems : 'center' }}>
                    <Text style={styles.modal_options_title}>{'GAME OPTIONS'}</Text>
               </View>
                  
            </TicModal>
        );
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