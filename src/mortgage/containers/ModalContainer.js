import React, { Component } from 'react';
import { fetchChanelChild, createMortgageRequest } from './../actions/index';
import { fetchInfo } from './../../ba_mortgage/actions/index';
import { connect } from 'react-redux';
import Modal from './../components/Modal'; 

class ModalSection extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.onFetchChanelChild();
        this.props.onFetchInfo();
    }

    render() {
        return (
            <Modal info={this.props.info} createMortgageRequest={this.props.createMortgageRequest} chanels={this.props.chanels}/>
        );
    }
}

const mapStateToProps = state => ({
    chanels : state.mortgageReducer.chanel,
    info : state.mortgagePage.info
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchChanelChild: () => {
            dispatch(fetchChanelChild());
        },
        onFetchInfo: () => {
            dispatch(fetchInfo(null,"fromDB"));
        },
        createMortgageRequest: (dataPost,callback) => {
            dispatch(createMortgageRequest(dataPost,callback));
        }
    }
};

const ModalContainer = connect(mapStateToProps,mapDispatchToProps)(ModalSection);
export default ModalContainer;