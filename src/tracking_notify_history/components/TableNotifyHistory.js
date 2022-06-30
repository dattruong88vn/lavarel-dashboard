import React, { Component } from 'react';
import {connect} from "react-redux";
import moment from "moment";

class TableNotifyHistory extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_NOTIFY_HISTORY = null;
        this.bindEvents();
    }

    componentWillMount() {
        $('#table-notify-history').DataTable().destroy(true);
        this._TABLE_NOTIFY_HISTORY = null;
        this._COLUMNS = [
            {
                data: 'typeName',
                name: 'Loại'
            },
            {
                data: 'sourceName',
                name: 'Nơi gửi'
            },
            {
                data: 'total',
                name: 'Tổng số'
            },
            {
                data: 'totalRead',
                name: 'Số lượng đã xem',
                render($data, $type, $object, $position) {
                    return `<a class="btn-read" href="javascript:void(0);">`+$data+`</a>`
                }
            },
            {
                data: 'totalUnread',
                name: 'Số lượng chưa xem',
                render($data, $type, $object, $position) {
                    return `<a class="btn-unread" href="javascript:void(0);">`+$data+`</a>`
                }
            },
            {
                data: 'createdDate',
                name: 'Ngày giờ gửi',
                width: '120px',
                render($data, $type, $object, $position) {
                    return moment($data).format('DD/MM/YYYY HH:mm');
                }
            },
        ];
    }
    
    render() {
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });
        return (
            <div className="col-md-12">
                <div className="box box-primary">
                    <div className="box-body">
                        <label>Có tất cả {this.props.tracking.totalNotify} thông báo đã được gửi</label>
                        <table id={"table-notify-history"} className={"table table-bordered table-striped dataTable"}>
                            <thead>
                                <tr>{nameOfColumns}</tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let that = this;
        let {dispatch} = that.props;
        that._TABLE_NOTIFY_HISTORY = $('#table-notify-history')
        .DataTable({
            processing: false,
                serverSide: true,
                ajax: {
                    url: '/tracking-notify-history/get-list-notify',
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, that.props.tracking.postData);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                order: [[5, 'desc']],
                bInfo: false,
                language: DatatableHelper.languages.vn,
                columns: that._COLUMNS,
        })
        .off('processing.dt')
        .on('processing.dt', function (e, settings, processing) {
            if (processing) {
                showPropzyLoading();
            } else {
                hidePropzyLoading();
            }
        })
        .on('xhr.dt', function (e, settings, json, xhr) {
            if(json && Array.isArray(json.data)) {
                dispatch({type:'SET_TOTAL_NOTIFY', data: json.recordsTotal});
                dispatch({type:'SET_DATA_TABLE_NOTIFY_HISTORY', data: json.data});
            }
        });
        dispatch({type:'SET_TABLE', table: that._TABLE_NOTIFY_HISTORY});
    }

    bindEvents() {
        let that = this;
        let {dispatch} = this.props;
        $(document).off('.btn-read').on('click', '.btn-read', function (e) {
            e.preventDefault();
            let tr = $(this).closest('tr');
            let row = that._TABLE_NOTIFY_HISTORY.row( tr );
            let data = row.data();
            let postData = {
                date: moment(data.createdDate).format('YYYY-MM-DD HH:mm:ss'), 
                statusId: 0,
                notifyType: data.typeId,
                fromSource: that.props.tracking.postData.fromSource,
                userPhone: that.props.tracking.postData.userPhone,
                userEmail: that.props.tracking.postData.userEmail
            };
            showPropzyLoading();
            $.ajax({
                url: "/tracking-notify-history/get-read-or-unread",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    let dataRead = [];
                    if (parseInt(data.totalRead) != 0) {
                        dataRead = response.data;
                    }
                    dispatch({type:'SET_DATA_TABLE_READ', data: dataRead});
                } 
                dispatch({type:'SET_SHOW_MODAL_READ', data: true});
            }).always(function () {
                hidePropzyLoading();
            });
        });
        $(document).off('.btn-unread').on('click', '.btn-unread', function (e) {
            e.preventDefault();
            let tr = $(this).closest('tr');
            let row = that._TABLE_NOTIFY_HISTORY.row( tr );
            let data = row.data();
            let postData = {
                date: moment(data.createdDate).format('YYYY-MM-DD HH:mm:ss'), 
                statusId: 1, 
                notifyType: data.typeId,
                fromSource: that.props.tracking.postData.fromSource,
                userPhone: that.props.tracking.postData.userPhone,
                userEmail: that.props.tracking.postData.userEmail
            };
            showPropzyLoading();
            $.ajax({
                url: "/tracking-notify-history/get-read-or-unread",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    let dataUnread = [];
                    if (parseInt(data.totalUnread) != 0) {
                        dataUnread = response.data;
                    }
                    dispatch({type:'SET_DATA_TABLE_UNREAD', data: dataUnread});
                } 
                dispatch({type:'SET_SHOW_MODAL_UNREAD', data: true});
            }).always(function () {
                hidePropzyLoading();
            });
        });
    }
}

export default connect(function (state) {
    return {
        tracking : state.TrackingNotify
    }
})(TableNotifyHistory);