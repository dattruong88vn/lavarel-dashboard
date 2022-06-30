import React, { Component } from 'react';
import 'babel-polyfill';
import moment from "moment";
import {InputText, InputDate} from "../../commonComponents/input/InputLabel";
import {Select2} from "../../commonComponents/select/selectLabel";

class PfsList extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_PFS = null;
        this.bindEvents();
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"},
            formatDate : 'dd/mm/yyyy',
            formatDateMoment : 'DD/MM/YYYY'
        };
        let urlParams = new URLSearchParams(window.location.search);
        let statusId = urlParams.get('channelStatusId');
        this.state = {
            selectedItems: {
                channelStatusId: statusId != null ? parseInt(statusId) : null,
                channelStatusName: "Tất cả"
            },
        }
    }

    componentWillMount() {
        $('#table-pfs').DataTable().destroy(true);
        this._TABLE_PFS = null;
        this._COLUMNS = [
            {
                data: 'cmnd',
                name: 'Số CMND',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'assignedName',
                name: 'PFS'
            },
            {
                data: 'customerName',
                name: 'Tên khách hàng',
                render($data, $type, $object, $position) {
                    return "<a data-toggle='tooltip' title='"+ $data +"' href='/pfs-list/detail/" + $object.mortgageRequestId + "'>" + $data + "</a>";
                }
            },
            {
                data: 'progressStatus',
                name: 'Tiến độ'
            },
            {
                data: 'sender',
                name: 'Người gửi'
            },
            {
                data: 'propertyTypeGroupName',
                name: 'Nhóm BĐS',
                render($data, $type, $object, $position) {
                    return $data ? $data : `N/A`;
                }
            },
            {
                data: 'propertyType',
                name: 'Loại BĐS'
            },
            {
                data: 'rListingId',
                name: 'Listing ID',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'objectType',
                name: 'Đối tượng'
            },
            {
                data: 'mortgageStatus',
                name: 'Trạng thái',
                render($data, $type, $object, $position) {
                    if(currentUser.departments[0].isGroupAdmin == false && $object.mortgageStatusId == 27) {
                        return `${$data} <br/><button class="btn-accept btn btn-sm btn-warning">Chấp nhận</button>`;
                    }
                    return $data
                }
            }
        ];
    }

    componentDidMount() {
        let that = this;
        that._TABLE_PFS = $('#table-pfs')
        .DataTable({
            processing: false,
            serverSide: true,
            ajax: {
                url: "/pfs-list/get-list-pfs",
                type: 'post',
                data: function (d) {
                    Object.assign(d, that.props.pfs.searchData);
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
        that.props.setTablePfs(that._TABLE_PFS);
        /*****************************/
        $('#fromDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function (e) {
            that.props.setDataSearch({fromDate: e.date.valueOf() ? e.date.valueOf() : null})
        });
        $('#toDate').datepicker({
            format: that._STORED_LOCAL.formatDate,
        }).on('changeDate',function ( e) {
            that.props.setDataSearch({toDate: e.date.valueOf() ? e.date.valueOf() : null})
        });
    }

    bindEvents() {
        let that = this;
        $(document).off('.btn-accept').on('click', '.btn-accept', function (e) {
            e.preventDefault();
            let tr = $(this).closest('tr');
            let row = that._TABLE_PFS.row( tr );
            let data = row.data();
            that.props.receiveRequest(data.mortgageRequestId);
        });
    }

    buttonFilterClick(data) {
        this.setState({
            selectedItems : data
        });
        let dataPost = data.channelStatusId != null ? [data.channelStatusId] : null;
        let channelIds = [];
        if(data.channelStatusId == 42) {
            data.listChild.forEach(item => {
                channelIds.push(item.channelStatusId);
            });
            dataPost = channelIds;
        }
        this.props.changeChannelStatus(dataPost);
    }

    renderButtonFilter(data) {
        let that = this;
        let render = data.map((item, index) => {
            if(item.listChild != null) {
                return <div key={index} className="btn-group btn-see mr-10">
                            <button type="button" className={that.state.selectedItems.channelStatusId == item.channelStatusId || item.listChild.findIndex(obj => obj.channelStatusId === that.state.selectedItems.channelStatusId) != -1 ? "btn btn-default active" : "btn btn-default"} onClick={that.buttonFilterClick.bind(that, item)}>{item.channelStatusName} ({item.count})</button>
                            <button type="button" className={that.state.selectedItems.channelStatusId == item.channelStatusId || item.listChild.findIndex(obj => obj.channelStatusId === that.state.selectedItems.channelStatusId) != -1 ? "btn btn-default dropdown-toggle active" : "btn btn-default dropdown-toggle"} data-toggle="dropdown" aria-expanded="false">
                                <span className="caret"></span>
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                                {that.renderButtonChild(item.listChild)}
                            </ul>
                        </div>
            } else {
                return <button key={index} type="button" className={that.state.selectedItems.channelStatusId == item.channelStatusId ? "btn btn-default mr-10 active" : "btn btn-default mr-10"} onClick={that.buttonFilterClick.bind(that, item)}>{item.channelStatusName} ({item.count})</button>
            }
        });
        return render;
    }

    renderButtonChild(data) {
        let that = this;
        let render = data.map((item, index) => {
            return <li key={index}><a onClick={that.buttonFilterClick.bind(that, item)}>{item.channelStatusName} ({item.count})</a></li>
        });
        return render;
    }

    render() {
        let that = this;
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Danh sách PFS</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group col-md-12">
                                <div className="row">
                                    <div className="search-container">
                                        <div className="col-md-3">
                                            <label className="control-label col-md-12">Từ khóa</label>
                                            <div className="col-md-12">
                                                <input name="searchKeyword" type="text" className="form-control" 
                                                value={that.props.pfs.searchData.searchKeyword ? that.props.pfs.searchData.searchKeyword : '' } 
                                                placeholder="Nhập từ khóa..."
                                                onChange={that.props.inputChangeSearch.bind(that)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <InputDate
                                                id="fromDate"
                                                label="Từ ngày"
                                                value={that.props.pfs.searchData.fromDate ? moment(that.props.pfs.searchData.fromDate).format(that._STORED_LOCAL.formatDateMoment) : null}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <InputDate
                                                id="toDate"
                                                label="Đến ngày"
                                                value={that.props.pfs.searchData.toDate ? moment(that.props.pfs.searchData.toDate).format(that._STORED_LOCAL.formatDateMoment) : null}
                                            />
                                        </div>
                                        {currentUser.departments[0].isGroupAdmin == true && <div className="col-md-3 pl-0">
                                            <Select2
                                                id="listAssignedTo"
                                                label="Assign"
                                                isMulti={true}
                                                options={that.props.pfs.listAssign}
                                                value={that.props.pfs.filterSelect.listAssignedTo ? that.props.pfs.filterSelect.listAssignedTo : []}
                                                onChange={that.props.handleChangeSelectMulti.bind(that, 'listAssignedTo')}
                                            />
                                        </div>}
                                        <button className="btn btn-default mr-10 mt-25 pull-right" onClick={that.props.handleClearSearch.bind(that)}>Bỏ lọc</button>
                                        <button className="btn btn-primary mr-10 mt-25 pull-right" onClick={that.props.handleSearch.bind(that)}>Tìm</button>
                                    </div>
                                </div>
                                <hr className="mortgage-hr"/>
                                <div className="row">
                                    <div className="group-button-deal text-center mt-25" style={{padding:"0 50px"}}>
                                        {that.renderButtonFilter(that.props.pfs.listButtonFilter)}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <table id={"table-pfs"} className={"table table-bordered table-striped dataTable"}>
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

export default PfsList;