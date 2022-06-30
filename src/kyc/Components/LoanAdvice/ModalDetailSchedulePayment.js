import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ModalDetailSchedulePayment extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_SCHEDULE_PAYMENT = null;
    }

    format_curency(data) {
        if(data != null) {
            data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
        return data;
    }

    componentWillMount() {
        let that = this;
        $('#tableSchedulePayment').DataTable().destroy(true);
        this._TABLE_SCHEDULE_PAYMENT = null;
        this._COLUMNS = [
            {
                data: 'month',
                name: 'Số kỳ trả',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return $data;
                    }
                    return '0';
                }
            },
            {
                data: 'debt',
                name: 'Gốc (VND)',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return that.format_curency($data);
                    }
                    return '';
                }
            },
            {
                data: 'orginialPaidMontly',
                name: 'Gốc phải trả (VND)',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return that.format_curency($data);
                    }
                    return '';
                }
            },
            {
                data: 'interestPaidMonthly',
                name: 'Lãi phải trả (VND)',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return that.format_curency($data);
                    }
                    return '';
                }
            },
            {
                data: 'totalPaidMonthly',
                name: 'Gốc + lãi (VND)',
                render($data, $type, $object, $position) {
                    if ($data) {
                        return that.format_curency($data);
                    }
                    return '';
                }
            }
        ];
    }

    handlePrintScript () {
        let json = JSON.stringify(this.props.loan.dataPaymentSchedule);
        window.localStorage.setItem("dataPaymentSchedule", json);
        window.open('/kyc/print-payment-detail', '_blank');
    }

    render() {
        let that = this;
        let {modalPaymentSchedule} = this.props.loan;
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });
        return (
            <Modal id={"modalPaymentSchedule"} className="modal-payment-schedule" show={modalPaymentSchedule} backdrop="static" onHide={this.props.handleCloseModalPaymentSchedule.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center"><strong>Chi Tiết Lịch Thanh Toán</strong></Modal.Title>
                    <button className="btn btn-default btn-print-payment-schedule" onClick={that.handlePrintScript.bind(that)}><span className="fa fa-print"></span> In lịch thanh toán</button>
                </Modal.Header>
                <Modal.Body>
                    <table id={"tableSchedulePayment"} className={"table table-payment-schedule"}>
                        <thead>
                            <tr>{nameOfColumns}</tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td >Tổng</td>
                                <td>{that.format_curency(this.props.loan.dataPaymentSchedule.totalInterestPaid)}</td>
                                <td>{that.format_curency(this.props.loan.dataPaymentSchedule.total)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </Modal.Body>
            </Modal>
        );
    }

    componentWillReceiveProps(nextProps){
        if(this.props.loan.dataPaymentSchedule != nextProps.loan.dataPaymentSchedule){
            const that = this;
            that._TABLE_SCHEDULE_PAYMENT = $('#tableSchedulePayment')
            .DataTable({
                data: nextProps.loan.dataPaymentSchedule.schedules,
                paging: false,
                searching: false,
                ordering: false,
                lengthChange: false,
                pageLength: 10,
                bInfo: false,
                language: DatatableHelper.languages.vn,
                columns: that._COLUMNS,
                scrollY: "400px",
                scrollCollapse: true
            });
        }
    }
}

export default ModalDetailSchedulePayment;