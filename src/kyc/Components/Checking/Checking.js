import React from "react"
import Select from "react-select"
import {connect} from "react-redux"
import CheckingInfo from "./CheckingInfo"
import CheckingNotInfo from "./CheckingNotInfo"
import ModalNeedCustomer from "./ModalNeedCustomer"
import ModalHistoryCustomer from "./ModalHistoryCustomer"
import * as actions from "../../Actions/index"
import * as Utils from "../../Utils"
import "../../styles/checking.scss"

class Checking extends React.Component {
    componentDidMount() {
        const {checking, onGetListReason, onGetListGroup, onGetListTypeLand} = this.props

        this.props.onGetListRadioNeed()
        this.props.onGetListNeed()
        this.props.onGetListTypeCustomer()
        this.props.onGetListLocationTc()
        this.props.onGetListGroup()

        const requestType = checking.postData.requestType
        if (requestType) {
            const value = parseInt(requestType)
            const id = value === 97 ? 1 : 2

            onGetListTypeLand(id)
        }

        // get list reason
        onGetListReason()
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.checking) {
            const {
                checking,
                history,
                onContinueChecking,
                onGetClonedReasons,
                onGetInfo,
                onResetDataPostChecking,
            } = this.props

            // sort customer if any data
            if (checking.dataChecking.customers) {
                checking.dataChecking.customers = Utils.sortListLeadDealByLoggedUser(
                    checking.dataChecking.customers
                )
            }

            // if selected deal is deal group
            // redirect to deal group list
            if (nextProps.checking.dealGroup) {
                if (nextProps.checking.dealGroup.customers.length > 0) {
                    const leadId = nextProps.checking.rightCus.leadId

                    // redirect to deal group with leadId
                    history.push(`/kyc/deal-group-${leadId}`)
                }
            }

            // get list cloned reasons
            if (
                nextProps.checking.dealCloning.isClonedDeal &&
                !nextProps.checking.dealCloning.clonedReasons
            ) {
                onGetClonedReasons({
                    reasonType: nextProps.checking.dealCloning.reasonType,
                })
            }

            const nextPropsPostData = nextProps.checking.postData
            if (nextPropsPostData.checkingDuplicate !== undefined) {
                // if checking new need is not duplicated, call api continue checking
                if (nextPropsPostData.checkingDuplicate === false) {
                    onContinueChecking(nextPropsPostData)
                }

                // if checking new need is duplicated, call api get-info
                if (nextPropsPostData.checkingDuplicate) {
                    onGetInfo(nextProps.checking.postData)

                    // reset dataPost
                    onResetDataPostChecking()
                }
            }
        }
    }

    handleCloseModalChecking() {
        this.props.onShowHideModalChecking(false)
        this.props.onResetDataPostChecking()
    }

    handleShowModalChecking() {
        this.props.onShowHideModalChecking(true)
    }

    handleCloseModalHistoryCustomer() {
        this.props.onShowHideModalHistoryCustomer(false)
    }

    handleShowModalHistoryCustomer() {
        this.props.onShowHideModalHistoryCustomer(true)
    }

    handleChangeSelect($feild, $option) {
        let value = {}
        value[$feild] = $option
        let data = {}
        data[$feild] = $option.value

        if ($feild == "propertyTypeGroup") {
            const { requestType } = this.props.checking.postData
            const listingTypeValue = parseInt(requestType)
            const id = listingTypeValue === 97 ? 1 : 2
            const selected = value[$feild];
            this.props.checking.filterSelect.propertyTypeId = null;
            this.props.onGetListTypeLand(selected.value, id)
        }

        this.props.onSetDataSelectChecking(value, data)
    }

    handleChangeInput(event) {
        let dataPost = {}
        let target = event.target
        let name = target.name
        let value = target.value
        if (name == "phone") {
            if (value.length == 0) {
                this.props.onShowContentChecking(false)
            }
            value = this.formatPhoneNumber(value)
            this.props.onSetRightCustomer({phone: value})
        }
        if (name == "requestType") {
            const { propertyTypeGroup } = this.props.checking.filterSelect
            const groupValue = propertyTypeGroup?.value
            const group = groupValue ? parseInt(groupValue) : null
            value = parseInt(value)
            let id = value == 97 ? 1 : 2
            if(group){
                this.props.checking.filterSelect.propertyTypeId = null;
                this.props.onGetListTypeLand(group, id)
            }
        }
        dataPost[name] = value
        this.props.onSetDataPost(dataPost)
    }

    handleSearch() {
        let dataPost = this.props.checking.postData;
        //Trim before search
        dataPost.name = dataPost.name.trim();
        if(dataPost.name.length == 0) {
            showPropzyAlert("Vui lòng nhập tên khách hàng");
            return false;
        }
        if (dataPost.phone.length == 0) {
            showPropzyAlert("Vui lòng nhập số điện thoại")
            return false
        }
        if (dataPost.phone.length < 10) {
            showPropzyAlert("Số điện thoại không hợp lệ")
            return false
        }
        localStorage.setItem("kycInfoCustomer", JSON.stringify(dataPost))
        this.props.onGetInfo(dataPost)
        this.props.onShowContentChecking(true)
    }

    formatPhoneNumber($number) {
        let _value = ""
        if ($number) {
            const newValue = $number.split("").filter((it) => {
                const __value = Number.parseInt(it)
                return __value >= 0 ? String(__value) : null
            })

            if (newValue[0] != "0") {
                // number 1 is a 0
                _value = ""
            } else if (newValue.length > 11) {
                newValue.length = 11
                _value = newValue.join("")
            } else if (newValue.length > 1 && newValue[1] == "0") {
                // number 2 not is 0 (00)
                newValue.length = 1
                _value = newValue.join("")
            } else {
                _value = newValue.join("")
            }
        }
        return _value
    }

    continueChecking() {
        /* 
        96: Bán/Cho thuê
        97: Mua nhà
        110: Thuê
        111: Nhu cầu khác
        */
        let dataPost = this.props.checking.postData
        if (dataPost.requestType == null) {
            showPropzyAlert("Vui lòng chọn nhu cầu khách hàng")
            return false
        } else if (dataPost.requestType == 97 || dataPost.requestType == 110) {
            if (dataPost.propertyTypeId == null) {
                showPropzyAlert("Vui lòng chọn loại bất động sản")
                return false
            }
        } else if (dataPost.requestType == 111) {
            if (dataPost.needId == null) {
                showPropzyAlert("Vui lòng chọn nhu cầu")
                return false
            }
            if (dataPost.visitorType == null) {
                showPropzyAlert("Vui lòng chọn loại khách hàng")
                return false
            }
            if (dataPost.intent == null) {
                showPropzyAlert("Vui lòng nhập mục đích")
                return false
            }
            dataPost["otherTypeId"] = dataPost.requestType
            dataPost.requestType = dataPost.needId
        }
        if (dataPost.tcId == null) {
            showPropzyAlert("Vui lòng chọn vị trí TC")
            return false
        }

        showPropzyLoading()
        localStorage.setItem("kycInfoCustomer", JSON.stringify(dataPost))
        this.props.onContinueChecking(dataPost)
    }

    rightCustomer() {
        const {checking, onGetDealGroup, onRightCustomer} = this.props

        // check lead have dealId
        let hasDealIds = false;
        $($('#tableChecking').find('.chkChecking')).map(indexRow => {
            if ( $($('#tableChecking').find('.chkChecking')[indexRow]).is(':checked') ) {
                $($('#tableChecking').find('.chkChecking')[indexRow]).attr('value') != 'null' ? hasDealIds = true : '';
            }
        })

        // get deal group list
        if (checking.rightCus.isGroup && hasDealIds) {
            const dataPost = {
                phone: checking.rightCus.phone,
                parentLeadId: checking.rightCus.leadId,
            }

            onGetDealGroup(dataPost)
        } else {
            onRightCustomer({
                ...checking.rightCus,
                tcId: checking.postData.tcId,
            }, checking)
        }
    }

    /* master code
    this.props.onRightCustomer(Object.assign(this.props.checking.rightCus, {tcId: this.props.checking.postData.tcId}));
    }

    render(){
        let {dataChecking, postData, showContentChecking, listLocationTc, filterSelect} = this.props.checking;
        if (postData.tcId == null && currentUser.tcs.length > 1  && listLocationTc.length > 0) {
            let value = {tcId: listLocationTc? listLocationTc.filter(o => {return o.value == currentUser.tcs.filter((o) => {return (o.isPrimary)})[0].tcId})[0]: null};
            let data = {tcId: currentUser.tcs.filter((o) => {return (o.isPrimary)})[0].tcId}
            this.props.onSetDataSelectChecking(value, data);
        } else if (postData.tcId == null && currentUser.tcs.length > 0 && listLocationTc.length > 0) {
            let value = {tcId: listLocationTc? listLocationTc.filter(o => {return o.value == currentUser.tcs[0].tcId})[0]: null};
    */

    render() {
        const {
            checking,
            onSetDataSelectChecking,
            onGetListTypeLand,
            onSaveModalClonedDeal,
            onSetRightCustomer,
            onSetTableChecking,
            onToggleModalCloneDeal,
            onUnlockDealLead,
        } = this.props

        let {
            dataChecking,
            postData,
            showContentChecking,
            listLocationTc,
            filterSelect,
        } = checking

        if (
            postData.tcId == null &&
            currentUser.tcs.length > 1 &&
            listLocationTc.length > 0
        ) {
            let value = {
                tcId: listLocationTc
                    ? listLocationTc.filter((o) => {
                        return (
                            o.value ==
                            currentUser.tcs.filter((o) => {
                                return o.isPrimary
                            })[0].tcId
                        )
                    })[0]
                    : null,
            }
            let data = {
                tcId: currentUser.tcs.filter((o) => {
                    return o.isPrimary
                })[0].tcId,
            }
            onSetDataSelectChecking(value, data)
        } else if (
            postData.tcId == null &&
            currentUser.tcs.length > 0 &&
            listLocationTc.length > 0
        ) {
            let value = {
                tcId: listLocationTc
                    ? listLocationTc.filter((o) => {
                        return o.value == currentUser.tcs[0].tcId
                    })[0]
                    : null,
            }
            let data = {tcId: currentUser.tcs[0].tcId}
            onSetDataSelectChecking(value, data)
        }
        return (
            <div className="wrapper-kyc">
                <div className="header-kyc">
                    <div className="navbar">
                        <div className="logo">
                            <a href="/kyc/checking">
                                <img src="/images/kyc/logo.png" alt="KYC" />
                            </a>
                        </div>
                    </div>
                    <div className="filter-kyc">
                        <div className="container">
                            <div className="row form-group">
                                <div className="col-md-3">
                                    <Select
                                        isSearchable={false}
                                        value={filterSelect.tcId ? filterSelect.tcId : null}
                                        options={listLocationTc}
                                        onChange={this.handleChangeSelect.bind(this, "tcId")}
                                        placeholder="Vị trí TC"
                                    />
                                </div>

                                <div className="col-md-3">
                                    <input
                                        style={{height: "38px"}}
                                        name="name"
                                        type="text"
                                        value={postData.name}
                                        className="form-control"
                                        placeholder="Tên khách hàng..."
                                        onChange={this.handleChangeInput.bind(this)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <input
                                        style={{height: "38px"}}
                                        name="phone"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={postData.phone}
                                        className="form-control"
                                        placeholder="Số điện thoại..."
                                        onChange={this.handleChangeInput.bind(this)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <button
                                        className="btn btn-check-kyc btn-kyc-default"
                                        onClick={this.handleSearch.bind(this)}
                                    >
                                        Kiểm tra
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-kyc content-checking">
                    {showContentChecking == true &&
                        dataChecking.customers != null && (
                            <CheckingInfo
                                checking={checking}
                                handleChangeSelect={onSetDataSelectChecking}
                                handleShowModalChecking={this.handleShowModalChecking.bind(this)}
                                handleShowModalHistoryCustomer={this.handleShowModalHistoryCustomer.bind(this)}
                                onGetListTypeLand={onGetListTypeLand}
                                onToggleModalCloneDeal={onToggleModalCloneDeal}
                                onUnlockDealLead={(data) => onUnlockDealLead(data)}
                                onSaveModalClonedDeal={(data) => onSaveModalClonedDeal(data)}
                                rightCustomer={this.rightCustomer.bind(this)}
                                setRightCustomer={onSetRightCustomer.bind(this)}
                                setTableChecking={onSetTableChecking.bind(this)}
                            />
                        )}
                    {showContentChecking == true &&
                        dataChecking.customers == null && (
                            <CheckingNotInfo
                                checking={checking}
                                handleShowModalChecking={this.handleShowModalChecking.bind(this)}
                                handleShowModalHistoryCustomer={this.handleShowModalHistoryCustomer.bind(this)}
                            />
                        )}
                </div>
                <div className="footer-kyc"></div>
                <ModalNeedCustomer
                    checking={checking}
                    handleCloseModalChecking={this.handleCloseModalChecking.bind(this)}
                    handleChangeSelect={this.handleChangeSelect.bind(this)}
                    handleChangeInput={this.handleChangeInput.bind(this)}
                    continueChecking={this.continueChecking.bind(this)}
                />
                <ModalHistoryCustomer
                    checking={checking}
                    handleCloseModalHistoryCustomer={this.handleCloseModalHistoryCustomer.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        checking: state.Checking,
        header: state.HeaderStepReducer,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalChecking: (data) => {
            dispatch(actions.actShowHideModalChecking(data))
        },
        onGetInfo: (data) => {
            dispatch(actions.actGetInfo(data))
        },
        onSetDataPost: (data) => {
            dispatch(actions.actSetDataPostChecking(data))
        },
        onShowHideModalHistoryCustomer: (data) => {
            dispatch(actions.actShowHideModalHistoryCustomer(data))
        },
        onGetListRadioNeed: () => {
            dispatch(actions.actGetListRadioNeed())
        },
        onGetListGroup: () => {
            dispatch(actions.actGetListGroup())
        },
        onGetListTypeLand: (group, type) => {
            dispatch(actions.actGetListTypeLand(group, type))
        },
        onGetListNeed: () => {
            dispatch(actions.actGetListNeed())
        },
        onGetListTypeCustomer: () => {
            dispatch(actions.actGetListTypeCustomer())
        },
        onGetListLocationTc: () => {
            dispatch(actions.actGetListLocationTc())
        },
        onSetDataSelectChecking: (value, data) => {
            dispatch(actions.actSetDataSelectChecking(value, data))
        },
        onContinueChecking: (data) => {
            dispatch(actions.actContinueChecking(data))
        },
        onSetRightCustomer: (data) => {
            dispatch(actions.actSetRightCustomer(data))
        },
        onRightCustomer: (data, dataChecking) => {
            dispatch(actions.actRightCustomer(data, dataChecking))
        },
        onResetDataPostChecking: () => {
            dispatch(actions.actResetDataPostChecking())
        },
        onShowContentChecking: (data) => {
            dispatch(actions.actShowContentChecking(data))
        },
        onResetRightCustomer: () => {
            dispatch(actions.actResetRightCustomer())
        },
        onSetTableChecking: (data) => {
            dispatch(actions.actSetTableChecking(data))
        },
        onGetListReason: (data) => {
            dispatch(actions.getListReason(data))
        },
        onGetClonedReasons: (data) => {
            dispatch(actions.actGetClonedReasons(data))
        },
        onSaveModalClonedDeal: (data) => {
            dispatch(actions.actSaveClonedReasons(data))
        },
        onUnlockDealLead: (data) => {
            dispatch(actions.unlockDealLead(data))
        },
        onGetDealGroup: (data) => {
            dispatch(actions.actGetDealGroup(data))
        },
        onToggleModalCloneDeal: (data) => {
            dispatch(actions.actToggleModalCloneDeal(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checking)
