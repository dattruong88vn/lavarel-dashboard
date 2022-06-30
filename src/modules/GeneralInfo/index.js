import React, { useContext, useRef, useState } from "react"	

import { LeadContext } from "context/LeadContext"	

import {
    LABEL_ADJUST_CRITERIA_LEAD_TITLE,
    LABEL_CANCEL_LEAD_TITLE,
    LABEL_CLOSE, LABEL_CONFIRM,
    LABEL_REOPEN_LEAD_TITLE,
    LABEL_SAVE,
    MEETING_NEED_BA_ACCEPT,
    PROGRESS_CANCEL_GENERAL,
    PROGRESS_CANCEL_TRACKING,
} from "Commons/constants/keys"	

import ModalAdjustCriteria from "modules/ModalAdjustCriteria"
import ModalCancelLead from "modules/ModalCancelLead"	
import ModalReopenLead from "modules/ModalReopenLead"

import { GET_ADJUST_CRITERIA_LIST, GET_LIST_REASONS_CANCELLED, GET_LIST_REASONS_REOPEN } from "Commons/apis/lead_deal"

import "modules/GeneralInfo/index.scss"

const GeneralInfo = (props) => {
    const modalRef = useRef()
    const { state } = useContext(LeadContext)
    const [itemDetail] = useState(state.itemDetail)
    const [toggleModalAdjusCriteria, setToggleModalAdjusCriteria] = useState(false)
    const [toggleModalCancel, setToggleModalCancel] = useState(false)
    const [toggleModalReopen, setToggleModalReopen] = useState(false)

    let permissionDoAction = false
    if (currentUser.userId == itemDetail.assignedTo) {
        permissionDoAction = true
    }

    const lastUpdatedDate = moment(itemDetail.lastUpdatedDate).format("DD-MM-YYYY")
    const profileValue = itemDetail.profileValue || "N/A"
    const timeCounter = itemDetail.timeCounter || "N/A"
    const statusName = itemDetail.statusName
    let progressCol = 1
    if (itemDetail.progressList.length <= 6) {
        progressCol = 2
    }

    const renderProgressList = () => {
        let flag = false
        const progressList = itemDetail.progressList.map((item, k) => {
            let barCls = ""
            if (itemDetail.progressId == item.progressId) {
                barCls = "active"
                flag = true
            } else {
                if (!flag) {
                    barCls = "complete"
                } else if (flag && itemDetail.progressId !== item.progressId) {
                    barCls = "disabled"
                }
            }
            let bgBsWizardDotCls = "bs-wizard-dot"
            if (itemDetail.progressId === item.progressId) {
                bgBsWizardDotCls = "bs-wizard-dot active"
            }

            const renderQuoList = (dataItems) => {
                if (dataItems && dataItems.length > 0) {
                    return (
                        <div className="bs-wizard-info text-center">
                            {dataItems.map((quoItem) => (
                                <span className="label label-warning">
                                    {quoItem.progressQuoName} &nbsp;&nbsp;
                                </span>
                            ))}
                        </div>
                    )
                }
            }

            return (
                <div
                    key={`progress-${item.progressId}`}
                    className={`col-xs-${progressCol} bs-wizard-step ${barCls}`}
                >
                    <div className="text-center bs-wizard-stepnum">
                        {item.progressName}
                    </div>
                    <div className="progress">
                        <div className="progress-bar"></div>
                    </div>
                    <a href="#" className={bgBsWizardDotCls}></a>
                    <div style={{ textAlign: "center" }}>
                        <span className="label label-warning">
                            {item.lable}
                        </span>
                    </div>
                    {renderQuoList(item.progressQuoList)}
                </div>
            )
        })

        const propsAttr = {
            id: "renderProgressList",
            className: "row bs-wizard-jm margin",
            render: "lead",
            typeId: itemDetail.leadId,
        }
        return <div {...propsAttr}>{progressList}</div>
    }

    const renderActionButtons = () => {
        const renderPermissionActionButtons = () => {
            return (
                <>
                    {!itemDetail.dealId && (
                        <a className="btn btn-app" href={`/lead/update/${itemDetail.leadId}`}>
                            <i className="fa fa-edit"></i> Sửa
                        </a>
                    )}

                    {!itemDetail.dealId &&
                        // if not any meeting
                        // or meeting status is need BA's acceptance 
                        (!itemDetail.meeting || (itemDetail.meeting.statusId !== MEETING_NEED_BA_ACCEPT)) && (
                            <a className="btn btn-app btnCancelLead" onClick={() => setToggleModalCancel(true)}>
                                <i className="fa fa-remove "></i> Hủy lead
                            </a>
                        )}

                    {/* TODO setSave() fn will be rechecked after 15/01/2021 */}
                    <a className="btn btn-app btnShowConfig" onClick={() => window.ConfigNewListings.showModal(itemDetail.leadId)}>
                        <i className="fa fa-cog"></i> Điều chỉnh tiêu chí
                    </a>
                </>
            )
        }

        return (
            <>
                <a className="btn btn-app" href={`/lead-history/index/${itemDetail.leadId}`}>
                    <i className="fa fa-history"></i> Lịch sử
                </a>
                {permissionDoAction &&
                    (!itemDetail.progressQuoId ||
                    (itemDetail.progressQuoId !== PROGRESS_CANCEL_GENERAL && itemDetail.progressQuoId !== PROGRESS_CANCEL_TRACKING)) &&
                    renderPermissionActionButtons()
                }
                
                {(itemDetail.progressQuoId === PROGRESS_CANCEL_GENERAL || itemDetail.progressQuoId === PROGRESS_CANCEL_TRACKING) && (
                    <a className="btn btn-app btnUnlockDeal" onClick={() => setToggleModalReopen(true)}>
                        <i className="fa fa-unlock"></i> Kích hoạt
                    </a>
                )}
            </>
        )
    }

    return (
        <>
            <div className="general-info">
                <h2 className="title-with-line">
                    <span>THÔNG TIN CHUNG</span>
                </h2>
                <div className="box box-primary">
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-4">
                                <strong>Cập nhật lần cuối vào: </strong>
                                <span className="text-muted">{lastUpdatedDate}</span>
                            </div>
                            <div className="col-md-2 evaluate-score">
                                <div className="label-primary evaluate-score-block" data-title="Điểm đánh giá khách hàng của TM">
                                    <label>TM</label>
                                    <br/>
                                    <label>{profileValue}</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <strong>Thời gian xử lý: </strong>
                                <span className="text-muted">{timeCounter}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-12">
                                <strong>Trạng thái: </strong>
                                <span className="text-muted">{statusName}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-12">
                                <strong>Tiến độ: </strong>
                                {renderProgressList()}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-12">
                                {renderActionButtons()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {toggleModalAdjusCriteria && (
                <ModalAdjustCriteria
                    id="ModalAdjustCriteria"
                    labelClose={LABEL_CLOSE}
                    labelSave={LABEL_SAVE}
                    modalRef={modalRef}
                    show={toggleModalAdjusCriteria}
                    title={LABEL_ADJUST_CRITERIA_LEAD_TITLE}
                    url={`${GET_ADJUST_CRITERIA_LIST}/${itemDetail.leadId}`}
                    setNeedToRerender={props.setNeedToRerender}
                    setShow={setToggleModalAdjusCriteria}
                />
            )}
            {toggleModalCancel && (
                <ModalCancelLead
                    id="ModalCancelLead"
                    labelClose={LABEL_CLOSE}
                    labelSave={LABEL_CONFIRM}
                    modalRef={modalRef}
                    show={toggleModalCancel}
                    title={LABEL_CANCEL_LEAD_TITLE}
                    url={`${GET_LIST_REASONS_CANCELLED}`}
                    setNeedToRerender={props.setNeedToRerender}
                    setShow={setToggleModalCancel}
                />
            )}
            {toggleModalReopen && (
                <ModalReopenLead
                    id="ModalReopenLead"
                    labelClose={LABEL_CLOSE}
                    labelSave={LABEL_CONFIRM}
                    modalRef={modalRef}
                    show={toggleModalReopen}
                    title={LABEL_REOPEN_LEAD_TITLE}
                    url={`${GET_LIST_REASONS_REOPEN}`}
                    setNeedToRerender={props.setNeedToRerender}
                    setShow={setToggleModalReopen}
                />
            )}
        </>
    )
}

export default GeneralInfo
