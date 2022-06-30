import React, { Component } from "react"

class CheckingNotInfo extends Component {
    toggleHistoryCustomerModal = (data) => {
        const { handleShowModalHistoryCustomer } = this.props

        handleShowModalHistoryCustomer(data)
    }

    renderTC(data) {
        let numberOfVisitTc = 0
        if (data.numberOfVisitTc) {
            numberOfVisitTc = data.numberOfVisitTc
        }

        let closedVisitDate = "N/A"
        if (data.closedVisitDate) {
            closedVisitDate = moment(data.closedVisitDate).format(
                "HH:mm - DD/MM/YYYY"
            )
        }

        return (
            <React.Fragment>
                <a
                    className="btn-history-customer"
                    href="javascript:;"
                    onClick={() => this.toggleHistoryCustomerModal(true)}
                >
                    {numberOfVisitTc} lần
                </a>{" "}
                - Lần ghé thăm gần nhất: {closedVisitDate}
            </React.Fragment>
        )
    }

    render() {
        let { dataChecking } = this.props.checking

        return (
            <div className="container">
                {(dataChecking.socialUid != null ||
                    (dataChecking.visitors != null &&
                        dataChecking.visitors.length > 0)) && (
                    <div className="form-group">
                        <h4>Thông tin khách hàng</h4>
                        <div className="info-customer-type">
                            <p>
                                <strong>- Loại khách hàng: </strong>
                                {dataChecking.visitorTypeName
                                    ? dataChecking.visitorTypeName
                                    : ""}
                            </p>
                            <p>
                                <strong>- Lịch sử giao dịch: </strong>
                                {dataChecking.historyTrading
                                    ? dataChecking.historyTrading
                                    : ""}
                            </p>
                            <p>
                                <strong>- Số lần tới TC: </strong>
                                {dataChecking.numberOfVisitTc > 0
                                    ? this.renderTC(dataChecking)
                                    : ""}
                            </p>
                        </div>
                    </div>
                )}
                <div className="form-group text-center">
                    <div className="no-data">
                        <img src="/images/kyc/nodata.png" alt="no-data" />
                    </div>
                    <h4 className="title-no-data">
                        Chưa có thông tin khách hàng
                    </h4>
                </div>
                <div className="form-group text-center mt15">
                    <button
                        className="btn btn-kyc consult-haunt"
                        onClick={this.props.handleShowModalChecking.bind(this)}
                    >
                        Tư vấn khách vãng lai
                    </button>
                </div>
            </div>
        )
    }
}

export default CheckingNotInfo
