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
    button_text_symbol : {  
        fontSize : 50,
        fontFamily : 'realpolitik' ,
        paddingHorizontal : 20  
    },
    tictac_col : {
        backgroundColor: 'transparent',
    },
    button_symbol : {  
        fontSize : 50, 
        fontFamily : 'realpolitik' ,
         paddingHorizontal : 20 
     },
     board_grid :{
          marginHorizontal : 20 ,
           marginTop : 30 
    },
    title_start_game : {
        fontFamily : 'realpolitik' ,
        fontSize : 20,
    }
});