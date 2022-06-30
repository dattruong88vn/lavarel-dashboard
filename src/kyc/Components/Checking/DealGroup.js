import React, {Component} from "react"
import {connect} from "react-redux"

import CheckingInfo from "./CheckingInfo"
import ModalHistoryCustomer from "./ModalHistoryCustomer"

import * as actions from "../../Actions/index"

class DealGroup extends Component {
    componentWillMount() {
        const {checking} = this.props

        // redirect to kyc/checking page if not existing leadId
        if (!checking.dataChecking.customers) {
            location.replace("/kyc/checking");
        }
    }

    componentDidMount() {
        const {checking, onGetClonedReasons} = this.props

        if (!checking.dealCloning.clonedReasons) {
            onGetClonedReasons({
                reasonType: checking.dealCloning.reasonType,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        const {history} = this.props
        const nextPropsPostData = nextProps.checking.postData
        if (nextPropsPostData.checkingDuplicate !== undefined) {
            // if checking new need is not duplicated, call api continue checking
            if (nextPropsPostData.checkingDuplicate === false) {
                this.props.onContinueChecking(nextPropsPostData)
            }

            // if checking new need is duplicated, call api get-info
            if (nextPropsPostData.checkingDuplicate) {
                this.props.onGetInfo(nextProps.checking.postData)

                // reset dataPost
                this.props.onResetDataPostChecking()
            }
            return;
        }
        if (!nextProps.checking.dealGroup) {
            history.push(`/kyc/checking`)
        }
    }

    handleShowModalChecking(data) {
        const {onShowHideModalChecking} = this.props

        onShowHideModalChecking(data)
    }

    toggleModalHistoryCustomer(data) {
        const {onShowHideModalHistoryCustomer} = this.props

        onShowHideModalHistoryCustomer(data)
    }

    rightCustomer() {
        const {checking, onRightCustomer} = this.props

        onRightCustomer({
            ...checking.rightCus,
            isGroup: null,
            tcId: checking.postData.tcId,
        })
    }

    render() {
        const {
            checking,
            onGoback,
            onSaveModalClonedDeal,
            onSetRightCustomer,
            onSetTableChecking,
            onToggleModalCloneDeal,
            onUnlockDealLead,
        } = this.props

        return (
            <div className="wrapper-kyc">
                <div className="header-kyc">
                    <div className="navbar">
                        <div className="logo">
                            <img src="/images/kyc/logo.png" alt="KYC" />
                        </div>
                    </div>
                    <div className="container" style={{marginTop: 10}}>
                        <a
                            href="javascript:;"
                            style={{cursor: "pointer"}}
                            title="Quay lại"
                            onClick={onGoback}
                        >
                            &#8249; Quay lại
                        </a>
                    </div>
                </div>
                <CheckingInfo
                    checking={checking}
                    className="deal-group"
                    handleShowModalChecking={() =>
                        this.handleShowModalChecking(true)
                    }
                    handleShowModalHistoryCustomer={() =>
                        this.toggleModalHistoryCustomer(true)
                    }
                    onToggleModalCloneDeal={onToggleModalCloneDeal}
                    onSaveModalClonedDeal={(data) =>
                        onSaveModalClonedDeal(data)
                    }
                    onUnlockDealLead={(data) => onUnlockDealLead(data)}
                    rightCustomer={this.rightCustomer.bind(this)}
                    setRightCustomer={onSetRightCustomer.bind(this)}
                    setTableChecking={onSetTableChecking.bind(this)}
                    isGroup={true}
                />

                <ModalHistoryCustomer
                    checking={checking}
                    handleCloseModalHistoryCustomer={() =>
                        this.toggleModalHistoryCustomer(false)
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        checking: state.Checking,
        header: state.HeaderStepReducer,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetClonedReasons: (data) => {
            dispatch(actions.actGetClonedReasons(data))
        },
        onGoback: () => {
            dispatch(actions.goKycChecking())
        },
        onRightCustomer: (data) => {
            dispatch(actions.actRightCustomer(data))
        },
        onSaveModalClonedDeal: (data) => {
            dispatch(actions.actSaveClonedReasons(data))
        },
        onSetRightCustomer: (data) => {
            dispatch(actions.actSetRightCustomer(data))
        },
        onShowHideModalChecking: (data) => {
            dispatch(actions.actShowHideModalChecking(data))
        },
        onShowHideModalHistoryCustomer: (data) => {
            dispatch(actions.actShowHideModalHistoryCustomer(data))
        },
        onSetTableChecking: (data) => {
            dispatch(actions.actSetTableChecking(data))
        },
        onToggleModalCloneDeal: (data) => {
            dispatch(actions.actToggleModalCloneDeal(data))
        },
        onUnlockDealLead: (data) => {
            dispatch(actions.unlockDealLead(data))
        },
        onContinueChecking: (data) => {
            dispatch(actions.actContinueChecking(data))
        },
        onGetInfo: (data) => {
            dispatch(actions.actGetInfo(data))
        },
        onResetDataPostChecking: () => {
            dispatch(actions.actResetDataPostChecking())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DealGroup)
