import React, { Component } from 'react';

class ListBank extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_BANK = null;
        this.bindEvents();
    }

    componentWillMount() {
        $('#table-banks').DataTable().destroy(true);
        this._TABLE_BANK = null;
        this._COLUMNS = [
            {
                data: 'bankId',
                name: 'ID'
            },
            {
                data: 'name',
                name: 'Tên ngân hàng'
            },
            {
                data: 'interestRate1',
                name: 'Lãi suất 1'
            },
            {
                data: 'interestRate2',
                name: 'Lãi suất 2'
            },
            {
                data: 'maxLoanTerm',
                name: 'Thời gian vay tối đa'
            },
            {
                data: 'loanRate',
                name: 'Tỷ lệ vay'
            },
            {
                data: 'earlyRepaymentFee',
                name: 'Phí trả nợ trước hạn'
            },
            {
                data: '',
                name: '',
                render($data, $type, $object, $position) {
                    return `<button class="btn-edit-bank btn btn-primary"><span class="fa fa-edit"></span></button>`;
                }
            }
        ];
    }

    componentDidMount() {
        let that = this;
        that._TABLE_BANK = $('#table-banks')
        .DataTable({
            processing: false,
            serverSide: true,
            ajax: {
                url: "/bank-interest-rate/get-list-bank",
                type: 'post',
                data: function (d) {
                    Object.assign(d, that.props.banks.searchData);
                    return d;
                }
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
        that.props.setTableBank(that._TABLE_BANK);
    }

    bindEvents() {
        let that = this;
        $(document).off('.btn-edit-bank').on('click', '.btn-edit-bank', function (e) {
            e.preventDefault();
            let tr = $(this).closest('tr');
            let row = that._TABLE_BANK.row( tr );
            let data = row.data();
            that.props.setDataPost(data);
            let selected = {value: data.bankId, label: data.name, isDisabled: true};
            that.props.setFilterSelectBank({name: selected}, {name: data.name});
            that.props.handleAddBank();
        });
    }

    render() {
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Danh sách ngân hàng và lãi suất</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group col-md-12">
                                <div className="row">
                                    <div className="search-container">
                                        <div className="col-md-4 pl-0">
                                            <input id="keyword" name="keyword" placeholder="Nhập tên ngân hàng.." type="text" className="form-control" 
                                            value={this.props.banks.searchData.keyword ? this.props.banks.searchData.keyword : ''}
                                            onChange={this.props.inputChangeSearch.bind(this)}/>
                                        </div>
                                        <button className="btn btn-primary mr-10" onClick={this.props.handleSearch.bind(this)}>Tìm</button>
                                        <button className="btn btn-default" onClick={this.props.handleClearSearch.bind(this)}>Bỏ lọc</button>
                                        <button className="btn btn-primary pull-right" onClick={this.props.handleAddBank.bind(this)}> Thêm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <table id={"table-banks"} className={"table table-bordered table-striped dataTable"}>
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
}

export default ListBank;