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

const AnimatedRow       =  Animatable.createAnimatableComponent(Row);
const AnimatedTitle     =  Animatable.createAnimatableComponent(Title);

export default class TicCurrentGame extends Component {

    constructor(props){
        super(props);
        this.options    = StaticMemory.getCurrentOptions();
        this.state = {
            gameOrder       : this.options.type.order ,
            gameBoard       : [],
            playerTurn      : Math.round(Math.random()),
            gameStatus      : 0 , // 0 = no started , 1 = started , 2 = end 
            currentPlayer   : {
                name        : "Player 1",
                score       : 0 ,
                symbol      : "X",
                date        : new Date(),
                status      : 0,
                moves       : []
            },
            result          : {
                status      : TicSolve.gameStatus.INCOMPLETE,
                winning     : "X",
                winningLine : []
            },
        }
        this.bgColor    = this.options.theme.color;
        this.foreColor  = this.options.theme.back;
    }

    _init  = ()=>{

        let {gameOrder } = this.state;
        let  gameBoard   = [];

        if ( typeof gameOrder !== 'number')
            gameOrder = 3 ;
        
        for (let i = 0 ; i < gameOrder ; i++ )
                gameBoard.push(new Array(gameOrder).fill(""));
        

        this.setState({ gameBoard , gameOrder  });

    }

    componentDidMount = ()=>{
        this._init();
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
            currentPlayer , 
            gameOrder ,
             gameStatus 
        }                   = this.state;

        if (gameStatus !== 1 ) return ;

        let board           = Object.assign(gameBoard , {});
        board[row][col]     = currentPlayer.symbol;
        const result        = TicSolve.getResult(gameBoard , currentPlayer.symbol , gameOrder );

        this.setState({ gameBoard : board , result });
    }

    _buildRowInBoard = (rows , col , heightCol ) =>{
        const { gameOrder , result}      = this.state;
        const heightRow                 = (heightCol / gameOrder);
        let rowsBoard                   = rows.map( (data , index)=>{

            let stylesRow    = {};
            let animated     = 'fadeInRight'
            let bordered     = false ;
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

            return (
                <AnimatedRow
                     animation={animated}
                     delay={20}
                     duration={1000}
                     key={String("col[" + col + "]" + "[" + index +"]")} 
                     style={[{ backgroundColor : this.bgColor , height : heightRow , borderColor : this.foreColor} , stylesRow]} 
                >
                    <Button 
                        onPress={() => this._createMove(col , index) }
                        block
                        transparent
                        bordered={bordered}
                        disabled={result.status === TicSolve.gameStatus.INCOMPLETE ? false : true }
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
                return <TicTacButton style={{ marginHorizontal : 10 }} title={'STOP'} action={ ()=>{ this.setState({ gameStatus : 2 }) }  } />
            case 2 : 
                return <TicTacButton style={{ marginHorizontal : 10 }} title={'RESTART'} action={()=>{ this.setState({ gameStatus : 1 }) } } />
        }

        return null;
    }

    render = ()=>{

        const {navigation } = this.props;
        const {gameStatus}  = this.state;
        
        return (
            <Container style={{ 
                backgroundColor : this.bgColor ,
                 marginColor : 'blue'  , 
                 justifyContent : 'center',
                 alignItems : 'center'  
            }}>
                <View>
                    <TicTacTitle color={this.foreColor} />
                    { gameStatus !== 1 ? <AnimatedTitle animation={'pulse'} iterationCount={'infinite'} style={[styles.title_start_game , { color :'red' }]} >{'START THE GAME PLEASE'}</AnimatedTitle> : null  }
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