import React, { Component } from 'react';
import {connect} from "react-redux";

class TableCustomer extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_CUSTOMER = null;
    }

    componentWillMount() {
        $('#traking-table-customer').DataTable().destroy(true);
        this._TABLE_CUSTOMER = null;
        this._COLUMNS = [
            {
                data: 'name',
                name: 'Tên khách hàng'
            },
            {
                data: 'dealId',
                name: 'DealId',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'leadId',
                name: 'LeadId',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'tmName',
                name: 'Tên TM'
            },
            {
                data: 'assigneeName',
                name: 'Người phụ trách',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'numberOfTours',
                name: 'Số lượng tour'
            }
        ];
    }

    render() {
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });
        return (
            <div className="form-group">
                <label>Khách hàng</label>
                <table id={"traking-table-customer"} className={"table table-bordered table-striped dataTable"}>
                    <thead>
                        <tr>{nameOfColumns}</tr>
                    </thead>
                </table>
            </div>
        );
    }

    componentDidMount() {
        const that = this;
        that._TABLE_CUSTOMER = $('#traking-table-customer')
        .DataTable({
            data: that.props.tracking.dataTableCustomer,
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
})(TableCustomer);