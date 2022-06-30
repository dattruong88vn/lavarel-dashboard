import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ModalProcessProfile from '../components/ModalProcessProfile';

class ModalProcessProfileContainer extends Component {

    componentDidMount() {
        this.props.onGetListDataBankPP();
    }

    handleCloseModalPP() {
        this.props.onResetDataBankPP();
        this.props.onResetDataPostPP();
        this.props.onShowHideModalPP(false);
    }

    handleAddBank() {
        this.props.onSetDataBankPP(this.props.pp.postSelectBank.bank);
    }

    handleDeleteBank(data) {
        this.props.onDeleteDataBankPP(data);
    }

    inputChange(event) {
        let dataPost = {};
        let target = event.target;
        let name = target.name;
        let value = target.type == "checkbox" ? !target.checked : target.value;
        dataPost[name] = value;
        this.props.onSetDataPostPP(dataPost);
    }
    
    handleChangeSelect($feild, $option) {
        let that = this;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        that.props.onSetDataSelectBank(value, data);
    }

    handleSendProcessProfile() {
        let data = this.props.pp.dataTableBank;
        let dataPost = this.props.pp.postData;
        if(data.length == 0) {
            showPropzyAlert("Vui lòng chọn ngân hàng");
            return false;
        }
        this.props.onSendProcessProfile(dataPost);
        this.handleCloseModalPP();
    }

    render() {
        return (
            <ModalProcessProfile pp={this.props.pp}
            handleCloseModalPP={this.handleCloseModalPP.bind(this)}
            handleChangeSelect={this.handleChangeSelect.bind(this)}
            handleAddBank={this.handleAddBank.bind(this)}
            handleDeleteBank={this.handleDeleteBank.bind(this)}
            handleSendProcessProfile={this.handleSendProcessProfile.bind(this)}
            inputChange={this.inputChange.bind(this)}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        pp: state.ModalProcess
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalPP: (data) => {
            dispatch(actions.actShowHideModalPP(data));
        },
        onGetListDataBankPP: () => {
            dispatch(actions.apiGetListBankPP());
        },
        onSetDataSelectBank: (value, data) => {
            dispatch(actions.actSetDataSelectBank(value, data));
        },
        onSetDataBankPP: (data) => {
            dispatch(actions.actSetDataBankPP(data));
        },
        onResetDataBankPP: () => {
            dispatch(actions.actResetDataBankPP());
        },
        onDeleteDataBankPP: (data) => {
            dispatch(actions.actDeleteDataBankPP(data));
        },
        onSetDataPostPP: (data) => {
            dispatch(actions.actSetDataPostPP(data));
        },
        onSendProcessProfile: (data) => {
            dispatch(actions.apiSendProcessProfile(data));
        },
        onResetDataPostPP: () => {
            dispatch(actions.actResetDataPostPP());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalProcessProfileContainer);