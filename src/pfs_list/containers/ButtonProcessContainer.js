import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ButtonProcess from '../components/ButtonProcess';

class ButtonProcessContainer extends Component {
    handleShowModalPP() {
        let mortgageRequestId = this.props.mortgageRequestId;
        this.props.onSetDataPostPP({mortgageRequestId: mortgageRequestId});
        let dataBanks = this.props.info.resultBanks;
        if(dataBanks != null && dataBanks.banks.length > 0) {
            this.props.onSetDataBankSuggest(this.props.info.resultBanks.banks);
            this.props.onSetDataPostPP({isSatisfactory: dataBanks.isSatisfactory, note: dataBanks.note});
        } else {
            this.props.onGetListBankSuggest(mortgageRequestId);
        }
        this.props.onShowHideModalPP(true);
    }

    render() {
        return (
            <ButtonProcess info={this.props.info} pp={this.props.pp} handleShowModalPP={this.handleShowModalPP.bind(this)}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        pp: state.ModalProcess,
        info : state.mortgageReducer.infoMortgage
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalPP: (data) => {
            dispatch(actions.actShowHideModalPP(data));
        },
        onSetDataPostPP: (data) => {
            dispatch(actions.actSetDataPostPP(data));
        },
        onGetListBankSuggest: (id) => {
            dispatch(actions.actGetListBankSuggest(id));
        },
        onSetDataBankSuggest: (data) => {
            dispatch(actions.actSetDataBankSuggest(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonProcessContainer);