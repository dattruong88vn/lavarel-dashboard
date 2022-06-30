import React, { Component } from "react"
import { Modal } from "react-bootstrap"

class ModalHistoryCustomer extends Component {
    constructor(props) {
        super(props)
        this._COLUMNS = []
        this._TABLE_HISTORY_CUSTOMER = null
    }

    componentWillMount() {
        $("#tableHistoryCustomer").DataTable().destroy(true)
        this._TABLE_HISTORY_CUSTOMER = null
        this._COLUMNS = [
            {
                data: "visitorName",
                name: "Tên khách hàng",
                render($data, $type, $object, $position) {
                    if ($data) {
                        return $data
                    }
                    return ""
                },
            },
            {
                data: "phone",
                name: "Số điện thoại",
            },
            {
                data: "requestTypeName",
                name: "Nhu cầu",
            },
            {
                data: "tc",
                name: "Địa chỉ TC",
                width: "200px",
            },
            {
                data: "visitorTypeName",
                name: "Loại KH",
                width: "100px",
            },
            {
                data: "visitDate",
                name: "Thời gian",
                width: "120px",
                render($data, $type, $object, $position) {
                    if ($data) {
                        return moment($data).format("HH:mm - DD/MM/YYYY")
                    }
                    return ""
                },
            },
        ]
    }

    render() {
        const { checking, handleCloseModalHistoryCustomer } = this.props
        let { modalHistoryCustomer } = checking
        let nameOfColumns = this._COLUMNS.map((column) => {
            return <th key={column.data}>{column.name ? column.name : ""}</th>
        })
        return (
            <Modal
                id={"modalHistoryCustomer"}
                onShow={this.renderTable.bind(this)}
                className="modal-customer"
                show={modalHistoryCustomer}
                backdrop="static"
                onHide={() => handleCloseModalHistoryCustomer()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Lịch sử của khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table
                        id="tableHistoryCustomer"
                        className={"table table-checking dataTable"}
                    >
                        <thead>
                            <tr>{nameOfColumns}</tr>
                        </thead>
                    </table>
                </Modal.Body>
            </Modal>
        )
    }

    renderTable() {
        const that = this
        that._TABLE_HISTORY_CUSTOMER = $("#tableHistoryCustomer").DataTable({
            data: that.props.checking.dataChecking.visitors,
            paging: true,
            searching: false,
            ordering: false,
            lengthChange: false,
            pageLength: 10,
            bInfo: false,
            language: DatatableHelper.languages.vn,
            columns: that._COLUMNS,
        })
    }
}

export default ModalHistoryCustomer
