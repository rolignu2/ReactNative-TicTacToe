

import React, {Component} from 'react';
import {View}             from 'react-native';
import { AppContainer } from './app/Config/navigator';


export default class App extends Component {

  render() {
    return (
      <View>
         <AppContainer />
      </View>
    );
  }
}


