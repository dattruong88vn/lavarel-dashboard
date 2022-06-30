import React, { useContext, useEffect, useState } from 'react'

import Modals from "components/Modals"

import { LeadContext } from "context/LeadContext"

import LeadDealService from "services/LeadDealService"

import { ERROR_SELECTED_REASON } from 'Commons/constants/keys'
import { SUCCESS_CODE } from "Commons/constants/res"
import { LEAD_REOPEN } from 'Commons/apis/lead_deal'
import { CHOOSE_REASON, DEMAND_SUSPEND } from "modules/ModalReopenLead/constants"

import "modules/ModalReopenLead/index.scss"

const ModalReopenLead = (props) => {
    const { state } = useContext(LeadContext)
    const [reopenReasons, setReopenReasons] = useState(null)
    const [selectedItem, setSelectedItem] = useState("")

    useEffect(() => {
        if (props.show && !reopenReasons) {
            fetchData()
        }

        // reset selected item while close modal
        if (!props.show && reopenReasons) {
            setSelectedItem("")
        }
    }, [props.show, reopenReasons])

    const fetchData = async () => {
        const itemService = new LeadDealService()
        const itemList = await itemService.getListReopenReasons(props.url)
        
        setReopenReasons(itemList.data)
    }

    const onChangeItem = (e) => {
        const targetValue = e.target.value
        let showDateTime = false
        if (targetValue === DEMAND_SUSPEND) {
            showDateTime = true
        }

        setSelectedItem(targetValue)
    }
    const renderResp = (selectedReason) => {
        return (
            <div className="form-group row">
                <label htmlFor="sel1" className="col-sm-2">Chọn lý do:</label>
                <div className="col-sm-10">
                    <select className="form-control reasonId" onChange={(e) => onChangeItem(e)} value={selectedReason}>
                        <option value="-1">Chọn lý do</option>
                        {reopenReasons.map((item, k) => <option key={`reason-id-${item.id}`} value={item.code}>{item.name}</option>)}
                    </select>
                    {selectedReason === CHOOSE_REASON && <div className="errors errors-reasonId">{ERROR_SELECTED_REASON}</div>}
                </div>
            </div>
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
            type: "lead",
            needId: leadId,
            progressQuoId: 3,
            note: null,
        }
        const dataPost = {
            ...showModalDataPost,
            reasonCode: selectedItem,
        }
        
        const itemService = new LeadDealService()
        const resp = await itemService.unlockReasonStatus(LEAD_REOPEN, dataPost)

        showPropzyAlert(resp.message)
        if (resp.code === SUCCESS_CODE) {
            // close modal
            props.setShow(false)

            window.location.reload()
        }

    }

    let disableSaveBtn = false
    if (selectedItem === CHOOSE_REASON) {
        disableSaveBtn = true
    }
    return (
        reopenReasons && (
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
        </Modals>
        )
    )
}

export default ModalReopenLead