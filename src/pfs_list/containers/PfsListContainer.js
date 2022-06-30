import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import PfsList from '../components/PfsList';

class PfsListContainer extends Component {

    componentDidMount() {
        this.props.onGetListTableFilter(this.props.pfs.searchData);
        this.props.onGetListAssign();
        this.getDataStatusDefault();
    }

    handleSearch() {
        let {tablePfs} = this.props.pfs;
        if (tablePfs) {
            tablePfs.ajax.reload();
        } else {
            console.error("The table is not init");
        }
        this.props.onGetListTableFilter(this.props.pfs.searchData);
    }

    handleClearSearch() {
        let that = this; 
        let {tablePfs} = this.props.pfs;
        this.props.onResetDataSearch();
        setTimeout(function () {
            if (tablePfs) {
                tablePfs.ajax.reload();
            } else {
                console.error("The table is not init");
            }
            that.props.onGetListTableFilter(that.props.pfs.searchData);
        },500);
    }

    setTablePfs(data) {
        this.props.onSetTablePfs(data);
    }

    inputChangeSearch(event) {
        let dataPost = {};
        dataPost[event.target.name] = event.target.value;
        this.props.onSetDataSearch(dataPost);
    }

    changeChannelStatus(data) {
        let {tablePfs} = this.props.pfs;
        this.props.onSetDataSearch({channelStatusId: data});
        setTimeout(function () {
            if (tablePfs) {
                tablePfs.ajax.reload();
            } else {
                console.error("The table is not init");
            }
        },500);
    }

    setDataSearch(data) {
        this.props.onSetDataSearch(data);
    }

    receiveRequest(id) {
        this.props.onReceiveRequest(id);
    }

    handleChangeSelectMulti($feild, $option) {
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.map(it => parseInt(it.value));
        this.props.onSetDataSelectAssign(value, data);
    }

    getDataStatusDefault() {
        let urlParams = new URLSearchParams(window.location.search);
        let statusId = urlParams.get('channelStatusId');
        let {tablePfs} = this.props.pfs;
        this.props.onSetDataSearch({channelStatusId: statusId != null ? [parseInt(statusId)] : null});
        setTimeout(function () {
            if (tablePfs) {
                tablePfs.ajax.reload();
            } else {
                console.error("The table is not init");
            }
        },500);
    }

    render() {
        return (
            <PfsList pfs={this.props.pfs}
            handleSearch={this.handleSearch.bind(this)}
            handleClearSearch={this.handleClearSearch.bind(this)}
            setTablePfs={this.setTablePfs.bind(this)}
            setDataSearch={this.setDataSearch.bind(this)}
            inputChangeSearch={this.inputChangeSearch.bind(this)}
            changeChannelStatus={this.changeChannelStatus.bind(this)}
            receiveRequest={this.receiveRequest.bind(this)}
            handleChangeSelectMulti={this.handleChangeSelectMulti.bind(this)}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        pfs: state.PfsList        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSetTablePfs: (data) => {
            dispatch(actions.actSetTablePfs(data));
        },
        onSetDataSearch: (data) => {
            dispatch(actions.actSetDataSearch(data));
        },
        onResetDataSearch: () => {
            dispatch(actions.actResetDataSearch());
        },
        onGetListTableFilter: (dataPost) => {
            dispatch(actions.apiGetListButtonFilter(dataPost));
        },
        onReceiveRequest: (id) => {
            dispatch(actions.actReceiveRequest(id));
        },
        onGetListAssign: () => {
            dispatch(actions.actGetListAssign());
        },
        onSetDataSelectAssign: (value, data) => {
            dispatch(actions.actSetDataSelectAssign(value, data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PfsListContainer);