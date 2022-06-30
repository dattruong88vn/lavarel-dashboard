import React, { Component } from 'react';
import {connect} from "react-redux";

class TableVisitor extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_VISITOR = null;
    }

    componentWillMount() {
        $('#traking-table-visitor').DataTable().destroy(true);
        this._TABLE_VISITOR = null;
        this._COLUMNS = [
            {
                data: 'visitorName',
                name: 'Tên'
            },
            {
                data: 'phone',
                name: 'SĐT'
            },
            {
                data: 'email',
                name: 'Email'
            },
            {
                data: 'requestTypeName',
                name: 'Nhu cầu'
            },
            {
                data: 'tc',
                name: 'TC',
                width : '200px'
            },
            {
                data: 'visitorTypeName',
                name: 'Loại khách hàng',
                width : '250px',
                render($data, $type, $object, $position) {
                    if ($object.intent) {
                        return `<p>`+$data+`</p><p style='font-style: italic;'>Mục đích: `+$object.intent+`</p>`;
                    }
                    return $data;
                }
            },
            {
                data: 'visitDate',
                name: 'Ngày giờ checkin',
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
            <div className="form-group">
                <label>Visitor</label>
                <table id={"traking-table-visitor"} className={"table table-bordered table-striped dataTable"}>
                    <thead>
                        <tr>{nameOfColumns}</tr>
                    </thead>
                </table>
            </div>
        );
    }

    componentDidMount() {
        let that = this;
        that._TABLE_VISITOR = $('#traking-table-visitor')
        .DataTable({
            data: that.props.tracking.dataTableVisitor,
            paging: true,
            searching: false,
            ordering: false,
            lengthChange: false,
            pageLength: 5,
            bInfo: false,
            language: DatatableHelper.languages.vn,
            columns: that._COLUMNS
        });
    }
}

export default connect(function (state) {
    return {
        tracking : state.Tracking
    }
})(TableVisitor);