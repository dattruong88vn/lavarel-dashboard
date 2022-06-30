import React, { Component } from 'react';
import {connect} from "react-redux";
import {InputText, InputDate, InputPhone} from "../../commonComponents/input/InputLabel";
import {Select2} from "../../commonComponents/select/selectLabel";
import moment from "moment";
import TableNotifyHistory from './TableNotifyHistory';

class TrackingNotifyHistory extends Component {
    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"},
            formatDate : 'dd/mm/yyyy',
            formatDateMoment : 'DD/MM/YYYY',
            isAdmin : currentUser ? currentUser.departments[0].isGroupAdmin : false,
        };
    }

    handleChangeSelect($feild, $option) {
        let {dispatch} = this.props;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        dispatch({type:'SET_FILTER_DATA_SELECT', value: value, data: data});
    }

    inputChange (event) {
        let {dispatch} = this.props;
        let data = {};
        data[event.target.name] = event.target.value;
        dispatch({type:'SET_DATA_POST', data: data});
    }

    componentDidMount() {
        const that = this;
        let {dispatch} = that.props;
        $('#fromDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function (e) {
            dispatch({type:'SET_DATA_POST', data: {fromDate: e.date.valueOf() ? e.date.valueOf() : null}});
        });
        $('#toDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function ( e) {
            dispatch({type:'SET_DATA_POST', data: {toDate: e.date.valueOf() ? e.date.valueOf() : null}});
        });
    }

    searchTrackingNotify() {
        let {tracking} = this.props;
        if (tracking.table) {
            tracking.table.ajax.reload();
        } else {
            console.error("The table is not init");
        }
    }

    clearTrackingNotify() {
        let {dispatch, tracking} = this.props;
        dispatch({type:'RESET_FILTER'});
        setTimeout(function () {
            if (tracking.table) {
                tracking.table.ajax.reload();
            } else {
                console.error("The table is not init");
            }
        },500);
    }
    
    render() {
        return (
            <div className="row tracking-visitor">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Lịch sử thông báo</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group col-md-12">
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <InputDate
                                            id="fromDate"
                                            label="Từ ngày"
                                            value={moment(this.props.tracking.postData.fromDate).format(this._STORED_LOCAL.formatDateMoment)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputDate
                                            id="toDate"
                                            label="Tới ngày"
                                            value={moment(this.props.tracking.postData.toDate).format(this._STORED_LOCAL.formatDateMoment)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputPhone
                                            id="userPhone"
                                            name="userPhone"
                                            label="SĐT"
                                            value={this.props.tracking.postData.userPhone}
                                            onChange={(e) => this.inputChange(e)}/>
                                    </div>
                                    <div className="col-md-3">
                                        <InputText
                                            id="userEmail"
                                            name="userEmail"
                                            label="Email"
                                            value={this.props.tracking.postData.userEmail}
                                            onChange={(e) => this.inputChange(e)}/>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <Select2
                                            id="statusId"
                                            label="Trạng thái"
                                            options={this.props.tracking.statusList}
                                            value={this.props.tracking.filterSelect.statusId ? this.props.tracking.filterSelect.statusId : this._STORED_LOCAL.defaultValue}
                                            onChange={this.handleChangeSelect.bind(this, 'statusId')}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Select2
                                            id="notifyType"
                                            label="Loại"
                                            options={this.props.tracking.notifyTypeList}
                                            value={this.props.tracking.filterSelect.notifyType ? this.props.tracking.filterSelect.notifyType : this._STORED_LOCAL.defaultValue}
                                            onChange={this.handleChangeSelect.bind(this, 'notifyType')}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Select2
                                            id="fromSource"
                                            label="Nơi gửi"
                                            options={this.props.tracking.fromSourceList}
                                            value={this.props.tracking.filterSelect.fromSource ? this.props.tracking.filterSelect.fromSource : this._STORED_LOCAL.defaultValue}
                                            onChange={this.handleChangeSelect.bind(this, 'fromSource')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-12 db-btn-group" style={{textAlign: 'right'}}>
                                <button className="btn btn-primary" onClick={() => this.searchTrackingNotify()}>Tìm kiếm</button>
                                <button className="btn btn-primary" onClick={() => this.clearTrackingNotify()}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
                <TableNotifyHistory/>
            </div>
        );
    }
}

export default connect(function (state) {
    return {
        tracking : state.TrackingNotify
    }
})(TrackingNotifyHistory);