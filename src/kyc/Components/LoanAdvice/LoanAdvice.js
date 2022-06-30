import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import HeaderStep from './../../Containers/HeaderStep';
import Select from "react-select";
import {fetchDetailLoanAdvice, fetchBankForSelect, fetchChannelTypeForSelect, fetchLoanTermForSelect, fetchCalculateLoan, fetchCreateDocumentKyc} from "../../Services/KycLoanAdvice";
import NumberFormat from 'react-number-format';
import ModalDetailSchedulePayment from "./ModalDetailSchedulePayment";
import * as actions from '../../Actions/LoanAdviceActions';
import {fetchDonePage} from "../../Services/KycCommons";
import {NumberInputUtil} from "../../../utils/CommonUtils";

const styleClass = {
    display : 'none'
};
const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: "none" } : base;
    }
};
class LoanAdvice extends Component {
    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"},
            autoSave : false,
        };
        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');
        this.state = {
            dealId: dealId != null ? parseInt(dealId) : null,
            postData: {
                dealId: dealId != null ? parseInt(dealId) : null,
                mortgageRequestId: null,
                loanAmount: null,
                loanYear: null,
                bankId: null,
                isMarried: false,
                remainingMoneyType: null,
                documents: []
            },
            calculateLoan: {
                loanAmount: null,
                bankId: null,
                maturity: null,
                paidPerMonth: null
            },
            banks: [],
            channelTypeIds: [],
            loanTerm: [],
            loanAdviceDetail: {
                bankId: null,
                remainingMoneyTypes: [],
                isMarried: false
            },
            filterSelect: {
                bankId: null,
                loanYear: null,
                documents: null
            },
            disabled: '',
            btnDetailPaymentSchedule: false,

        }
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleSaveContinue = this.handleSaveContinue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
    }

    componentDidMount() {
        let that = this;
        fetchDetailLoanAdvice(this.state.dealId, (data)=>{
            let {postData, filterSelect, calculateLoan} = this.state;
            postData.mortgageRequestId = data.mortgageRequestId != null ? parseInt(data.mortgageRequestId) : null;
            postData.remainingMoneyType = data.remainingMoneyType != null ? parseInt(data.remainingMoneyType): null;
            postData.bankId = data.bankId;
            postData.loanYear = data.loanYear;
            calculateLoan.loanAmount = data.loanAmount;
            calculateLoan.bankId = data.bankId;
            this.setState({
                "loanAdviceDetail": data,
                "postData": postData,
                "filterSelect": filterSelect,
                "calculateLoan": calculateLoan
            });
            that.props.onSetDataPostPaymentSchedule({bankId: data.bankId, maturity: data.loanYear});
            if(data.bankId != null) {
                let selectBank = data.banks.filter(function(item) {
                    return item.bankId == data.bankId;
                });
                filterSelect.bankId = {value: selectBank[0].bankId, label: selectBank[0].code, interestedRate: selectBank[0].interestedRate};
                fetchLoanTermForSelect(this.state.dealId, data.bankId, (res)=>{
                    if(data.loanYear != null) {
                        let selectLoanYear = res.filter(function(item) {
                            return item.isDefault == true;
                        });
                        if(selectLoanYear.length > 0) {
                            filterSelect.loanYear = selectLoanYear;
                            calculateLoan.maturity = selectLoanYear[0].maturity;
                        }
                    }
                    this.setState({
                        "loanTerm": res,
                        "filterSelect": filterSelect,
                        "calculateLoan": calculateLoan
                    });
                });
            }
        });
        fetchBankForSelect(this.state.dealId, (data)=>{
            this.setState({
                "banks": data
            });
        });
        fetchChannelTypeForSelect(this.state.dealId, (data)=>{
            let {filterSelect, postData} = this.state;
            let itemSelect= data.filter(function(item) {
                return item.visited == true;
            });
            filterSelect.documents = itemSelect;
            postData.documents = itemSelect.map(it => ({channelTypeId: it.value}));
            this.setState({
                "channelTypeIds": data,
                "filterSelect": filterSelect,
                "postData": postData
            });
        });
        this._STORED_LOCAL.autoSave = true;
    }

    handleChangeSelect($feild, $option) {
        let value = this.state.filterSelect;
        value[$feild] = $option;
        let data = this.state.postData;
        data[$feild] = $option.value;
        let {calculateLoan} = this.state;
        if($feild == "bankId") {
            fetchLoanTermForSelect(this.state.dealId, $option.value, (data)=>{
                this.setState({
                    "loanTerm": data
                });
            });
            calculateLoan.bankId = $option.value;
            this.props.onSetDataPostPaymentSchedule({bankId: $option.value});
        }
        if($feild == "loanYear") {
            calculateLoan.maturity = $option.maturity;
            data.loanYear = $option.maturity;
            this.props.onSetDataPostPaymentSchedule({maturity: $option.maturity});
        }
        this.setState({
            postData: data,
            filterSelect: value,
            calculateLoan: calculateLoan
        });

    }

    handleChangeInput(event) {
        let target = event.target;
        let name = target.name;
        let value = name == "isMarried" ? target.checked : name == "remainingMoneyType" ? parseInt(target.value) : target.value;
        /******/
        let {postData, calculateLoan} = this.state;
        postData[name] = value;
        calculateLoan[name] = value; 
        if(name == "loanAmount" || name == "paidPerMonth") {
            this.setState({
                disabled: name
            });
        }
        this.setState({
            postData: postData,
            calculateLoan: calculateLoan
        });
    }

    handleCalculateLoan() {
        let that =  this;
        let calculateLoan = this.state.calculateLoan;
        if(calculateLoan.bankId == null || calculateLoan.bankId.length == 0) {
            showPropzyAlert("Vui lòng chọn ngân hàng");
            return false;
        }
        if(calculateLoan.maturity == null || calculateLoan.maturity.length == 0) {
            showPropzyAlert("Vui lòng chọn thời hạn vay");
            return false;
        }
        if(calculateLoan.loanAmount == null && calculateLoan.paidPerMonth == null) {
            showPropzyAlert("Vui lòng nhập số tiền cần vay hoặc số tiền trả hàng tháng");
            return false;
        }
        showPropzyLoading();
        fetchCalculateLoan(calculateLoan, (data) => {
            calculateLoan.loanAmount = data.loanAmount;
            calculateLoan.paidPerMonth = data.payPerMonth;
            that.setState({calculateLoan: calculateLoan, btnDetailPaymentSchedule: true});
            that.props.dispatch({
                type: "LOAN_ADVICE_SET_DATA_CALCULATE_LOAN",
                data: data
            });
            hidePropzyLoading();
        });
    }

    handleResetCalculateLoan() {
        let calculateLoan = this.state.calculateLoan;
        calculateLoan.loanAmount = '';
        calculateLoan.paidPerMonth = '';
        let filterSelect = this.state.filterSelect;
        filterSelect.bankId = null;
        filterSelect.loanYear = null;
        this.setState({calculateLoan: calculateLoan, filterSelect: filterSelect, disabled: ''});
        $(".box-kyc-body input:disabled").prop("disabled", false);
    }

    format_curency(data) {
        if(data != null) {
            data = data.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
        return data;
    }

    handleChangeSelectMulti($feild, $option) {
        let value = this.state.filterSelect;
        value[$feild] = $option;
        let data = this.state.postData;
        data[$feild] = $option.map(it => ({channelTypeId: parseInt(it.value)}));
        this.setState({
            postData: data,
            filterSelect: value
        });
    }

    handleClickSave() {
        this.handleSaveContinue(false, () => {})
    }

    handleSaveContinue(isClickHeader, callback) {
        let that = this;
        let {postData, dealId} = that.state;
        if(postData.loanAmount == null || postData.loanAmount.length == 0) {
            showPropzyAlert("Vui lòng nhập số tiền cần vay");
            return false;
        }
        if(postData.documents.length == 0) {
            showPropzyAlert("Vui lòng chọn thu nhập từ");
            return false;
        }
        if(postData.remainingMoneyType == null) {
            showPropzyAlert("Vui lòng chọn Số tiền còn lại đủ để anh chị trang trải chi phí sinh hoạt trong 1 tháng");
            return false;
        }
        showPropzyLoading();
        fetchCreateDocumentKyc(postData, (data) => {
            if(data.result) {
                if (!isClickHeader) {
                    window.location.replace(`/kyc/process-procedures?dealId=${dealId}`);
                } 
                callback();
            }
            hidePropzyLoading();
        });
    }

    handleSkip() {
        let {dealId} = this.state;
        fetchDonePage({
            dealId : dealId,
            kycItemId : 4
        });
        window.location.replace(`/kyc/process-procedures?dealId=${dealId}`);
    }

    handleShowDetailPaymentSchedule() {
        this.props.onGetDetailPaymentSchedule(this.props.loan.postPaymentSchedule);
        this.props.onShowHideModalPaymentSchedule(true);
    }

    handleCloseModalPaymentSchedule() {
        this.props.onShowHideModalPaymentSchedule(false);
    }

    bindEvents() {
        let that = this;
        $(document).off('#btnResetCalculate').on('click', '#btnResetCalculate', function (e) {
            e.preventDefault();
            document.querySelector(".box-kyc-body input:disabled").removeAttribute("disabled");
            //$(".box-kyc-body :input").prop("disabled", false);
        });
    }

    renderRemainingMoney(detail) {
        let that = this;
        return detail.remainingMoneyTypes.map(function(item, index) {
            return <div className="col-xs-12 col-sm-3" key={index}>
                <div className="need-radio">
                    <input id={"budget-enough-" + item.id} 
                    type="radio" value={item.id} className="need-radio-input" 
                    name="remainingMoneyType" 
                    defaultChecked={detail.remainingMoneyType == item.id} onChange={that.handleChangeInput.bind(that)} />
                    <label htmlFor={"budget-enough-" + item.id} className="need-radio-label"> {item.name}</label>
                </div>
            </div>
        });
    }

    renderDetail(){
        let {loanAdviceDetail, filterSelect} = this.state;
        if(!loanAdviceDetail){
            return;
        }
        return (
            <Fragment>
                <div className="row form-group">
                    <div className="col-md-6 col-sm-12">
                        <div className="row">
                            <div className="col-xs-4 col-sm-4"><label>Hồ sơ pháp lý:</label></div>
                            <div className="col-xs-4 col-sm-4">
                                <div className="need-radio">
                                    <input id="is-married-false" type="radio" className="need-radio-input" name="isMarried" defaultChecked={loanAdviceDetail.isMarried == false} onChange={this.handleChangeInput.bind(this)} />
                                    <label htmlFor="is-married-false" className="need-radio-label">Độc thân</label>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4">
                                <div className="need-radio">
                                    <input id="is-married-true" type="radio" className="need-radio-input" name="isMarried" defaultChecked={loanAdviceDetail.isMarried == true} onChange={this.handleChangeInput.bind(this)} />
                                    <label htmlFor="is-married-true" className="need-radio-label">Đã kết hôn</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-sm-6 col-xs-12">
                        <div className="row">
                            <div className="col-xs-4 col-sm-4"><label className="pt5">Thu nhập từ:</label></div>
                            <div className="col-xs-8 col-sm-8">
                                <Select value={filterSelect.documents}
                                        onChange={this.handleChangeSelectMulti.bind(this, 'documents')} 
                                        options={this.state.channelTypeIds} 
                                        styles={styles}
                                        isMulti={true}
                                        isSearchable={false}
                                        placeholder="--- Vui lòng chọn ---" />
                                
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-sm-6 col-xs-12">
                        <div className="row">
                            <div className="col-xs-4 col-sm-3 "><label>Giấy tờ chứng minh thu nhập:</label></div>
                            <div className="col-xs-8 col-sm-9 ">
                                <Select />
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="row form-group">
                    <div className="col-sm-12">
                        <label>Số tiền còn lại đủ để anh chị trang trải chi phí sinh hoạt trong 1 tháng ?</label>
                    </div>
                </div>
                <div className="row form-group">
                    {this.renderRemainingMoney(loanAdviceDetail)}
                </div>
                <div className="row form-group">
                    <div className="col-sm-12 text-center">
                        <button className="btn btn-kyc" onClick={this.handleClickSave}>LƯU & TIẾP TỤC</button>
                    </div>
                </div>
            </Fragment>
        )
    }

    handleChangeTab(isClickHeader, callbackFromHeader) {
        this.handleSaveContinue(isClickHeader, function(){
            hidePropzyLoading();
            callbackFromHeader(isClickHeader)
        })
    }
    
    render() {
        let {filterSelect, banks, loanTerm, calculateLoan, disabled, loanAdviceDetail} = this.state;
        return(
            <Fragment>
                <div className="wrapper-kyc">
                    <HeaderStep current={4} handleChangeTab={this.handleChangeTab}/>
                    <div className="content-kyc">
                        <div className="box-kyc">
                            <div className="box-kyc-header">
                                <button className="btn btn-kyc btn-kyc-success" onClick={this.handleSkip.bind(this)} style={{width : 'auto', float: 'right'}}>BỎ QUA, KHÔNG CÓ NHU CẦU VAY VỐN</button>
                                <h1 className="heading">TƯ VẤN NHU CẦU VAY VỐN</h1>
                                <p className='decs'>Công cụ ước lượng tính toán vay </p>
                            </div>
                            <div className="box-kyc-body">
                                <div className="row form-group">
                                    <div className="col-lg-8 col-md-10 col-sm-12">
                                        <div className="row form-group">
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="box-kyc box-bg-info box-loan">
                                                    <div className="box-kyc-body  ">
                                                        <div className="row form-group">
                                                            <div className="col-sm-12"><label>Lựa chọn ngân hàng</label></div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <Select className="selectBank"
                                                                value={filterSelect.bankId ? filterSelect.bankId : this._STORED_LOCAL.defaultValue}
                                                                options={banks}
                                                                onChange={this.handleChangeSelect.bind(this, 'bankId')}
                                                                isSearchable={true}
                                                                placeholder="--- Vui lòng chọn ---"/>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12 text-right"><p>Lãi suất : <label>{filterSelect.bankId != null && filterSelect.bankId.interestedRate != null ? filterSelect.bankId.interestedRate : ''}%</label></p></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="box-kyc box-bg-danger box-loan">
                                                    <div className="box-kyc-body ">
                                                        <div className="row form-group">
                                                            <div className="col-sm-12"><label>Thời hạn vay</label></div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <Select
                                                                value={filterSelect.loanYear ? filterSelect.loanYear : this._STORED_LOCAL.defaultValue}
                                                                options={loanTerm}
                                                                onChange={this.handleChangeSelect.bind(this, 'loanYear')}
                                                                isDisabled={(calculateLoan.bankId == null || calculateLoan.bankId.length == 0) && loanAdviceDetail.bankId == null ? true : false}
                                                                isSearchable={false}
                                                                placeholder="--- Vui lòng chọn ---"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="box-kyc box-bg-success box-loan">
                                                    <div className="box-kyc-body">
                                                        <div className="row form-group">
                                                            <div className="col-sm-12"><label>Số tiền cần vay</label></div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                {/* <input type="text" value={calculateLoan.loanAmount} name="loanAmount" className="form-control" placeholder="Triệu đồng" disabled={disabled.length > 0 && disabled == "paidPerMonth"} onChange={this.handleChangeInput.bind(this)}/> */}
                                                                <NumberFormat value={calculateLoan.loanAmount} 
                                                                type="text" name="loanAmount" 
                                                                className="form-control" thousandSeparator={','} placeholder="Triệu đồng" 
                                                                disabled={disabled.length > 0 && disabled == "paidPerMonth"} onValueChange={(values) => {
                                                                    let {formattedValue, value} = values;
                                                                    if(value != null && value != 0 && value.length < 5) {
                                                                        value = value * 1000000;
                                                                    }
                                                                    let {postData, calculateLoan} = this.state;
                                                                    postData.loanAmount = value;
                                                                    calculateLoan.loanAmount = value;
                                                                    this.setState({postData: postData, calculateLoan: calculateLoan});
                                                                    this.props.onSetDataPostPaymentSchedule({loanAmount: value});
                                                                    if(value != null && value.length > 0) {
                                                                        document.querySelector(".box-kyc-body input[name='paidPerMonth']").setAttribute("disabled", true);
                                                                        NumberInputUtil.numberToLabel("input[name='loanAmount']");
                                                                    }
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6">
                                                <div className="box-kyc box-bg-warning box-loan">
                                                    <div className="box-kyc-body ">
                                                        <div className="row form-group">
                                                            <div className="col-sm-12"><label>Số tiền trả hàng tháng</label></div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <NumberFormat value={calculateLoan.paidPerMonth} type="text" 
                                                                name="paidPerMonth" className="form-control" 
                                                                thousandSeparator={','} placeholder="Triệu đồng" onValueChange={(values) => {
                                                                    let {formattedValue, value} = values;
                                                                    if(value != null && value != 0 && value.length < 5) {
                                                                        value = value * 1000000;
                                                                    }
                                                                    let {postData, calculateLoan} = this.state;
                                                                    postData.paidPerMonth = value;
                                                                    calculateLoan.paidPerMonth = value;
                                                                    this.setState({postData: postData, calculateLoan: calculateLoan});                                                                    
                                                                    if(value != null && value.length > 0) {
                                                                        document.querySelector(".box-kyc-body input[name='loanAmount']").setAttribute("disabled", true);
                                                                        NumberInputUtil.numberToLabel("input[name='paidPerMonth']");
                                                                    }
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-sm-6 col-xs-12">{this.state.btnDetailPaymentSchedule == true && <a href="javascript:void(0);" onClick={this.handleShowDetailPaymentSchedule.bind(this)}>Chi tiết lịch thanh toán</a>}</div>
                                            <div className="col-sm-6 col-xs-12 text-right">
                                                <button id="btnResetCalculate" className="btn btn-kyc btn-kyc-dark" style={{width : 'auto'}} onClick={this.handleResetCalculateLoan.bind(this)}>TÍNH LẠI</button>
                                                <button className="btn btn-kyc btn-kyc-dark" style={{width : 'auto'}} onClick={this.handleCalculateLoan.bind(this)}>TÍNH TOÁN</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.renderDetail()}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDetailSchedulePayment loan={this.props.loan} 
                handleCloseModalPaymentSchedule={this.handleCloseModalPaymentSchedule.bind(this)}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        loan: state.LoanAdviceReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalPaymentSchedule: (data) => {
            dispatch(actions.actShowHideModalPaymentSchedule(data));
        },
        onGetDetailPaymentSchedule: (data) => {
            dispatch(actions.actGetDetailPaymentSchedule(data));
        },
        onSetDataPostPaymentSchedule: (data) => {
            dispatch(actions.actSetDataPostPaymentSchedule(data));
        },
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LoanAdvice));