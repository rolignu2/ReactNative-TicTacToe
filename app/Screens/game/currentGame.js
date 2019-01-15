import React , {Component}          from 'react';
import { StaticMemory }             from '../../Libraries/staticMemory';
import styles                       from './styles';
import {View}                       from 'react-native';
import {
    Container, 
    Grid, 
    Col, 
    Row, 
    Button, 
    Text,
    Title
}                                   from 'native-base';
import * as Animatable              from 'react-native-animatable';
import { TicTacButton }             from '../../Components/buttons';
import { TicSolve }                 from '../../Libraries';
import { TicTacTitle }              from '../../Components/titles';
import PlayerScore                  from '../../Components/player/score';
import TicTacStorage                from '../../Libraries/storage';

const AnimatedRow        =  Animatable.createAnimatableComponent(Row);
const AnimatedTitle      =  Animatable.createAnimatableComponent(Title);


export default class TicCurrentGame extends Component {

    constructor(props){
        super(props);
        this.options        = StaticMemory.getCurrentOptions();
        this.game           = StaticMemory.getCurrentGame();
        this.storage        = new TicTacStorage();     
        this.state = {
            gameOrder       : this.options.type.order ,
            gameBoard       : [],
            playerTurn      : Math.round(Math.random()) === 0 ? 'X' : '0',
            playerName      : "",
            gameStatus      :  0  , // 0 = no started , 1 = started , 2 = end winner  , 3 = tie end 
            game            : this.game.gameData,
            result          : {
                status      : TicSolve.gameStatus.INCOMPLETE,
                winning     : "X",
                winningLine : []
            },
        }
        this.bgColor    = this.options.theme.color;
        this.foreColor  = this.options.theme.back;
    }

    _onPlayerTurn = ( turn = null  ) =>{
         const {playerTurn , game } = this.state;
         if (turn === null ) turn = playerTurn;
         if (game === null) return { turn ,  name : "" };
         if (game.p1.symbol === turn) return { turn , name : game.p1.name };
         if (game.p2.symbol === turn) return { turn , name : game.p2.name };
         return {  turn ,  name : "" };
    }

    _init  = ( newGame = false , status = 0 )=>{

        let {gameOrder , game , playerTurn , playerName } = this.state;
        let  gameBoard   = [];
        let turn         = playerTurn;
        let name         = playerName;
        let result       = {
            status          : TicSolve.gameStatus.INCOMPLETE,
            winning         : "X",
            winningLine     : []
        }

        if (game !== null && !newGame ){
            const { board }  = game.status;
            const player     = this._onPlayerTurn();
            name             = player.name;
           
            if (board instanceof Array){
                let   fgame     = 0;
                gameBoard       = board;

                for (let i in gameBoard){
                    const g = gameBoard[i];
                    if ( g.every( ( c)=>{  return c === 'X' || c === '0';  })){
                        fgame++;
                    }
                }
                if (gameBoard.length === fgame)
                    gameBoard = [];
            }
        }

        if (gameBoard.length === 0 ){
            if ( typeof gameOrder !== 'number')
                gameOrder = 3 ;
        
            for (let i = 0 ; i < gameOrder ; i++ )
                gameBoard.push(new Array(gameOrder).fill(""));
        }

        
        if (newGame){
             const playerResult  = this._onPlayerTurn();
             turn       = playerResult.turn ;
             name       = playerResult.name;
        }


        this.setState({ 
            gameBoard , 
            gameOrder , 
            gameStatus : status ,
            playerTurn : turn ,
            playerName : name,
            result
         });

    }

    _drawLines = ( colIndex , rowIndex  )=>{

        switch(colIndex){
            case 0 :
            case 1 :
                switch(rowIndex){
                    case 0 :
                    case 1 :
                        return { borderRightWidth : 6 , borderBottomWidth : 6 };
                    case 2 :
                        return { borderRightWidth : 6 };
                }
            case 2 :
                switch(rowIndex){
                    case 0 :
                    case 1 :
                        return {borderBottomWidth: 6 }
                }
        }

        return {};
    }

    _createMove = ( row  , col )=>{
       
        const {
            gameBoard , 
            gameOrder ,
            gameStatus ,
            playerTurn,
            game
        }                   = this.state;

        if (gameStatus !== 1 ) return ;

        let gameData        = game;
        let board           = gameBoard;
        let gStatus         = gameStatus;
        board[row][col]     = playerTurn;
        const result        = TicSolve.getResult(gameBoard , playerTurn , gameOrder );
        let nextTurn        = this._onPlayerTurn( playerTurn === 'X' ? '0' : 'X' );
        let keyPlayer       = "p1";

        for (let i in gameData){
            if (i !== "status" && gameData[i].symbol === playerTurn){
                keyPlayer = i;
                break;
            } 
        }

        this.game.gameData.status.board = board;
        this.game.gameData.status.winner.date = new Date();

        switch(result.status){
            case TicSolve.gameStatus.WINNER:
                    gStatus     = 2 ;
                    nextTurn    = this._onPlayerTurn( playerTurn );
                    gameData[keyPlayer].score +=1
                    this.game.gameData.status.winner.symbol = playerTurn;
                    this._saveData(true);
                    break
            case TicSolve.gameStatus.TIE :
                    gStatus = 3;
                    this.game.gameData.status.winner.tie = true;
                    this._saveData(true);
                    break;
            default :
                    this._saveData();
                    break;
        }
        
        this.setState({ 
            gameBoard : board , 
            result ,
            playerTurn : nextTurn.turn , 
            playerName : nextTurn.name ,
            gameStatus : gStatus,
            game       : gameData
        });
    }

    _saveData = (his = false )=> {
        this.storage.setCurrentGame(this.game.gameData);
        if (his) {
            this.storage.setHistoryData(this.game.gameData);
        }
    }

    _buildRowInBoard = (rows , col , heightCol ) =>{
        const { gameOrder , result , gameBoard}     = this.state;
        const heightRow                             = ( heightCol / gameOrder);
        let rowsBoard                               = rows.map( (data , index)=>{

            let stylesRow    = {};
            let animated     = 'fadeInRight'
            let bordered     = false ;
            let disabled     = result.status === TicSolve.gameStatus.INCOMPLETE ? false : true

            if (gameOrder == 3) stylesRow = this._drawLines(col , index);

            switch(index){
                case 0 :
                    animated = 'fadeInLeft'
                case 2 : 
                    animated = 'fadeInUp'
            }

            if (result.winningLine.length !== 0){
                for (let i = 0 ; i < gameOrder ; i++){
                    if (JSON.stringify(result.winningLine[i]) === JSON.stringify([col , index])){
                        bordered = true ;
                        break;
                    }
                } 
            }

            if (!disabled){
                if (gameBoard[col][index] !== "")
                    disabled = true;
            }


            return (
                <AnimatedRow
                     animation={ bordered ? 'rubberBand' : animated}
                     duration={ bordered ? 3000 : 0 }
                     iterationCount={ bordered ? 'infinite' : 1 }
                     key={String("col[" + col + "]" + "[" + index +"]")} 
                     style={[{ backgroundColor : this.bgColor , height : heightRow , borderColor : this.foreColor} , stylesRow]} 
                >
                    <Button
                        onPress={() => this._createMove(col , index) }
                        block
                        transparent
                        bordered={bordered}
                        disabled={disabled}
                        style={{  height : 90 , flex : 1 , marginHorizontal : 5 ,  borderColor : 'red' }} 
                    >
                        <Text style={[{ color : this.foreColor } , styles.button_symbol]} >{data}</Text>
                    </Button>
                </AnimatedRow>
            );
        });

        return rowsBoard;
    }

    _buildBoard = ()=>{

       
        const {gameBoard , gameOrder} = this.state;

        if (gameBoard.length === 0) return null;
        
        const heightCol     = (100 * gameOrder );
        let boardRender = gameBoard.map( ( rows , colIndex ) =>{
            return (
                <Col key={String("row[" + colIndex +"]")} style={[{ height: heightCol  } , styles.tictac_col ]}>
                    { this._buildRowInBoard(rows , colIndex , heightCol ) }
                </Col>
            );
        });

        return ( boardRender );
    }

    _actionButton = ()=>{
        const { gameStatus } = this.state;

        switch(gameStatus){
            case 0 : 
                return <TicTacButton style={{ marginHorizontal : 10 }} title={'START'} action={()=>{ this.setState({ gameStatus : 1 }) }} />
            case 1 :
                return <TicTacButton style={{ marginHorizontal : 10 }} title={'RESTART'} action={ ()=>{  this._init(true , 0 );  }  } />
            case 2 : 
            case 3 :
                return <TicTacButton style={{ marginHorizontal : 10 }} title={'AGAIN'} action={()=>{ this._init(true , 1 ); } } />
        }

        return null;
    }

    _boardTitleStatus = ( )=>{

        const {gameStatus , playerName , result } = this.state;
        let title = "";

        switch(gameStatus){
            case 0 :
                title = 'START THE GAME PLEASE';
                break;
            case 2 : 
                title = playerName  + ' IS THE WINNER';
                break;
            case 3 :
                title  = " IT'S A TIE "
                break;
            default : 
                title = playerName + " IT'S YOUR TURN " ;
                break;
        }

        return  <AnimatedTitle animation={'pulse'} iterationCount={'infinite'} style={[styles.title_start_game , { color :'red' }]} >{title}</AnimatedTitle> 
    
    }

    componentDidMount = ()=>{
        this._init();
    }

    render = ()=>{

        const {navigation }     = this.props;
        const { game }          = this.state;

        return (
            <Container style={{ 
                backgroundColor : this.bgColor ,
                 marginColor : 'blue'  , 
                 justifyContent : 'center',
                 alignItems : 'center'  
            }}>
                <View>
                    <View style={{ alignItems : 'center' , marginTop : 10 }} >
                         <TicTacTitle color={this.foreColor} />
                    </View>
                    <View style={{ marginBottom : 20 }}>
                         {this._boardTitleStatus()}
                    </View>
                    <View style={{flexDirection : 'row'}}>
                        <PlayerScore color={this.foreColor} data={ game !== null ? game.p1 : null }  />
                        <PlayerScore color={this.foreColor} data={ game !== null ? game.p2 : null} direction={'row'} />
                    </View>
                </View>
                <Grid style={styles.board_grid}>
                        {this._buildBoard()}
                </Grid>
                <View style={{ flexDirection : 'row' }}>
                    <TicTacButton title={'MENU'} action={ ()=>{ navigation.navigate('Home'); }} />
                    {this._actionButton()}
                </View>
            </Container>
        );
    }

}