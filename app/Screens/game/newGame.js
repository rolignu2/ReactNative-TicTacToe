
import  React , {Component}     from 'react';
import {ImageBackground}        from 'react-native';
import { Container}             from 'native-base';
import styles                   from './styles';
import { _IMAGES_ }             from '../../Config';
import { TicTacTitle }          from '../../Components/titles';
import Player                   from '../../Components/player';
import { StaticMemory }         from '../../Libraries/staticMemory';
import TicTacStorage from '../../Libraries/storage';

export default class TicNewGame extends Component {

    constructor(props){
        super(props);
        this.state = {
            playerOneVisible    : true , 
            playerTwoVisible    : false ,
            oldNames            : [],
            playerOneSelected   : null ,
            playerTwoSelected   : null ,
        }
        this.dataGame       = StaticMemory.defaultGameOptions.game;
        this.storage        = new TicTacStorage();
    }

    _callback = ( numberState  , name , symbol   )=>{
        switch(numberState) {
            case 1 :
                this.dataGame.p1.name       = name;
                this.dataGame.p1.symbol     = symbol;
                this.setState({ 
                        playerOneVisible : false ,
                        playerTwoVisible : true  ,
                        playerOneSelected : symbol,
                        playerTwoSelected : symbol === "X" ? "0" : "X"
                });
                break;
            case 2 :
                this.dataGame.p2.name       = name;
                this.dataGame.p2.symbol     = symbol;
                const {navigation}          = this.props;
                this.storage.setCurrentGame(this.dataGame)
                navigation.navigate("CurrentGameScreen" );
                break;
        }
    }

    render = ()=>{
        const { 
            playerOneVisible ,
            playerTwoVisible , 
            oldNames,
            playerOneSelected,
            playerTwoSelected
        }                   = this.state;
        return (
            <Container style={styles.container}>
                 <ImageBackground style={styles.bg} source={_IMAGES_.background} >
                     <TicTacTitle />
                     <Player selected={playerOneSelected} oldNames={oldNames} visible={playerOneVisible} numberState={1} title={'Player 1'} callback={this._callback} />
                     <Player selected={playerTwoSelected} oldNames={oldNames} visible={playerTwoVisible} numberState={2}  title={'Player 2'} callback={this._callback} />
                 </ImageBackground>
            </Container>
        );
    }

}