import React, { useContext, useEffect, useState } from "react"

import Modals from "components/Modals"

import { LeadContext } from "context/LeadContext"

import LeadDealService from "services/LeadDealService"

import MyDateTimePicker from "components/MyDateTimePicker"

import { ERROR_SELECTED_REASON, FORMAT_DATE, FORMAT_TIME } from 'Commons/constants/keys'
import { SUCCESS_CODE } from "Commons/constants/res"
import { LEAD_CANCEL } from "Commons/apis/lead_deal"
import { CHOOSE_REASON, DEMAND_SUSPEND } from "modules/ModalCancelLead/constants"

import "modules/ModalCancelLead/index.scss"

const ModalCancelLead = (props) => {
    const { state } = useContext(LeadContext)
    const [cancelledReasons, setCancelledReasons] = useState(null)
    const [toggleDateTime, setToggleDateTime] = useState(false)
    const [toggleDate, setToggleDate] = useState(false)
    const [toggleTime, setToggleTime] = useState(false)
    const [selectedItem, setSelectedItem] = useState("")
    const [startTime, setStartTime] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        if (props.show && !cancelledReasons) {
            fetchData()
        }

        // reset selected item while close modal
        if (!props.show && cancelledReasons) {
            setSelectedItem("")
            setToggleDateTime(false)
        }
    }, [props.show, cancelledReasons])

    const fetchData = async () => {
        const itemService = new LeadDealService()
        const itemList = await itemService.getListCancelledReasons(props.url)
        
        setCancelledReasons(itemList.data)
    }
    
    const onChangeItem = (e) => {
        const targetValue = e.target.value
        let showDateTime = false
        if (targetValue === DEMAND_SUSPEND) {
            showDateTime = true
        }

        setToggleDateTime(showDateTime)
        setSelectedItem(targetValue)
    }
    const onChangeTime = (dateStr) => {
        setStartTime(dateStr)
    }
    const onChangeDate = (dateStr) => {
        setStartDate(dateStr)
    }
    const renderDateTime = () => {
        if (!toggleDateTime) {
            return false
        }
        
        return (
            <section className="reminder">
                <div className="form-group row">
                    <label className="col-sm-2">Vào lúc</label>
                    <div className="col-md-5">
                        <div className="input-group bootstrap-picker bootstrap-timepicker">
                            <MyDateTimePicker
                                format={FORMAT_TIME}
                                id="cancel-time"
                                isTimeOrDate="time"
                                // minutesStep={TIME_STEP}
                                open={toggleTime}
                                value={startTime}
                                onChange={e => onChangeTime(e)}
                                onClose={() => setToggleTime(false)}
                                onOpen={() => setToggleTime(true)}
                            />
                            <span className="input-group-addon">
                                <i className="glyphicon glyphicon-time" onClick={() => setToggleTime(!toggleTime)}></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input-group bootstrap-picker bootstrap-datepicker">
                            <MyDateTimePicker
                                format={FORMAT_DATE}
                                id="cancel-date"
                                isTimeOrDate="date"
                                // minDate={new Date()}
                                open={toggleDate}
                                value={startDate}
                                onChange={e => onChangeDate(e)}
                                onClose={() => setToggleDate(false)}
                                onOpen={() => setToggleDate(true)}
                            />
                            <div className="input-group-addon" onClick={() => setToggleDate(!toggleDate)}>
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>					
                    </div>
                    <div className="col-sm-offset-4 col-sm-8">
                        <span className="errors reminderDateErrors"></span>
                    </div>
                </div>
            </section>
        )
    }
    const renderResp = (selectedReason) => {
        return (
            <>
                <div className="form-group row">
                    <label htmlFor="sel1" className="col-sm-2">Chọn lý do:</label>
                    <div className="col-sm-10">
                        <select className="form-control reasonId" onChange={(e) => onChangeItem(e)} value={selectedReason}>
                            <option value="-1">Chọn lý do</option>
                            {cancelledReasons.map((item, k) => <option key={`reason-id-${item.id}`} value={item.id}>{item.name}</option>)}
                        </select>
                        {selectedReason === CHOOSE_REASON && <div className="errors errors-reasonId">{ERROR_SELECTED_REASON}</div>}
                    </div>
                </div>
            </>
        )
    }

    const setSave = async () => {
        // if click save button after loading modal
        if (selectedItem === "") {
            setSelectedItem(CHOOSE_REASON)
            return
        }

        const leadId = state.itemDetail.leadId
        const showModalDataPost = {
            typeNeedName: "lead",
            needId: leadId,
            progressQuoId: 3,
            isSet: true
        }
        const convertStartDate = moment(startDate).format('DD/MM/YYYY')
        const convertStartTime = moment(startTime).format('HH:mm')
        const reminderDate = moment(convertStartDate + " " + convertStartTime, "DD/MM/YYYY HH:mm").unix() * 1000
        const dataPost = {
            ...showModalDataPost,
            note: null,
            reminderDate,
            reasonId: selectedItem,
        }
        
        const itemService = new LeadDealService()
        const resp = await itemService.updateReasonStatus(LEAD_CANCEL, dataPost)

        showPropzyAlert(resp.message)
        if (resp.code === SUCCESS_CODE) {
            // close modal
            props.setShow(false)

            timer.submit({ leadId })

            window.location.reload()
        }

    }

    let disableSaveBtn = false
    if (selectedItem === CHOOSE_REASON) {
        disableSaveBtn = true
    }
    return (
        cancelledReasons && (
            <Modals
                disableSaveBtn={disableSaveBtn}
                id={props.id}
                labelClose={props.labelClose}
                labelSave={props.labelSave}
                show={props.show}
                title={props.title}
                setSave={setSave}
                setShow={props.setShow}
            >
                {renderResp(selectedItem)}
                {renderDateTime()}
            </Modals>
        )
    )
}

export default ModalCancelLead