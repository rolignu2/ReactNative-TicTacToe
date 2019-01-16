import React  from 'react';

import {View , ImageBackground}   from 'react-native';
import { ListItem, Container , Text, Left, Body, Right }   from 'native-base';
import { TicTacTitle }          from '../titles';
import { _IMAGES_ } from '../../Config';
import styles                   from './styles';
import { TicTacButton } from '../buttons';



export const HistoryItem = props => {
    const {item} = props;
    const date      = item.status !== undefined ? new Date(item.status.winner.date) : new Date();
    const whoWins   = () =>{

         if (item.status.winner.tie ) return { 
             winner : " it's a tie " , 
             data : { symbol : "X/0" , 
             score :  item.p1.score + "-" + item.p2.score 
         }};

         const winSymbol = item.status.winner.symbol;
         let   winner    = "";
        
         if (item.p1.symbol === winSymbol)
            winner = "p1"
         else 
            winner = "p2";
            
         return  { 
             winner : item[winner].name + " is the winner " , 
             data : { symbol : winSymbol , score : item.p1.score + "-" + item.p2.score  } 
        }

    }
    const { winner , data } = whoWins();

    return (
        <ListItem noBorder  style={{ flex : 1 , width:'100%' , height : 60 ,  marginVertical : 5 }} icon>
            <Left style={{flexDirection : 'column'  }}>
                <Text style={{ color : 'white' ,fontWeight : 'bold' }}>{ winner }</Text>
                <Text style={{ color : 'white' }}>{data.score}</Text>
                <Text note style={{ color : 'white' , fontWeight : 'bold' }}>{ item.p1.name + "(" + item.p1.symbol +")" + " Vs " + item.p2.name + "(" + item.p2.symbol +")" } </Text>
            </Left>
            <Body style={{flexDirection : 'column'}} >
                <Text style={{ color : 'white'  }}>{ "win " +  data.symbol}</Text>
            </Body>
            <Right>
                  <Text note style={{ color : 'white' , fontWeight : 'bold'}} >{  moment(date).fromNow() }</Text>
            </Right>
        </ListItem>
    );
}


export const BodyHistory = props =>{

    return (
        <Container>
            <ImageBackground style={styles.bg} source={_IMAGES_.background} >
                     <TicTacTitle />
                     <View style={{ marginBottom:  5 }}>
                        <Text style={styles.text_history} >{'GAME HISTORY'}</Text>
                     </View>
                     {props.children}
                     <View style={{alignItems : 'center'}} >
                        <TicTacButton title={'GO BACK '} action={()=>{ props.navigation.goBack(); }} />
                    </View>
            </ImageBackground>
        </Container>
    );

}

export const NoHistory = props =>{
     return (
        <View >
            <View style={{ marginVertical:  40 }}>
                 <Text style={styles.text_history} >{' THERE IS NO HISTORY '}</Text>
            </View>
        </View>
     );
}


const  moment = require('moment');