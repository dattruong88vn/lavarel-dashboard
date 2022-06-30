import React, { Fragment, useState } from "react"

import CustomModal from "./CustomModal"

const ReopenDeal = ({
    className,
    closeLabel,
    dataProps,
    headContent,
    saveLabel,
    show,
    handleClose,
    handleSave,
}) => {
    let [reason, setReason] = useState("-1")
    let [isDisabledOKBtn, setIsDisabledOKBtn] = useState(true)

    const setReasonAndOKBtn = (val) => {
        // set selected reason
        setReason(val)

        // reset status OK btn
        isDisabledOKBtn = false
        if (val === "-1") {
            isDisabledOKBtn = true
        }
        setIsDisabledOKBtn(isDisabledOKBtn)
    }
    const onChangeReason = (e) => {
        const targetValue = e.target.value

        setReasonAndOKBtn(targetValue)
    }
    const onClose = () => {
        // reset reason before close modal
        reason = "-1"
        setReasonAndOKBtn(reason)

        handleClose()
    }
    const bodyContent = (data) => {
        const renderReasonList = (reasons) => {
            let renderOpts = []
            reasons &&
                reasons.length > 0 &&
                reasons.map((item) => {
                    renderOpts.push(
                        <option
                            key={`renderOpts-${item.progressQuoId}`}
                            value={item.progressQuoId}
                        >
                            {item.progressQuoDetail}
                        </option>
                    )
                })

            return renderOpts
        }
        return (
            <Fragment>
                <div className="row">
                    <p className="col-sm-12">
                        Deal {data.dealId} đã bị hủy. Bạn có muốn kích hoạt lại
                        và tư vấn khách hàng với nhu cầu này?
                    </p>
                </div>
                <div className="row">
                    <label htmlFor="reason" className="col-sm-3">
                        Chọn lý do:
                    </label>
                    <div className="col-sm-9">
                        <select
                            className="form-control reason"
                            onChange={(e) => onChangeReason(e)}
                        >
                            <option value="-1">Chọn lý do</option>
                            {renderReasonList(data.listReasons)}
                        </select>
                        <div className="errors errors-reasonId"></div>
                    </div>
                </div>
            </Fragment>
        )
    }
    const onSave = () => {
        handleSave(reason)
    }

    return (
        <CustomModal
            bodyContent={bodyContent(dataProps)}
            className={className}
            closeLabel={closeLabel}
            headContent={headContent}
            isDisabledOKBtn={isDisabledOKBtn}
            saveLabel={saveLabel}
            show={show}
            handleClose={onClose}
            handleSave={onSave}
        />
    )
}

export default ReopenDeal
