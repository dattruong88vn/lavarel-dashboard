import React, { useContext, useEffect, useState } from 'react'
import { cloneDeep } from "lodash"

import { LeadContext } from "context/LeadContext"

import Modals from "components/Modals"

import LeadDealService from "services/LeadDealService"

import { getAdjusCriteriaData } from 'src_redux/actions/LeadAction'

import "modules/ModalAdjustCriteria/index.scss"

const ModalAdjustCriteria = (props) => {
    const { dispatch } = useContext(LeadContext)
    const [cloneDeapData, setCloneDeapData] = useState(null)
    const [adjustCriteriaData, setAdjustCriteria] = useState(null)
    const [, setCurrentRerender] = useState(false)

    useEffect(() => {
        // if open modal and not exist modal data, fetch data
        if (props.show && !cloneDeapData) {
            fetchData()
        }

        return () => {
            // reset modal data to origin when reopen it
            if (!props.show && cloneDeapData) {
                setAdjustCriteria(cloneDeep(cloneDeapData))
            }
        }
    }, [props.show])

    useEffect(() => {
        return () => {
            setCurrentRerender(false)
        }
    })

    const fetchData = async () => {
        const itemService = new LeadDealService()
        const itemDetail = await itemService.getAdjusCriteriaData(props.url)
        
        dispatch(getAdjusCriteriaData(cloneDeep(itemDetail.data)))
        
        setCloneDeapData(cloneDeep(itemDetail.data))
        setAdjustCriteria(cloneDeep(itemDetail.data))
    }
    const renderResp = () => {
        const onChangeCheckbox = (e, k) => {
            let isUse = false
            const configTarget = e.currentTarget
            if (configTarget.checked) {
                isUse = true
            } else {
                adjustCriteriaData[k].maxValue = ""
            }
            adjustCriteriaData[k].isUse = isUse
    
            setAdjustCriteria(adjustCriteriaData)
            setCurrentRerender(true)
        }
        const onChangeTextInput = (e, k) => {
            const configTarget = e.currentTarget

            adjustCriteriaData[k].maxValue = configTarget.value
    
            setAdjustCriteria(adjustCriteriaData)
            setCurrentRerender(true)
        }

        const renderSubConfig = (item, k) => {
            if (item.typeId !== 10) {
                return ''
            }
    
            const onChangeSubConfig = (e, ks) => {
                // reset is Use key
                adjustCriteriaData[k].subCongif.map(sub => sub.isUse = false)
    
                let isUse = false
                const subConfigTarget = e.currentTarget
                if (subConfigTarget.checked) {
                    isUse = true
                }
                adjustCriteriaData[k].subCongif[ks].isUse = isUse
    
                setAdjustCriteria(adjustCriteriaData)
                setCurrentRerender(true)
            }
            const onChangeSubTextInput = (e, ks) => {
                const configTarget = e.currentTarget
    
                adjustCriteriaData[k].subCongif[ks].valueInputText = configTarget.value
        
                setAdjustCriteria(adjustCriteriaData)
                setCurrentRerender(true)
            }
    
            return item.subCongif.map((v, ks) => {
                let disabledSubConfig = false
                const valueInputText = v.valueInputText || "0"
                const jsonValue = JSON.stringify(v).replace(new RegExp('"', 'g'), "'")
                const checkedSub = v.isUse && true || false
                if (!checkedSub) {
                    disabledSubConfig = true
                }
    
                return (
                    <div key={`subConfig-${ks}`} className="col-md-12">
                        <div className="radio sub-config">
                            <label>
                                <input
                                    checked={checkedSub}
                                    data-item-type={item.typeId}
                                    json={jsonValue}
                                    max={v.maxValue}
                                    name={item.name}
                                    type="radio"
                                    typeId={v.typeId}
                                    onChange={e => onChangeSubConfig(e, ks)}
                                /> {v.name}
                            </label>
                        </div>
                        {v.typeId == 13 && (
                            <input 
                                className="form-control"
                                disabled={disabledSubConfig}
                                json={jsonValue}
                                placeholder="m"
                                type="text"
                                value={valueInputText}
                                onChange={e => onChangeSubTextInput(e, ks)}
                            />
                        )}   
                    </div>
                )
            })
        }
        
        return adjustCriteriaData.map((item, k) => {
            let disabled = false;
            if (item.isPrimary) {
                disabled = true;
            }
            let configCheck = false
            if (item.isUse) {
                configCheck = true
            }
            const valueInput = item.maxValue || "";
            const disiableWhenMaxValue = (valueInput == 8 || item.isPrimary || !configCheck) ? true : false;

            return (
                <div key={`item-type-${k}`} className={`row config-${item.typeId}`}>
                    <div className="col-md-12">
                        <p className="config-name">{item.name}</p>
                    </div>
                    <div className="item-type" data-item-type={item.typeId}>
                        <div className="col-md-7">
                            <input
                                className={`config-value form-control config-value-${item.typeId}`}
                                disabled={disiableWhenMaxValue}
                                id={`input-max-${item.typeId}`}
                                type="text"
                                placeholder={`Nhập Điểm Cho ${item.name}`}
                                data-type-id={item.typeId}
                                value={valueInput}
                                onChange={e => onChangeTextInput(e, k)}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="checkbox">
                                <label>
                                    <input 
                                        checked={configCheck}
                                        disabled={disabled}
                                        type="checkbox"
                                        onChange={e => onChangeCheckbox(e, k)}
                                    />
                                    Chọn làm tiêu chí tính điểm
                                </label>
                            </div>
                        </div>
                    </div>
                    {item.subCongif.length > 0 && renderSubConfig(item, k)}
                </div>
            )
        })
    }

    /**
     * TODO setSave() fn will be rechecked after 15/01/2021
     */
    const setSave = () => {

    }

    return (
        <Modals 
            id={props.id}
            labelClose={props.labelClose}
            labelSave={props.labelSave}
            modalRef={props.modalRef}
            show={props.show}
            title={props.title}
            url={props.url}
            setSave={setSave}
            setShow={props.setShow}
        >
            {adjustCriteriaData && renderResp()}
        </Modals>
    )
}

export default ModalAdjustCriteria