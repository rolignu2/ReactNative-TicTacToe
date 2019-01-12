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
    }
});