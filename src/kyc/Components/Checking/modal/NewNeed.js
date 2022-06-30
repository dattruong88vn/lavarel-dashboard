import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import * as actions from '../../../Actions';
import * as BuyerExperienceActions from '../../../Actions/BuyerExperienceActions';
import Select from "react-select"
import CustomModal from "./CustomModal"
import { VISITOR_REQUEST_BUY,VISITOR_REQUEST_RENT } from "../../../constant/RequestType"
import { _DEFAULT_OPTION } from "../../../constant/defaultValue"

const NewNeed = (props) => {
    const {className, closeLabel, dataProps, headContent, saveLabel, show, handleClose} = props;
    
    let [listingType, setListingType] = useState(VISITOR_REQUEST_BUY)
    let [propertyTypeGroup, setPropertyTypeGroup] = useState(_DEFAULT_OPTION)
    let [propertyType, setPropertyType] = useState(_DEFAULT_OPTION)
    let [isDisabledOKBtn, setIsDisabledOKBtn] = useState(false)

    const setPropertyTypeAndOKBtn = (val) => {
        // reset property type
        propertyType = _DEFAULT_OPTION
        setPropertyType(_DEFAULT_OPTION)

        // set selected reason
        listingType = val
        setListingType(val)
        
    }

    const onChangeListingType = (e) => {
        setPropertyTypeAndOKBtn(parseInt(e.target.value))
    }

    const onChangePropertyTypeGroup = (group) => {
        // reset property type
        propertyType = _DEFAULT_OPTION
        setPropertyType(_DEFAULT_OPTION)

        setPropertyTypeGroup(group)
    }

    const onChangePropertyType = (data) => {
        // set selected value
        propertyType = data
        setPropertyType(data)
    }

    useEffect(() => {
        // reset status OK btn
        isDisabledOKBtn = false
        if (!propertyType.value) {
            isDisabledOKBtn = true
        }

        setIsDisabledOKBtn(isDisabledOKBtn)
    }, [propertyType, isDisabledOKBtn])
    
    useEffect(() => {
        //If property type group has value, fetch the new value
        if (propertyTypeGroup.value) {
            const listingTypeId = listingType === 97 ? 1 : 2
            props.onGetListTypeLand(propertyTypeGroup.value, listingTypeId)
        }
    }, [listingType, propertyTypeGroup])

    const onClose = () => {
        // get list ProperType by listing Type
        listingType = 97
        setPropertyTypeAndOKBtn(listingType)

        handleClose()
    }

    const bodyContent = () => {
        const renderListingType = (listRadioNeed) => {
            let renderOpts = []
            listRadioNeed &&
                listRadioNeed.length > 0 &&
                listRadioNeed.map((item) => {
                    // check to get list item not Seller or Other
                    if (item.id === VISITOR_REQUEST_BUY || item.id === VISITOR_REQUEST_RENT) {
                        renderOpts.push(
                            <div
                                key={`need-radio-input-${item.id}`}
                                className="col-sm-3"
                            >
                                <div className="need-radio">
                                    <input
                                        checked={item.id === listingType}
                                        className="need-radio-input"
                                        id={item.id}
                                        name="listingType"
                                        type="radio"
                                        value={item.id}
                                        onChange={(e) => onChangeListingType(e)}
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className="need-radio-label"
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            </div>
                        )
                    }
                })

            return renderOpts
        }

        const renderPropertyTypeGroup = (listGroup) => {
            return (
                <div className="row">
                    <div className="col-md-4 pr0">
                        <label>
                            Nhóm bất động sản:{" "}
                            <span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-8">
                        <Select
                            isSearchable={false}
                            key={`property-type-group`}
                            options={listGroup}
                            value={propertyTypeGroup}
                            onChange={onChangePropertyTypeGroup}
                        />
                    </div>
                </div>
            )
        }

        const renderPropertyType = (listTypeLand) => {
            return (
                <div className="row">
                    <div className="col-md-4 pr0">
                        <label>
                            Loại bất động sản:{" "}
                            <span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="col-md-8">
                        <Select
                            isSearchable={false}
                            key={`property-type`}
                            options={listTypeLand}
                            value={propertyType}
                            onChange={onChangePropertyType}
                            styles={{
                                option: (base, { isDisabled, isFocused }) => {
                                let backgroundColor = '#fff'
                                let color = '#333'
                                if(isDisabled) {
                                    backgroundColor = '#ccc'
                                    color = '#444'
                                }
                
                                if(isFocused) {
                                    backgroundColor = "#deebff"; //Default color by react-select
                                }
                
                                return {
                                    ...base,
                                    backgroundColor,
                                    color,
                                    cursor: isDisabled ? 'not-allowed' : 'default',
                                }
                            }
                        }}
                        />
                    </div>
                </div>
            )
        }

        return (
            <Fragment>
                <div className="form-group mb20">
                    <div className="row">
                        {renderListingType(dataProps.listRadioNeed)}
                    </div>
                </div>
                <div className="form-group">
                    {renderPropertyTypeGroup(dataProps.listGroup)}
                    <div className="errors errors-reasonId"></div>
                </div>
                <div className="form-group">
                    {renderPropertyType(dataProps.listTypeLand)}
                    <div className="errors errors-reasonId"></div>
                </div>
            </Fragment>
        )
    }

    const onSave = () => {
        const listingTypeId = listingType === 97 ? 1 : 2

        const dataSave = {
            phone: dataProps.phone,
            listingTypeId: listingType,
            propertyTypeId: propertyType.value,
        }

        const dataPost = {...dataSave, listingTypeId}

        const dataGetDuplicateRequestDeal = {...props.checking.postData, ...dataPost}
        
        props.onCheckDuplicateLeadDeals(dataPost, dataSave, dataGetDuplicateRequestDeal)
    }

    return (
        <CustomModal
            bodyContent={bodyContent()}
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

const mapStateToProps = state => {
    return {
        checking: state.Checking
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetListTypeLand: (group, type) => {
            dispatch(actions.actGetListTypeLand(group, type))
        },
        onCheckDuplicateLeadDeals: (dataPost, dataSave, dataGetDuplicateRequestDeal) => {
            dispatch(actions.actCheckDuplicateLeadDeals(dataPost, dataSave, dataGetDuplicateRequestDeal))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNeed);
