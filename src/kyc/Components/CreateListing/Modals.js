import React, { Component, Fragment } from "react"

export function ModalPacket() {
    return (
        <div
            className="modal fade modal-customer"
            id="modal-packet-propzy"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-packet-propzy"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content ">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">
                            Các Gói Tính Năng Của Propzy
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row form-group" style={{ margin: 0 }}>
                            <div className="col-sm-12">
                                <img
                                    className="img-packet-propzy"
                                    src="/images/kyc/tinh-nang.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export class ModalListDeal extends Component {
    constructor(props) {
        super(props)
        this._TABLE_COLUMN = []
        this._TABLE = null
        this.state = {
            total: 0,
        }
    }
    componentDidMount() {
        this._TABLE_COLUMN = [
            {
                data: "customerName",
                name: "Họ tên",
                className: "text-left td-match-deal-name",
                render($data, $type, $object) {
                    return $data ? $data : "N/a"
                },
            },
            {
                data: "propertyTypeName",
                name: "Loại hình BĐS",
                width: "80px",
                className: "text-left td-match-deal-property",
                render($data, $type, $object) {
                    return $data ? $data : "N/a"
                },
            },
            {
                data: "budget",
                name: "GIá",
                className: "text-center td-match-deal-price",
                render($data, $type, $object) {
                    return `${
                        $object.initialBudget ? $object.initialBudget : "N/a"
                    } - ${$object.finalBudget ? $object.finalBudget : "N/a"} `
                },
            },
            {
                data: "area",
                name: "Diện tích",
                className: "text-center td-match-deal-area",
                render($data, $type, $object) {
                    return `${$object.minSize ? $object.minSize : "N/a"} - ${
                        $object.maxSize ? $object.maxSize : "N/a"
                    } m<sup>2</sup>`
                },
            },
            {
                data: "districtName",
                name: "Quận",
                className: "text-left td-match-deal-district",
                render($data, $type, $object) {
                    return $data ? $data : "N/a"
                },
            },
            {
                data: "note",
                name: "Ghi chú",
                width: "200px",
                className: "text-left td-match-deal-note",
                style: {
                    width: "200px",
                },
                render($data, $type, $object) {
                    return $data ? $data : "N/a"
                },
            },
        ]
        const that = this
        $("#modal-match-deal").on("shown.bs.modal", function () {
            that._TABLE.ajax.reload()
        })
        that._TABLE = $("#table-match-deal")
            .DataTable({
                processing: false,
                serverSide: true,
                deferLoading: false,
                ajax: {
                    url: "/kyc-api/get-customer-match-deal",
                    type: "POST",
                    data: function (d) {
                        Object.assign(d, { filter: that.props.filter })
                        return d
                    },
                },
                deferRender: false,
                lengthChange: false,
                info: false,
                paging: false,
                searching: false,
                ordering: false,
                order: [[0, "desc"]],
                scrollY: "500px",
                scrollCollapse: true,
                language: DatatableHelper.languages.vn,
                columns: that._TABLE_COLUMN,
            })
            .off("processing.dt")
            .on("processing.dt", function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading()
                } else {
                    hidePropzyLoading()
                }
            })
            .on("xhr.dt", function (e, settings, json, xhr) {
                that.setState({
                    total: json.recordsTotal,
                })
            })
    }

    render() {
        return (
            <div
                className="modal fade modal-customer"
                id="modal-match-deal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modal-match-deal"
                aria-hidden="false"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title">
                                Danh Sách người mua phù hợp
                            </h4>
                        </div>
                        <div className="modal-body">
                            <label>
                                Có {this.state.total} người mua phù hợp
                            </label>
                            <a
                                style={{ float: "right" }}
                                href="javascript:void(0)"
                                data-toggle="modal"
                                data-target="#modal-packet-propzy"
                            >
                                Biểu phí và các gói dịch vụ
                            </a>
                            <table
                                id="table-match-deal"
                                className={
                                    "table table-payment-schedule table-hover table-striped"
                                }
                                style={{ width: "100%" }}
                            >
                                <thead>
                                    <tr>
                                        <th className="th-match-deal-name">
                                            Họ tên
                                        </th>
                                        <th className="th-match-deal-property">
                                            Loại hình BĐS
                                        </th>
                                        <th className="th-match-deal-price">
                                            Giá
                                        </th>
                                        <th className="th-match-deal-area">
                                            Diện tích
                                        </th>
                                        <th className="th-match-deal-district">
                                            Quận
                                        </th>
                                        <th className="th-match-deal-note">
                                            Ghi chú
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
