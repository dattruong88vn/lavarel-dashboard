import React from 'react';
import { Modal } from 'react-bootstrap';
import CommissionDealRow from './CommissionDealRow';
import CommissionCheckbox from './CommissionCheckbox';
import CommissionTextarea from './CommissionTextarea';
import HttpService from './http';
import Spinner from '../commonComponents/spinner/Spinner';
import NotificationMessage from '../commonComponents/notifications/NotificationMessage';

export default class RecordsUpdateModal extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dealId,
            customerName: '',
            listingTypeName: '',
            baName: '',
            fileNoteLast: '',
            fileStatusID: 0, // 0 : chưa đủ hồ sơ, 1: đủ hồ sơ
            allFileList: [],
            error: false,
            loading: false,
            isNotification: false,
            notification: {
                type: 'success',
                message: ''
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;

        this.setState({
            loading: true
        })

        /**
         * Get details deal fin with file
         */
        const { dealFinId } = this.props;

        HttpService.getDealFinDetails(dealFinId).then(
            res => {

                if(this._isMounted) {
                    this.setState({
                        loading: false
                    })
                }

                if(res.data.result && this._isMounted) {
                    const {
                        customerName,
                        listingTypeName,
                        baName,
                        fileNoteLast,
                        fileStatusID,
                        allFileList
                    } = res.data.data;

                    this.setState({
                        customerName,
                        listingTypeName,
                        baName,
                        fileNoteLast: fileNoteLast ? fileNoteLast : '',
                        fileStatusID,
                        allFileList
                    })
                }
            }
        ).catch(err => {
            this.setState({
                loading: false
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Event on value change
     */
    handleOnChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    handleCheckboxChange = (name, value) => {
        let { allFileList } = this.state;

        allFileList = allFileList.map(list => {
            if(list.fileId == name) {
                return {
                    ...list,
                    checked: value
                }
            } else {
                return list;
            }
        });

        this.setState({
            allFileList
        })
    }

    /**
     * Handle event on clicking record fulfilled button
     */
    handleRecordFulfill = (fileStatusID) => {

        const {
            fileNoteLast,
            allFileList
        } = this.state;

        const { dealFinId } = this.props;

        let checked = false;
        let checkedFileList = [];

        allFileList.forEach(list => {
            if(list.checked) {
                checkedFileList.push({
                    fileId: list.fileId,
                    fileName: list.fileName
                })
                checked = true;
            }
        });

        // If user click on full record button and no file checked yet
        if(fileStatusID && !checked) {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                loading: true
            })
            /**
             * Send request to update record
             */

            HttpService.updateRecord({
                dealFinId,
                fileStatusID,
                fileNoteLast,
                checkedFileList
            }).then(res => {
                if(this._isMounted) {

                    const {
                        result, 
                        message
                    } = res.data;

                    this.setState({
                        loading: false,
                        isNotification: true,
                        notification: {
                            type: result ? 'success' : 'failed',
                            message
                        }
                    })
                }
            }).catch(err => {
                this.setState({
                    loading: false
                })
            })
        }
    }

    /**
     * Close notification message
     */
    handleCloseNotification = () => {

        const {
            type
        } = this.state.notification;

        this.setState({
            isNotification: false
        }, () => {
            if(type === 'success') {
                this.props.handleClose(true);
            }
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
            listingTypeName,
            baName,
            fileNoteLast,
            fileStatusID,
            allFileList,
            error,
            loading,
            notification,
            isNotification
        } = this.state;
        
        return (
            <>
                <Modal show={show} onHide={handleClose} animation={true} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title className="commission-deal-modal-header">
                            Cập nhật hồ sơ
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">

                                <CommissionDealRow 
                                    leftClass="col-sm-4" 
                                    rightClass="col-sm-8" 
                                    name="Deal ID" 
                                    value={dealId} 
                                />

                                <CommissionDealRow 
                                    leftClass="col-sm-4" 
                                    rightClass="col-sm-8" 
                                    name="Tên khách hàng" 
                                    value={customerName} 
                                />

                                <CommissionDealRow 
                                    leftClass="col-sm-4" 
                                    rightClass="col-sm-8" 
                                    name="Loại" 
                                    value={listingTypeName} 
                                />

                                <CommissionDealRow 
                                    leftClass="col-sm-4" 
                                    rightClass="col-sm-8" 
                                    name="Tên BA/BSA" 
                                    value={baName} 
                                />

                                <CommissionTextarea 
                                    leftClass="col-sm-4" 
                                    rightClass="col-sm-8" 
                                    label="Note (*)"
                                    name="fileNoteLast"
                                    placeholder="Tối đa 1000 kí tự"
                                    value={fileNoteLast}
                                    onChange={this.handleOnChange} 
                                />
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <CommissionDealRow 
                                    leftClass="col-sm-4" 
                                    rightClass="col-sm-8" 
                                    name="Trạng thái hồ sơ" 
                                    value={fileStatusID ? 'Đủ' : 'Chưa đủ'} 
                                />

                                <div className="row commission-deal-row">
                                    {allFileList && allFileList.map(list =>
                                    <CommissionCheckbox 
                                        key={list.fileId}
                                        size="col-sm-6" 
                                        label={list.fileName}
                                        name={list.fileId}
                                        checked={list.checked} 
                                        onChange={this.handleCheckboxChange} 
                                    />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row commission-deal-button">

                            <button 
                                className="btn btn-danger records-not-fulfill"
                                onClick={() => this.handleRecordFulfill(0)}
                            >Thiếu hồ sơ</button>

                            <button 
                                className="btn btn-primary"
                                onClick={() => this.handleRecordFulfill(1)}
                            >Đủ hồ sơ</button>

                        </div>

                        {error && <div className="row commission-deal-row">
                            <div className="col-sm-12 text-danger font-italic">
                                * Cần chọn ít nhất một loại hồ sơ 
                            </div>
                        </div>}
                    </Modal.Body>
                </Modal>

                {loading && <Spinner/>}

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