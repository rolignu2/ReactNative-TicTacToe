import React                        from 'react';
import { View }                     from "react-native";
import { 
    Button,
     Icon,
     Text  
}                                   from "native-base";
import styles                       from './styles';

export const TicTacButton = props =>{
    const {title , icon , action , style , disabled , bordered = false } = props;
    return (
        <View style={styles.container}>
            <Button bordered={bordered} light disabled={disabled} onPress={action} iconLeft rounded style={[ bordered ? {  } : style ]} >
                <Icon type={'FontAwesome'} name={icon} style={[ { fontSize : 15 } , style ]} />
                <Text style={[ !bordered ? styles.title_text : styles.title_text_bordered ]}>{title}</Text>
            </Button>
        </View>
    );
}

// title       = "",
//     icon        = "",
//     action      = ()=>{},
//     style       = { backgroundColor : 'transparent' } , 
//     disabled    = false 