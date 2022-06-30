import React, { Component } from 'react';
import 'babel-polyfill';
import axios from "axios";
import {connect} from "react-redux";

class ListTc extends Component {
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
        this._COLUMNS = [];
        this._TABLE_TC = null;
        this.bindEvents();
    }

    componentWillMount() {
        $('#table-tc').DataTable().destroy(true);
        this._TABLE_TC = null;
        this._COLUMNS = [
            {
                data: 'tcId',
                name: 'ID'
            },
            {
                data: 'name',
                name: 'Tên'
            },
            {
                data: 'fullName',
                name: 'Tên đầy đủ'
            },
            {
                data: 'address',
                name: 'Địa chỉ'
            },
            {
                data: 'shortAddress',
                name: 'Địa chỉ rút gọn'
            },
            {
                data: 'createdDate',
                name: 'Ngày tạo',
                render($data, $type, $object, $position) {
                    return moment($data).format('DD/MM/YYYY HH:mm');
                }
            },
            {
                data: 'actions',
                width : "40px",
                class: "text-left",
                name: '',
                render($data, $type, $object, $position) {
                    return `<button class="btn-edit-tc btn btn-primary"><span class="fa fa-edit"></span></button>`;
                }
            }
        ];
    }

    render() {
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });
        return (
            <div className="row list-tc">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Danh sách trung tâm giao dịch</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group col-md-12">
                                <div className="row">
                                    <div className="col-md-4 pl-0">
                                        <input id="searchKeyword" name="searchKeyword" placeholder="Tìm.." type="text" className="form-control" 
                                        value={this.props.tcs.searchData.searchKeyword ? this.props.tcs.searchData.searchKeyword : ''}
                                        onChange={(e) => this.inputChange(e)}/>
                                    </div>
                                    <button className="btn btn-primary mr-10" onClick={this.handleClickSearch.bind(this)}>Lọc dữ liệu</button>
                                    <button className="btn btn-default" onClick={this.handleClickClearSearch.bind(this)}>Bỏ lọc</button>
                                    <button className="btn btn-primary pull-right" onClick={this.handleShowModal.bind(this)}><span className="glyphicon glyphicon-plus"></span> Tạo mới</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <table id={"table-tc"} className={"table table-bordered table-striped dataTable"}>
                                    <thead>
                                        <tr>{nameOfColumns}</tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let that = this;
        let {dispatch} = that.props;
        that._TABLE_TC = $('#table-tc')
        .DataTable({
            processing: false,
            serverSide: true,
            ajax: {
                url: "/list-tc/get-data",
                type: 'post',
                data: function (d) {
                    Object.assign(d, that.props.tcs.searchData);
                    return d;
                },
            },
            autoWidth: true,
            deferRender: false,
            lengthChange: false,
            paging: true,
            searching: false,
            ordering: false,
            language: DatatableHelper.languages.vn,
            columns: that._COLUMNS
        });
        dispatch({type:'SET_TABLE_TC', table: that._TABLE_TC});
    }
    
    inputChange (event) {
        let {dispatch} = this.props;
        let data = {};
        data[event.target.name] = event.target.value;
        dispatch({type:'SET_DATA_SEARCH', data: data});
    }

    handleClickSearch() {
        let {tcs} = this.props;
        if (tcs.table) {
            tcs.table.ajax.reload();
        } else {
            console.error("The table is not init");
        }
    }

    handleClickClearSearch() {
        let {dispatch, tcs} = this.props;
        dispatch({type:'RESET_SEARCH'});
        setTimeout(function () {
            if (tcs.table) {
                tcs.table.ajax.reload();
            } else {
                console.error("The table is not init");
            }
        },500);
    }

    handleShowModal() {
        let {dispatch} = this.props;
        dispatch({type:'SET_SHOW_MODAL_SAVE_TC', data: true});
    }

    async initPromiseApi($name, $request = {}) {
        let that = this;
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
                let itemWard = data.filter(function(item) {
                    return item.value == $request.wardId;
                });
                that.props.dispatch({type:'SET_DATA_LIST_WARD', data: data});
                that.props.dispatch({type:'SET_FILTER_DATA_SELECT', value: {wardId: itemWard[0]}});
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
                let itemStreet= data.filter(function(item) {
                    return item.value == $request.streetId;
                });
                that.props.dispatch({type:'SET_DATA_LIST_STREET', data: data});
                that.props.dispatch({type:'SET_FILTER_DATA_SELECT', value: {streetId: itemStreet[0]}});
                break;
            }
        }
    }

    bindEvents() {
        let that = this;
        $(document).off('.btn-edit-tc').on('click', '.btn-edit-tc', function (e) {
            e.preventDefault();
            let tr = $(this).closest('tr');
            let row = that._TABLE_TC.row( tr );
            let data = row.data();
            let {dispatch} = that.props;
            showPropzyLoading();
            $.ajax({
                url: "/list-tc/get-detail-tc/" + data.tcId,
                type: "get"
            }).done(function (response) {
                if (response.result) {
                    let data = {
                        tcId: response.data.tcId,
                        name: response.data.name,
                        fullName: response.data.fullName,
                        cityId: response.data.cityId,
                        districtId: response.data.districtId,
                        wardId: response.data.wardId,
                        streetId: response.data.streetId,
                        address: response.data.address,
                        shortAddress: response.data.shortAddress,
                        latitude: response.data.latitude,
                        longitude: response.data.longitude
                    };
                    that.initPromiseApi('GET_WARDS', {wardId : data.wardId, districtId : data.districtId});
                    that.initPromiseApi('GET_STREETS', {streetId: data.streetId, wardId : data.wardId});
                    let itemDistrict =  that.props.tcs.districtList.filter(function(item) {
                        return item.value == data.districtId;
                    });
                    dispatch({type:'SET_DATA_POST', data: data});
                    dispatch({type:'SET_FILTER_DATA_SELECT', value: {districtId: itemDistrict[0]}});
                    that.handleShowModal();
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });
    }
}

export default connect(function (state) {
    return {
        tcs : state.ListTc
    }
})(ListTc);