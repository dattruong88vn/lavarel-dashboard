import React, { Component } from 'react';
import ListBank from '../components/ListBank';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ListBankContainer extends Component {
    handleSearch() {
        let {tableBank} = this.props.banks;
        if (tableBank) {
            tableBank.ajax.reload();
        } else {
            console.error("The table is not init");
        }
    }

    handleClearSearch() {
        let {tableBank} = this.props.banks;
        this.props.onResetDataSearch();
        setTimeout(function () {
            if (tableBank) {
                tableBank.ajax.reload();
            } else {
                console.error("The table is not init");
            }
        },500);
    }

    handleAddBank() {
        this.props.onShowHideModalBank(true);
    }

    setTableBank(data) {
        this.props.onSetTableBank(data);
    }

    inputChangeSearch(event) {
        let dataPost = {};
        dataPost[event.target.name] = event.target.value;
        this.props.onSetDataSearch(dataPost);
    }

    setDataPost(data) {
        this.props.onSetDataPost(data);
    }

    render() {
        return (
            <ListBank banks={this.props.banks}
            handleSearch={this.handleSearch.bind(this)}
            handleClearSearch={this.handleClearSearch.bind(this)}
            handleAddBank={this.handleAddBank.bind(this)}
            setTableBank={this.setTableBank.bind(this)}
            inputChangeSearch={this.inputChangeSearch.bind(this)}
            setDataPost={this.setDataPost.bind(this)}
            setFilterSelectBank={this.props.onSetFilterSelectBank.bind(this)}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        banks: state.ListBank,
        profiles: state.ModalProfile
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalBank: (data) => {
            dispatch(actions.actShowHideModalBank(data));
        },
        onSetTableBank: (data) => {
            dispatch(actions.actSetTableBank(data));
        },
        onSetDataSearch: (data) => {
            dispatch(actions.actSetDataSearch(data));
        },
        onResetDataSearch: () => {
            dispatch(actions.actResetDataSearch());
        },
        onSetDataPost: (data) => {
            dispatch(actions.actSetDataPost(data));
        },
        onSetFilterSelectBank: (value, data) => {
            dispatch(actions.actSetFilterSelectBank(value, data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBankContainer);