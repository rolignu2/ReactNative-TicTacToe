
import React , {Component}              from 'react';
import {View}                           from 'react-native';
import {
    Text, Form, Picker, Button, Toast 
}                                       from 'native-base';
import TicModal                         from '../commons/TicModal';
import styles                           from './styles'
import { StaticMemory }                 from '../../Libraries/staticMemory';
import TicTacStorage                    from '../../Libraries/storage';

export default class GameOptions extends Component {

    constructor(props){
        super(props);
        this.memoryOptions    = StaticMemory.defaultGameOptions;
        this.storageOptions   = StaticMemory.getCurrentOptions();
        this.storage          = new TicTacStorage();
        this.state = {
            callback            : props.callback                    !== undefined ? props.callback : ()=>{},
            gameTypeSelected    : this.storageOptions.type          !== undefined ? String(this.storageOptions.type.order) : "3",
            gameThemeSelected   : this.storageOptions.theme.color
        }
    }

    _loadGameTypes = ()=>{
        return this.memoryOptions.gameTypes.types.map( (data)=>{
            return (
                <Picker.Item key={Math.random()} label={data.name} value={String(data.order)} />
            );
        })
    }


    _loadGameTheme = ()=>{
        return this.memoryOptions.theme.types.map( (data)=>{
            return (
                <Picker.Item key={Math.random()} label={data.name} value={data.color} />
            );
        })
    }


    _changeTheme = (value)=>{
        this.setState({ gameThemeSelected : value });
        this.memoryOptions.theme.types.map( (theme) =>{
              if (value === theme.color){
                  StaticMemory.setCurrentTheme(theme);
                  this.storage.setGameOptions(this.storageOptions.type , theme );
                  return;
              }
        }); 
    }


    render = ()=>{

        const {isVisible } = this.props;

        return (
            <TicModal
                isVisible={isVisible}
                backCallback={ this.state.callback}
             >
            
                <View style={{ alignItems : 'center' }}>
                    <Text style={styles.modal_options_title}>{'GAME OPTIONS'}</Text>
                </View>

                <View style={{ marginTop : 50 , alignItems : 'center' }}>
                     <Form>
                         <Text style={styles.game_options_select}>{this.memoryOptions.gameTypes.name}</Text>
                          <Picker
                             mode="dropdown"
                             placeholder="Select One"
                             placeholderStyle={{ color: "#2874F0" }}
                             note={false}
                             selectedValue={this.state.gameTypeSelected}
                             onValueChange={ ()=>{}}
                          >
                                {this._loadGameTypes()}
                          </Picker>
                          <Text style={styles.game_options_select}>{this.memoryOptions.theme.name}</Text>
                          <Picker
                             mode="dropdown"
                             placeholder="Select Theme"
                             placeholderStyle={{ color: "#2874F0" }}
                             note={false}
                             selectedValue={this.state.gameThemeSelected}
                             onValueChange={ this._changeTheme }
                          >
                                {this._loadGameTheme()}
                          </Picker>

                          <View style={{ alignItems : 'center' }}>
                                <Button onPress={ ()=>{ 
                                    this.storage.cleanHistoryData();
                                    Toast.show({ text : " History cleaned " , buttonText : "Ok" })
                                 } } style={{ marginTop : 50 , marginBottom : 50 }} rounded danger >
                                        <Text>
                                            {' Clear History data '}
                                        </Text>
                                </Button>
                                <Button onPress={this.state.callback}  rounded bordered >
                                    <Text>
                                        {' Close Options '}
                                    </Text>
                                </Button>
                          </View>

                          
                     </Form>
                </View>
              
            </TicModal>
         );
    }

}