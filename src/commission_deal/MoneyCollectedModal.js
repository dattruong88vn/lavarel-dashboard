import React from 'react';
import {Modal} from 'react-bootstrap';
import HttpService from './http';
import CommissionDealRow from './CommissionDealRow';
import Spinner from '../commonComponents/spinner/Spinner';
import Select from 'react-select';
import NotificationMessage from '../commonComponents/notifications/NotificationMessage';
import NumberFormat from 'react-number-format';

const COLLECT_TYPE_DEFAULT = {
    label: 'Chuyển khoản',
    value: 1718
}

export default class MoneyCollectedModal extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            dealId: 0,
            dealFinId: props.dealFinId,
            status: '',
            customerName: '',
            collectedMethods: [],
            payerId: null,
            payerName: '',
            collectType: COLLECT_TYPE_DEFAULT,
            totalCoValueString: 0,
            totalCoRemainString: 0,
            realCollected: '',
            note: '',
            loading: false,
            error: '',
            isNotification: false,
            notification: {
                type: 'success',
                message: ''
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const {dealFinId} = this.state;

        /**
         * Get details
         */

        this.setState({
            loading: true
        });

        HttpService.moneyCollectedDetails(dealFinId).then(
            res => {

                if (this._isMounted) {
                    this.setState({
                        loading: false
                    })
                }

                if (res.data.result && this._isMounted) {

                    const {
                        dealId,
                        status,
                        customerName,
                        collectTypes,
                        payer: {
                            userId: payerId,
                            name: payerName
                        },
                        totalCoValueString,
                        totalCoRemainString,

                    } = res.data.data;

                    this.setState({
                        dealId,
                        status,
                        customerName,
                        collectedMethods: collectTypes.map(type => ({
                            label: type.name,
                            value: type.id
                        })),
                        payerId,
                        payerName,
                        totalCoValueString,
                        totalCoRemainString
                    })
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
     * Handle payer change value event
     */
    handleChange = e => {
        const newValue = e.target.value;
        this.setState({
            [e.target.name]: newValue
        });
    }

    /**
     * Handle event on select change
     */
    handleSelectChange = value => {
        this.setState({
            collectType: value
        })
    }

    /**
     * Handle event on input changes
     */
    handleInputChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleCollectedAction = () => {
        const {
            dealId,
            dealFinId,
            status,
            customerName,
            payerId,
            payerName,
            collectType,
            totalCoValueString,
            totalCoRemainString,
            realCollected,
            note
        } = this.state;
        console.log(this.state);
        // Check real collected money vs revenue
        const collected = parseFloat((realCollected.toString().replace(/\./g, '')).replace(/\,/g, '.'));
        const remain = parseFloat((totalCoRemainString.toString().replace(/\./g, '')).replace(/\,/g, '.'));
        console.log(collected);
        if (collected > remain) {
            this.setState({
                error: 'Số tiền thực thu không được lớn hơn còn lại'
            })
        } else if (collected > remain) {
            this.setState({
                error: 'Số tiền thực thu không được lớn hơn còn lại'
            })
        } else {
            this.setState({
                loading: true
            });

            HttpService.postMoneyCollected({
                dealId,
                dealFinId,
                status,
                customerName,
                payer: {
                    userId: payerId,
                    name: payerName,
                },
                collectType: {
                    id: collectType && collectType.value,
                    name: collectType && collectType.label
                },
                totalCoValueString,
                totalCoRemainString,
                collectPriceString: parseInt(collected, 10),
                note
            }).then(
                res => {
                    const {
                        result,
                        message
                    } = res.data;

                    this.setState({
                        loading: false,
                        isNotification: true
                    }, () => {
                        // Display notification
                        this.setState({
                            notification: {
                                type: result ? 'success' : 'failed',
                                message
                            }
                        })
                    });
                }
            ).catch(_ => {
                this.setState({
                    loading: false
                });
            })
        }
    }

    /**
     * Close notification
     */
    handleCloseNotification = () => {
        this.setState({
            isNotification: false
        }, () => {
            // If successfully save/update, close the dialog
            const {
                type
            } = this.state.notification;

            if (type === 'success') {
                this.props.handleClose(true);
            }
        })
    }

    render() {
        const {
            show,
            handleClose
        } = this.props;

        const {
            dealId,
            status,
            customerName,
            payerName,
            collectType,
            collectedMethods,
            totalCoValueString,
            totalCoRemainString,
            realCollected,
            note,
            loading,
            error,
            isNotification,
            notification
        } = this.state;

        const disabled = !note || !realCollected;

        return (
            <>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title className="commission-deal-modal-header">
                            Thu tiền
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
                            value={status}
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
                            name="Người nộp"
                            value={payerName}
                        />

                        <div className="row commission-deal-row">
                            <div className="col-sm-3">Hình thức thu</div>
                            <div className="col-sm-9">
                                <Select
                                    name="collectType"
                                    value={collectType}
                                    onChange={this.handleSelectChange}
                                    options={collectedMethods}
                                    isMulti={false}
                                />

                            </div>
                        </div>

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
                            <div className="col-sm-3">Thực thu (*)</div>
                            <div className="col-sm-9">
                                <NumberFormat
                                    decimalScale="0"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    allowedDecimalSeparators={[]}
                                    className="form-control"
                                    name="realCollected"
                                    onChange={e => this.handleInputChange('realCollected', e.target.value)}
                                    value={realCollected}
                                    placeholder="Thực thu"
                                    suffix={' đ'} />
                            </div>
                        </div>

                        <div className="row commission-deal-row">
                            <div className="col-sm-3">Ghi chú (*)</div>
                            <div className="col-sm-9">
                                <textarea
                                    className="form-control"
                                    placeholder="Ghi chú"
                                    name="note"
                                    value={note}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row commission-deal-button">
                            <button
                                className="btn btn-sm btn-primary"
                                disabled={disabled}
                                onClick={this.handleCollectedAction}
                            >Thu tiền</button>
                        </div>

                        {error && <div className="row commission-deal-button">
                            <div className="col-sm-12 text-danger">{error}</div>
                        </div>}
                    </Modal.Body>
                </Modal>

                {loading && <Spinner />}

                {isNotification &&
                    <NotificationMessage
                        duration={1500}
                        data={notification}
                        handleClose={this.handleCloseNotification}
                    />
                }
            </>
        )
    }
}