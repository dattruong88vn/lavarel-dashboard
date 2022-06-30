import React from 'react';
import { Modal } from 'react-bootstrap';
import CommissionDealRow from './CommissionDealRow';
import HttpService from './http';
import Spinner from '../commonComponents/spinner/Spinner';

export default class CollectedCompletionModal extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dealFinId: props.dealFinId,
            dealId: 0,
            status: '',
            customerName: '',
            totalCoValueString: 0,
            totalCoRemainString: 0,
            note: '',
            loading: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

        /**
         * Get details
         */
        const { dealFinId } = this.props;

        this.setState({
            loading: true
        })

        HttpService.moneyCollectedDetails(dealFinId).then(
            res => {
                // Turn off loading spinner
                if(this._isMounted) {
                    this.setState({
                        loading: false
                    })
                }

                if(this._isMounted && res.data.result) {
                    const {
                        dealId,
                        status,
                        customerName,
                        payer,
                        totalCoValueString,
                        totalCoRemainString
                    } = res.data.data;

                    this.setState({
                        dealId,
                        status,
                        customerName,
                        payer,
                        totalCoValueString,
                        totalCoRemainString
                    });
                }
            }
        ).catch(_ => {
            this.setState({
                loading: false
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Handle change event
     */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    /**
     * Handle event on clicking complete button
     */
    handleCollectedCompletionAction = () => {

        const {
            dealFinId,
            dealId,
            status,
            customerName,
            payer,
            totalCoValueString,
            totalCoRemainString,
            note
        } = this.state;

        this.setState({
            loading: true
        })

        HttpService.postCollectedCompletion({
            dealFinId,
            dealId,
            status,
            customerName,
            payer,
            totalCoValueString,
            totalCoRemainString,
            note
        }).then(res => {
            // Turn off loading spinner
            if(this._isMounted) {
                this.setState({
                    loading: false
                })
            }

            if(res.data.result) {
                // Close modal
                this.props.handleClose();
            }

        }).catch(_ => {
            this.setState({
                loading: false
            })
        })
    }

    render() {

        const {
            show,
            handleClose,
        } = this.props;

        const {
            dealId,
            customerName,
            totalCoValueString,
            totalCoRemainString,
            note,
            loading
        } = this.state;

        return (
            <>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title className="commission-deal-modal-header">
                            Hoàn tất thu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <CommissionDealRow 
                            leftClass="col-sm-3"
                            rightClass="col-sm-9"
                            name="Deal ID"
                            value={dealId}
                        />

                        <CommissionDealRow 
                            leftClass="col-sm-3"
                            rightClass="col-sm-9"
                            name="Trạng thái"
                            value="Close"
                        />

                        <CommissionDealRow 
                            leftClass="col-sm-3"
                            rightClass="col-sm-9"
                            name="Tên khách hàng"
                            value={customerName}
                        />
                        <CommissionDealRow 
                            leftClass="col-sm-3"
                            rightClass="col-sm-9"
                            name="Doanh thu"
                            value={totalCoValueString}
                        />

                        <CommissionDealRow 
                            leftClass="col-sm-3"
                            rightClass="col-sm-9"
                            name="Còn lại"
                            value={totalCoRemainString}
                        />
                        
                        <div className="row commission-deal-row">
                            <div className="col-sm-3">Ghi chú (*)</div>
                            <div className="col-sm-9">
                                <textarea 
                                    name="note"  
                                    value={note}
                                    className="form-control"
                                    placeholder="Ghi chú"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row commission-deal-button">
                            <button 
                                className="btn btn-primary"
                                disabled={!note}
                                onClick={this.handleCollectedCompletionAction}
                            >Hoàn tất</button>
                        </div>

                    </Modal.Body>
                </Modal>

                {loading && <Spinner/>}

            </>
        )
    }
}