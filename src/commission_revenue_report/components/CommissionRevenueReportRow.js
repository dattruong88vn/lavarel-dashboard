import React, { Component } from 'react';

export default class CommissionRevenueReportRow extends Component {
    constructor(props) {
        super(props);
    }

    handleBrokerageDetailsReview = () => {
        this.props.onBrokerageDetails(this.props.data.dealId);
        
    }

    handleHistoryReview = () => {
        this.props.onHistory(this.props.data.dealFinId);
    }

    render() {

        const {
            rListingId,
            ownerName,
            dealId,
            assignedToName,
            customerName,
            listingTypeName,
            price,
            depositDate,
            totalCommissionValue,
            collectedPrice,
            nearestCollectionDate,
            collectType,
            expectedDate,
            remain,
            totalCommissionUser,
            fileStatus,
            tpa

        } = this.props.data;

        return (
            <tr>
                <td>{rListingId}</td>
                <td>{ownerName}</td>
                <td>{dealId}</td>
                <td>{assignedToName}</td>
                <td>{customerName}</td>
                <td>{price}</td>
                <td>{listingTypeName}</td>
                <td>{depositDate}</td>
                <td>{totalCommissionValue}</td>
                <td>{collectedPrice}</td>
                <td>{nearestCollectionDate}</td>
                <td>{collectType}</td>
                <td>{remain}</td>
                <td>{expectedDate}</td>
                <td>{tpa}</td>
                <td>{totalCommissionUser}</td>
                <td>{fileStatus}</td>
                <td>
                    <div className="dropdown commission-action-container">
                        <button
                            className="dropdown-toggle commission-actions"
                            type="button"
                            id="commissionRevenueReport"
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        ><i className="fa fa-ellipsis-v"></i></button>

                        <div className="commssion-deal-dropdown dropdown-menu" aria-labelledby="commissionRevenueReport">
                            <p onClick={this.handleBrokerageDetailsReview}>Xem chi tiết hoa hồng</p>
                            <p onClick={this.handleHistoryReview}>Xem lịch sử</p>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}