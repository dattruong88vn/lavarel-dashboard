import React, { Fragment, useEffect, useState } from "react"
import LimitedCharacter from "../../../ComponentsCommon/textarea/LimitedCharacter"
import { MESSAGE_ERROR_NOTE_EMPTY } from "../../../constant/Message"

import CustomModal from "./CustomModal"

const CloneDealOtherBA = ({
    className,
    closeLabel,
    dataProps,
    headContent,
    saveLabel,
    show,
    handleClose,
    handleSave,
}) => {
    let [errorMsg, setErrorMsg] = useState("")
    let [reason, setReason] = useState("-1")
    let [note, setNote] = useState("")
    let [isDisabledOKBtn, setIsDisabledOKBtn] = useState(false)

    const onChangeReason = (e) => {
        // set selected reason
        reason = e.target.value
        setReason(e.target.value)
    }

    const onChangeNote = (val) => {
        // set selected value
        note = val

        errorMsg = ""
        if (note.trim().length === 0) {
            errorMsg = MESSAGE_ERROR_NOTE_EMPTY
        }
        setErrorMsg(errorMsg)

        setNote(val)
    }

    useEffect(() => {
        // reset status OK btn
        isDisabledOKBtn = false
        if (reason === "-1" || !note.trim() || errorMsg) {
            isDisabledOKBtn = true
        }
        setIsDisabledOKBtn(isDisabledOKBtn)
    }, [errorMsg, note, reason, isDisabledOKBtn])

    const bodyContent = (data) => {
        const renderReasonList = (reasons) => {
            let renderOpts = []
            reasons &&
                reasons.length > 0 &&
                reasons.map((item) => {
                    renderOpts.push(
                        <option
                            key={`renderOptsReasonList-${item.reasonId}`}
                            value={item.reasonId}
                        >
                            {item.reasonName}
                        </option>
                    )
                })

            return renderOpts
        }
        const renderWarning = () => {
            if (show) {
                return (
                    <div className="form-group">
                        <p className="alert-propzy-notify-warning">
                            Vui lòng nhập lý do để tiếp tục tư vấn và chăm sóc
                            khách hàng
                        </p>
                    </div>
                )
            }
        }

        return (
            <Fragment>
                {renderWarning()}
                <div className="form-group">
                    <label htmlFor="reason">
                        Lý do tư vấn <span className="required">*</span>:
                    </label>
                    <select
                        className="form-control reason"
                        id="reason"
                        onChange={(e) => onChangeReason(e)}
                    >
                        <option value="-1">Chọn lý do</option>
                        {renderReasonList(data.clonedReasons)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="note">
                        Note <span className="required">*</span>:
                    </label>
                    <LimitedCharacter
                        className="form-control"
                        errorMsg={errorMsg}
                        id="note"
                        limit={500}
                        rows="5"
                        value=""
                        onChange={(val) => onChangeNote(val)}
                    />
                </div>
            </Fragment>
        )
    }
    const onSave = () => {
        const dataSave = {
            leadId: dataProps.leadId,
            dealId: null,
            reasonId: reason,
            note: note.trim(),
        }

        handleSave(dataSave)
    }

    const onClose = () => {
        // reset error message
        errorMsg = ""
        setErrorMsg(errorMsg)

        handleClose()
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
            handleClose={() => onClose()}
            handleSave={() => onSave()}
        />
    )
}

export default CloneDealOtherBA
