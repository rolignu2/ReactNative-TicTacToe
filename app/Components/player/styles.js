import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container : {
        flex : 1 ,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        alignContent : 'center'
    },
    bg : {
        width : '100%' ,
        height : '100%' ,
        flex: 1,
        alignItems: 'center',
        resizeMode : 'cover'
    },
    powered : {
        fontFamily : 'realpolitik',
        color : 'white',
        elevation : 2 ,
    },
    player_title : {
        fontFamily : 'realpolitik',
        color : 'white',
        elevation : 2 ,
        fontSize : 20,
        textAlign : 'center'
    },
    input_view : {
         flex : .1 ,
         width : '100%' , 
         marginVertical : 30
    },
    symbols_text : { 
        fontSize : 25 , 
        textAlign : 'center' ,
        fontFamily : 'realpolitik',
     },
     symbols_view : { 
         flexDirection : 'row' , 
         alignItems : 'center' , 
         justifyContent : 'center' , 
         marginBottom : 30
    },
    player_txt_name_score: {
        fontSize : 15 , 
        //textAlign : 'center' ,
        fontWeight : 'bold',
        fontFamily : 'realpolitik',
    },
    player_txt_score: {
        fontSize : 15 , 
        //textAlign : 'center' ,
        fontWeight : 'normal',
        fontFamily : 'realpolitik',
    }
});