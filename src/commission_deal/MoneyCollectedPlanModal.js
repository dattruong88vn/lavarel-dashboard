import React from 'react';
import { Modal } from 'react-bootstrap';
import HttpService from './http';
import MoneyCollectedPlanRow from './MoneyCollectedPlanRow';
import CommissionTextarea from './CommissionTextarea';
import uniqid from 'uniqid';
import numberToCurrency from '../commonComponents/functions/numberToCurrency';

export default class MoneyCollectedPlanModal extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            totalCommissionValue: 0,
            totalCommissionRemain: 0,
            details: [],
            note: '',
            totalError: false,
            noteError: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const {
            dealID
        } = this.props.deal;

        HttpService.getMoneyCollectedPlanList(dealID).then(
            res => {
                if(this._isMounted && res.data.result) {
                    const {
                        totalCommissionValue,
                        totalCommissionRemain,
                        details,
                        note
                    } = res.data.data.data;

                    this.setState({
                        totalCommissionValue,
                        totalCommissionRemain,
                        details,
                        note
                    })
                }
            }
        )
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Event on handling input change
     */
    handleOnChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    /**
     * Handle event on updating plan list
     */
    handleUpdatePlanList = (updatedPlan) => {
        const {
            details
        } = this.state;

        const newList = details.map(plan => {
            if(plan.id === updatedPlan.id) {
                return updatedPlan;
            }
            return plan;
        })

        this.setState({
            details: newList
        })
    }

    /**
     * Remove a plan having id from plan list
     * Update details state
     */
    handleRemovePlan = (id) => {
        const { details: oldList } = this.state;
        if(oldList.length > 1) {
            const details = oldList.filter(plan => plan.id != id);
            this.setState({
                details
            })
        }
    }

    handleAddPlan = () => {
        const {
            details
        } = this.state;

        this.setState({
            details: [
                ...details,
                {
                    id: uniqid(),
                    amount: 0,
                    date: '',
                    isCollected: false
                }
            ]
        })
    }
    
    /**
     * Handle event on clicking completed button
     */
    handleCollectedPlanCompleted = () => {

        // Reset error
        this.setState({
            totalError: false,
            noteError: false
        })

        /**
         * Check total money cannot be greater rather than remain
         */
        const { remain } = this.props.deal;
        const { 
            details, 
            note 
        } = this.state;

        let total = 0;
        details.forEach(plan => {
            let value = plan.amount;

            // Remove dots
            value = value.replace(/\./g, '');

            // Replace comma by dot
            value = value.replace(',', '.');

            // cast value to float
            total += parseFloat(value);
        });
        
        // Check total
        if(total > remain) {
            // Display error notification
            this.setState({
                totalError: true
            })
        }
        
        // Check note
        if(!note) {
            this.setState({
                noteError: true
            })
        } 
        
        if(total <= remain && note){
            // Send data to server
            HttpService.postMoneyCollectedPlanList({details, note}).then(
                res => {
                    // Close modal
                    this.props.handleClose();
                }
            )
        }
    }

    render() {
        
        const {
            show,
            handleClose,
        } = this.props;

        const {
            details,
            note,
            totalError,
            noteError
        } = this.state;

        const totalCommissionValue = numberToCurrency(this.state.totalCommissionValue);
        const totalCommissionRemain = numberToCurrency(this.state.totalCommissionRemain);

        return (
            <Modal show={show} onHide={handleClose} animation={true} bsSize="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="commission-deal-modal-header">
                        Kế hoạch thu tiền
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row commission-deal-row">
                        <div className="col-sm-6">
                            <span>Doanh thu: </span>
                            <span>{totalCommissionValue}</span>
                        </div>

                        <div className="col-sm-6">
                            <span>Còn lại: </span>
                            <span>{totalCommissionRemain}</span>
                        </div>
                    </div>

                    {details && details.map(plan => 
                        <MoneyCollectedPlanRow 
                            key={plan.collectId} 
                            plan={plan}
                            onChange={this.handleUpdatePlanList}
                            onRemove={this.handleRemovePlan}
                        />
                    )}

                    <div className="row commission-deal-row">
                        <div className="col-sm-12">
                            <button className="btn btn-sm" onClick={this.handleAddPlan}>
                                <i className="fa fa-plus text-primary"></i>
                            </button>
                        </div>
                    </div>

                    <CommissionTextarea 
                        leftClass="col-sm-2"
                        rightClass="col-sm-10"
                        label="Ghi chú (*)"
                        name="note"
                        placeholder=""
                        value={note}
                        onChange={this.handleOnChange}
                    />

                    <div className="row commission-deal-button">
                        <button 
                            className="btn btn-primary" 
                            onClick={this.handleCollectedPlanCompleted}
                        >Hoàn tất</button>
                    </div>

                    {totalError && <div className="row commission-deal-row">
                        <div className="col-sm-12 text-danger">
                            Tổng số tiền không được lớn hơn số tiền còn lại
                        </div>
                    </div>}

                    {noteError && <div className="row commission-deal-row">
                        <div className="col-sm-12 text-danger">
                            Nhập ghi chú
                        </div>
                    </div>}
                </Modal.Body>
            </Modal>
        )
    }
}
