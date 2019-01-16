

import React, {Component}           from 'react';
import { AppContainer }             from './app/Config/navigator';
import { Root, Container, Spinner }                     from 'native-base';
import TicTacStorage                from './app/Libraries/storage';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state =  {
      isLoading : true 
    }

    TicTacStorage.getInstance();
    this.storage = new TicTacStorage();
  }

  componentDidMount = ()=>{
    this.storage.verifyStorage( ()=>{ this.setState({ isLoading : false  }) } );
  }

  render =() => {

    const {isLoading} = this.state;

    if (isLoading) return (
       <Container style={{ flexDirection : 'row' , justifyContent : 'center' , alignItems : 'center' }}>
           <Spinner />
       </Container>
    )

    return (
       <Root>
          <AppContainer />
       </Root>
    );
  }
}


