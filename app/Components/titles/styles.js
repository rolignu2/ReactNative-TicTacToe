import {StyleSheet , Platform} from 'react-native';


export default StyleSheet.create({
    title_row : {
        flexDirection : 'row'
    },
    title_view :{
        // marginTop    : '25%',
        marginVertical : 100 ,
        flexDirection : 'row'
    },
    title_text : {
        fontFamily : Platform.OS == 'ios' ? 'TheHistoriaDemo' : 'tictac',
        color : 'white',
        fontSize : 60
    }
});