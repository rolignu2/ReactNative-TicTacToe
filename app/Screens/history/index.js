
import React , {PureComponent} from 'react';
import TicTacStorage           from '../../Libraries/storage';
import {
    FlatList 
}                               from 'react-native';
import { 
    Container, 
    Content, 
    Spinner
}                               from 'native-base';
import { 
    NoHistory, BodyHistory, HistoryItem
}                                from '../../Components/history';

export default class TicHistory extends PureComponent {

    constructor(props){
        super(props);
        this.storage = new TicTacStorage();
        this.state = {
             data           : null ,
             isLoading      : true ,
             hasNohing      : false 
        }
    }

    componentDidMount = ()=>{
        this.storage.getHistoryData( (values)=>{
             const { status , value } = values;
             if (!status) 
                this.setState({ isLoading : false , hasNohing : true});
             else 
                this.setState({ isLoading : false , data : value });
        });
    }

    _keyExtractor = (item) => item.status.winner.date;

    _renderItem = ( {item} ) =>{
         return  <HistoryItem item={item} />;
    }

    _buildList = ()=>{
        const {data} = this.state;
        return (
            <BodyHistory navigation={this.props.navigation} >
               <FlatList
                    data={data}
                    renderItem ={ this._renderItem }
                    keyExtractor={this._keyExtractor}
               />
            </BodyHistory>
        );
    }

    _noHistory = ()=>{
       return (
            <BodyHistory navigation={this.props.navigation}  >
                <NoHistory/>
            </BodyHistory>
       );
    }

    _loading = ()=>{
        return (
            <BodyHistory navigation={this.props.navigation}  >
                 <Spinner />
            </BodyHistory>
        );
    }

    render = ()=>{
        
        const {hasNohing , isLoading } = this.state;

        if (hasNohing)
            return this._noHistory();
        else if (!isLoading)
            return this._buildList();
        else 
            return this._loading();
    }

}