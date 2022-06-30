import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import httpService from './../utils/http';

export default class CommissionBrokeragePeriodModal extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            period: null,
            accumulatedRevenue: null,
            commissionUsers: [],
            type: '' // COMMISSION_FIXED | COMMISSION_ACCUMULATED
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const { userId, dealFinId } = this.props;

        // Get commission history timeline
        httpService.getCommissionUser(userId, dealFinId).then(res => {
            if(this._isMounted && res.data.result) {
                const {
                    period,
                    commissionAccumulate: accumulatedRevenue,
                    commissionUsers,
                    type
                } = res.data.data;
                this.setState({
                    period,
                    accumulatedRevenue,
                    commissionUsers,
                    type,
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const {
            show,
            handleClose,
            dealFinId,
        } = this.props;

        const {
            period,
            accumulatedRevenue,
            commissionUsers,
            type
        } = this.state;

        return (
            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="commission-deal-modal-header report-revenue-row">
                        Kỳ tính: {period}
                    </Modal.Title>

                    {type === 'COMMISSION_ACCUMULATED' && 
                    <Modal.Title className="commission-deal-modal-header">
                        Doanh thu tích lũy: {accumulatedRevenue}
                    </Modal.Title>
                    }

                </Modal.Header>
                <Modal.Body>
                {type === 'COMMISSION_ACCUMULATED' && <div className="commission-timeline">
                    {commissionUsers && commissionUsers.map((commission, index) => 
                        <div key={index} className="commission-timeline-container">
                            <div className="commission-timeline-content">
                                <div className="commission-timeline-content-item w-100 report-revenue-row">{commission.formula}</div>
                                <div className="commission-timeline-content-item w-100 report-revenue-row">Commission: {commission.commission}</div>
                                <div className="commission-timeline-content-item w-100 report-revenue-row">Commission Value: {commission.commissionValue}</div>
                            </div>
                        </div>    
                    )}  
                </div>}

                {type === 'COMMISSION_FIXED' && commissionUsers && commissionUsers.map((commission, index) =>
                    <div key={index}>
                        <div className="report-revenue-row">Commission : {commission.commission}</div>
                        <div>Commission value : {commission.commissionValue}</div>
                    </div>
                )}
                </Modal.Body>
            </Modal>
        )
    }
}