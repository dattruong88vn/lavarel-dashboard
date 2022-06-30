import React, { Component } from 'react';
import ModalLogScoreCard from '../components/ModalLogScoreCard';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ModalLogScoreCardContainer extends Component {
    constructor(props) {
        super(props);
        this.bindEvents();
    }    
    componentDidMount() {
        let that = this;
        window.$('#modalLogScoreCard').on('hidden.bs.modal', function () {
            that.props.dispatch({type:"SET_LIST_HISTORY",data:"reset"});
        }); 
    }
    bindEvents() {
        let that = this;
        $(document).off('.btnShowLogScoreCard').on('click', '.btnShowLogScoreCard', function (e) {
            e.preventDefault();
            let id = $(this).attr("data-rListingId");
            that.props.onGetListHistory({rId: id});          
        });
    }
    handleCloseModal() {
        this.props.actShowHideModal(false);
    }
    handleShowModal() {
        this.props.actShowHideModal(true);
    }
    render() {
        return (
            <ModalLogScoreCard log={this.props.log}
                handleCloseModal={this.handleCloseModal.bind(this)}
                handleShowModal={this.handleShowModal.bind(this)}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        log: state.ModalLogScoreCard
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch : dispatch,
        onShowHideModal: (data) => {
            dispatch(actions.actShowHideModal(data));
        },
        onGetListHistory: (data) => {
            dispatch(actions.actGetListHistory(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalLogScoreCardContainer);