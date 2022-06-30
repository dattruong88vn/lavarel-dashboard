import React from 'react';
import numberToCurrency from '../commonComponents/functions/numberToCurrency';
import numberToDate from '../commonComponents/functions/numberToDate';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Handle event money collect
     */
    handleMoneyCollect = () => {
        this.props.onMoneyCollect(this.props.deal);
    }
    

    /**
     * Handle event collected completion
     */
    handleCollectedCompletion = () => {
        this.props.onCollectedCompletion(this.props.deal);
    }

    /**
     * Handle event on money collected history review
     */
    handleMoneyCollectedHistory = () => {
        this.props.onMoneyCollectedHistory(this.props.deal);
    }

    /**
     * Handle event on updating records
     */
    handleRecordsUpdate = () => {
        this.props.onRecordsUpdate(this.props.deal);
    }

    render() {
        const {
            rListingID: listingID,
            ownerName,
            dealID,
            assigner,
            customerName,
            agency,
            status,
            depositClosedDate,
            price,
            collectPrice,
            collectedDate,
            remainMoney,
            expectedDate
        } = this.props.deal;

        const revenue = numberToCurrency(this.props.deal.revenue);
        const dealValue = numberToCurrency(price);
        const collected = numberToCurrency(collectPrice);
        const remain = numberToCurrency(remainMoney);

        const depositDate = numberToDate(depositClosedDate);
        const closestCollectedDate = numberToDate(collectedDate)
        const expected = numberToDate(expectedDate);

        return (
            <tr>
                <td>{listingID}</td>
                <td>{ownerName}</td>
                <td>{dealID}</td>
                <td>{assigner}</td>
                <td>{customerName}</td>
                <td>{agency ? 'Có' : 'Không'}</td>
                <td>{status}</td>
                <td>{depositDate}</td>
                <td>{dealValue}</td>
                <td>{revenue}</td>
                <td>{collected}</td>
                <td>{closestCollectedDate}</td>
                <td>{remain}</td>
                <td>{expected}</td>
                <td>
                    <div className="dropdown commission-action-container">
                        <button
                            className="dropdown-toggle commission-actions"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        ><i className="fa fa-ellipsis-v"></i></button>

                        <div className="commssion-deal-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <p onClick={this.handleMoneyCollect}>Thu tiền</p>
                            <p onClick={this.handleCollectedCompletion}>Không thu được và hoàn tất</p>
                            <p onClick={this.handleRecordsUpdate}>Cập nhật hồ sơ</p>
                            <p onClick={this.handleMoneyCollectedHistory}>Xem lịch sử</p>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}