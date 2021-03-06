import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HeaderStep from './../../Containers/HeaderStep';
import ModalChangeTimeCloseDeal from './ModalChangeTimeCloseDeal';
import { fetchTimeCloseDeal } from '../../Services/KycCommons';
import { createFeedback } from '../../Services/KycLoanAdvice';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/custom.scss';
import moment from 'moment';

class ExtendedFeedback extends Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const dealId = urlParams.get('dealId') != null ? parseInt(urlParams.get('dealId')) : null;
        this.state = {
            dealId,
            listingTypeId: null,
            employeeNumber: null,
            hobby: null,
            otherHobby: null,
            isHot: false,
            timeCloseDeal: null,
            codeCloseDeal: null,
            optionsTimeCloseDeal: null,
            reasons: [],
            dateRange: {
                minDate: '',
                maxDate: ''
            },
            isShowModal: false,
            isShowDatePicker: false,
            isShowDateLabel: false,
            isDisabled: false
        };
    }

    componentDidMount() {
        fetchTimeCloseDeal().then(res => {
            if(res.data.result) {
                const optionsTimeCloseDeal = res.data.data[0].list.map(item => ({ value: item.code, label: item.name}));
                this.setState({optionsTimeCloseDeal});
            }
        });
    }

    getDateAfterDays = (number) => {
        return new Date(new Date().getTime() + number * 24 * 60 * 60 * 1000);
    }

    getDateRange = (code) => {
        switch (code) {
            case 'IN_THIS_MONTH':
                return {
                    minDate: this.getDateAfterDays(0),
                    maxDate: this.getDateAfterDays(30)
                }
            case 'IN_60_DAYS':
                return {
                    minDate: this.getDateAfterDays(31),
                    maxDate: this.getDateAfterDays(60)
                }
            case 'IN_90_DAYS':
                return {
                    minDate: this.getDateAfterDays(61),
                    maxDate: this.getDateAfterDays(90)
                } 
        }
    }

    handleSetData = (data) => {
        const { isHot, expectedClosingDate, comments, optionCode } = data.customerEvaluate;
        const { listingTypeId, msnv, hobby, otherHobby } = data.customerHomeKyc;
        const isDisabled = listingTypeId === 1 ? expectedClosingDate ? false : true : false;
        const isShowDateLabel = expectedClosingDate ? true : false;
        this.setState({
            listingTypeId,
            employeeNumber: msnv,
            hobby,
            otherHobby,
            isHot,
            timeCloseDeal: expectedClosingDate,
            reasons: comments,
            codeCloseDeal: optionCode,
            isShowDateLabel,
            isDisabled
        });
    }

    onChangeDatePicker = (date) => {
        this.setState({timeCloseDeal: date.getTime()});
    }

    onChangeInput = (target) => {
        const { name, value } = target;
        if (name === 'employeeNumber') {
            if(value.length > 45) {
                const sliceString = value.slice(0, 45);
                this.setState({employeeNumber: sliceString});
                return;
            }
        }
        const data = {};
        data[name] = value;
        this.setState(data);
    }

    onChangeSelect = (value) => { 
        const dateRange = this.getDateRange(value);
        this.setState({timeCloseDeal: dateRange.maxDate.getTime(), dateRange, codeCloseDeal: value, isDisabled: false, isShowDatePicker: true});
    }

    onChangeCheckBox = (e) => {
        this.setState({isHot: e.target.checked});
    }

    onChangeReason = (data) => {
        this.setState({
            codeCloseDeal: data.codeCloseDeal,
            timeCloseDeal: data.timeCloseDeal,
            reasons: data.reasonsChangeDate
        });
    }

    onShowModal = (boolean) => {
        this.setState({isShowModal: boolean});
    }

    onSubmit = () => {
        const { dealId, employeeNumber, hobby, otherHobby, isHot, codeCloseDeal, timeCloseDeal, reasons } = this.state;
        showPropzyConfirm({
            title: 'Th??ng b??o',
            message: 'B???n c?? ch???c ch???n mu???n k???t th??c deal ?',
            btn: {
                yes: {
                    text: "C??",
                },
                no: {
                    text: "Kh??ng"
                }
            },
            okCallback: () => {
                const dataPost = {
                    dealId,
                    employeeNumber,
                    hobby,
                    otherHobby,
                    isDraff: false,
                    isHot,
                    optionCode: codeCloseDeal,
                    expectedClosingDate: timeCloseDeal,
                    comments: reasons
                };
                createFeedback(dataPost, res => {
                    if(res.data.result) {
                        location.replace('/kyc/checking');
                    }
                });
            }
        });
    }

    onSwitchToExpandKyc = () => {
        const dealId = this.state.dealId;
        this.props.history.push("/kyc/buyer-confirm-requirements?dealId=" + dealId);
    }

    onChangeTab = (isClickHeader, callback) => {
        const { dealId, employeeNumber, hobby, otherHobby, isHot, codeCloseDeal, timeCloseDeal, reasons } = this.state;
        const dataPost = {
            dealId,
            employeeNumber,
            hobby,
            otherHobby,
            isDraff: false,
            isHot,
            optionCode: codeCloseDeal,
            expectedClosingDate: timeCloseDeal,
            comments: reasons
        };
        showPropzyLoading();
        createFeedback(dataPost, res => {
            if(res.data.result) {
                hidePropzyLoading();
                callback(isClickHeader);
                return;
            }
            showPropzyAlert(res.data.message);
            hidePropzyLoading();
        });
    }

    render() {
        const { 
            listingTypeId, 
            employeeNumber, 
            hobby, 
            reasons, 
            isHot,
            otherHobby, 
            isDisabled,
            optionsTimeCloseDeal, 
            codeCloseDeal,
            timeCloseDeal,
            dateRange,
            isShowDateLabel,
            isShowDatePicker, 
            isShowModal
        } = this.state;

        const dateCloseDeal = timeCloseDeal ? moment(timeCloseDeal).format("DD/MM/YYYY") : '';  

        return (
            <Fragment>
                <div className="wrapper-kyc">
                    <HeaderStep 
                        current={6}
                        handleChangeTab={this.onChangeTab}
                        callback={this.handleSetData} />
                    <div className="content-kyc">
                        {listingTypeId === 1 && 
                            <div className="box-kyc">
                                <div className="box-kyc-header">
                                    <div className="form-group box-title-process">
                                        <h1 className="heading text-uppercase">????nh gi?? nhu c???u v?? kh??ch h??ng</h1>
                                    </div>
                                </div>
                                <div className="box-kyc-body">
                                    <div className="form-group">
                                        <div className="kyc-box-heading">
                                            <p><b>????nh Gi?? Kh??ch H??ng (Ng?????i Mua)</b></p>
                                            <p>Ch???n ????? x??c ?????nh kh??ch h??ng ti???m n??ng</p>
                                        </div>
                                        <div className="kyc-box-body">
                                            <input 
                                                type="checkbox" 
                                                name="potentialCustomer" 
                                                id="potentialCustomer"  
                                                checked={isHot}
                                                onChange={e => this.onChangeCheckBox(e)} /> 
                                            <label htmlFor="potentialCustomer" className="ml15">Kh??ch h??ng ti???m n??ng</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="kyc-box-heading">
                                            <p><b>????nh Gi?? V?? D??? ??o??n Th???i Gian Ch???t Deal <span className="required">*</span></b></p>
                                            <p>D???a tr??n nhu c???u c???a kh??ch h??ng, ch???n kho???ng th???i gian b???n c?? th??? ch???t deal. ????y l?? ????nh gi?? ban ?????u c???a b???n.</p>
                                        </div>
                                        <div className="kyc-box-body">
                                            <label>Th???i gian d??? ki???n c?? th??? ch???t deal</label>
                                            {isShowDateLabel ? 
                                                <div className="text-link" onClick={() => this.onShowModal(true)}>
                                                    <span>{dateCloseDeal}</span>
                                                    <i className="fa fa-pencil ml20" aria-hidden="true"></i>   
                                                </div> 
                                            :
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Select
                                                        name="timeCloseDeal"
                                                        placeholder="Ch???n th???i gian ch???t deal"
                                                        options={optionsTimeCloseDeal}
                                                        onChange={e => this.onChangeSelect(e.value)} />
                                                    </div>
                                                    {isShowDatePicker && 
                                                        <div className="col-md-2">
                                                            <div className="input-group custom-datepicker">
                                                                <DatePicker
                                                                    dateFormat='dd/MM/yyyy'
                                                                    minDate={dateRange.minDate}
                                                                    maxDate={dateRange.maxDate}
                                                                    selected={moment(timeCloseDeal).toDate()} 
                                                                    onChange={date => this.onChangeDatePicker(date)} />
                                                                <div className="input-group-addon">
                                                                    <i className="fa fa-calendar"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            }    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="box-kyc">
                            <div className="box-kyc-header">
                                <div className="form-group box-title-process">
                                    <h1 className="heading text-uppercase">Ph???n h???i/ M??? r???ng/ Gi???i thi???u</h1>
                                </div>
                            </div>
                            <div className="box-kyc-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button 
                                                className="btn btn-kyc-default kyc-bg-blue btn-kyc-feedback" 
                                                onClick={this.onSwitchToExpandKyc}>KYC m??? r???ng <span className="fa fa-angle-right"></span>
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-kyc-default kyc-bg-blue btn-kyc-feedback">M?? nh??n vi??n gi???i thi???u</button>
                                        </div>
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="employeeNumber" 
                                                value={employeeNumber} 
                                                placeholder="M?? gi???i thi???u" 
                                                onChange={(e) => this.onChangeInput(e.target)} />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-kyc-default kyc-bg-blue btn-kyc-feedback">T???o d???ng m???i quan h???</button>
                                        </div>
                                        <div className="form-group">
                                            <textarea 
                                                rows="5" 
                                                className="form-control" 
                                                name="hobby" 
                                                value={hobby} 
                                                placeholder="S??? th??ch c?? nh??n" 
                                                onChange={(e) => this.onChangeInput(e.target)}>
                                            </textarea>
                                        </div>
                                        <div className="form-group">
                                            <textarea 
                                                rows="5" 
                                                className="form-control" 
                                                name="otherHobby" 
                                                value={otherHobby} 
                                                placeholder="Kh??c" 
                                                onChange={(e) => this.onChangeInput(e.target)}>
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-center mt15">
                                            <button 
                                                className="btn btn-check-kyc btn-kyc-default mr10" 
                                                disabled={isDisabled}
                                                onClick={this.onSubmit}>K???t th??c
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {listingTypeId === 1 && 
                    <ModalChangeTimeCloseDeal 
                        isShow={isShowModal} 
                        onShow={this.onShowModal}
                        getDateRange={this.getDateRange}
                        onChangeReason={this.onChangeReason}  
                        reasons={reasons}                         
                        options={optionsTimeCloseDeal} />
                }
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        headerStep: state.HeaderStepReducer
    }
};

export default connect(mapStateToProps, null)(React.memo(ExtendedFeedback));