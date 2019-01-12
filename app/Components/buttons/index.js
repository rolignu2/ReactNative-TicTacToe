import React                        from 'react';
import { View }                     from "react-native";
import { 
    Button,
     Icon,
     Text  
}                                   from "native-base";
import styles                       from './styles';

export const TicTacButton = props =>{
    const {title , icon , action , style , disabled} = props;
    return (
        <View style={styles.container}>
            <Button disabled={disabled} onPress={action} iconLeft rounded style={[style ]} >
                <Icon type={'FontAwesome'} name={icon} style={[ { fontSize : 15 } , style ]} />
                <Text style={styles.title_text}>{title}</Text>
            </Button>
        </View>
    );
}

// title       = "",
//     icon        = "",
//     action      = ()=>{},
//     style       = { backgroundColor : 'transparent' } , 
//     disabled    = false 