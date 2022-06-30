import React, { Component } from 'react';
import 'babel-polyfill';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import Select from 'react-select';
import axios from "axios";
import Geocode from "react-geocode";

class ModalInfoTc extends Component {
    constructor(props) {
        super(props);
        this._URL = {
            'GET_DISTRICTS_BY_CITY' : '/zone/get-district-list-by-city',
            'GET_WARDS' : '/zone/get-wards',
            'GET_STREETS' : '/zone/get-streets'
        };
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
        Geocode.setApiKey("AIzaSyALA3aQ6_yVkiiBILzYjYmRce6FSg4sm98");
        Geocode.enableDebug();
    }

    async initPromiseApi($name, $request = {}) {
        const that = this;
        let response = null;
        switch ($name) {
            case 'GET_DISTRICTS_BY_CITY' : {
                let districts = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_DISTRICTS_BY_CITY + '/' + $request.cityId, {params: {}})
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let districtsContent = response.data.map((it) => {
                            return {value: it.districtId, label: it.districtName};
                        });
                        districts = districts.concat(districtsContent);
                    }
                }
                that.props.dispatch({type:'SET_DATA_LIST_DISTRICT', data: districts});
                break;
            }
            case 'GET_WARDS' : {
                let data = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_WARDS + '/' + $request.districtId, {params: {}})
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let dataContent = response.data.map((it) => {
                            return {value: it.wardId, label: it.wardName};
                        });
                        data = data.concat(dataContent);
                    }
                }
                that.props.dispatch({type:'SET_DATA_LIST_WARD', data: data});
                break;
            }
            case 'GET_STREETS' : {
                let data = [that._STORED_LOCAL.defaultValue];
                await axios.get(that._URL.GET_STREETS + '/' + $request.wardId, {params: {}})
                    .then(xhr => {
                        response = xhr.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
                if (response) {
                    if (response.result && response.data.length > 0) {
                        let dataContent = response.data.map((it) => {
                            return {value: it.streetId, label: it.streetName};
                        });
                        data = data.concat(dataContent);
                    }
                }
                that.props.dispatch({type:'SET_DATA_LIST_STREET', data: data});
                break;
            }
        }
    }

    componentDidMount() {
        let that = this;
        that.initPromiseApi("GET_DISTRICTS_BY_CITY", {cityId : 1});
    }

    inputChange (event) {
        let {dispatch} = this.props;
        let dataPost = {};
        dataPost[event.target.name] = event.target.value;
        dispatch({type:'SET_DATA_POST', data: dataPost});
    }

    handleChangeSelect($feild, $option) {
        let that = this;
        let {dispatch, tcs} = that.props;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        dispatch({type:'SET_FILTER_DATA_SELECT', value: value, data: data});
        let dataAddress = "";
        switch ($feild) {
            case 'districtId' : {
                that.initPromiseApi('GET_WARDS', {districtId : $option.value});
                dispatch({type:'SET_FILTER_DATA_SELECT', value: {wardId: null, streetId: null}});
                dispatch({type:'SET_DATA_POST', data: {wardId: null, streetId: null}});
                break;
            }
            case 'wardId' : {
                that.initPromiseApi('GET_STREETS', {wardId : $option.value});
                dispatch({type:'SET_FILTER_DATA_SELECT', value: {streetId: null}});
                dispatch({type:'SET_DATA_POST', data: {streetId: null}});
                break;
            }
            case 'streetId' : {
                dataAddress = dataAddress.concat($option.value != '' ? $option.label : '', 
                    typeof(tcs.filterSelect.wardId) !== 'undefined' && tcs.filterSelect.wardId.value != '' ? ', ' + tcs.filterSelect.wardId.label : ' ', 
                    typeof(tcs.filterSelect.districtId) !== 'undefined' && tcs.filterSelect.districtId.value != '' ? ', ' + tcs.filterSelect.districtId.label : ' ');
                dispatch({type:'SET_DATA_POST', data: {address: dataAddress}});
                break;
            }
        }
    }

    handleCloseModal() {
        let {dispatch} = this.props;
        dispatch({type:'RESET_DATA_POST'});
        dispatch({type:'SET_SHOW_MODAL_SAVE_TC', data: false});
    }

    render() {
        let {name, fullName, address, shortAddress} = this.props.tcs.postData;
        return (
            <Modal show={this.props.tcs.showModalSaveTc} onHide={this.handleCloseModal.bind(this)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin TC</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Tên <span className="text-danger">*</span></label>
                        <input name="name" type="text" value={name} className="form-control" onChange={(e) => this.inputChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>Tên đầy đủ <span className="text-danger">*</span></label>
                        <input name="fullName" type="text" value={fullName} className="form-control" onChange={(e) => this.inputChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>Quận <span className="text-danger">*</span></label>
                        <Select
                            value={this.props.tcs.filterSelect.districtId ? this.props.tcs.filterSelect.districtId : this._STORED_LOCAL.defaultValue}
                            options={this.props.tcs.districtList}
                            onChange={this.handleChangeSelect.bind(this, 'districtId')}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Phường <span className="text-danger">*</span></label>
                        <Select
                            value={this.props.tcs.filterSelect.wardId ? this.props.tcs.filterSelect.wardId : this._STORED_LOCAL.defaultValue}
                            options={this.props.tcs.wardList}
                            onChange={this.handleChangeSelect.bind(this, 'wardId')}/>
                    </div>
                    <div className="form-group">
                        <label>Đường <span className="text-danger">*</span></label>
                        <Select
                            value={this.props.tcs.filterSelect.streetId ? this.props.tcs.filterSelect.streetId : this._STORED_LOCAL.defaultValue}
                            options={this.props.tcs.streetList}
                            onChange={this.handleChangeSelect.bind(this, 'streetId')}/>
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ <span className="text-danger">*</span></label>
                        <input name="address" type="text" value={address} className="form-control" onChange={(e) => this.inputChange(e)}/>
                        <div id="address" className="hidden"></div>
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ rút gọn <span className="text-danger">*</span></label>
                        <input name="shortAddress" type="text" value={shortAddress} className="form-control" onChange={(e) => this.inputChange(e)}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button id="btnSaveInfoTc" className="btn btn-primary" onClick={() => this.saveInfoTc()}>Lưu</button>
                    <button className="btn btn-default" onClick={this.handleCloseModal.bind(this)}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }

    async getLatLong($address) {
        const that = this;
        let response = null;
        let dataPost = {};
        await Geocode.fromAddress($address).then(
            xhr => {
                response = xhr.results[0].geometry.location;                  
            }
        ).catch(err => {
            console.error(err);
        });
        if (response) {
            dataPost.latitude = response.lat;
            dataPost.longitude = response.lng;
        }
        that.props.dispatch({type:'SET_DATA_POST', data: dataPost});
    }

    async saveInfoTc () {
        let that = this;
        let {tcs} = this.props;
        let validate = that.validateData();
        if(validate) {
            await that.getLatLong(tcs.postData.address);
            showPropzyLoading();
            $.ajax({
                "url": "/list-tc/save-info-tc",
                "type": "POST",
                "data": JSON.stringify(that.props.tcs.postData)
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (tcs.table) {
                    tcs.table.ajax.reload();
                } else {
                    console.error("The table is not init");
                }
                that.handleCloseModal();
            }).always(function () {
                hidePropzyLoading();
            });
        }
    }

    validateData(){
        let {name, fullName, districtId, wardId, streetId, address, shortAddress} = this.props.tcs.postData;
        if(name == null || name.length == 0) {
            showPropzyAlert("Vui lòng nhập tên");
            return false;
        }
        if(fullName == null || fullName.length == 0) {
            showPropzyAlert("Vui lòng nhập tên đầy đủ");
            return false;
        }
        if(districtId == null || districtId.length == 0) {
            showPropzyAlert("Vui lòng chọn quận");
            return false;
        }
        if(wardId == null || wardId.length == 0) {
            showPropzyAlert("Vui lòng chọn phường");
            return false;
        }
        if(streetId == null || streetId.length == 0) {
            showPropzyAlert("Vui lòng chọn đường");
            return false;
        }
        if(address == null || address.length == 0) {
            showPropzyAlert("Vui lòng nhập địa chỉ");
            return false;
        }
        if(shortAddress == null || shortAddress.length == 0) {
            showPropzyAlert("Vui lòng nhập địa chỉ rút gọn");
            return false;
        }
        return true;
    }
}

export default connect(function (state) {
    return {
        tcs : state.ListTc
    }
})(ModalInfoTc);