import {StyleSheet , Platform} from 'react-native';


export default StyleSheet.create({
    title_row : {
        flexDirection : 'row'
    },
    title_view :{
        // marginTop    : '25%',
        marginTop : 50 ,
        marginBottom : 50,
        flexDirection : 'row'
    },
    title_text : {
        fontFamily : Platform.OS == 'ios' ? 'TheHistoriaDemo' : 'tictac',
        fontSize : 60
    }
});