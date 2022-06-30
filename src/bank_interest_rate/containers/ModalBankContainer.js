import React, { Component } from 'react';
import ModalBank from '../components/ModalBank';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ModalBankContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            valid: {
                message: '',
                isShow: false
            }
        };
    }

    componentDidMount() {
        this.props.onGetListSelectBank();           
    }

    handleCloseModalBank() {
        this.props.onShowHideModalBank(false);
        this.props.onResetDataPost();
        this.setState({valid: {message: '', isShow: false}});
    }

    handleSaveBank() {
        let validate = this.validateData();
        if(validate) {
            this.props.onSaveBank(this.props.banks.postData);
            this.props.onResetDataPost();
            this.reloadDataTable();
            this.handleCloseModalBank();
        }
    }

    reloadDataTable() {
        let {tableBank} = this.props.listBanks;
        showPropzyLoading();
        setTimeout(function () {
            if (tableBank) {
                tableBank.ajax.reload();
            } else {
                console.error("The table is not init");
            }
            hidePropzyLoading();
        },500);
    }

    inputChange(event) {
        let dataPost = {};
        dataPost[event.target.name] = event.target.value;
        this.props.onSetDataPost(dataPost);
    }

    validateData() {
        var {name, interestRate1, loanRate, maxLoanTerm, earlyRepaymentFee} = this.props.banks.postData;
        if(name == null || name.length == 0) {
            this.setState({valid: {message: 'Vui lòng chọn tên ngân hàng', isShow: true}});
            return false;
        }
        if(interestRate1 == null || interestRate1.length == 0) {
            this.setState({valid: {message: 'Vui lòng nhập lãi suất 1', isShow: true}});
            return false;
        }
        if(loanRate == null || loanRate.length == 0) {
            this.setState({valid: {message: 'Vui lòng nhập tỷ lệ vay', isShow: true}});
            return false;
        }
        if(maxLoanTerm == null || maxLoanTerm.length == 0) {
            this.setState({valid: {message: 'Vui lòng nhập thời hạn vay tối đa', isShow: true}});
            return false;
        }
        if(earlyRepaymentFee == null || earlyRepaymentFee.length == 0) {
            this.setState({valid: {message: 'Vui lòng nhập phí trả nợ trước hạn', isShow: true}});
            return false;
        }
        this.setState({valid: {message: '', isShow: false}});
        return true;
    }

    render() {
        return (
            <ModalBank banks={this.props.banks}
            handleCloseModalBank={this.handleCloseModalBank.bind(this)}
            handleSaveBank={this.handleSaveBank.bind(this)}
            inputChange={this.inputChange.bind(this)}
            setFilterSelectBank={this.props.onSetFilterSelectBank.bind(this)}
            valid={this.state.valid}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        banks: state.ModalBank,
        listBanks: state.ListBank
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalBank: (data) => {
            dispatch(actions.actShowHideModalBank(data));
        },
        onSetDataPost: (data) => {
            dispatch(actions.actSetDataPost(data));
        },
        onSaveBank: (data) => {
            dispatch(actions.apiSaveBank(data));
        },
        onResetDataPost: () => {
            dispatch(actions.actResetDataPost());
        },
        onGetListSelectBank: () => {
            dispatch(actions.actGetListSelectBank());
        },
        onSetFilterSelectBank: (value, data) => {
            dispatch(actions.actSetFilterSelectBank(value, data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBankContainer);