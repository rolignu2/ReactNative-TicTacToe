import  React , {Component}     from 'react';
import {
    ImageBackground,
}                               from 'react-native';
import { 
    Container, 
    Text,
    View
}                               from 'native-base';
import styles                   from './styles';
import { _IMAGES_ }             from '../../Config';
import { TicTacTitle } from '../../Components/titles';
import TicTacMenu from '../../Components/menu';


export default class HomeScreen extends Component {

    constructor(props){
        super(props);
    }


    render = ()=>{
        return (
            <Container style={styles.container}>
                 <ImageBackground style={styles.bg} source={_IMAGES_.background} >
                     <TicTacTitle />
                     <View style={{ marginBottom: 30 }}>
                        <Text style={styles.powered} >{'Powered by Rolando And Applaudo'}</Text>
                     </View>
                     <TicTacMenu navigation={this.props.navigation} />
                 </ImageBackground>
            </Container>
        );
    }

}

