

import React , {Component}                  from 'react';
import Modal                                from "react-native-modal";
import {
    View,
    StyleSheet,
}                                           from 'react-native';

export default class TicModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            viewStyles      : props.viewStyles      !== undefined ? props.viewStyles    : styles.modalView,
            backCallback    : props.backCallback    !== undefined ? props.backCallback  : ()=>{ }
        }
    }

    componentDidMount = ()=> {

    }

    _viewRender = ()=> {

       return (
             <View >
                <Modal 
                    backdropColor                   = {this.props.backdropColor  !== undefined ? this.props.backdropColor : 'black'}
                    backdropOpacity                 ={this.props.backOpacity     !== undefined ? this.props.backdropOpacity : 0.6 }
                    isVisible                       ={this.props.isVisible}
                    animationIn                     ={this.props.animationIn     !== undefined ? this.props.animationIn : "slideInLeft"}
                    animationOut                    ={this.props.animationOut    !== undefined ? this.props.animationOut : "slideOutRight"}
                    animationInTiming               ={this.props.timinIn         !== undefined ? this.props.timinIn : 400}
                    animationOutTiming              ={this.props.timinOut        !== undefined ? this.props.timinOut : 400}
                    backdropTransitionInTiming      ={400}
                    backdropTransitionOutTiming     ={400}
                    onBackdropPress                 ={this.state.backCallback}
                 >
                   <View style={this.state.viewStyles} >
                       { this.props.children }
                   </View>
                </Modal>
            </View>
        );
    }

    render = ()=> {
        return this._viewRender();
    }

}

const styles        = StyleSheet.create({
     modalView :{
        backgroundColor     : "white",
        padding             : 22,
        height              : 500,
        borderRadius        : 4,
        borderColor         : "rgba(0, 0, 0, 0.1)"
     }
});