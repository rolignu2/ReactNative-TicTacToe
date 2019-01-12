

import React, {Component} from 'react';
import {View}             from 'react-native';
import { AppContainer } from './app/Config/navigator';
import { Root } from 'native-base';


export default class App extends Component {

  render() {
    return (
       <Root>
          <AppContainer />
       </Root>
    );
  }
}


