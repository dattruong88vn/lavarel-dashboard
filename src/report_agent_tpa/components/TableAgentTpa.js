import React, { Component } from 'react';
import {connect} from "react-redux";
import moment from "moment";

class TableAgentTpa extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_AGENT_TPA = null;
    }

    componentWillMount() {
        $('#tableAgentTpa').DataTable().destroy(true);
        this._TABLE_AGENT_TPA = null;
        this._COLUMNS = [
            {
                data: 'name',
                name: 'Tên môi giới',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'phone',
                name: 'Sđt',
                width: '60px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'idNo',
                name: 'CMND',
                width: '60px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'numberContractm',
                name: 'Số hợp đồng',
                width: '60px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'createdDate',
                name: 'Ngày tạo',
                width: '100px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'aStatusName',
                name: 'Trạng thái môi giới',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'statusDate',
                name: 'Ngày đổi trạng thái',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'rListingId',
                name: 'ListingID',
                width: '80px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'rlCreatedDate',
                name: 'Ngày tạo tin đăng',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'rlCreatedDateLive',
                name: 'Ngày live',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'rStatusName',
                name: 'Trạng thái tin đăng',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'rStatusDate',
                name: 'Ngày đổi trạng thái tin đăng',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'requestId',
                name: 'RequestID',
                width: '80px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'rCreatedDate',
                name: 'Ngày tạo request',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'leadId',
                name: 'LeadID',
                width: '80px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'lCreatedDate',
                name: 'Ngày tạo Lead',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'lStatusName',
                name: 'Trạng thái Lead',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'lMaxStatusDate',
                name: 'Ngày đổi trạng thái Lead',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'dealId',
                name: 'DealID',
                width: '80px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'dCreatedDate',
                name: 'Ngày tạo Deal',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            },
            {
                data: 'dStatusName',
                name: 'Trạng thái Deal',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return $data;
                    }
                    return `N/A`;
                }
            },
            {
                data: 'dMaxStatusDate',
                name: 'Ngày đổi trạng thái Deal',
                width: '120px',
                render($data, $type, $object, $position) {
                    if($data) {
                        return moment($data).format('DD/MM/YYYY');
                    }
                    return `N/A`;
                }
            }
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
                        <table id={"tableAgentTpa"} className={"table table-bordered table-striped dataTable"}>
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
        that._TABLE_AGENT_TPA = $('#tableAgentTpa')
            .DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: '/report-agent-tpa/get-list-report',
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, that.props.filter.postData);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                order: [[4, 'desc']],
                language: DatatableHelper.languages.vn,
                columns: that._COLUMNS,
                scrollX: true
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            });
        dispatch({type:'SET_TABLE', table: that._TABLE_AGENT_TPA});
    }
}

export default connect(function (state) {
    return {
        filter : state.Filter
    }
})(TableAgentTpa);