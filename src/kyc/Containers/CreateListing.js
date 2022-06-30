import React, { Fragment } from "react"
import { connect } from "react-redux"
import ComponentContent from "../Components/CreateListing"
import {
    fetchChannelSubType,
    fetchDistrictsThunk,
    fetchInsetListing,
    fetchPropertyGroupForSelect,
    fetchPropertyType,
    fetchStreetsThunk,
    fetchUserRightTypeThunk,
    fetchWardsThunk,
    setOwnerInfo,
    udpateData,
} from "../Actions/CreateListingActions"

const containerSection = ({ contentStored, headerStep, functionServices }) => {
    let params = new URL(document.location).searchParams
    let dealId = params.get("dealId")
    let type = params.get("type")
    /*if (hasValue(dealId)) {
        return (
            <ComponentContent contentStored={contentStored} headerStep={headerStep} functionServices={functionServices} />
        );
    } else {
        return (
            <div className="content-kyc"> Không có Deal Id</div>
        );
    }*/
    return (
        <ComponentContent
            contentStored={contentStored}
            headerStep={headerStep}
            functionServices={functionServices}
            type={type}
            dealId={dealId}
        />
    )
}
const mapStateToProps = (state) => ({
    contentStored: state.CreateListingReducer,
    headerStep: state.HeaderStepReducer,
})
const mapDispatchToProps = (dispatch) => {
    return {
        functionServices: {
            fetchUserRightType: () => dispatch(fetchUserRightTypeThunk()),
            fetchDistricts: () => dispatch(fetchDistrictsThunk()),
            fetchWards: (id) => dispatch(fetchWardsThunk(id)),
            fetchStreets: (id) => dispatch(fetchStreetsThunk(id)),
            fetchSubType: (id) => dispatch(fetchChannelSubType(id)),
            fetchInsetListing: (data, exData) =>
                dispatch(fetchInsetListing(data, exData)),
            fetchPropertyTypeGroup: () => dispatch(fetchPropertyGroupForSelect()),
            updateDataPost: (data = {}) => dispatch(udpateData(data)),
            updateOwnerInfo: (data = {}) => dispatch(setOwnerInfo(data)),
            onChangeListingType: (data) => {
                const { listingTypeId, propertyTypeGroupId } = data
                dispatch(
                    udpateData({
                        listingTypeId,
                        propertyTypeId: null,
                    })
                )
                if(propertyTypeGroupId && listingTypeId)
                    dispatch(fetchPropertyType(propertyTypeGroupId, listingTypeId))
            },
            onChangePropertyTypeGroup: (data) => {
                const { propertyTypeGroupId, propertyTypeGroup, listingTypeId} = data;
                dispatch(
                    udpateData({
                        propertyTypeGroup,
                        propertyTypeGroupId,
                        propertyTypeId: null,
                    }))
                if(propertyTypeGroupId && listingTypeId)
                    dispatch(fetchPropertyType(propertyTypeGroupId, listingTypeId))
            },
        },
    }
}
const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(containerSection)
export default ComponentContainer
