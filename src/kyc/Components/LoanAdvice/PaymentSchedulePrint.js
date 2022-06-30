import React, { Component } from 'react';
import {connect} from "react-redux";

class PaymentSchedulePrint extends Component {
    constructor(props) {
        super(props);
        let data = window.localStorage.getItem("dataPaymentSchedule");
        this.state = {
            data: JSON.parse(data)
        }
    }
    
    format_curency(data) {
        if(data != null) {
            data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
        return data;
    }

    componentDidMount() {
        window.print();   
    }

    render() {
        let that = this;
        let {data} = that.state;
        return (
            <div id="printableTable">
                <table id="tablePrintPayment" className={"table print-payment"}>
                    <thead>
                        <tr>
                            <th>Số kỳ trả</th>
                            <th>Dư nợ đầu kỳ (VND)</th>
                            <th>Gốc phải trả (VND)</th>
                            <th>Lãi phải trả (VND)</th>
                            <th>Gốc + lãi (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.schedules.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.month}</td>
                                    <td>{that.format_curency(item.debt)}</td>
                                    <td>{that.format_curency(item.orginialPaidMontly)}</td>
                                    <td>{that.format_curency(item.interestPaidMonthly)}</td>
                                    <td>{that.format_curency(item.totalPaidMonthly)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td >Tổng</td>
                            <td>{that.format_curency(data.total)}</td>
                            <td>{that.format_curency(data.totalInterestPaid)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loan: state.LoanAdviceReducer
    }
}

export default connect(mapStateToProps, null)(React.memo(PaymentSchedulePrint));