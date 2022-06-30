import React, { Component } from 'react';
import 'babel-polyfill';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import Select from 'react-select';
import axios from "axios";
import {InputText} from "../../commonComponents/input/InputLabel";

class ModalSaveTracking extends Component {
    constructor(props) {
        super(props);
        this._URL = {
            'GET_TRANSACTION' : '/tracking-visitor/get-list-transaction',
            'GET_CHANNEL_TYPE' : '/tracking-visitor/get-list-channel-type',
            'GET_CHANNEL_SUB_TYPE' : '/tracking-visitor/get-list-channel-sub-type'
        };
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
    }
    
    resetTracking () {
        let {dispatch} = this.props;
        dispatch({type:'SET_DATA_POST', data: {name: null, phone : null, email: null, customerId: null}});
        dispatch({type:'SET_DATA_POST_VISITOR', value: {needId: null, typeCusId: null, tcId: null}, data: {needId: null, typeCusId: null, tcId: null}});
    }

    saveInfoVisitor () {        
        let {dispatch} = this.props;
        let dataInfo = this.props.tracking.postData;
        let dataVisitor = this.props.tracking.postDataVisitor;

        if(dataVisitor.needId == null || dataVisitor.needId.length == 0) {
            showPropzyAlert("Vui lòng chọn nhu cầu");
            return false;
        }
        if(dataVisitor.typeCusId == null || dataVisitor.typeCusId.length == 0) {
            showPropzyAlert("Vui lòng chọn loại khách hàng");
            return false;
        }
        if(dataVisitor.tcId == null || dataVisitor.tcId.length == 0) {
            showPropzyAlert("Vui lòng chọn tc");
            return false;
        }
        if (dataVisitor.typeCusId != null && parseInt(dataVisitor.typeCusId) === 103 
        && (dataVisitor.subTypeId == null || dataVisitor.subTypeId.length == 0)) {
            showPropzyAlert("Vui lòng chọn loại khách hàng");
            return false;
        }
        if (dataVisitor.typeCusId != null && parseInt(dataVisitor.typeCusId) === 103 
        && (dataVisitor.intent == null || dataVisitor.intent.length == 0)) {
            showPropzyAlert("Vui lòng nhập mục đích");
            return false;
        }
        
        showPropzyLoading();
        let dataPost = {
            name: dataInfo.name,
            phone: dataInfo.phone,
            email: dataInfo.email,
            socialUid: dataInfo.socialUid,
            customerId: dataInfo.customerId,
            tcId: dataVisitor.tcId,
            requestType: dataVisitor.needId,
            visitorType:  parseInt(dataVisitor.typeCusId) === 103 ? dataVisitor.subTypeId : dataVisitor.typeCusId,
            intent: dataVisitor.intent
        }            
        $.ajax({
            url: "/tracking-visitor/save-visitor",
            type: "post",
            data: JSON.stringify(dataPost)
        }).done(function (response) {
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
        dispatch({type:'SET_SHOW_MODAL_SAVE_TRACKING', data: false});
        this.resetTracking();
    }

    handleChangeSelect(data, selectedItem) {
        let {dispatch} = this.props;
        let dataPost = {};
        dataPost[data.name] = selectedItem.value;
        let dataValue = {};
        dataValue[data.name] = selectedItem;
        dispatch({type:'SET_DATA_POST_VISITOR', value: dataValue, data: dataPost});
    }

    inputChange (event) {
        let {dispatch} = this.props;
        let dataPost = {};
        dataPost[event.target.name] = event.target.value;
        dispatch({type:'SET_DATA_POST_VISITOR', data: dataPost});
    }

    async initPromiseApi($name, $request = {}) {
        const that = this;
        let response = null;
        switch ($name) {
            case 'GET_TRANSACTION' : {
                let transactions = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_TRANSACTION)
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let content = response.data.map((item) => {
                            return {value: item.tcId, label: item.name};
                        });
                        transactions = transactions.concat(content);
                    }
                }
                that.props.dispatch({type:'SET_DATA_LIST_TC', data: transactions});
                break;
            }
            case 'GET_NEED' : {
                let needs = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_CHANNEL_TYPE + '/13')
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let content = response.data.map((item) => {
                            return {value: item.id, label: item.name};
                        });
                        needs = needs.concat(content);
                    }
                }
                that.props.dispatch({type:'SET_DATA_LIST_NEED', data: needs});
                break;
            }
            case 'GET_TYPE_CUS' : {
                let typeCus = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_CHANNEL_TYPE + '/14')
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let content = response.data.map((item) => {
                            return {value: item.id, label: item.name};
                        });
                        typeCus = typeCus.concat(content);
                    }
                }
                that.props.dispatch({type:'SET_DATA_LIST_TYPE_CUS', data: typeCus});
                break;
            }
            case 'GET_OTHER_TYPE_CUS' : {
                let otherTypeCus = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_CHANNEL_SUB_TYPE + '/' + $request.subTypeId, {params: {}})
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let content = response.data.map((item) => {
                            return {value: item.id, label: item.name};
                        });
                        otherTypeCus = otherTypeCus.concat(content);
                    }
                }
                that.props.dispatch({type:'SET_DATA_LIST_OTHER_TYPE_CUS', data: otherTypeCus});
                break;
            }
        }
    }

    componentDidMount() {
        let that = this;
        that.initPromiseApi("GET_TRANSACTION");
        that.initPromiseApi("GET_NEED");
        that.initPromiseApi("GET_TYPE_CUS");
    }

    renderTypeCusOther () {
        let that = this;
        let typeId = this.props.tracking.filterSelect.typeCusId;
        if (typeId != null && parseInt(typeId.value) === 103) {
            that.initPromiseApi("GET_OTHER_TYPE_CUS", {subTypeId : parseInt(typeId.value)});
            return  <div>
                        <div className="form-group">
                            <Select
                            value={this.props.tracking.filterSelect.subTypeId ? this.props.tracking.filterSelect.subTypeId : this._STORED_LOCAL.defaultValue}
                            options={this.props.tracking.otherTypeCusList}
                            onChange={this.handleChangeSelect.bind(this, {name: "subTypeId"})}/>
                        </div>
                        <div className="form-group">
                            <InputText
                            id="txtIntent"
                            name="intent"
                            label="Mục đích"
                            value={this.props.tracking.postDataVisitor.intent}
                            onChange={(e) => this.inputChange(e)}/>
                        </div>
                    </div>
        }
    }

    render() {
        return (
            <Modal show={this.props.tracking.showModalSaveTracking} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Thông tin visitor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Nhu cầu</label>
                        <Select
                            value={this.props.tracking.filterSelect.needId ? this.props.tracking.filterSelect.needId : this._STORED_LOCAL.defaultValue}
                            options={this.props.tracking.needList}
                            onChange={this.handleChangeSelect.bind(this, {name: "needId"})}/>
                    </div>
                    <div className="form-group">
                        <label>Loại khách hàng</label>
                        <Select
                            value={this.props.tracking.filterSelect.typeCusId ? this.props.tracking.filterSelect.typeCusId : this._STORED_LOCAL.defaultValue}
                            options={this.props.tracking.typeCusList}
                            onChange={this.handleChangeSelect.bind(this, {name: "typeCusId"})}/>
                    </div>
                    {this.renderTypeCusOther()}
                    <div className="form-group">
                        <label>TC</label>
                        <Select
                            value={this.props.tracking.filterSelect.tcId ? this.props.tracking.filterSelect.tcId : this._STORED_LOCAL.defaultValue}
                            options={this.props.tracking.tcList}
                            onChange={this.handleChangeSelect.bind(this, {name: "tcId"})}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button id="btnSaveInfoVisitor" className="btn btn-primary" onClick={() => this.saveInfoVisitor()}>Lưu</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(function (state) {
    return {
        tracking : state.Tracking
    }
})(ModalSaveTracking);