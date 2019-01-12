import  React , {Component}     from 'react';
import {
    ImageBackground,
}                               from 'react-native';
import { 
    Container, 
}                               from 'native-base';
import styles                   from './styles';
import { _IMAGES_ }             from '../../Config';
import { TicTacTitle } from '../../Components/titles';


export default class HomeScreen extends Component {

    constructor(props){
        super(props);
    }


    render = ()=>{
        return (
            <Container style={styles.container}>
                 <ImageBackground style={styles.bg} source={_IMAGES_.background} >
                     <TicTacTitle />
                 </ImageBackground>
            </Container>
        );
    }

}

