import React, { Component } from 'react';
import {connect} from "react-redux";

class TableAgent extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_AGENT = null;
    }

    componentWillMount() {
        $('#traking-table-agent').DataTable().destroy(true);
        this._TABLE_AGENT = null;
        this._COLUMNS = [
            {
                data: 'name',
                name: 'Tên khách môi giới'
            },
            {
                data: 'numberOfListings',
                name: 'Số lượng listing'
            },
            {
                data: 'numberOfDeals',
                name: 'Số lượng deal'
            }
        ];
    }
    
    render() {
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });
        return (
            <div className="form-group">
                <label>Môi giới</label>
                <table id={"traking-table-agent"} className={"table table-bordered table-striped dataTable"}>
                    <thead>
                        <tr>{nameOfColumns}</tr>
                    </thead>
                </table>
            </div>
        );
    }

    componentDidMount() {
        const that = this;
        that._TABLE_AGENT = $('#traking-table-agent')
        .DataTable({
            data: that.props.tracking.dataTableAgent,
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
})(TableAgent);