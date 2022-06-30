import React, {Component, Fragment} from "react";
import NumberFormat from 'react-number-format';
import DebtInfoItem from "./DebtInfoItem";
import ModalListImage from './../../../mortgage/components/ModalListImage';
import Truncate from 'react-truncate';
import {actionRemovePhotoInProfile, actDeleteListingInfo, chanelChild} from "./../../../ba_mortgage/actions";
import {actCreateDebtInfoStepOne} from "./../../Actions/LoanAdviceActionsNew";
import UploadFilesContainer from "./UploadFilesContainer";
import ModalAddProfileContainer from './../../../ba_mortgage/containers/ModalAddProfileContainer';
import {fetchDetailLoanAdviceNew} from "../../Services/KycLoanAdvice";
import {v4} from 'uuid';

const DEFAULT_DEBT_INFO_ITEM = {
    id: v4(),
    debtAmount: null,
    debtId: null,
    bank: null,
    paymentDebt: null,
    paymentHistory: null
};

class StepOne extends Component {
    constructor(props) {
        super(props);
        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');

        this._STORED_LOCAL = {
            defaultValue: {value: '', label: "--- Vui lòng chọn ---"},
        };

        this.state = {
            dealId: dealId != null ? parseInt(dealId) : null,
            debtInfoList: [{...DEFAULT_DEBT_INFO_ITEM, id: v4()}],
            postData: {
                dealId: dealId != null ? parseInt(dealId) : null,
                leadId: null,
                isMarried: false,
                profiles: null,
                totalIncome: null
            },
            channelTypeIds: [],
            initData: null,
            banks: [],
            bankCredits: [],
            paymentHistories: [],
        }
        this.handleChangeIncome = this.handleChangeIncome.bind(this);
        this.handleChangeIncomeType = this.handleChangeIncomeType.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.handleChangeProfile = this.handleChangeProfile.bind(this);
        this.handleAddProfile = this.handleAddProfile.bind(this);
        this.submitData = this.submitData.bind(this);
        this.bindEvents();
    }

    componentDidMount() {
        let that = this;
        fetchDetailLoanAdviceNew(this.state.dealId, (data) => {
            let {postData} = this.state;
            postData.leadId = data.leadId;
            that.setState({
                "initData": data,
                "bankCredits": data.paymentList.map(item => {return {value: item.paymentId, label: item.name}}),
                "paymentHistories": data.paymentHistoryList.map(item => {return {value: item.paymentHistoryId, label: item.name}}),
                "banks": data.bankList.map(item => {return {value: item.bankId, label: item.name}}),
                "postData": postData
            });

            this.generateDebtInfoList(data);
        });
    }

    generateDebtInfoList(data) {
        let debtInfoList = [];
        data.profiles.forEach((itemProfile) => {
            if (itemProfile.typeId == null) {
                itemProfile.childs.forEach((itemChild) => {
                    let initBank = this.state.banks ? this.state.banks.filter(item => {return item.value == itemChild.bankId}) : '';
                    let initPaymentDebt = this.state.bankCredits ? this.state.bankCredits.filter(item => {return item.value == itemChild.paymentId}) : '';
                    let initHistoryPayment = this.state.paymentHistories ? this.state.paymentHistories.filter(item => {return item.value == itemChild.historyPaymentId}) : '';

                    let debtInfo = {
                        id: v4(),
                        debtId: itemChild.debtId,
                        debtAmount: itemChild.debt,
                        paymentDebt: initPaymentDebt[0],
                        bank: initBank[0],
                        paymentHistory: initHistoryPayment[0]
                    }
                    debtInfoList.push(debtInfo);
                })
            }
        })
        if (debtInfoList && debtInfoList.length > 0) {
            this.setState({
                "debtInfoList": debtInfoList
            })
        }
    }

    handleChangeInput(event) {
        let id = event.target.id;
        let {postData, initData} = this.state;
        switch (id) {
            case 'is-married-false':
                this.setState({
                    initData: {
                        ...initData,
                        isMarried: false
                    },
                    postData: {
                        ...postData,
                        isMarried: false
                    }
                });
                break;
            case 'is-married-true':
                this.setState({
                    initData: {
                        ...initData,
                        isMarried: true
                    },
                    postData: {
                        ...postData,
                        isMarried: true
                    }
                });
                break;
            default:
                break;
        }
    }

    handleAddProfile() {
        $("#modalAddProfile").modal();
    }

    handleChangeIncomeType(indexProfile, indexChild, value) {
        if (value != undefined) {
            let _info = {...this.props.totalStored.info};
            let _childInfo = _info.profiles[indexProfile].childs[indexChild];
            _childInfo.name = value;
            this.props.totalStored.dispatch({type: 'FETCH_INFO_MORTGAGE', payload: _info});
        }
    }

    handleChangeProfile(indexProfile, indexChild, indexProfileInfo, type, value) {
        let _info = {...this.props.totalStored.info};
        let _profileInfo = _info.profiles[indexProfile].childs[indexChild].profileInfos[indexProfileInfo];
        switch (type) {
            case 'input':
                _profileInfo.text = value
                break
            default:
                break;
        }
        this.props.totalStored.dispatch({type: 'FETCH_INFO_MORTGAGE', payload: _info});
    }

    handleChangeIncome(indexProfile, indexChild, value) {
        let _info = {...this.props.totalStored.info};
        let _childInfo = _info.profiles[indexProfile].childs[indexChild];
        _childInfo.income = value;
        this.props.totalStored.dispatch({type: 'FETCH_INFO_MORTGAGE', payload: _info});
    }

    uploadFiles(filesInit, objIndex) {
        let _init = filesInit.map(function (file, index) {
            return {
                source: file.link,
                options: {
                    type: 'local'
                }
            }
        })
        this.props.totalStored.dispatch({type: "SET_INDEX_FILES", indexObj: objIndex});
        this.props.totalStored.dispatch({type: 'SET_FILES', files: null})
        $('#uploadFiles').modal();
    }

    bindEvents() {
        let that = this;
        $(document).off('.btn-del-info').on('click', '.btn-del-info', function (e) {
            e.preventDefault();
            let data = $(this).attr('data-del');
            showPropzyConfirm({
                title: 'Thông báo',
                message: 'Chắc chắn muốn xóa?',
                btn: {
                    yes: {
                        text: "Có",
                    },
                    no: {
                        text: "Không"
                    }
                },
                okCallback: function () {
                    that.props.totalStored.dispatch(actDeleteListingInfo(JSON.parse(data)));
                },
                cancelCallback: function () {}
            })
        });
    }

    addDebtInfo() {
        let debtInfoList = this.state.debtInfoList;
        let debtInfoObj = {...DEFAULT_DEBT_INFO_ITEM, id: v4()};
        debtInfoObj.debtId = null;
        debtInfoList.push(debtInfoObj);
        this.setState({
            "debtInfoList": debtInfoList
        });
    }

    removeDebtInfo(item) {
        let debtInfoList = this.state.debtInfoList;
        debtInfoList = debtInfoList.filter((value, index, arr) => {
            return value.id != item.id;
        })
        if (debtInfoList.length == 0) {
            let debtInfoObj = {...DEFAULT_DEBT_INFO_ITEM, id: v4()};
            debtInfoList.push(debtInfoObj);
        }
        this.setState({
            "debtInfoList": debtInfoList
        })
    }

    handleClickSave() {
        this.submitData(false, () => {})
    }

    submitData(isClickHeader, callback) {
        let {initData, dealId} = this.state;
        this.state.postData.profiles = this.props.totalStored.info.profiles;

        let totalIncome = 0;
        this.props.totalStored.info.profiles.map(item => {
            // Hồ sơ thu nhập object
            if (item.typeId == 1115) {
                item.childs.forEach(itemChild => {totalIncome += parseInt(itemChild.income || 0, 10);})
            }
        })
        this.state.postData.totalIncome = totalIncome;

        let debtInfoObj = initData.profiles.filter(item => {return item.typeId == null})

        let newDebtInfoList = [];
        newDebtInfoList = this.state.debtInfoList.map(item => {
            return {
                debtId: item.debtId,
                bankId: item.bankId || (item.bank ? item.bank.value : null),
                historyPaymentId: item.historyPaymentId || (item.paymentHistory ? item.paymentHistory.value : null),
                paymentId: item.paymentId || (item.paymentDebt ? item.paymentDebt.value : null),
                debt: item.debt || (item.debtAmount || 0)
            }
        })
        debtInfoObj[0].childs = newDebtInfoList;

        // found same object in case of create new object 
        let found = false;
        for (let i = 0; i < this.state.postData.profiles.length; i++) {
            if (this.state.postData.profiles[i].typeId == null) {
                found = true;
                this.state.postData.profiles[i] = debtInfoObj[0];
                break;
            }
        }
        if (!found) {
            this.state.postData.profiles.push(debtInfoObj[0]);
        }

        showPropzyLoading();
        actCreateDebtInfoStepOne(this.state.postData, (data) => {
            if (data.result) {
                if (!isClickHeader) {
                    window.location.replace(`/kyc/loan-advice-step-two?dealId=${dealId}`);
                }
                callback(isClickHeader);
            }
            hidePropzyLoading();
        });
    }
    componentWillReceiveProps(nextProps) {
        let info = null;
        try {
            info = nextProps.totalStored.info.profiles.find(i => i.typeId === null);
        } catch {}
        if (info && info.childs.length > 0) {
            this.setState({debtInfoList: info.childs.map(i => {return {...i, id: v4()}})});
        }
        // this.setState({debtInfo: nextProps.debtInfoItem});
    }

    renderDebtInfo() {
        const totalCredits = this.state.debtInfoList.length;
        return this.state.debtInfoList.map((item, index) => {
            return (
                <DebtInfoItem isLast={(totalCredits - 1) == index} key={index} debtInfoItem={item}
                    banks={this.state.banks} bankCredits={this.state.bankCredits}
                    paymentHistories={this.state.paymentHistories}
                    updateData={(data) => {
                        let updateDebtInfoList = this.state.debtInfoList;

                        for (let i = 0; i < updateDebtInfoList.length; i++) {
                            if (updateDebtInfoList[i].id == data.id) {
                                updateDebtInfoList[i] = data;
                            }
                        }
                        this.setState({
                            "debtInfoList": updateDebtInfoList
                        })
                    }}
                    onAdd={this.addDebtInfo.bind(this)}
                    onRemove={this.removeDebtInfo.bind(this)}
                />
            )
        })
    }

    render() {
        let that = this;
        let {info} = this.props.totalStored;
        let {initData, postData} = this.state;

        // case empty data in mortgage deal detail -> get data in another API
        let objToCompare = {
            rlistingId: null, id: null, identifyId: null
        }
        if (JSON.stringify(info) === JSON.stringify(objToCompare)) {
            if (initData) {
                this.props.totalStored.dispatch(chanelChild(initData));
            }
        }
        return (
            <>
                <div className="box-kyc remove-pb">
                    <div className="box-kyc-body">
                        <div className="row form-group">
                            <div className="col-md-6 col-sm-12">
                                <div className="row">
                                    <div className="col-xs-4 col-sm-4">
                                        <h3 className="title18 bold mt-0">Hồ sơ pháp lý:</h3>
                                    </div>
                                    <div className="col-xs-4 col-sm-4">
                                        <div className="need-radio">
                                            <input id="is-married-false" type="radio"
                                                checked={initData ?
                                                    initData.isMarried ? initData.isMarried === false : !postData.isMarried
                                                    : ''}
                                                onChange={this.handleChangeInput.bind(this)}
                                                className="need-radio-input" name="isMarried" />
                                            <label htmlFor="is-married-false" className="need-radio-label">Độc thân</label>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-sm-4">
                                        <div className="need-radio">
                                            <input id="is-married-true" type="radio"
                                                checked={initData ?
                                                    initData.isMarried ? initData.isMarried === true : postData.isMarried
                                                    : ''}
                                                onChange={this.handleChangeInput.bind(this)}
                                                className="need-radio-input" name="isMarried" />
                                            <label htmlFor="is-married-true" className="need-radio-label">Đã kết hôn</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-kyc remove-pt">
                    <h3 className="title18 bold">Thông tin thu nhập:</h3>
                    {info && info.profiles && info.profiles.map(function (profile, indexProfile) {
                        return <>
                            {profile.typeId == 1115 && <div className="row">

                                {profile.childs && profile.childs.map(function (child, indexChild) {
                                    return <>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <div className="panel-group">
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading">
                                                                <div className="row form-group">
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-xs-3 col-sm-3"><label className="pt5">Thu nhập từ:</label></div>
                                                                            <div className="col-sm-9">
                                                                                <label className="pt5">{child.name}</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-5 col-md-offset-1">
                                                                        <div className="row">
                                                                            <div className="col-xs-3 col-sm-3"><label className="pt5">Số tiền:</label></div>
                                                                            <div className="col-sm-9">
                                                                                <NumberFormat suffix="đ"
                                                                                    value={child.income}
                                                                                    onValueChange={(values) => {
                                                                                        that.handleChangeIncome(indexProfile, indexChild, values.value);
                                                                                    }}
                                                                                    type="text"
                                                                                    name="salaryAmount"
                                                                                    className="form-control"
                                                                                    thousandSeparator={true} placeholder="Triệu đồng" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row form-group">
                                                                    <div className="col-md-12">
                                                                        <div className="row">
                                                                            <div className="col-xs-3 col-sm-3"><label className="pt5">Giấy tờ chứng minh thu nhập:</label></div>
                                                                            <div className="col-xs-9 col-sm-9">
                                                                                {child.profileInfos && child.profileInfos.map(function (proIn, indexPI) {
                                                                                    return <div style={{minHeight: "80px", maxHeight: "80px"}} className="col-sm-4">
                                                                                        <div className="row">
                                                                                            <div className="col-md-6">
                                                                                                <Truncate data-toggle='tooltip' title={proIn.name} className={proIn.isRequired ? "text-danger" : "text-muted"} lines={1} ellipsis={<span>... </span>}>
                                                                                                    {proIn.name} {proIn.typeId}
                                                                                                </Truncate>
                                                                                                <div>
                                                                                                    {proIn.note != null && proIn.note != "" && <a data-toggle='tooltip' title={proIn.note} ><i className='fa fa-sticky-note-o' aria-hidden='true'></i> ghi chú</a>}
                                                                                                &nbsp;&nbsp;&nbsp;
                                                                                                {proIn.isRequired && proIn.control == 'file' && <a onClick={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        if (proIn.photoGcns == null) proIn.photoGcns = [];
                                                                                                        that.uploadFiles(proIn.photoGcns, {indexProfile, indexChild, indexPI});
                                                                                                    }} href='#'><i className='fa fa-upload' aria-hidden='true'></i> upload</a>}
                                                                                                </div>

                                                                                            </div>
                                                                                            <div className="col-md-6">
                                                                                                {proIn.control == 'file' && <div>
                                                                                                    <ModalListImage
                                                                                                        listImages={proIn.photoGcns}
                                                                                                        onRemoveImage={(newImages) => {
                                                                                                            that.props.totalStored.dispatch(actionRemovePhotoInProfile(newImages, {
                                                                                                                profileTypeId: profile.typeId,
                                                                                                                childTypeId: child.typeId,
                                                                                                                profileInfoTypeId: proIn.typeId
                                                                                                            }));
                                                                                                        }}
                                                                                                    />
                                                                                                </div>}
                                                                                                {proIn.control == 'input' && <input onChange={(e) => {
                                                                                                    let value = e.target.value;
                                                                                                    that.handleChangeProfile(indexProfile, indexChild, indexPI, proIn.control, value);
                                                                                                }}
                                                                                                    value={proIn.typeId == 1124 ? info.cmnd : (proIn.text == null ? '' : proIn.text)}
                                                                                                    disabled={!proIn.isRequired || proIn.typeId == 1124} className='form-control' />}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    <div className="wrapper-add-remove-btn">
                                                        <i className="fa fa-plus-circle fa-2x custom-fa-plus-circle" aria-hidden="true"
                                                            onClick={that.handleAddProfile}
                                                        ></i>
                                                        <i data-del={JSON.stringify(child)}
                                                            className="fa fa-minus-circle fa-2x custom-fa-minus-circle btn-del-info"
                                                            aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                })
                                }
                            </div>}
                        </>
                    })
                    }
                    <h3 className="title18 bold">Anh/chị hiện đang sử dụng sản phẩm tín dụng của ngân hàng nào?</h3>
                    {this.renderDebtInfo()}
                    <footer className="kyc-footer">
                        <center>
                            <button onClick={this.handleClickSave.bind(this)} type="button" className="btn btn-kyc" >Tiếp tục</button>
                        </center>
                    </footer>
                </div>
                <UploadFilesContainer />
                <ModalAddProfileContainer chanels={this.state.initData ? this.state.initData.channelTypeIds : []} />
            </>
        )
    }
}

export default StepOne