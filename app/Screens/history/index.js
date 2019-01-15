
import React , {PureComponent} from 'react';
import TicTacStorage            from '../../Libraries/storage';

export default class TicHistory extends PureComponent {

    constructor(props){
        super(props);
        this.storage = new TicTacStorage();
    }


    render = ()=>{
        return null;
    }

}