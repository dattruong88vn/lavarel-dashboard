import React, { Component } from 'react';
import {Modal } from 'react-bootstrap';
import httpService from './../utils/http';
import uniqid from 'uniqid';
import CommissionBrokeragePeriodModal from './CommissionBrokeragePeriodModal';
import Spinner from '../../commonComponents/spinner/Spinner';

const COLUMNS = [
    { id: uniqid(), name: 'Tên nhân viên'},
    { id: uniqid(), name: 'Chức vụ'},
    { id: uniqid(), name: 'Hoa hồng'},
    { id: uniqid(), name: 'Hành động'}
]

export default class CommissionBrokerageDetailsModal extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        
        this.state = {
            transactionValue: 0,
            revenue: 0,
            totalCommission: 0,
            historyList: [],
            showHistoryPeriod: false,
            userId: 0,
            dealFinId: 0,
            loading: false
        }
    }

    componentDidMount(){
        this._isMounted = true;

        const { dealId } = this.props;

        // Enable loading spinner
        this.setState({
            loading: true
        })

        // Get commission brokerage details
        httpService.getCommissionBrokerageDetails(dealId).then(res => {

            // Turn off loading spinner
            this.setState({
                loading: false
            })

            if(this._isMounted && res.data.result) {

                const {
                    price: transactionValue,
                    revenue,
                    totalCommission,
                    dealFinId,
                    userList: historyList,
                } = res.data.data;

                this.setState({
                    transactionValue,
                    revenue,
                    totalCommission,
                    dealFinId,
                    historyList
                })
            }
        }).then(_ => {
            this.setState({
                loading: false
            })
        })

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Handle event on clicking detail button
     * Update userId then
     * Show up commission brokerage period modal
     */
    handleViewPeriodDetails = (userId) => {

        this.setState({
            userId
        }, () => {
            this.setState({
                showHistoryPeriod: true
            })
        })
    }


    /**
     * Handle event on closing accumulated commission brokerage period modal
     */
    handleCloseCommissionBrokeragePeriodModal = () => {
        this.setState({
            showHistoryPeriod: false
        })
    }

    render() {

        const {
            dealId,
            show,
            handleClose
        } = this.props;

        const {
            transactionValue,
            revenue,
            historyList,
            showHistoryPeriod,
            dealFinId,
            userId,
            loading
        } = this.state;

        return (
            <>
                <Modal show={show} onHide={handleClose} animation={true} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title className="commission-deal-modal-header">
                            Chi tiết hoa hồng
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row report-revenue-row">
                            <div className="col-sm-6">
                                <span>Giá trị giao dịch: <b>{transactionValue}</b></span>
                            </div>

                            <div className="col-sm-6">
                                <span>Doanh thu: <b>{revenue}</b></span>
                            </div>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    {COLUMNS.map(column => <th key={column.id}>{column.name}</th>)}
                                </tr>
                            </thead>

                            <tbody>
                            {historyList && historyList.map(item => 
                                <tr key={item.userId}>
                                    <td>{item.userName}</td>
                                    <td>{item.positionName}</td>
                                    <td>{item.commission}</td>
                                    <td>
                                        <button className="btn btn-light" onClick={() => this.handleViewPeriodDetails(item.userId, dealId)}>Xem chi tiết</button>
                                    </td>
                                </tr>      
                            )}
                            </tbody>
                        </table>

                        {showHistoryPeriod &&
                        <CommissionBrokeragePeriodModal
                            show={showHistoryPeriod}
                            handleClose={this.handleCloseCommissionBrokeragePeriodModal}
                            userId={userId}
                            dealFinId={dealFinId}
                        />}
                    
                    </Modal.Body>
                </Modal>

                {loading && <Spinner/>}
            </>
            
        )
    }
}