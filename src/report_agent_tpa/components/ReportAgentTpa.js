import React, { Component } from 'react';
import 'babel-polyfill';
import {connect} from "react-redux";
import moment from "moment";
import {InputText, InputPhone, InputDate} from "../../commonComponents/input/InputLabel";
import {Select2} from "../../commonComponents/select/selectLabel";
import axios from "axios";
import TableAgentTpa from './TableAgentTpa';

class ReportAgentTpa extends Component {
    constructor(props) {
        super(props);
        this._URL = {
            'GET_DATA_LEAD_STATUS' : '/report-agent-tpa/get-data-status-lead',
            'GET_DATA_DEAL_STATUS' : '/report-agent-tpa/get-data-status-deal',
            'GET_DATA_AGENT_STATUS' : '/report-agent-tpa/get-data-status-agent',
            'GET_DATA_RELATED_LISTING_STATUS' : '/report-agent-tpa/get-data-status-related-listing'
        };
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"},
            formatDate : 'dd/mm/yyyy',
            formatDateMoment : 'DD/MM/YYYY',
            isAdmin : currentUser ? currentUser.departments[0].isGroupAdmin : false,
        };
    }
    
    componentDidMount() {
        let that = this;
        let {dispatch} = that.props;
        $('#fromDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function (e) {
            dispatch({type:'SET_FILTER_DATA_INPUT', data: {fromDate :  e.date.valueOf() ?  e.date.valueOf()  : null}});
        });
        $('#toDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function ( e) {
            dispatch({type:'SET_FILTER_DATA_INPUT', data: {toDate :   e.date.valueOf() ?  e.date.valueOf()  : null}});
        });

        that.initPromiseApi("GET_LIST_LEAD_STATUS");
        that.initPromiseApi("GET_LIST_DEAL_STATUS");
        that.initPromiseApi("GET_LIST_AGENT_STATUS");
        that.initPromiseApi("GET_LIST_RELATED_LISTING_STATUS");
    }

    handleInputChange() {
        let {dispatch} = this.props;
        let data = {};
        data[event.target.id] = event.target.value;
        dispatch({type:'SET_FILTER_DATA_INPUT', data: data});
    }

    handleChangeSelect($feild, $option) {
        let {dispatch} = this.props;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        dispatch({type:'SET_FILTER_DATA_SELECT', value: value, data: data});
    }

    handleClickFilter() {
        let {filter} = this.props;
        if (filter.table) {
            filter.table.ajax.reload();
        } else {
            console.error("The table is not init");
        }
    }

    handleClickClearFilter() {
        let {dispatch, filter} = this.props;
        dispatch({type:'RESET_FILTER'});
        setTimeout(function () {
            if (filter.table) {
                filter.table.ajax.reload();
            } else {
                console.error("The table is not init");
            }
        },500);
    }

    handleClickExport() {
        let that = this;
        showPropzyLoading();
        $.ajax({
            url: "/report-agent-tpa/export-excel",
            type: "post",
            data: JSON.stringify(that.props.filter.postData)
        }).done(function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }

    async initPromiseApi($name, $request = {}) {
        let that = this;
        let response = null;
        switch ($name) {
            case 'GET_LIST_LEAD_STATUS' : {
                let lstLeadStatus = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_DATA_LEAD_STATUS)
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let lstData = response.data.map((item) => {
                            return {value: item.statusId, label: item.statusName};
                        });
                        lstLeadStatus = lstLeadStatus.concat(lstData);
                    }
                }
                that.props.dispatch({type:'SET_LEAD_STATUS_LIST', data: lstLeadStatus});
                break;
            }
            case 'GET_LIST_DEAL_STATUS' : {
                let lstDealStatus = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_DATA_DEAL_STATUS)
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let lstData = response.data.map((item) => {
                            return {value: item.statusId, label: item.statusName};
                        });
                        lstDealStatus = lstDealStatus.concat(lstData);
                    }
                }
                that.props.dispatch({type:'SET_DEAL_STATUS_LIST', data: lstDealStatus});
                break;
            }
            case 'GET_LIST_AGENT_STATUS' : {
                let lstAgentStatus = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_DATA_AGENT_STATUS)
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let lstData = response.data.map((item) => {
                            return {value: item.id, label: item.name};
                        });
                        lstAgentStatus = lstAgentStatus.concat(lstData);
                    }
                }
                that.props.dispatch({type:'SET_AGENT_STATUS_LIST', data: lstAgentStatus});
                break;
            }
            case 'GET_LIST_RELATED_LISTING_STATUS' : {
                let lstRelatedListingStatus = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_DATA_RELATED_LISTING_STATUS)
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let lstData = response.data[0].list.map((item) => {
                            return {value: item.id, label: item.name};
                        });
                        lstRelatedListingStatus = lstRelatedListingStatus.concat(lstData);
                    }
                }
                that.props.dispatch({type:'SET_RELATED_LISTING_STATUS_LIST', data: lstRelatedListingStatus});
                break;
            }
        }
    }

    render() {
        return (
            <div className="row tracking-visitor">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Report Agent For Tpa</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group col-md-12">
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <InputDate
                                            id="fromDate"
                                            label="Từ ngày"
                                            value={moment(this.props.filter.postData.fromDate).format(this._STORED_LOCAL.formatDateMoment)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputDate
                                            id="toDate"
                                            label="Tới ngày"
                                            value={moment(this.props.filter.postData.toDate).format(this._STORED_LOCAL.formatDateMoment)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputText
                                            id="name"
                                            label="Tên"
                                            value={this.props.filter.postData.name}
                                            onChange={this.handleInputChange.bind(this)}/>
                                    </div>
                                    <div className="col-md-3">
                                        <InputPhone
                                            id="phone"
                                            label="SĐT"
                                            value={this.props.filter.postData.phone}
                                            onChange={this.handleInputChange.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-12">
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <Select2
                                            id="agentStatus"
                                            label="Trạng thái môi giới"
                                            options={this.props.filter.agentStatusList}
                                            value={this.props.filter.filterSelect.agentStatus ? this.props.filter.filterSelect.agentStatus : this._STORED_LOCAL.defaultValue}
                                            onChange={this.handleChangeSelect.bind(this, 'agentStatus')}/>
                                    </div>
                                    <div className="col-md-3">
                                        <Select2
                                            id="relatedListingStatus"
                                            label="Trạng thái tin đăng"
                                            options={this.props.filter.relatedListingStatusList}
                                            value={this.props.filter.filterSelect.relatedListingStatus ? this.props.filter.filterSelect.relatedListingStatus : this._STORED_LOCAL.defaultValue}
                                            onChange={this.handleChangeSelect.bind(this, 'relatedListingStatus')}/>
                                    </div>
                                    <div className="col-md-3">
                                        <Select2
                                            id="leadStatus"
                                            label="Trạng thái lead"
                                            options={this.props.filter.leadStatusList}
                                            value={this.props.filter.filterSelect.leadStatus ? this.props.filter.filterSelect.leadStatus : this._STORED_LOCAL.defaultValue}
                                            onChange={this.handleChangeSelect.bind(this, 'leadStatus')}/>
                                    </div>
                                    <div className="col-md-3">
                                        <Select2
                                            id="dealStatus"
                                            label="Trạng thái deal"
                                            options={this.props.filter.dealStatusList}
                                            value={this.props.filter.filterSelect.dealStatus ? this.props.filter.filterSelect.dealStatus : this._STORED_LOCAL.defaultValue}
                                            onChange={this.handleChangeSelect.bind(this, 'dealStatus')}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-12 text-right db-btn-group">
                                <button className="btn btn-primary" onClick={this.handleClickFilter.bind(this)}>Lọc dữ liệu</button>
                                <button className="btn btn-default" onClick={this.handleClickClearFilter.bind(this)}>Bỏ lọc</button>
                                <button className="btn btn-warning" onClick={this.handleClickExport.bind(this)}>Export</button>
                            </div>
                        </div>
                    </div>
                </div>
                <TableAgentTpa/>
            </div>   
        );
    }
}

export default connect(function (state) {
    return {
        filter : state.Filter
    }
})(ReportAgentTpa);