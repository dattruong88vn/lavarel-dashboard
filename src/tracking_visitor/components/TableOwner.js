import React, { Component } from 'react';
import {connect} from "react-redux";

class TableOwner extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_OWNER = null;
    }

    componentWillMount() {
        $('#traking-table-owner').DataTable().destroy(true);
        this._TABLE_OWNER = null;
        this._COLUMNS = [
            {
                data: 'name',
                name: 'Tên chủ nhà'
            },
            {
                data: 'listingId',
                name: 'ListingId'
            },
            {
                data: 'assigneeName',
                name: 'Người phụ trách'
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
                <label>Chủ nhà</label>
                <table id={"traking-table-owner"} className={"table table-bordered table-striped dataTable"}>
                    <thead>
                        <tr>{nameOfColumns}</tr>
                    </thead>
                </table>
            </div>
        );
    }

    componentDidMount() {
        const that = this;
        that._TABLE_OWNER = $('#traking-table-owner')
        .DataTable({
            data: that.props.tracking.dataTableOwner,
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
})(TableOwner);