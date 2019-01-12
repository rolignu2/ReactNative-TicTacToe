import React , {Component} from 'react';
import {
    StatusBar,
    View      
}                           from 'react-native';
import SearchHeader         from 'react-native-search-header';
import * as Animatable      from 'react-native-animatable';
import styles               from './styles'
import {
    Header, 
    Left,
    Body, 
    Right,
    Title,
    Subtitle,
    Container,
    Button,
    Icon,
}                           from 'native-base';

export class  AppHeader  extends Component {

    static getDerivedStateFromProps = ( props ) =>{
        return {
            title       : props.title       !== undefined ? props.title         : "",
            subtitle    : props.subtitle    !== undefined ? props.subtitle      : ""
        };
    }

    constructor(props){
        super(props);
        this.state = {
            isSearch            : false,
            title               : "",
            subtitle            : "",
            callbackSearch      : props.callBackSearch !== undefined ? props.callBackSearch: ()=>{}
        }
    }

    _press = ()=>{
        this.setState( (state )=>{
            return ({
                    isSearch : !state.isSearch
            })
        })
    }

    _header = ()=> {
        const {isSearch , title , subtitle } = this.state;
        if (isSearch) return null;
        return (
            <AnimaHeader 
                animation={'fadeIn'}
                iosBarStyle={'dark-content'} 
                androidStatusBarColor={'#402F3F'} 
                style={{ backgroundColor : '#402F3F' , paddingTop : 5 }}
            >
                <Left>
                    <Button onPress={ ()=>{ alert("COMING SOON ") } } transparent>
                        <Icon style={styles.iconSearch} type={'FontAwesome'} name={'bars'} />
                     </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>{title}</Title>
                    <Subtitle style={styles.subtitle}>{subtitle}</Subtitle>
                </Body>   
                <Right>
                     <Button onPress={this._press} transparent>
                        <Icon style={styles.iconSearch} type={'FontAwesome'} name={'search'} />
                     </Button>
                </Right>    
            </AnimaHeader>
        );
    }

    _onSearch = (text)=>{
       const {callbackSearch} = this.state;
       callbackSearch(text);
    } 

    _searchHeader = ()=>{
        const {isSearch} = this.state;
        if (isSearch) this.searchHeader.show();
        return (
            <View>
                  <StatusBar animated={true} backgroundColor="#402F3F" barStyle="dark-content" />
                  <SearchHeader
                        ref = {(searchHeader) => {
                            this.searchHeader = searchHeader;
                        }}
                        headerBgColor={"#402F3F"}
                        topOffset={0}
                        entryAnimation={'from-left-side'}
                        placeholder = 'What are you searching for ?'
                        iconColor ={'white'}
                        inputColor={'white'}
                        placeholderColor = 'gray'
                        onHide={this._press }
                        onGetAutocompletions = {async (text) => {
                            if (text) {
                                const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                                    method: `get`
                                });
                                const data = await response.json();
                                this._onSearch(data[0]);
                                return data[1];
                            } else {
                                return [];
                            }
                        }} 
                        onSearch={ (event )=>{ this._onSearch(event.nativeEvent.text) } }
                    />
            </View>
        );
    }

    render = ()=>{
        return (
           <Container>
                {this._header()}
                {this._searchHeader()}
           </Container>
        );
    }
   
} 

const AnimaHeader   = Animatable.createAnimatableComponent(Header);
