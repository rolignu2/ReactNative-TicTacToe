import React                    from 'react';
import * as Animatable          from 'react-native-animatable';
import { 
    View, 
    Text 
}                               from 'native-base';
import styles                   from './styles';


export const TicTacTitle = ()=>{
    return (
        <View style={styles.title_view}>
                <Animatable.View animation={'bounceIn'} duration={2000} delay={0} style={[styles.title_row , { marginTop : 20  }]}>
                        <Text style={styles.title_text}>
                            {' TIC '}
                        </Text>
                    </Animatable.View>
                    <Animatable.View animation={'bounceIn'} duration={2000} delay={800} style={[styles.title_row , { marginBottom : 20  }]}>
                        <Text style={styles.title_text}>
                            {' TAC '}
                        </Text>
                    </Animatable.View>
                    <Animatable.View animation={'bounceIn'} duration={2000} delay={1600} style={[styles.title_row , { marginTop : 20  }]}>
                        <Text style={styles.title_text}>
                            {' TOE '}
                        </Text>
                    </Animatable.View>
        </View>
    );
}