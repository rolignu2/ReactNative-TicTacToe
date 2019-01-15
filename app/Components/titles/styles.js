import {StyleSheet , Platform} from 'react-native';


export default StyleSheet.create({
    title_row : {
        flexDirection : 'row'
    },
    title_view :{
        // marginTop    : '25%',
        marginTop : 25 ,
        marginBottom : 25,
        flexDirection : 'row'
    },
    title_text : {
        fontFamily : Platform.OS == 'ios' ? 'TheHistoriaDemo' : 'tictac',
        fontSize : 60
    }
});